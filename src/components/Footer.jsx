import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = ({ settings }) => {
  return (
    <footer id="footer" className="border-t mt-20 border-white/10 bg-black/20">
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
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/65 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/45 hover:bg-violet-400/[0.18] hover:text-white hover:shadow-[0_10px_35px_rgba(139,92,246,0.28)] active:scale-95"
              >
                <Github
                  size={19}
                  className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(196,181,253,0.45)]"
                />

                <span className="pointer-events-none absolute inset-0 rounded-full bg-violet-400/0 blur-xl transition-all duration-300 group-hover:bg-violet-400/20" />
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
            <a
              href={`mailto:${settings.email}`}
              aria-label="Mail"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/65 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/60 hover:bg-amber-400/[0.16] hover:text-white hover:shadow-[0_12px_35px_rgba(245,158,11,0.26)] active:scale-95"
            >
              <Mail
                size={19}
                className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(253,230,138,0.55)]"
              />
              <span className="pointer-events-none absolute inset-0 rounded-full bg-amber-400/0 blur-xl transition-all duration-300 group-hover:bg-amber-400/20" />
            </a>
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
