import React from "react";
import { motion } from "framer-motion";
import { getStoredImageUrl } from "../api/client";

const initials = (name = "") =>
  name
    .split(/\s|\+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const Skill = ({ skills = [] }) => {

  const getSkillIcon = (skill) => {
    if (!skill) return "";

    const iconUrl = getStoredImageUrl({
      fileId: skill.iconFileId,
      legacyUrl: skill.icon,
      fallback: "",
    });

    if (!iconUrl) return "";
    return iconUrl;
  };

  return (
    <section
      id="skills"
      className="relative mx-auto w-[calc(100%-40px)] max-w-[1200px] py-24"
    >
      <div className="mb-10 max-w-[860px]">
        <span className="mb-3.5 inline-flex rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
          Skills
        </span>

        <h2 className="font-[Poppins,Inter,sans-serif] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight">
          Tools I use to build fast, polished products.
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(142px,1fr))] gap-4">
        {skills.map((skill, index) => (
          <motion.article
            key={`${skill.name}-${index}`}
            className="
              group relative grid min-h-[168px] place-items-center
              overflow-hidden rounded-[24px]
              border border-white/10
              bg-white/[0.045]
              px-3 py-6 text-center
              shadow-[0_28px_90px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-2 hover:scale-[1.02]
              hover:border-cyan-400/20
            "
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div
              className="
              relative grid h-[72px] w-[72px] place-items-center
              rounded-[24px] border border-white/15
              bg-white/[0.07] text-[#9be8ff]
              font-black
            "
            >
              {getSkillIcon(skill) ? (
                <img
                  src={getSkillIcon(skill)}
                  alt={skill.name}
                  loading="lazy"
                  className="h-12 w-12 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement.dataset.fallback =
                      initials(skill.name);
                  }}
                />
              ) : (
                initials(skill.name)
              )}
            </div>

            <h3 className="mt-3.5 text-base font-semibold">{skill.name}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Skill;
