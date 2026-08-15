import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/env.js";

export const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  const jwtSecret = getJwtSecret();

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT_SECRET is not configured." });
  }

  try {
    req.admin = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};
