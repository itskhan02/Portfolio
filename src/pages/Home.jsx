import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import About from "./About";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Project from "./Project";
import Skill from "./Skill";
import Footer from "../components/Footer";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { assetUrl } from "../api/client";
import { ADMIN_LOGIN_PATH } from "../config/admin";
import {
  ArrowRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { settings, projects, resume } = usePortfolioData();
  const resumeHref = assetUrl(resume?.fileUrl);
  const heroHighlights = [
    { label: "Focus", value: "React, Node, UI" },
    { label: "Availability", value: "Open to opportunities" },
    { label: "Approach", value: "Performance-first design" },
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
      <section
        id="home"
        className="relative mx-auto grid min-h-screen w-[calc(100%-40px)] max-w-[1200px] items-center gap-12 pt-32 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="pointer-events-none absolute -left-20 top-[20%]-z-10 h-80 w-80 rounded-full bg-[var(--cyan)]/30 blur-[70px]" />

        <div className=" pointer-events-none absolute bottom-[16%] right-[10%]-z-10 h-80 w-80 rounded-full bg-purple-400/25 blur-[70px]" />

        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className="mb-4 inline-flex rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
            Hi! There...
          </span>

          <h1
            className="font-[Poppins,Inter,sans-serif] text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.98]">
            I'm{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {settings.name}
            </span>
          </h1>

          <h2
            className="mt-5 font-[Poppins,Inter,sans-serif] text-[clamp(1.4rem,3vw,2.4rem)] font-semibold leading-tight">
            And I'm a <span className="text-cyan-300">{settings.jobTitle}</span>
          </h2>

          <p
            className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg" >
            {settings.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#about"
              className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[#6d4bea] px-5 font-extraboldtransition-all hover:-translate-y-0.5">
              About Me
              <ArrowRight size={18} />
            </a>

            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              download
              className="
          inline-flex min-h-[46px]
          items-center justify-center gap-2.5
          rounded-full border border-white/10
          bg-white/[0.05]
          px-5 font-extrabold
          transition-all
          hover:-translate-y-0.5
          hover:border-cyan-400/30
        "
            >
              <Download size={18} />
              {resume?.buttonText || settings.resumeButtonText}
            </a>
          </div>

          <div className="social-row" aria-label="Social links">
            {settings.socialLinks?.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            {settings.socialLinks?.github && (
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {settings.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            {settings.socialLinks?.telegram && (
              <a
                href={settings.socialLinks.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
            )}
          </div>

          {/* <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Fast, responsive UI",
              "Full-stack thinking",
              "Product-minded delivery",
            ].map((badge) => (
              <span
                key={badge}
                className="
            rounded-full
            border border-white/10
            bg-white/[0.04]
            px-3 py-1.5
            text-xs font-semibold
            text-[var(--muted)]
          "
              >
                {badge}
              </span>
            ))}
          </div> */}
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <img
            src="/hero1.png"
            alt={settings.name}
            loading="eager"
            className="
        w-full max-w-[520px]
        object-contain
        drop-shadow-[0_30px_70px_rgba(0,0,0,0.4)]
      "
          />
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
