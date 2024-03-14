import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) return errorHandler(401, "UnAuthorized");

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return errorHandler(403, "Forbidden");
      console.log(user);
      req.user = user;
      next();
    });
  } catch (error) {}
};
