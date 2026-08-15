import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "../api/client";

const Project = ({ projects = [] }) => {
  return (
    <section id="project" className="section projects-section">
      <div className="section-heading">
        <span className="eyebrow">Projects</span>
        <h2>Selected builds and experiments.</h2>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article className="project-card glass-panel" key={project._id || project.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
            <div className="project-image">
              <img src={assetUrl(project.imageUrl) || "/hero.png"} alt={project.title} loading="lazy" />
              {project.featured && <span>Featured</span>}
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.techStack?.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <div className="project-links">
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={17} /> Code</a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={17} /> Live</a>}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Project
