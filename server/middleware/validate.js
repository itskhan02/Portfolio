import { validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }

  return next();
};
