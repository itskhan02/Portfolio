import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MessageCircle, Phone, User } from "lucide-react";


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ipym5tl", "template_ub0n3q8", form.current, {
        publicKey: "nv6Pn9VSIM8EjrTMU",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <section id="contact">
      <div >
        <h1>
          <i className="fas fa-headset"></i> Get In<span> Touch</span>
        </h1>
      </div>
      <div className="contact">
        <div className="feed">
          <img src={"src/images/contact.png"}></img>
        </div>
        <div className="form">
          <form ref={form} onSubmit={sendEmail}>
            <div className="form-input">
              <div className="input relative">
              <User className="text-neutral-500 absolute top-3 pl-2 left-1"
              />
                <input
                  type="text"
                  name="from_name"
                  placeholder="Name"
                  className="pl-5   border-neutral-100 outline-none"
                  required/>
              </div>
              <div className="input relative">
                <Mail className="text-neutral-500 absolute top-3 pl-2 left-1"
              />
                <input
                  type="email"
                  name="from_email"
                  placeholder="Email"
                  className="pl-5   border-neutral-100 outline-none"
                  required/>
              </div>
              <div className="input relative">
                <Phone className="text-neutral-500 absolute top-2 pl-1 left-1"
              />
                <input
                  type="tel"
                  name="from_phone"
                  pattern="[0-9]{10}"
                  placeholder="Phone"
                  className="pl-5   border-neutral-100 outline-none"
                  required/>
              </div>
              <div className="input relative">
                <MessageCircle className="text-neutral-500 absolute top-2 pl-1 left-1"
              />
                <textarea name="message" 
                placeholder="Message" 
                className="pl-5   border-neutral-100 outline-none"
                required/>
              </div>
            </div>
            <div className="btn">
              <button type="submit" value="Send">
                {" "}
                Submit
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;
