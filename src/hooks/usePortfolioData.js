import { useEffect, useState } from "react";
import { api } from "../api/client";
import { fallbackProjects, fallbackResume, fallbackSettings } from "../data/defaultPortfolio";

export const usePortfolioData = () => {
  const [data, setData] = useState({
    settings: fallbackSettings,
    projects: fallbackProjects,
    resume: fallbackResume,
    loading: true
  });

  const load = async () => {
    try {
      const [settings, projects, resume] = await Promise.all([
        api.get("/settings"),
        api.get("/projects"),
        api.get("/resume")
      ]);

      setData({
        settings: settings.data || fallbackSettings,
        projects: Array.isArray(projects.data) ? projects.data : [],
        resume: resume.data || fallbackResume,
        loading: false
      });
    } catch {
      setData((current) => ({ ...current, loading: false }));
    }
  };

  useEffect(() => {
    load();

    const refresh = () => load();
    const refreshFromStorage = (event) => {
      if (event.key === "portfolio:last-updated") refresh();
    };

    window.addEventListener("portfolio:updated", refresh);
    window.addEventListener("storage", refreshFromStorage);

    return () => {
      window.removeEventListener("portfolio:updated", refresh);
      window.removeEventListener("storage", refreshFromStorage);
    };
  }, []);

  return { ...data, reload: load };
};
