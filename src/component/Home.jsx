import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Header from "./Header";
import Project from "./Project";
import Skill from "./Skill";
import Footer from "./Footer";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { assetUrl } from "../api/client";
import { ADMIN_LOGIN_PATH } from "../config/admin";
import { ArrowRight, Download, Github, Instagram, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { settings, projects, resume } = usePortfolioData();
  const resumeHref = assetUrl(resume?.fileUrl);
  const heroHighlights = [
    { label: "Focus", value: "React, Node, UI" },
    { label: "Availability", value: "Open to opportunities" },
    { label: "Approach", value: "Performance-first design" }
  ];

  useEffect(() => {
    const openAdminLogin = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
        navigate(ADMIN_LOGIN_PATH);
      }
    };

    window.addEventListener("keydown", openAdminLogin);
    return () => window.removeEventListener("keydown", openAdminLogin);
  }, [navigate]);

  return (
    <>
      <Header settings={settings} resume={resume} />
      <section id="home" className="hero-section section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-orbit hero-orbit-three" />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="eyebrow">Hi! There...</span>
          <h1>
            I'm <span>{settings.name}</span>
          </h1>
          <h2>
            And I'm a <span>{settings.jobTitle}</span>
          </h2>
          <p>{settings.summary}</p>
          <div className="hero-badges">
            <span>Fast, responsive UI</span>
            <span>Full-stack thinking</span>
            <span>Product-minded delivery</span>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#about">
              About Me <ArrowRight size={18} />
            </a>
            <a className="button button-ghost" href={resumeHref} target="_blank" rel="noreferrer" download>
              <Download size={18} /> {resume?.buttonText || settings.resumeButtonText}
            </a>
          </div>
          <div className="hero-highlights">
            {heroHighlights.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="social-row" aria-label="Social links">
            {settings.socialLinks?.linkedin && <a href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>}
            {settings.socialLinks?.github && <a href={settings.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>}
            {settings.socialLinks?.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>}
            {settings.socialLinks?.telegram && <a href={settings.socialLinks.telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><Send size={20} /></a>}
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <img src="/hero1.png" alt={settings.name} loading="eager" />
        </motion.div>
      </section>
      <About settings={settings} resume={resume} />
      <Skill skills={settings.skills} />
      <Experience items={settings.experience} />
      <Education items={settings.education} />
      <Project projects={projects} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </>
  );
};

export default Home;
