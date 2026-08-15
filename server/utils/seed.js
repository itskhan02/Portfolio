import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import PortfolioSettings from "../models/PortfolioSettings.js";
import Project from "../models/Project.js";
import { getAdminCredentials } from "../config/env.js";
import { defaultProjects, defaultSettings } from "../data/defaults.js";

export const seedDatabase = async () => {
  const adminCredentials = getAdminCredentials();

  if (adminCredentials) {
    const existingAdmin = await Admin.findOne({ email: adminCredentials.email });
    const password = await bcrypt.hash(adminCredentials.password, 12);

    if (!existingAdmin) {
      await Admin.deleteMany({});
      await Admin.create({ email: adminCredentials.email, password });
      console.log("Admin account seeded");
    } else {
      existingAdmin.password = password;
      await existingAdmin.save();
      await Admin.deleteMany({ _id: { $ne: existingAdmin._id } });
      console.log("Admin account synced");
    }
  } else {
    console.warn("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the single admin account.");
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
