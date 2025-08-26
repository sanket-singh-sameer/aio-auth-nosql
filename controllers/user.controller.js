import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwtToken.js";

export const registerUserController = async (req, res, userData) => {
  try {
    if (!userData.password || !userData.email) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = new User(userData);
    await user.save();

    const token = signToken(user);
    res.cookie("token", token, { httpOnly: true });
    return { user: { ...user._doc, password: undefined }, token };
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const loginUserController = async (req, res, userData) => {
  try {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      return "Invalid email or password";
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return "Invalid email or password";
    }
    const token = signToken(user);
    res.cookie("token", token, { httpOnly: true });
    return { user: { ...user._doc, password: undefined }, token };
  } catch (error) {
    return res.status(500).json({ message: "Error logging in user" });
  }
};
