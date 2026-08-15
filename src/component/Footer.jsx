import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = ({ settings }) => {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-grid">
        <div>
          <h2>{settings?.name || "Portfolio"}</h2>
          <p>Thank you for visiting my personal portfolio website. Connect with me over socials.</p>
          <div className="social-row">
            {settings.socialLinks?.linkedin && <a href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>}
            {settings.socialLinks?.github && <a href={settings.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>}
            <a href={`mailto:${settings.email}`} aria-label="Mail"><Mail size={19} /></a>
            {settings.socialLinks?.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19} /></a>}
          </div>
        </div>
        <div>
          <h2>Contact Info</h2>
          <p><Phone size={17} /> {settings.phone}</p>
          <p><Mail size={17} /> {settings.email}</p>
          <p><MapPin size={17} /> {settings.location}</p>
        </div>
      </div>
      <p className="credit">&copy; 2025 Wasim Akram, All rights reserved.</p>
    </footer>
  );
};

export default Footer
