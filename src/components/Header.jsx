import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { assetUrl } from "../api/client";

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
    <header className="
      fixed left-1/2 top-4 z-50 flex w-[calc(100%-32px)]
      max-w-[1200px] -translate-x-1/2
      items-center justify-between
      rounded-[22px]
      border border-white/10
      bg-[#070b17]/80
      px-4 py-3
      shadow-[0_20px_60px_rgba(0,0,0,0.3)]
      backdrop-blur-xl
      md:px-5
    ">
      <a
        href="#home"
        className="flex items-center gap-2 font-bold"
        aria-label="Go to home"
      >
        <img
          src="/logo1.png"
          alt=""
          className="h-10 w-10 object-contain"
        />

        <span>
          {settings?.name?.replace("MD ", "") || "Wasim Akram"}
        </span>
      </a>

      <button
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl border border-white/10
          bg-white/[0.05]
          md:hidden
        "
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav
        className={`
          absolute left-0 right-0 top-[calc(100%+10px)]
          ${open ? "flex" : "hidden"}
          flex-col gap-1
          rounded-[22px]
          border border-white/10
          bg-[#070b17]/95
          p-3
          shadow-[0_28px_90px_rgba(0,0,0,0.42)]
          backdrop-blur-xl
          md:static md:flex md:flex-row md:items-center
          md:gap-1 md:border-0 md:bg-transparent
          md:p-0 md:shadow-none md:backdrop-blur-none
        `}
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
            className={`
              rounded-full px-3 py-2 text-sm font-semibold
              transition-colors
              ${
                activeSection === item.id
                  ? "bg-cyan-400/[0.1] text-cyan-300"
                  : "text-[var(--muted)] hover:bg-white/[0.05] hover:text-white"
              }
            `}
          >
            {item.label}
          </a>
        ))}

        <a
          href={resumeHref}
          target="_blank"
          rel="noreferrer"
          download
          className="
            mt-2 inline-flex items-center justify-center gap-2
            rounded-full
            bg-gradient-to-r from-[var(--primary)] to-[#6d4bea]
            px-4 py-2 text-sm font-bold
            md:ml-2 md:mt-0
          "
        >
          <Download size={16} />
          Resume
        </a>
      </nav>
    </header>
  );
};

export default Header;