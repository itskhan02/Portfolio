import { useRef, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send, User } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../api/client";

const Contact = ({ settings }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    fromName: "",
    fromEmail: "",
    fromPhone: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [sending, setSending] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    setStatus("Sending...");
    setStatusType("info");
    setSending(true);

    try {
      await api.post("/contact", {
        name: formData.fromName,
        email: formData.fromEmail,
        phone: formData.fromPhone,
        message: formData.message,
      });

      setStatus("Message sent. I will get back to you soon.");
      setStatusType("success");

      form.current.reset();

      setFormData({
        fromName: "",
        fromEmail: "",
        fromPhone: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      const message =
        error.response?.data?.message ||
        (error.request
          ? "Could not reach the API server. Please try again later or email me directly."
          : "Message could not be sent. Please email me directly.");

      setStatus(message);
      setStatusType("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading">
        <span className="eyebrow">Contact</span>
        <h2>Get in touch.</h2>
      </div>
      <motion.div className="contact-grid">
        <motion.div className="contact-card glass-panel" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src="/contact.png" alt="" loading="lazy" />
          <div className="contact-details">
            <a href={`mailto:${settings.email}`}><Mail size={18} /> {settings.email}</a>
            <a href={`tel:${settings.phone}`}><Phone size={18} /> {settings.phone}</a>
            <span><MapPin size={18} /> {settings.location}</span>
          </div>
        </motion.div>
        <motion.div className="form glass-panel" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <form ref={form} onSubmit={sendEmail}>
            <div className="form-input">
              <label className="input">
                <User size={18} />
                <input
                  type="text"
                  name="from_name"
                  autoComplete="name"
                  placeholder="Name "
                  minLength="2"
                  maxLength="100"
                  value={formData.fromName}
                  onChange={(event) => updateField("fromName", event.target.value)}
                  required/>
              </label>
              <label className="input">
                <Mail size={18} />
                <input
                  type="email"
                  name="from_email"
                  autoComplete="email"
                  placeholder="Email"
                  value={formData.fromEmail}
                  onChange={(event) => updateField("fromEmail", event.target.value)}
                  required/>
              </label>
              <label className="input">
                <Phone size={18} />
                <input
                  type="tel"
                  name="from_phone"
                  autoComplete="tel"
                  pattern="[0-9+\-\s()]{7,20}"
                  maxLength="30"
                  placeholder="Phone (optional)"
                  value={formData.fromPhone}
                  onChange={(event) => updateField("fromPhone", event.target.value)}
                />
              </label>
              <label className="input textarea-input">
                <MessageCircle size={18} />
                <textarea name="message" 
                placeholder="Message " 
                minLength="5"
                maxLength="3000"
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                required/>
              </label>
            </div>
            <div className="form-footer">
              <button className="button button-primary" type="submit" value="Send" disabled={sending}>
                {sending ? "Sending..." : "Submit"} <Send size={18} />
              </button>
              
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
