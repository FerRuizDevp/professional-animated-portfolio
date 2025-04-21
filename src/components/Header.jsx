import "./Header.css";
import React from "react";
import { useState } from "react";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const openSidebar = () => {
    setAnimating(true);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setAnimating(true);
    setSidebarOpen(false);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  return (
    <>
      {/*This is the background video*/}
      <div>
        <video
          loop
          autoPlay
          muted
          playsInline
          className="background-vid"
          src="/media/videos/galaxy.mp4"
          type="video/mp4"
        ></video>
      </div>

      {/*This is the start of the Header Section*/}
      <header>
        <div className="logo-name">
          <img src="" alt="" />
          <h1>
            <span className="bicolor-text-part gradient">ferIs</span>Coding
          </h1>
        </div>

        <ul className="navbar">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a
              href="https://dev.to/ferruizdevp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>

        <div className="icons-socials">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-instagram"></i>
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

        <div className="menu-icon" onClick={openSidebar}>
          <i className="bx bx-menu-alt-left"></i>
        </div>
      </header>

      {/* Optional Backdrop */}
      {sidebarOpen && (
        <div className="backdrop" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${
          sidebarOpen ? "open-sidebar" : animating ? "close-sidebar" : ""
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="close-icon" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div>
        <ul>
          <li>
            <a href="#about" className="wavy-sh-hover">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="wavy-lg-hover">
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" className="wavy-sh-hover">
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className="wavy-lg-hover">
              Contact
            </a>
          </li>
        </ul>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-instagram"></i>
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

      {/*This is the overlay video*/}
      <div className="overlay-video">
        <video
          loop
          autoPlay
          muted
          playsInline
          src="/media/videos/orange-mots.mp4"
          type="video/mp4"
        ></video>
      </div>
    </>
  );
}

export default Header;
