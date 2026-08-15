import express from "express";
import { body } from "express-validator";
import Project from "../models/Project.js";
import { requireAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();
const projectValidators = [
  body("title").trim().isLength({ min: 2, max: 120 }),
  body("description").trim().isLength({ min: 10, max: 1000 }),
  body("githubUrl").optional({ checkFalsy: true }).isURL(),
  body("liveUrl").optional({ checkFalsy: true }).isURL()
];

const normalizeProject = (req, existingProject = null) => ({
  title: req.body.title,
  description: req.body.description,
  techStack: typeof req.body.techStack === "string" ? req.body.techStack.split(",").map((item) => item.trim()).filter(Boolean) : [],
  githubUrl: req.body.githubUrl || "",
  liveUrl: req.body.liveUrl || "",
  featured: req.body.featured === "true" || req.body.featured === true,
  ...(req.file ? { imageUrl: `/uploads/projects/${req.file.filename}` } : existingProject?.imageUrl ? { imageUrl: existingProject.imageUrl } : {})
});

router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  res.json(projects);
});

router.post("/", requireAdmin, upload.single("image"), projectValidators, handleValidation, async (req, res) => {
  const project = await Project.create(normalizeProject(req));
  res.status(201).json(project);
});

router.put("/:id", requireAdmin, upload.single("image"), projectValidators, handleValidation, async (req, res) => {
  const existingProject = await Project.findById(req.params.id);
  if (!existingProject) return res.status(404).json({ message: "Project not found" });

  const project = await Project.findByIdAndUpdate(req.params.id, normalizeProject(req, existingProject), { new: true, runValidators: true });
  if (!project) return res.status(404).json({ message: "Project not found" });
  return res.json(project);
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  return res.json({ message: "Project deleted" });
});

export default router;
