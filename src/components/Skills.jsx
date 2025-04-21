import React from "react";
import "./Skills.css";

function Skills() {
  return (
    <div className="skills-section" id="skills">
      <h1 className="section-title autoDisplay">My Skills 💪</h1>
      <div className="skills-box">
        <div className="skills-image-container">
          <img
            src="/media/images/digital-brain.png"
            alt="skills-image"
            className="skills-image"
          />
        </div>

        <div className="designer-and-coder">
          <div className="designer autoDisplay">
            <h1 className="skills-tittle">
              <span className="gradient">
                Designer <i className="bx bx-laptop"></i>
              </span>
            </h1>
            <p>
              With nearly five years of experience as{" "}
              <span className="highlighted-text">
                a freelance graphic and web designer,
              </span>{" "}
              I bring creativity and precision to every project. My background
              in graphic design, combined with expertise in tools like{" "}
              <span className="highlighted-text">
                Photoshop, Illustrator, Figma, and Adobe XD,
              </span>{" "}
              allows me to craft visually stunning and user-friendly designs. I
              focus on aesthetics, branding, and seamless user experiences to
              create compelling digital interfaces.
            </p>
          </div>
          <div className="coder autoDisplay">
            <h1 className="skills-tittle">
              <span className="gradient">
                Coder <i className="bx bx-code-alt"></i>
              </span>
            </h1>
            <p>
              As{" "}
              <span className="highlighted-text">a React web developer,</span> I
              blend my design expertise with clean, efficient code to build
              dynamic and interactive web applications. With a strong foundation
              in{" "}
              <span className="highlighted-text">
                HTML, CSS, JavaScript, and React,
              </span>{" "}
              I develop responsive, high-performance websites that prioritize
              usability and aesthetics. Passionate about front-end development,
              I continuously refine my skills to stay ahead in the ever-evolving
              tech landscape.
            </p>
          </div>
        </div>

        {/*Slider*/}
        <div
          className="slider"
          data-reverse="true" // If this is needed for CSS
          style={{
            "--width": "100px",
            "--height": "100px",
            "--quantity": "9",
          }}
        >
          <div className="list">
            <div
              className="item"
              data-tooltip="HTML"
              style={{ "--position": "1" }}
            >
              <img src="/media/images/1.png" alt="HTML" />
            </div>
            <div
              className="item"
              data-tooltip="CSS"
              style={{ "--position": "2" }}
            >
              <img src="/media/images/2.png" alt="CSS" />
            </div>
            <div
              className="item"
              data-tooltip="JavaScript"
              style={{ "--position": "3" }}
            >
              <img src="/media/images/3.png" alt="JavaScript" />
            </div>
            <div
              className="item"
              data-tooltip="React"
              style={{ "--position": "4" }}
            >
              <img src="/media/images/4.png" alt="React" />
            </div>
            <div
              className="item"
              data-tooltip="Node.js"
              style={{ "--position": "5" }}
            >
              <img src="/media/images/5.png" alt="Node.js" />
            </div>
            <div
              className="item"
              data-tooltip="Express.js"
              style={{ "--position": "6" }}
            >
              <img src="/media/images/6.png" alt="Express.js" />
            </div>
            <div
              className="item"
              data-tooltip="GitHub"
              style={{ "--position": "7" }}
            >
              <img src="/media/images/7.png" alt="GitHub" />
            </div>
            <div
              className="item"
              data-tooltip="Figma"
              style={{ "--position": "8", width: "65px", marginLeft: "18px" }}
            >
              <img src="/media/images/8.png" alt="Figma" />
            </div>
            <div
              className="item"
              data-tooltip="Framer motion"
              style={{ "--position": "9" }}
            >
              <img src="/media/images/9.png" alt="Framer motion" />
            </div>
            {/*<span className="tooltip">{tag}</span>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
