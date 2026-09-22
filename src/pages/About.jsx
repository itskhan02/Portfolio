import { Download, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "../api/client";

const About = ({ settings, resume }) => {
  return (
    <section
      id="about"
      className="relative mx-auto grid w-[calc(100%-40px)] max-w-[1200px] pt-26"
    >
      <motion.div
        className="mb-6 max-w-[860px]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="mb-3.5 inline-flex w-fit rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
          About Me
        </span>

        <h2 className="font-[Poppins,Inter,sans-serif] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight">
          Frontend craft with full-stack curiosity.
        </h2>
      </motion.div>

      <div className="grid items-center gap-7 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          className="
            mx-auto aspect-square w-full max-w-[460px]
            overflow-hidden rounded-full
            border border-white/10
            bg-white/[0.045]
            p-2
            shadow-[0_28px_90px_rgba(0,0,0,0.42)]
            backdrop-blur-xl
          "
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src="/pic2.png"
            alt={settings.name}
            loading="lazy"
            className="h-full w-full rounded-full object-cover object-top"
          />
        </motion.div>

        <motion.div
          className="self-center"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="
            mb-4 inline-flex rounded-full
            border border-emerald-400/30
            bg-emerald-400/[0.08]
            px-3 py-2 text-sm font-extrabold
            text-[#9ff8d0]
          "
          >
            Building thoughtful digital experiences with modern tools
          </div>

          <p className="text-lg leading-8 text-[var(--muted)]">
            {settings.about}
          </p>

          <div className="my-6 grid gap-3.5">
            <a
              href={`mailto:${settings.email}`}
              className="flex min-w-0 items-center gap-2.5 text-[var(--muted)] transition-colors hover:text-white"
            >
              <Mail size={18} />
              <span className="break-all">{settings.email}</span>
            </a>

            <span className="flex min-w-0 items-center gap-2.5 text-[var(--muted)]">
              <MapPin size={18} />
              {settings.location}
            </span>
          </div>

          <a
            href={assetUrl(resume?.fileUrl)}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex min-h-[46px] items-center justify-center gap-2.5 px-5 font-extrabold text-white group relative py-3 rounded-2xl backdrop-blur-xl border-3 border-indigo-400/30 bg-gradient-to-br from-indigo-500/40 via-black-300/60 to-black/10 shadow-2xl hover:shadow-indigo-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-indigo-400/60 overflow-hidden
            "
          >
            <Download
              size={18}
              className=" transition-transform duration-500 group-hover:-translate-y-0.5"
            />
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
