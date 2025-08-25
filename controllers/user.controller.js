import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwtToken.js";

export const registerUserController = async (userData) => {
  try {
    if (!userData.password || !userData.email) {
      return "Missing required fields";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = new User(userData);
    await user.save();

    const token = signToken(user);
    return { user: { ...user._doc, password: undefined }, token };
  } catch (error) {
    return "Error creating user";
  }
};

export const loginUserController = async (userData) => {
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
    return { user: { ...user._doc, password: undefined }, token };
  } catch (error) {
    return "Error logging in user";
  }
};
