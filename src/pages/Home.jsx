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

          <h1 className="font-[Poppins,Inter,sans-serif] text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.98]">
            I'm{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {settings.name}
            </span>
          </h1>

          <h2 className="mt-5 font-[Poppins,Inter,sans-serif] text-[clamp(1.4rem,3vw,2.4rem)] font-semibold leading-tight">
            And I'm a <span className="text-cyan-300">{settings.jobTitle}</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {settings.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#about"
              className="group relative inline-flex w-fit overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 shadow-[0_10px_35px_rgba(79,70,229,0.18)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.025] hover:-rotate-[0.5deg] hover:shadow-[0_18px_45px_rgba(79,70,229,0. active:translate-y-0 active:scale-[0.98] active:rotate-0"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to- transition-transform duration-700 ease- group-hover:translate-x-[120%]" />

              <span className="relative flex items-center justify-between gap-8 rounded-2xl bg-[#0a1020] px-4 py-2 text-white transition-all duration-500 group-hover:bg-[#0d1528] sm:px-4 sm:py-2">
                <span className=" text-[16px] font-bold tracking-[-0.01em] whitespace- transition-colors duration- group-hover:text-cyan- sm:text-[17px]">
                  About Me
                </span>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/90 ring-1 ring-white/[0.09] transition-all duration-500 group-hover:translate-x-1 group-hover:bg-gradient-to-br group-hover:from-cyan-400/15 group-hover:to-violet-400/15 group-hover:text-cyan-200 group-hover:ring-cyan-300/25">
                  <ArrowRight
                    size={19}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </span>

              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 via-blue-400/10 to-cyan-400/ opacity-0 transition-opacity  duration-500 group-hover:opacity-100" />
            </a>

            {/* Resume */}
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              download
              className="group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-cyan-400/20 bg-white/[0.045] px-5 py-2.5 text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_40px_rgba(34,211,238,0.18)] active:scale- sm:text-base
"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] text-cyan-300 ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-cyan-400/10 group-hover:text-cyan-200group-hover:ring-cyan-300/25">
                <Download
                  size={17}
                  strokeWidth={2}
                  className=" transition-transform duration-500 group-hover:-translate-y-0.5"
                />
              </span>

              <span className="relative z-10 transition-colors duration-300 group-hover:text-cyan-100 ">
                Resume
              </span>
            </a>
          </div>

          <div
            className=" mt-6 flex items-center gap-4"
            aria-label="Social links"
          >
            {/* LinkedIn */}
            {settings.socialLinks?.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/65 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400/[0.15] hover:border-cyan-300/30 hover:text-cyan-100 hover:shadow-[0_10px_40px_rgba(34,211,238,0.35)]"
              >
                <Linkedin
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span className="absolute inset-0 rounded-full bg-cyan-400/0 blur-xl transition-all duration-300 group-hover:bg-cyan-400/10" />
              </a>
            )}

            {/* GitHub */}
            {settings.socialLinks?.github && (
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/65 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/45 hover:bg-violet-400/[0.18] hover:text-white hover:shadow-[0_10px_35px_rgba(139,92,246,0.28)] active:scale-95" >
                <Github
                  size={19}
                  className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(196,181,253,0.45)]"/>

                <span
                  className="pointer-events-none absolute inset-0 rounded-full bg-violet-400/0 blur-xl transition-all duration-300 group-hover:bg-violet-400/20" />
              </a>
            )}

            {/* Instagram */}
            {settings.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/65 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-300/30 hover:bg-pink-400/[0.15] hover:text-pink-300 hover:shadow-[0_10px_30px_rgba(236,72,153,0.16)] "
              >
                <Instagram
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span className="absolute inset-0 rounded-full bg-pink-400/0 blur-xl transition-all duration-300 group-hover:bg-pink-400/10" />
              </a>
            )}

            {/* Telegram */}
            {/* {settings.socialLinks?.telegram && (
              <a
                href={settings.socialLinks.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/65 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-sky-400/[0.08] hover:text-sky-300 hover:shadow-[0_10px_30px_rgba(56,189,248,0.16)]">
                <Send
                  size={19}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

                <span
                  className="absolute inset-0 rounded-full bg-sky-400/0 blur-xl transition-all duration-300 group-hover:bg-sky-400/10" />
              </a>
            )} */}
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
            src="/pic.png"
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
