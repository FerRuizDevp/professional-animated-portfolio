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
          Providing <span className="gradient">The Best</span> Creative{" "}
          <span className="gradient">Experience</span>
        </h1>
        <p>
          🚀 I'm a Web Graphic Designer with extensive creative experience and a
          self-taught Web Developer passionate about crafting visually stunning
          and functional digital experiences.
        </p>
        <button>
          <i className="bx bx-send"></i>
          <a href="#contact">Contact Me</a>
        </button>
      </div>

      <div className="hero-image-container autoBlur">
        <img
          src="/media/svgs/ring-effect.svg"
          alt="Hero Image Effect"
          className="hero-image-ring-effect-1"
        />
        <img
          src="/media/images/hero-pic.png"
          alt="Hero Image"
          className="hero-image"
        />
      </div>

      <div className="scroll-down"></div>
    </div>
  );
}

export default Hero;
