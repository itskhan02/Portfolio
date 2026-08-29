import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "../api/client";

const Project = ({ projects = [] }) => {
  return (
    <section
      id="project"
      className="relative mx-auto w-[calc(100%-40px)] max-w-[1200px] py-24"
    >
      <div className="mb-10 max-w-[860px]">
        <span className="mb-3.5 inline-flex rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
          Projects
        </span>

        <h2 className="font-[Poppins,Inter,sans-serif] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight">
          Selected builds and experiments.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project._id || project.title}
            className="
              group overflow-hidden rounded-[24px]
              border border-white/10
              bg-white/[0.045]
              shadow-[0_28px_90px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-2
              hover:border-cyan-400/20
            "
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <div className="relative aspect-video overflow-hidden bg-[#080b18]">
              <img
                src={assetUrl(project.imageUrl) || "/hero.png"}
                alt={project.title}
                loading="lazy"
                className="
      h-full
      w-full
      object-cover
      object-center
      transition-transform
      duration-500
      group-hover:scale-105
    "
              />

              {project.featured && (
                <span
                  className="
        absolute right-4 top-4
        rounded-full
        bg-gradient-to-r
        from-[var(--gold)]
        to-[#fde68a]
        px-3 py-1.5
        text-xs font-extrabold
        text-[#07111d]
      "
                >
                  Featured
                </span>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold">{project.title}</h3>

              <p className="mt-3 leading-7 text-[var(--muted)]">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-full border border-white/10
                      bg-white/[0.05]
                      px-3 py-1.5 text-xs font-semibold
                      text-cyan-200
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center gap-2
                      rounded-full border border-white/10
                      bg-white/[0.05]
                      px-4 py-2 text-sm font-bold
                      transition-all hover:border-cyan-400/30
                      hover:bg-white/[0.09]
                    "
                  >
                    <Github size={17} />
                    Code
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      bg-gradient-to-r from-[var(--primary)] to-[#6d4bea]
                      px-4 py-2 text-sm font-bold
                      transition-all hover:-translate-y-0.5
                    "
                  >
                    <ExternalLink size={17} />
                    Live
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Project;
