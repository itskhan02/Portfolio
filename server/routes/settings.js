import express from "express";
import { body } from "express-validator";
import PortfolioSettings from "../models/PortfolioSettings.js";
import { requireAdmin } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const settings = await PortfolioSettings.findOne();
  res.json(settings);
});

router.put(
  "/",
  requireAdmin,
  [
    body("name").trim().isLength({ min: 2, max: 100 }),
    body("jobTitle").trim().isLength({ min: 2, max: 120 }),
    body("summary").trim().isLength({ min: 10, max: 300 }),
    body("about").trim().isLength({ min: 20, max: 2000 }),
    body("email").isEmail().normalizeEmail()
  ],
  handleValidation,
  async (req, res) => {
    const settings = await PortfolioSettings.findOneAndUpdate({}, req.body, { new: true, runValidators: true, upsert: true });
    res.json(settings);
  }
);

export default router;
