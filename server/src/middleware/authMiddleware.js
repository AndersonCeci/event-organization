// authMiddleware.js
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "secret"); 
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
