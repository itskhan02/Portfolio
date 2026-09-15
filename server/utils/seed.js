import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import PortfolioSettings from "../models/PortfolioSettings.js";
import Project from "../models/Project.js";
import { getAdminCredentials } from "../config/env.js";
import { defaultProjects, defaultSettings } from "../data/defaults.js";

export const seedDatabase = async () => {
  const adminCredentials = getAdminCredentials();
  const existingAdmin = await Admin.findOne();

  if (!existingAdmin && adminCredentials) {
    const password = await bcrypt.hash(adminCredentials.password, 12);
    await Admin.create({ email: adminCredentials.email, password });
    console.log("Admin account seeded");
  } else if (existingAdmin) {
    console.log("Using existing admin account from database");
  } else if (process.env.NODE_ENV === "production") {
    console.warn("No admin account found. Set ADMIN_EMAIL and ADMIN_PASSWORD once to seed the first admin account.");
  }

  const settingsCount = await PortfolioSettings.countDocuments();
  if (!settingsCount) {
    await PortfolioSettings.create(defaultSettings);
    console.log("Portfolio settings seeded");
  }

  const projectCount = await Project.countDocuments();
  if (!projectCount) {
    await Project.insertMany(defaultProjects);
    console.log("Projects seeded");
  }
};
