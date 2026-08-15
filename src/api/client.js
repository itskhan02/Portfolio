import axios from "axios";

export const API_ROOT = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
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

export const assetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return path.startsWith("/uploads") ? `${SERVER_ROOT}${path}` : path;
};
