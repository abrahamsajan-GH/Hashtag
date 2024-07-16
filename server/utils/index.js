import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const hashedString = async (userValue) => {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(userValue, salt);
    return hashedPassword;
};

export const compareString = async (userPassword, password) => {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
};

// JWT

export function createJWT(id){
    return JWT.sign({ userId: id }, process.env.JWT_KEY,{
        expiresIn: "1d",
    });
};