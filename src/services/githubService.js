export const fetchProjects = async () => {
  const cachedProjects = localStorage.getItem("projects");
  if (cachedProjects) return JSON.parse(cachedProjects);

  try {
    const response = await fetch("http://localhost:5000/api/projects");
    const data = await response.json();

    // Sort projects by latest update date (pushedAt)
    data.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));

    localStorage.setItem("projects", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const fetchRateLimit = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/rate-limit");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rate limit:", error);
    return null;
  }
};
