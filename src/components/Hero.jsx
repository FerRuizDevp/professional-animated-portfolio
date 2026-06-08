import "./Hero.css";
import React from "react";

function Hero() {
  return (
    <div className="hero" id="hero">
      <div className="hero-info autoBlur">
        <div className="hero-info-title">
          <i className="bx bxl-react"></i>
          Front-end Developer Portfolio
        </div>
        <h1>
          Building <span className="gradient">Beautiful, </span> <br />
          <span className="gradient">Functional</span> Experiences
        </h1>
        <p>
          🚀 I'm a Frontend Developer with a Graphic Design background <br />—
          building at the intersection of design and code to create experiences
          that look great and work great.
        </p>
        <button>
          <i className="bx bx-send"></i>
          <a href="#contact">Contact Me</a>
        </button>
      </div>

      <div className="hero-image-container autoBlur">
        <img
          src="media/svgs/ring-effect.svg"
          alt="Hero Image Effect"
          className="hero-image-ring-effect-1"
        />
        <img
          src="media/images/hero-pic.png"
          alt="Hero Image"
          className="hero-image"
        />
      </div>

      <div className="scroll-down"></div>
    </div>
  );
}

export default Hero;
