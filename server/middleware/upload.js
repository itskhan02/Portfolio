import fs from "fs";
import path from "path";
import multer from "multer";

const uploadRoot = path.join(process.cwd(), "server", "uploads");
fs.mkdirSync(path.join(uploadRoot, "projects"), { recursive: true });
fs.mkdirSync(path.join(uploadRoot, "resumes"), { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "resume" ? "resumes" : "projects";
    cb(null, path.join(uploadRoot, folder));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    return cb(null, file.mimetype === "application/pdf");
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  return cb(null, allowed.includes(file.mimetype));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});
