import express from "express";
import { ObjectId } from "mongodb";
import { requireAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { deleteImageFile, getGridFSBucket, uploadImageFile } from "../services/imageStorage.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Image not found" });
  }

  try {
    const bucket = getGridFSBucket();
    const file = await bucket.find({ _id: new ObjectId(id) }).next();

    if (!file) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.setHeader("Content-Type", file.contentType || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");

    const stream = bucket.openDownloadStream(new ObjectId(id));
    stream.on("error", () => {
      if (!res.headersSent) {
        res.status(404).json({ message: "Image not found" });
      }
    });

    stream.pipe(res);
  } catch (error) {
    console.error("Image retrieval failed:", error.message || error);
    res.status(404).json({ message: "Image not found" });
  }
});

router.post("/upload", requireAdmin, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  try {
    const fileId = await uploadImageFile(req.file, {
      type: req.body.type || "project",
      originalName: req.file.originalname,
      contentType: req.file.mimetype,
    });

    res.status(201).json({
      fileId,
      url: `/api/images/${fileId}`,
      contentType: req.file.mimetype,
    });
  } catch (error) {
    console.error("GridFS image upload failed:", error.message || error);
    res.status(400).json({ message: error.message || "Image upload failed" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Image not found" });
  }

  try {
    await deleteImageFile(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    console.error("GridFS image delete failed:", error.message || error);
    res.status(500).json({ message: "Image cleanup failed" });
  }
});

export default router;
