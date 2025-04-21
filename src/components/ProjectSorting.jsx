import React, { useEffect, useState } from "react";
import Projects from "./Projects";
import { IGNORED_TAGS } from "../components/tags-config"; // ✅ Import ignored tags

// Fetch projects from GitHub API
function ProjectSorting() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false); // Tracks expanded/collapsed state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const reposResponse = await fetch("http://localhost:5000/api/projects");
        const reposData = await reposResponse.json();

        const projectData = reposData.map((repo) => {
          // Check if README exists
          const readmeContent = repo.readme?.text || ""; // Use plain text from API

          // Extract metadata from README
          const match = readmeContent.match(
            /<!-- PROJECT_METADATA([\s\S]*?)-->/
          );
          if (!match) return null;

          try {
            const metadata = JSON.parse(match[1]);
            const tags = metadata.tags || [];

            // Check if project has ignored tags
            const hasIgnoredTags = tags.some((tag) =>
              IGNORED_TAGS.includes(tag)
            );
            return {
              id: repo.id,
              title: metadata.title,
              description: metadata.description,
              videoSrc: metadata.video || null, // Null if it's not a video project
              imagePreview: metadata.imagePreview || null, // Image preview for different projects
              githubLink: metadata.githubLink || null,
              netlifyLink: metadata.netlifyLink || null,
              createdAt: new Date(repo.created_at),
              isBest: readmeContent.includes('"best-one"'),
              isMore:
                readmeContent.includes('"more-project"') ||
                readmeContent.includes('"all-projects"') ||
                metadata.tags?.some((tag) => IGNORED_TAGS.includes(tag)),
              // Flag to separate "More" projects
              tags: tags.filter((tag) => !IGNORED_TAGS.includes(tag)), // Extract tags from README
            };
          } catch (error) {
            console.error(`Error parsing metadata for ${repo.name}:`, error);
            return null;
          }
        });

        setProjects(projectData.filter((p) => p !== null));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Apply filtering based on selected category
  useEffect(() => {
    let displayedProjects = [];

    switch (filter) {
      case "Most Recent":
        displayedProjects = [...projects].sort(
          (a, b) => b.createdAt - a.createdAt
        );
        break;
      case "Best Projects":
        displayedProjects = projects.filter((project) => project.isBest);
        break;
      case "More":
        displayedProjects = projects.filter((project) => project.isMore);
        break;
      default:
        displayedProjects = projects;
    }

    // Always sort by date after filtering
    displayedProjects.sort((a, b) => b.createdAt - a.createdAt);

    // Show 3 by default
    setFilteredProjects(
      isExpanded ? displayedProjects : displayedProjects.slice(0, 3)
    );
    /*console.log("Filtered Projects:", displayedProjects);*/
  }, [filter, projects, isExpanded]);

  const handleFilterChange = (category) => {
    setFilter(category);
    setIsExpanded(false); // Reset expansion when switching filters
  };

  return (
    <div className="project-section" id="projects">
      {/* Render Projects */}
      {/* Pass filtering and toggle state to Projects */}
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
