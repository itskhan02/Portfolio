import express from "express";
import { body } from "express-validator";
import PortfolioSettings from "../models/PortfolioSettings.js";
import { requireAdmin } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

const serializeSkill = (skill) => {
  if (!skill || typeof skill !== "object") return skill;
  return {
    ...skill,
    icon: skill.icon || "",
  };
};

router.get("/", async (req, res) => {
  const settings = await PortfolioSettings.findOne();
  if (!settings) return res.json(null);

  const payload = settings.toObject();
  payload.skills = (payload.skills || []).map(serializeSkill);
  res.json(payload);
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
    const payload = settings.toObject();
    payload.skills = (payload.skills || []).map(serializeSkill);
    res.json(payload);
  }
);

export default router;
