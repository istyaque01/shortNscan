import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, username, password, confirmpassword } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        status: false,
        message: "Password or confirm password not matched",
      });
    }

    const isAlreadyUser = await userModel.findOne({ email });

    if (isAlreadyUser) {
      return res.status(400).json({
        status: false,
        message: "User already registered",
      });
    }

    const data = await userModel.create({ email, username, password });

    await data.save();
    return res.status(201).json({
      status: true,
      message: "User signed up",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const isUser = await userModel.findOne({ email });

    if (!isUser) {
      return res.status(400).json({
        status: false,
        message: "User is not registered please register!",
      });
    }

    const token = jwt.sign({ id: isUser.email }, "secretkey");

    return res.status(201).json({
      status: true,
      message: "Logged In",
      token,
      email: isUser.email,
      username: isUser.username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
