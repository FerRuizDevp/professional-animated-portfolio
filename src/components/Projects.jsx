import React, { useState, useRef } from "react";
import { IGNORED_TAGS } from "../components/tags-config.js";
import "./Projects.css";

function Projects({
  filteredProjects,
  filter,
  setFilter,
  isExpanded,
  onToggleExpand,
}) {
  const videoRefs = useRef({});
  const [hoverState, setHoverState] = useState({});

  // Handle mouse enter and leave for all videos
  const handleMouseEnter = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].play();
      setHoverState((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleMouseLeave = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause();
      videoRefs.current[id].currentTime = 0;
      setHoverState((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Function to apply gradient to specific words in the title
  const applyGradient = (title) => {
    const gradientWords = [
      "TO-DO",
      "API",
      "Two-APIs",
      "Landing",
      "Page",
      "Page:",
      "Portfolio",
      "Animated",
    ];
    const words = title.split(/(\s+|\(|\)|,|\.)/).filter(Boolean);

    return words.map((word, idx, arr) => {
      if (gradientWords.includes(word)) {
        return (
          <span key={idx} className="gradient">
            {word}{" "}
          </span>
        );
      } else {
        return (
          <span key={idx}>
            {word}
            {idx !== arr.length - 1 && " "}
          </span>
        );
      }
    });
  };

  const tagIcons = {
    HTML: "bx bxl-html5 bx-tada-hover", // Boxicons class
    CSS: "bx bxl-css3 bx-tada-hover",
    JavaScript: "bx bxl-javascript bx-tada-hover",
    React: "bx bxl-react bx-tada-hover",
    API: "bx bxs-data bx-tada-hover",
    Nodejs: "bx bxl-nodejs bx-tada-hover",
    Expressjs: "devicon-express-original tada-hover",
    Nextjs: "devicon-nextjs-plain tada-hover",
    Graphql: "bx bxl-graphql bx-tada-hover",
    Framer_motion: "devicon-framermotion-original tada-hover",
    Python: "bx bxl-python bx-tada-hover",
    Django: "bx bxl-django bx-tada-hover",
    Typescript: "bx bxl-typescript bx-tada-hover",
    Tailwind: "bx bxl-tailwind-css bx-tada-hover",
    Figma: "bx bxl-figma bx-tada-hover",
  };

  // Render Filter Buttons
  const renderFilterButtons = () => {
    const categories = ["All", "Most Recent", "Best Projects", "More"];
    return (
      <div className="filter-buttons autoDisplay">
        {categories.map((category) => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="projects-container">
      <h1 className="section-title autoDisplay">My Projects 👩🏽‍💻</h1>
      {renderFilterButtons()}
      {/* Display Project Cards */}
      <div className="projects-cards">
        {/* Map over filteredProjects and display them */}
        {filteredProjects.map((project) => (
          <div
            className="project-card"
            key={
              project.githubLink ||
              project.name ||
              project.id ||
              project.html_url
            }
          >
            {/* If the project has a video, display the video preview */}
            {project.videoSrc ? (
              <div
                className="project-vidbox autoDisplay"
                onMouseEnter={() =>
                  handleMouseEnter(
                    project.githubLink || project.name || project.id
                  )
                }
                onMouseLeave={() =>
                  handleMouseLeave(
                    project.githubLink || project.name || project.id
                  )
                }
              >
                <video
                  ref={(el) =>
                    (videoRefs.current[
                      project.githubLink || project.name || project.id
                    ] = el)
                  }
                  src={project.videoSrc}
                  type="video/mp4"
                  muted
                  loop
                ></video>
                <div
                  className={`hover-sign ${
                    hoverState[project.githubLink || project.name || project.id]
                      ? "disable-animation"
                      : ""
                  }`}
                ></div>
              </div>
            ) : project.imagePreview ? (
              // Only render image if imagePreview exists and is not empty
              // If the project has an image preview, display it
              <div className="project-imgbox autoDisplay">
                <img src={project.imagePreview} alt={project.title} />
              </div>
            ) : null}{" "}
            {/* Do not render placeholder if imagePreview is missing */}
            {/* Project info */}
            <div className="project-info fadeInRight">
              <div className="project-info-txt">
                <h1>{applyGradient(project.title)}</h1>
                <p>{project.description}</p>
              </div>
              {/* Project links/Buttons/tags */}
              <div className="buttons-and-tags">
                <div className="project-links">
                  <button>
                    {project.netlifyLink && (
                      <a
                        href={project.netlifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bx bx-link-external"></i> Website
                      </a>
                    )}
                  </button>
                  <button>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bx bxl-github"></i> GitHub
                      </a>
                    )}
                  </button>
                </div>
                {/* Render tags */}
                <div className="project-buttons-tags">
                  <div className="project-tags">
                    {project.tags
                      .filter((tag) => !IGNORED_TAGS.includes(tag)) // Ignore unwanted tags
                      .map((tag) => (
                        <div
                          key={`${project.githubLink || project.name}-${tag}`}
                          className="tag-container"
                        >
                          <i className={tagIcons[tag] || "bx bx-tag"}></i>
                          <span className="tooltip">{tag}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button (Appears in All Categories) */}
      <div className="load-more-container">
        <button className="load-more-btn autoDisplay" onClick={onToggleExpand}>
          {isExpanded ? "Show Less" : "Load More Projects"}
        </button>
      </div>
    </div>
  );
}

export default Projects;
