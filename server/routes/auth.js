import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import Admin from "../models/Admin.js";
import { getJwtSecret } from "../config/env.js";
import { requireAdmin } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").trim().isEmail().toLowerCase(),
    body("password").isLength({ min: 8 }),
  ],
  handleValidation,
  async (req, res) => {
    const { email, password } = req.body;
    const jwtSecret = getJwtSecret();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT_SECRET is not configured." });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      jwtSecret,
      { expiresIn: "7d" },
    );
    return res.json({ token, admin: { email: admin.email } });
  }
);

router.get("/me", requireAdmin, (req, res) => {
  res.json({ admin: { email: req.admin.email } });
});

export default router;
