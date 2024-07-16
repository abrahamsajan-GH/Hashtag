import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      maxlength: 40,
    },
    fullname: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    userType: { type: Number, default: 0 },
    profile_image: {
      type: String,
      default: "/images/no-dp-image.png",
    },
    gender: { type: String, default: "" },
    bio: { type: String, maxlength: 250, default: "" },
    profileUrl: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    following: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
