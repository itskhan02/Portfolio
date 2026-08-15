import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const Education = ({ items = [] }) => {
  return (
    <section id="education" className="section education-section">
      <div className="section-heading">
        <span className="eyebrow">Education</span>
        <h2>Education and qualification.</h2>
        <p>The purpose of education is to replace an empty mind with an open one.</p>
      </div>
      <div className="education-grid">
        {items.map((item, index) => (
          <motion.article className="education-card glass-panel" key={`${item.title}-${index}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img src={item.image} alt="" loading="lazy" />
            <div className="education-content">
              <GraduationCap size={24} />
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
              <span>{item.period}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Education;
