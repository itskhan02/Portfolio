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
  <section
    id="contact"
    className="relative mx-auto w-[calc(100%-40px)] max-w-[1200px] py-24"
  >
    <div className="mb-10 max-w-[860px]">
      <span className="mb-3.5 inline-flex rounded-full border border-cyan-400/35 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-extrabold uppercase text-[#8ff7e2]">
        Contact
      </span>

      <h2 className="font-[Poppins,Inter,sans-serif] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight">
        Get in touch.
      </h2>
    </div>

    <motion.div className="grid items-center gap-7 lg:grid-cols-[0.82fr_1.18fr]">
      <motion.div
        className="
          overflow-hidden rounded-[24px]
          border border-white/10
          bg-white/[0.045]
          p-5
          shadow-[0_28px_90px_rgba(0,0,0,0.3)]
          backdrop-blur-xl
        "
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <img
          src="/contact.png"
          alt=""
          loading="lazy"
          className="w-full rounded-[20px] object-cover"
        />

        <div className="mt-6 grid gap-4">
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-2.5 text-[var(--muted)] transition-colors hover:text-white"
          >
            <Mail size={18} />
            <span className="break-all">{settings.email}</span>
          </a>

          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-2.5 text-[var(--muted)] transition-colors hover:text-white"
          >
            <Phone size={18} />
            {settings.phone}
          </a>

          <span className="flex items-center gap-2.5 text-[var(--muted)]">
            <MapPin size={18} />
            {settings.location}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="
          rounded-[24px]
          border border-white/10
          bg-white/[0.045]
          p-5 sm:p-6
          shadow-[0_28px_90px_rgba(0,0,0,0.3)]
          backdrop-blur-xl
        "
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <form ref={form} onSubmit={sendEmail} className="grid gap-5">
          <div className="grid gap-3.5">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 focus-within:border-cyan-400/40">
              <User size={18} className="shrink-0 text-cyan-300" />
              <input
                type="text"
                name="from_name"
                autoComplete="name"
                placeholder="Name"
                minLength="2"
                maxLength="100"
                value={formData.fromName}
                onChange={(event) =>
                  updateField("fromName", event.target.value)
                }
                required
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-[var(--muted)]"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 focus-within:border-cyan-400/40">
              <Mail size={18} className="shrink-0 text-cyan-300" />
              <input
                type="email"
                name="from_email"
                autoComplete="email"
                placeholder="Email"
                value={formData.fromEmail}
                onChange={(event) =>
                  updateField("fromEmail", event.target.value)
                }
                required
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-[var(--muted)]"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 focus-within:border-cyan-400/40">
              <Phone size={18} className="shrink-0 text-cyan-300" />
              <input
                type="tel"
                name="from_phone"
                autoComplete="tel"
                pattern="[0-9+\-\s()]{7,20}"
                maxLength="30"
                placeholder="Phone (optional)"
                value={formData.fromPhone}
                onChange={(event) =>
                  updateField("fromPhone", event.target.value)
                }
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-[var(--muted)]"
              />
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 focus-within:border-cyan-400/40">
              <MessageCircle
                size={18}
                className="mt-1 shrink-0 text-cyan-300"
              />
              <textarea
                name="message"
                placeholder="Message"
                minLength="5"
                maxLength="3000"
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
                className="min-h-[150px] min-w-0 flex-1 resize-y bg-transparent text-white outline-none placeholder:text-[var(--muted)]"
              />
            </label>
          </div>

          {status && (
            <p
              className={`text-sm ${
                statusType === "error"
                  ? "text-rose-400"
                  : statusType === "success"
                    ? "text-emerald-400"
                    : "text-cyan-300"
              }`}
              role="status"
            >
              {status}
            </p>
          )}

          <div className="flex justify-start">
            <button
              className="
                inline-flex min-h-[46px] items-center justify-center gap-2.5
                rounded-full
                bg-gradient-to-r from-[var(--primary)] to-[#6d4bea]
                px-5 font-extrabold
                transition-all duration-200
                hover:-translate-y-0.5
                disabled:cursor-not-allowed disabled:opacity-60
              "
              type="submit"
              disabled={sending}
            >
              {sending ? "Sending..." : "Submit"}
              <Send size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  </section>
);
};

export default Contact;
