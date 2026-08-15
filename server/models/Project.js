import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: [{ type: String, trim: true }],
    githubUrl: { type: String, default: "", trim: true },
    liveUrl: { type: String, default: "", trim: true },
    imageUrl: { type: String, default: "", trim: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
