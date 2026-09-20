import express from "express";
import { body } from "express-validator";
import Project from "../models/Project.js";
import { requireAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { handleValidation } from "../middleware/validate.js";
import { deleteImageFile, uploadImageFile } from "../services/imageStorage.js";

const router = express.Router();
const projectValidators = [
  body("title").trim().isLength({ min: 2, max: 120 }),
  body("description").trim().isLength({ min: 10, max: 1000 }),
  body("githubUrl").optional({ checkFalsy: true }).isURL(),
  body("liveUrl").optional({ checkFalsy: true }).isURL()
];

const buildImageUrl = (project) => {
  if (project.imageFileId) {
    return `/api/images/${project.imageFileId}`;
  }
  return project.imageUrl || "";
};

const serializeProject = (project) => {
  const doc = project.toObject ? project.toObject() : { ...project };
  return {
    ...doc,
    imageUrl: buildImageUrl(doc),
  };
};

const normalizeProject = async (req, existingProject = null) => {
  const projectData = {
    title: req.body.title,
    description: req.body.description,
    techStack: typeof req.body.techStack === "string" ? req.body.techStack.split(",").map((item) => item.trim()).filter(Boolean) : [],
    githubUrl: req.body.githubUrl || "",
    liveUrl: req.body.liveUrl || "",
    featured: req.body.featured === "true" || req.body.featured === true,
    imageUrl: existingProject?.imageUrl || "",
    imageFileId: existingProject?.imageFileId || null,
  };

  if (req.file) {
    const fileId = await uploadImageFile(req.file, {
      type: "project",
      originalName: req.file.originalname,
      contentType: req.file.mimetype,
    });

    if (existingProject?.imageFileId) {
      await deleteImageFile(existingProject.imageFileId);
    }

    projectData.imageFileId = fileId;
    projectData.imageUrl = "";
  }

  return projectData;
};

router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  res.json(projects.map(serializeProject));
});

router.post("/", requireAdmin, upload.single("image"), projectValidators, handleValidation, async (req, res) => {
  try {
    const projectData = await normalizeProject(req);
    const project = await Project.create(projectData);
    res.status(201).json(serializeProject(project));
  } catch (error) {
    console.error("Project creation failed:", error.message || error);
    res.status(400).json({ message: error.message || "Project creation failed" });
  }
});

router.put("/:id", requireAdmin, upload.single("image"), projectValidators, handleValidation, async (req, res) => {
  const existingProject = await Project.findById(req.params.id);
  if (!existingProject) return res.status(404).json({ message: "Project not found" });

  try {
    const projectData = await normalizeProject(req, existingProject);
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.json(serializeProject(project));
  } catch (error) {
    console.error("Project update failed:", error.message || error);
    return res.status(400).json({ message: error.message || "Project update failed" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  try {
    if (project.imageFileId) {
      await deleteImageFile(project.imageFileId);
    }
    await Project.findByIdAndDelete(req.params.id);
    return res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Project delete failed:", error.message || error);
    return res.status(500).json({ message: "Project could not be deleted" });
  }
});

export default router;
