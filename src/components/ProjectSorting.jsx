import React, { useEffect, useState } from "react";
import Projects from "./Projects";
import { IGNORED_TAGS } from "../components/tags-config";

const GITHUB_USERNAME = "FerRuizDevp";

function ProjectSorting() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();

        const projectData = await Promise.all(
          repos.map(async (repo) => {
            try {
              const readmeResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
              );

              if (!readmeResponse.ok) return null;

              const readmeData = await readmeResponse.json();

              // ✅ Strip newlines before decoding — GitHub adds \n in base64
              const readmeContent = atob(readmeData.content.replace(/\n/g, ""));

              const match = readmeContent.match(
                /<!-- PROJECT_METADATA([\s\S]*?)-->/,
              );

              if (!match) return null;

              const metadata = JSON.parse(match[1]);
              const tags = metadata.tags || [];

              return {
                id: repo.id,
                title: metadata.title,
                description: metadata.description,
                videoSrc: metadata.video || null,
                imagePreview: metadata.imagePreview || null,
                githubLink: metadata.githubLink || null,
                netlifyLink: metadata.netlifyLink || null,
                createdAt: new Date(repo.created_at),
                isBest: readmeContent.includes('"best-one"'),
                isMore:
                  readmeContent.includes('"more-project"') ||
                  readmeContent.includes('"all-projects"') ||
                  tags.some((tag) => IGNORED_TAGS.includes(tag)),
                tags: tags.filter((tag) => !IGNORED_TAGS.includes(tag)),
              };
            } catch (err) {
              console.error(`❌ Error processing repo "${repo.name}":`, err);
              return null;
            }
          }),
        );

        const validProjects = projectData.filter((p) => p !== null);
        console.log(`📦 ${validProjects.length} valid projects loaded`);
        setProjects(validProjects);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err.message);
        setError(
          err.message.includes("403")
            ? "GitHub API rate limit reached. Please try again in an hour."
            : "Failed to load projects. Please refresh and try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let displayedProjects = [];

    switch (filter) {
      case "Most Recent":
        displayedProjects = [...projects].sort(
          (a, b) => b.createdAt - a.createdAt,
        );
        break;
      case "Best Projects":
        displayedProjects = projects.filter((p) => p.isBest);
        break;
      case "More":
        displayedProjects = projects.filter((p) => p.isMore);
        break;
      default:
        displayedProjects = projects;
    }

    displayedProjects.sort((a, b) => b.createdAt - a.createdAt);
    setFilteredProjects(
      isExpanded ? displayedProjects : displayedProjects.slice(0, 3),
    );
  }, [filter, projects, isExpanded]);

  const handleFilterChange = (category) => {
    setFilter(category);
    setIsExpanded(false);
  };

  if (loading) {
    return (
      <div className="project-section" id="projects">
        <div className="projects-container">
          <h1 className="section-title">My Projects 👩🏽‍💻</h1>
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "2rem" }}>
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-section" id="projects">
        <div className="projects-container">
          <h1 className="section-title">My Projects 👩🏽‍💻</h1>
          <p
            style={{ textAlign: "center", color: "#f87171", marginTop: "2rem" }}
          >
            {error}
          </p>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-section" id="projects">
      <Projects
        projects={projects}
        filteredProjects={filteredProjects}
        filter={filter}
        setFilter={handleFilterChange}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded((prev) => !prev)}
      />
    </div>
  );
}

export default ProjectSorting;
