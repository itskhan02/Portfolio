import { Download, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "../api/client";

const About = ({ settings, resume }) => {
  return (
    <section id="about" className="section about-section">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="eyebrow">About Me</span>
        <h2>Frontend craft with full-stack curiosity.</h2>
      </motion.div>
      <div className="about-grid">
        <motion.div className="about-portrait glass-panel" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src="/hero2.png" alt={settings.name} loading="lazy" />
        </motion.div>
        <motion.div className="about-content" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="about-pill">Designing thoughtful experiences with modern tools</div>
          <h3>I'm {settings.name}</h3>
          <p className="role">{settings.jobTitle}</p>
          <p>{settings.about}</p>
          <div className="info-list">
            <a href={`mailto:${settings.email}`}><Mail size={18} /> {settings.email}</a>
            <span><MapPin size={18} /> {settings.location}</span>
          </div>
          <a className="button button-primary" href={assetUrl(resume?.fileUrl)} target="_blank" rel="noreferrer" download>
            <Download size={18} /> Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About
