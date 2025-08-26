import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import connectDB from "./configs/connectDB.js";
import {
  loginUserController,
  registerUserController,
} from "./controllers/user.controller.js";

export const registerUser = async (req, res, userData) => {
  const response = await registerUserController(req, res, userData);
  return response;
};

export const loginUser = async (req, res, userData) => {
  const response = await loginUserController(req, res, userData);
  return response;
};

export const connectMongoDB = (uri) => {
  connectDB(uri);
};

export const setupJwtSecret = (secret) => {
  process.env.JWT_SECRET = secret || "default_jwt_secret";
};

export const setUpAIOAuthNoSQL = (app, mongoUri, secret) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: "*", credentials: true }));
  process.env.JWT_SECRET = secret || "default_jwt_secret";
  connectDB(mongoUri);
};
