import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { seedDatabase } from "./utils/seed.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import resumeRoutes from "./routes/resume.js";
import settingsRoutes from "./routes/settings.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 250 }));
app.use("/uploads", express.static(path.join(process.cwd(), "server", "uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

await connectDB();
if (mongoose.connection.readyState === 1) {
  await seedDatabase();
}

const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the old server process or set a different PORT in .env.`);
    process.exit(1);
  }

  console.error("API server failed to start:", error.message);
  process.exit(1);
});
