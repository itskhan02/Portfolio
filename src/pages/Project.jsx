import { ExternalLink, Github, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "../api/client";

const Project = ({ projects = [] }) => {
  return (
    <section
      id="project"
      className="relative mx-auto w-[calc(100%-40px)] max-w-[1200px] py-24"
    >
      <div className="mb-10 max-w-[860px]">
        <span className="mb-3.5 inline-flex w-fit items-center rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
          Projects
        </span>

        <h2 className="font-[Poppins,Inter,sans-serif] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight">
          Selected builds and experiments.
        </h2>

        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          A collection of projects built with modern technologies and full-stack
          development practices.
        </p>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 gap-5">
        {projects.map((project, index) => (
          <motion.article
            key={project._id || project.title}
            className="group relative grid grid-cols-1 items-center gap-5 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.06] sm:grid-cols-[190px_1fr] lg:grid-cols-[260px_1fr] lg:gap-7 lg:p-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
          >
            <div className="relative w-full h-3/4  flex items-center overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#080b18]">
              <div className="aspect-video w-full overflow-hidden rounded-[19px]">
                <img
                  src={assetUrl(project.imageUrl) || "/hero.png"}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-contain object-center p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-start gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-8">
                    <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl lg:text-[1.35rem]">
                      {project.title}
                    </h3>

                    {project.featured && (
                      <span className="inline-flex shrink-0 items-center rounded-full border border-yellow-400/20 bg-gradient-to-r from-[var(--gold)] to-[#fde68a] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#07111d] shadow-[0_6px_16px_rgba(250,204,21,0.12)]">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-7 text-[var(--muted)] sm:text-base">
                    {project.description}
                  </p>
                </div>
              </div>

              {project.techStack?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-cyan-200 transition-all duration-200 group-hover:border-cyan-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.07]"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[#6d4bea] px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <ExternalLink size={16} />
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
