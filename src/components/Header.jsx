import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { assetUrl } from "../api/client";
import { ADMIN_LOGIN_PATH } from "../config/admin";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Header = ({ settings, resume }) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const resumeHref = assetUrl(resume?.fileUrl);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.45],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="
      fixed left-1/2 top-4 z-50 flex w-[calc(100%-32px)]
      max-w-[1000px] -translate-x-1/2
      items-center justify-between
      rounded-[22px]
      border border-white/10
      bg-[#070b17]/80
      px-4 py-3
      shadow-[0_20px_60px_rgba(0,0,0,0.3)]
      backdrop-blur-xl
      md:px-5
    "
    >
      <a
        href="#home"
        className="flex items-center gap-2 font-bold"
        aria-label="Go to home"
      >
        <img src="/logo1.png" alt="" className="h-10 w-10 object-contain" />

        <span>{settings?.name?.replace("MD ", "") || "Wasim Akram"}</span>
      </a>

      <button
        className="
          flex h-10 w-10 items-center justify-center md:hidden
        "
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        className={`absolute left-0 right-0 top-[calc(100%+10px)] ${open ? "flex" : "hidden"} flex-col gap-1 rounded-[22px] border border-white/10 bg-[#070b17]/95 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
            className={`group relative rounded-xl border px-2.5 py-2 text-sm font-semibold transition-all duration-300 ${
              activeSection === item.id
                ? "border-cyan-300/35 bg-gradient-to-r from-cyan-400/[0.10] to-emerald-300/[0.15] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.08)]"
                : "border-transparent text-[var(--muted)] hover:border-cyan-300/25 hover:bg-white/[0.045] hover:text-white"
            }`}
          >
            {item.label}
          </a>
        ))}

        <a
          href={resumeHref}
          target="_blank"
          rel="noreferrer"
          download
          className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/[0.12] via-emerald-400/[0.08] to-white/[0.04] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(6,182,212,0.12),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-cyan-200/60 hover:from-cyan-400/[0.22] hover:via-emerald-400/[0.16] hover:to-white/[0.08] hover:shadow-[0_14px_40px_rgba(6,182,212,0.24),inset_0_1px_0_rgba(255,255,255,0.25)] active:scale-98 md:ml-2 md:mt-0"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 " />

          <Download
            size={16}
            className="relative z-10 text-cyan-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.7)]"
          />

          <span className="relative z-10 bg-gradient-to-r from-white via-cyan-50 to-emerald-100 bg-clip-text text-transparent">
            Resume
          </span>
        </a>
      </nav>
    </header>
  );
};

export default Header;