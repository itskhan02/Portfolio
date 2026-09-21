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

    setStatus("");
    setStatusType("");
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

    <motion.div
      className="
    grid items-stretch gap-7
    lg:grid-cols-[0.82fr_1.18fr]
  "
    >
      {/* Contact Image */}
      <motion.div
        className="
      group relative
      h-full min-h-[360px]
      overflow-hidden rounded-[24px]
      border border-white/10
      bg-white/[0.045]
      shadow-[0_28px_90px_rgba(0,0,0,0.3)]
      backdrop-blur-xl
    "
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <img
          src="/contact.png"
          alt="Contact"
          loading="lazy"
          className="
        absolute inset-0
        h-full w-full
        object-cover
        object-center
        transition-transform duration-700
        group-hover:scale-[1.03]
      "
        />

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="
      flex h-full min-h-[360px] flex-col
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
        <form ref={form} onSubmit={sendEmail} className="flex h-full flex-col">
          <div className="grid gap-3.5">
            {/* Name */}
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors focus-within:border-cyan-400/40">
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
                className="
              min-w-0 flex-1
              bg-transparent
              text-white
              outline-none
              placeholder:text-[var(--muted)]
            "
              />
            </label>

            {/* Email */}
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors focus-within:border-cyan-400/40">
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
                className="
              min-w-0 flex-1
              bg-transparent
              text-white
              outline-none
              placeholder:text-[var(--muted)]
            "
              />
            </label>

            {/* Phone */}
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors focus-within:border-cyan-400/40">
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
                className="
              min-w-0 flex-1
              bg-transparent
              text-white
              outline-none
              placeholder:text-[var(--muted)]
            "
              />
            </label>

            {/* Message */}
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors focus-within:border-cyan-400/40">
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
                className="
              min-h-[150px]
              min-w-0 flex-1
              resize-y
              bg-transparent
              text-white
              outline-none
              placeholder:text-[var(--muted)]
            "
              />
            </label>
          </div>

          {/* Status */}
          {status && (
            <p
              className={`mt-4 text-sm ${
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

          {/* Submit */}
          <div className="mt-auto flex justify-start pt-5">
            <button
              className="
            inline-flex min-h-[46px]
            items-center justify-center gap-2.5
            rounded-full
            bg-gradient-to-r
            from-[var(--primary)]
            to-[#6d4bea]
            px-5
            font-extrabold
            transition-all duration-200
            hover:-translate-y-0.5
            hover:shadow-lg hover:shadow-purple-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
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
