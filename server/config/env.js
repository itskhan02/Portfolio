export const getMongoDbName = () => process.env.MONGO_DB_NAME || process.env.DB_NAME || "portfolio";

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length >= 24 && secret !== "replace-with-a-long-random-secret") {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return "local-development-portfolio-jwt-secret";
};

export const getAdminCredentials = () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (email && password && password.length >= 8) {
    return { email, password };
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return {
    email: email || "admin@portfolio.dev",
    password: password || "Admin@123456"
  };
};
