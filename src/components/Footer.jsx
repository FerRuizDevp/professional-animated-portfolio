import React from "react";
import { useState, useEffect } from "react";
import "./Footer.css";

function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <div className="wrapper">
        {/* Botón Back to Top */}
        {showButton && (
          <button className="back-to-top" onClick={scrollToTop}>
            <i className="bx bx-up-arrow-alt"></i>
          </button>
        )}
        <p className="message">
          Made with <b>Love</b> ❤️ and{" "}
          <i>
            <b>
              <span className="gradient wavy">Cosmic Dust </span>✨{" "}
            </b>
          </i>
          by <b>@ferIsCoding</b>
        </p>
        <p className="copyright">Copyright © 2025 ~ Fernanda Ruiz</p>
      </div>
    </footer>
  );
}

export default Footer;
