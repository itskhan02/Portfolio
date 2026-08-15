import express from "express";
import { body } from "express-validator";
import { sendContactEmail } from "../services/email.js";
import PortfolioSettings from "../models/PortfolioSettings.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

const contactValidators = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters."),

  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address."),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Phone number is too long."),

  body("message")
    .trim()
    .isLength({ min: 5, max: 3000 })
    .withMessage("Message must be between 5 and 3000 characters."),
];

router.post("/", contactValidators, handleValidation, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const settings = await PortfolioSettings.findOne();

    if (!process.env.CONTACT_EMAIL) {
      return res.status(500).json({
        message: "Contact email is not configured.",
      });
    }

    await sendContactEmail({
      name,
      email,
      phone,
      message,
      recipient: process.env.CONTACT_EMAIL,
    });

    return res.status(200).json({
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      message: "Unable to send your message right now.",
    });
  }
});

export default router;
