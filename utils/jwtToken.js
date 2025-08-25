import jwt from "jsonwebtoken";

export const signToken = (user) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "default_jwt_secret",
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret");
};
