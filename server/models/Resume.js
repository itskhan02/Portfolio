import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    mimeType: { type: String, default: "application/pdf" },
    buttonText: { type: String, default: "Download Resume" },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
