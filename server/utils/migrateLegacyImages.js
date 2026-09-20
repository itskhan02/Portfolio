import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import PortfolioSettings from "../models/PortfolioSettings.js";
import { uploadImageFile } from "../services/imageStorage.js";

export const migrateLegacyImages = async () => {
  const projectDocs = await Project.find({
    imageUrl: { $exists: true, $ne: "" },
    imageFileId: { $exists: false },
  });

  for (const project of projectDocs) {
    const legacyPath = project.imageUrl;
    if (!legacyPath || !legacyPath.startsWith("/uploads/")) continue;

    const diskPath = path.join(process.cwd(), "server", legacyPath.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) continue;

    const fileData = fs.readFileSync(diskPath);
    const fileId = await uploadImageFile({
      buffer: fileData,
      originalname: path.basename(legacyPath),
      mimetype: "image/jpeg",
    }, {
      type: "project",
      originalName: path.basename(legacyPath),
      contentType: "image/jpeg",
    });

    project.imageFileId = fileId;
    project.imageUrl = "";
    await project.save();
  }

  const settingsDocs = await PortfolioSettings.find();
  for (const settings of settingsDocs) {
    for (const [index, skill] of (settings.skills || []).entries()) {
      if (!skill.icon || skill.iconFileId || !skill.icon.startsWith("/uploads/")) continue;

      const diskPath = path.join(process.cwd(), "server", skill.icon.replace(/^\//, ""));
      if (!fs.existsSync(diskPath)) continue;

      const fileData = fs.readFileSync(diskPath);
      const fileId = await uploadImageFile({
        buffer: fileData,
        originalname: path.basename(skill.icon),
        mimetype: "image/png",
      }, {
        type: "skill",
        originalName: path.basename(skill.icon),
        contentType: "image/png",
      });

      settings.skills[index].iconFileId = fileId;
      settings.skills[index].icon = "";
    }

    await settings.save();
  }

  return { migrated: true };
};

if (process.argv[1] && process.argv[1].includes("migrateLegacyImages")) {
  mongoose.connect(process.env.MONGO_URI).then(async () => {
    await migrateLegacyImages();
    console.log("Legacy image migration complete");
    process.exit(0);
  }).catch((error) => {
    console.error("Legacy image migration failed:", error.message || error);
    process.exit(1);
  });
}
