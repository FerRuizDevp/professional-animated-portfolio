import "./About.css";
import React from "react";

function About() {
  return (
    <div className="about-section" id="about">
      <h1 className="section-title autoDisplay">About Me 👩🏽</h1>
      <div className="about-cards">
        <div className="card">
          <h1>
            Great <span className="gradient">Connectivity</span> &{" "}
            <span className="gradient">Flexibility</span>
          </h1>
          <p>
            I'm based in <span className="highlighted-text">North America</span>{" "}
            and open to work remote{" "}
            <span className="highlighted-text">Worldwide</span>.
          </p>
          <video
            loop
            autoPlay
            muted
            playsInline
            src="media/videos/glob.mp4"
            type="video.mp4"
          ></video>
        </div>
        <div className="card">
          <p>
            Hey there! <span className="highlighted-text">I'm Fer,</span> a
            Frontend Developer with a Graphic Design background — building at
            the intersection of design and code to create experiences that look
            great and work great.
          </p>
          <img src="media/images/card-profile-pic.png" alt="card image" />
        </div>
        <div className="card">
          <h1>
            Get my <br></br> <span className="gradient">Resume</span> here
          </h1>

          <button className="resume-btn">
            <a
              href="/Fernanda-Ruiz-Resume-2026.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
            >
              <i className="bx bx-cloud-download"></i>
              <span>Download</span>
            </a>
          </button>
        </div>
        <div className="card">
          <h1>My Coding Skills and Technologies</h1>
          <p>
            HTML, CSS, JavaScript, React, Node.js, Python, REST APIs, and more
            crafting dynamic, efficient, and scalable solutions.
          </p>
          <img src="media/images/grid4.png" alt="card image" />
        </div>
        <div className="card">
          <h1>My Creative Background</h1>
          <p>
            As a <span className="highlighted-text">Graphic Designer,</span>
            <br /> I bring 5 years of expertise in Photoshop, Illustrator, and
            Figma — with a strong foundation in design principles that shapes
            how I write code.
          </p>
          <img src="media/images/grid5.png" alt="card image" />
        </div>
      </div>
    </div>
  );
}

export default About;
