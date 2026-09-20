import multer from "multer";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    return cb(null, file.mimetype === "application/pdf");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    return cb(new Error("Only JPG, PNG, and WebP images are allowed."));
  }

  return cb(null, true);
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
