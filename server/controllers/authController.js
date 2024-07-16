import Users from "../models/userModel.js";
import { hashedString, compareString, createJWT } from "../utils/index.js";

// Register
export const register = async (req, res, next) => {
  const { user_name, email, password } = req.body;

  if (!user_name || !email || !password) {
    next("Provide Required Fields!");
    return;
  }

  try {
    let username = user_name.toLowerCase().replace(/ /g, "");
    let checkName = await Users.findOne({ username });
    if (checkName) {
      next("username already taken!");
      return;
    }
    let checkmail = await Users.findOne({ email });
    if (checkmail) {
      next("email-id already taken!");
      return;
    }
    if (password.length < 6 || password.length > 22) {
      next("password length must be in-between 6 & 22 characters!");
      return;
    }

    const hashedPassword = await hashedString(password);
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "Successfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: "failed",
        message: "Please Provide User Credentials",
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: "failed",
        message: "Invalid email or password",
      });
    }

    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      return res.status(401).json({
        success: "failed",
        message: "Invalid email or password",
      });
    }

    user.password = undefined;

    const token = createJWT(user?._id);

    const response = {
      success: true,
      message: "Login Successful",
      user,
      token,
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
