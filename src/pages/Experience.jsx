import { BriefcaseBusiness } from "lucide-react";
import { motion } from "framer-motion";

const Experience = ({ items = [] }) => {
  return (
    <section
      id="experience"
      className="relative mx-auto w-[calc(100%-40px)] max-w-[1200px] py-24"
    >
      <div className="mb-10 max-w-[860px]">
        <span className="mb-3.5 inline-flex rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
          Experience
        </span>

        <h2 className="font-[Poppins,Inter,sans-serif] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight">
          Hands-on growth through real builds.
        </h2>
      </div>

      <div className="relative grid gap-[18px]">
        <div
          className="
          absolute bottom-0 left-[22px] top-0 w-0.5
          bg-gradient-to-b from-[var(--mint)] to-[var(--cyan)]
        "
        />

        {items.map((item, index) => (
          <motion.article
            key={`${item.role}-${index}`}
            className="relative grid grid-cols-[44px_1fr] gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="
              relative z-10 flex h-11 w-11 items-center justify-center
              rounded-full border border-emerald-400/30
              bg-[#08111f] text-emerald-300
              shadow-[0_0_25px_rgba(52,211,153,0.15)]
            "
            >
              <BriefcaseBusiness size={18} />
            </div>

            <div
              className="
              rounded-[24px]
              border border-white/10
              bg-white/[0.045]
              p-5
              shadow-[0_28px_90px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              sm:p-6
            "
            >
              <span
                className="
                inline-flex rounded-full
                bg-white/[0.07]
                px-3 py-1
                text-xs font-bold text-cyan-300
              "
              >
                {item.period}
              </span>

              <h3 className="mt-3 text-xl font-bold">{item.role}</h3>

              <strong className="mt-1 block text-emerald-300">
                {item.company}
              </strong>

              <p className="mt-3 leading-7 text-[var(--muted)]">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
