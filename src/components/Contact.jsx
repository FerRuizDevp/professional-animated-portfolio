import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState({ message: "", type: "" });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l79ik9n",
        "template_tfauydn",
        form.current,
        "Fl1b2xE9t4FSbpceN"
      )
      .then(
        () => {
          setStatus({
            message: "Message sent successfully! 💫",
            type: "success",
          });
          console.log("Message sent!");
          form.current.reset();
        },
        (error) => {
          setStatus({ message: "Something went wrong 💔", type: "error" });
          console.error(error);
        }
      );
  };
  return (
    <div className="contact-section" id="contact">
      <h1 className="section-title autoDisplay">Let's Talk! 💫</h1>
      <span className="autoDisplay">
        Let's work together! I'm excited to collaborate on new projects.
      </span>

      <div className="two-columns autoBlur">
        {/*Socials Section*/}
        <div className="socials-section">
          <div className="social-info-box">
            <ul>
              <li>
                <a
                  href="https://t.me/ferIsCoding"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-telegram"></i>Telegram
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-whatsapp"></i>Whatsapp
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/19087879359"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-instagram"></i>Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:fernanda.ruiz.contact@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-gmail"></i>Gmail
                </a>
              </li>
            </ul>
          </div>
          <div className="social-media-icons">
            <a
              href="https://www.youtube.com/@ferIsCoding"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-youtube"></i>
            </a>
            <a
              href="https://dev.to/ferruizdevp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-dev-to"></i>
            </a>
            <a
              href="https://github.com/FerRuizDevp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/fernanda-ruiz-ab4270329/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-linkedin-square"></i>
            </a>
          </div>
        </div>

        {/*Form section*/}
        <form ref={form} onSubmit={sendEmail} className="contact-box">
          <p>Full Name</p>
          <input
            type="text"
            name="user_name"
            placeholder="Your Full Name"
            required
          />
          <p>Email Address</p>
          <input type="email" name="user_email" placeholder="Email" required />
          <p>Your Message</p>
          <textarea
            name="message"
            placeholder="Share your thoughts..."
            required
          />
          <button type="submit">
            <i className="bx bx-mail-send"></i>Send Message
          </button>
          {status && (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
