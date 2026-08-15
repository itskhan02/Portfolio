import { BriefcaseBusiness } from "lucide-react";
import { motion } from "framer-motion";

const Experience = ({ items = [] }) => {
  return (
    <section id="experience" className="section timeline-section">
      <div className="section-heading">
        <span className="eyebrow">Experience</span>
        <h2>Hands-on growth through real builds.</h2>
      </div>
      <div className="timeline">
        {items.map((item, index) => (
          <motion.article
            className="timeline-item"
            key={`${item.role}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="timeline-icon"><BriefcaseBusiness size={18} /></div>
            <div className="glass-panel timeline-card">
              <span>{item.period}</span>
              <h3>{item.role}</h3>
              <strong>{item.company}</strong>
              <p>{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Experience
