import axios from "axios";

export const API_ROOT =
  import.meta.env.VITE_API_URL || "https://itskhan.onrender.com/api";
export const SERVER_ROOT = API_ROOT.replace(/\/api\/?$/, "");
export const ADMIN_TOKEN_KEY = "portfolio_admin_token";

export const api = axios.create({ baseURL: API_ROOT });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const assetUrl = (path) => {
//   if (!path) return "";
//   if (path.startsWith("data:image/") || path.startsWith("blob:")) return path;
//   if (path.startsWith("http://") || path.startsWith("https://")) return path;
//   if (path.startsWith("/api/")) return `${SERVER_ROOT}${path}`;
//   if (path.startsWith("/uploads")) return `${SERVER_ROOT}${path}`;
//   if (path.startsWith("/")) return `${SERVER_ROOT}${path}`;
//   return path;
// };

// export const getStoredImageUrl = ({ fileId, legacyUrl, fallback = "" }) => {
//   const normalizedFileId = typeof fileId === "object" && fileId !== null ? String(fileId) : fileId;
//   if (normalizedFileId) return `${API_ROOT.replace(/\/api\/?$/, "")}/api/images/${normalizedFileId}`;
//   if (legacyUrl) return assetUrl(legacyUrl) || fallback;
//   return fallback;
// };

export const assetUrl = (value) => {
  if (!value) return "";

  const path = String(value).trim();

  if (!path) return "";

  if (path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (path.startsWith("/api/")) {
    return `${SERVER_ROOT}${path}`;
  }

  if (path.startsWith("/uploads")) {
    return `${SERVER_ROOT}${path}`;
  }

  if (path.startsWith("/")) {
    return `${SERVER_ROOT}${path}`;
  }

  return path;
};

export const getStoredImageUrl = ({ fileId, legacyUrl, fallback = "" }) => {
  const normalizedFileId =
    typeof fileId === "object" && fileId !== null ? String(fileId) : fileId;

  if (normalizedFileId) {
    return `${SERVER_ROOT}/api/images/${normalizedFileId}`;
  }

  if (legacyUrl) {
    return assetUrl(legacyUrl) || fallback;
  }

  return fallback;
};
