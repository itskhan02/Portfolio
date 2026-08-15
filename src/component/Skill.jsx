import { motion } from "framer-motion";

const initials = (name = "") =>
  name
    .split(/\s|\+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const Skill = ({ skills = [] }) => {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-heading">
        <span className="eyebrow">Skills</span>
        <h2>Tools I use to build fast, polished products.</h2>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.article
            className="skill-card glass-panel"
            key={`${skill.name}-${index}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <span className="skill-icon">
              {skill.icon ? (
                <img
                  src={skill.icon}
                  alt=""
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement.dataset.fallback = initials(skill.name);
                  }}
                />
              ) : (
                initials(skill.name)
              )}
            </span>
            <h3>{skill.name}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Skill
