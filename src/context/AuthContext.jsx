import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ADMIN_TOKEN_KEY, api } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!token) {
      setChecking(false);
      return;
    }

    api.get("/auth/me")
      .then((response) => setAdmin(response.data.admin))
      .catch(() => {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setAdmin(null);
      })
      .finally(() => setChecking(false));
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email: email.trim().toLowerCase(),
      password
    });
    localStorage.setItem(ADMIN_TOKEN_KEY, response.data.token);
    setAdmin(response.data.admin);
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAdmin(null);
  };

  const value = useMemo(() => ({ admin, checking, login, logout }), [admin, checking]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
