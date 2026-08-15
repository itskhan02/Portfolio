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
      if (window.innerWidth > 900) setOpen(false);
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

        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Go to home">
        <img src="/logo1.png" alt=""/>
        <span>{settings?.name?.replace("MD ", "") || "Wasim Akram"}</span>
      </a>
      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
        <nav
          className={`navbar ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? "is-active" : ""}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            className="nav-resume"
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            download
          >
            <Download size={16} /> Resume
          </a>
        </nav>
    </header>
  );
};

export default Header;
