import express from "express";
import Resume from "../models/Resume.js";
import PortfolioSettings from "../models/PortfolioSettings.js";
import { requireAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const resume = await Resume.findOne({ active: true }).sort({ createdAt: -1 });
  res.json(resume);
});

router.post("/", requireAdmin, upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "PDF resume is required" });

  await Resume.updateMany({}, { active: false });
  const buttonText = req.body.buttonText || "Download Resume";
  const resume = await Resume.create({
    fileName: req.file.originalname,
    fileUrl: `/uploads/resumes/${req.file.filename}`,
    mimeType: req.file.mimetype,
    buttonText,
    active: true
  });

  await PortfolioSettings.findOneAndUpdate({}, { resumeButtonText: buttonText }, { new: true });
  res.status(201).json(resume);
});

router.patch("/button-text", requireAdmin, async (req, res) => {
  const buttonText = String(req.body.buttonText || "").trim();
  if (!buttonText) return res.status(400).json({ message: "Button text is required" });

  const resume = await Resume.findOneAndUpdate({ active: true }, { buttonText }, { new: true });
  await PortfolioSettings.findOneAndUpdate({}, { resumeButtonText: buttonText }, { new: true });
  res.json(resume || { buttonText });
});

router.delete("/", requireAdmin, async (req, res) => {
  await Resume.updateMany({}, { active: false });
  res.json({ message: "Resume removed" });
});

export default router;
