import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "" }
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    image: { type: String, default: "" }
  },
  { _id: false }
);

const portfolioSettingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    about: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    resumeButtonText: { type: String, default: "Download Resume", trim: true },
    skills: [skillSchema],
    experience: [experienceSchema],
    education: [educationSchema],
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      instagram: { type: String, default: "" },
      telegram: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

export default mongoose.model("PortfolioSettings", portfolioSettingsSchema);
