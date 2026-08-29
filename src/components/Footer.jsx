import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = ({ settings }) => {
  return (
    <footer id="footer" className="border-t border-white/10 bg-black/20">
      <div
        className="
        mx-auto grid w-[calc(100%-40px)] max-w-[1200px]
        gap-10 py-16
        md:grid-cols-2
      "
      >
        <div>
          <h2 className="text-2xl font-bold">
            {settings?.name || "Portfolio"}
          </h2>

          <p className="mt-3 max-w-lg leading-7 text-[var(--muted)]">
            Thank you for visiting my personal portfolio website. Connect with
            me over socials.
          </p>

          <div className="mt-6 flex gap-3">
            {settings.socialLinks?.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-all hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <Linkedin size={19} />
              </a>
            )}

            {settings.socialLinks?.github && (
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-all hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <Github size={19} />
              </a>
            )}

            <a
              href={`mailto:${settings.email}`}
              aria-label="Mail"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-all hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <Mail size={19} />
            </a>

            {settings.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-all hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <Instagram size={19} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold">Contact Info</h2>

          <div className="mt-5 grid gap-4 text-[var(--muted)]">
            <p className="flex items-center gap-2.5">
              <Phone size={17} />
              {settings.phone}
            </p>

            <p className="flex items-center gap-2.5">
              <Mail size={17} />
              {settings.email}
            </p>

            <p className="flex items-center gap-2.5">
              <MapPin size={17} />
              {settings.location}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-[var(--muted)]">
        © 2025 Wasim Akram, All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
