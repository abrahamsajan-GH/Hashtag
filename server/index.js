import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./database/dbConfig.js";
import helmet from "helmet";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
app.use("/uploads", express.static("Uploads"));
app.use('/images', express.static(path.join(__dirname, 'images')));
dbConnection();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb " }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);


app.use(errorMiddleware);
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
});
