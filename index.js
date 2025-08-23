import connectDB from "./configs/connectDB.js";
import {
  loginUserController,
  registerUserController,
} from "./controllers/user.controller.js";

export const registerUser = async (userData) => {
  const user = await registerUserController(userData);
  return user;
};

export const loginUser = async (userData) => {
  const user = await loginUserController(userData);
  return user;
};

export const connectMongoDB = (uri) => {
  connectDB(uri);
};
