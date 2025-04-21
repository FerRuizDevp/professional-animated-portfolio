// ➡️ --- Your Imports and Configs ---⬅️
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const NodeCache = require("node-cache");
const path = require("path");

const { PORT } = require("./config"); // Import PORT from config.js
const app = express();
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

app.use(cors());
app.use(express.json());

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

console.log("GitHub Token:", GITHUB_TOKEN ? "Loaded Successfully" : "MISSING");

// ➡️ --- Your getGitHubProjects function ---⬅️
// GitHub GraphQL Query
const getGitHubProjects = async () => {
  const query = {
    query: `
      {
        viewer {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              description
              url
              homepageUrl
              pushedAt
              openGraphImageUrl
              readme: object(expression: "main:README.md") {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    `,
  };

  try {
    const response = await axios.post(GITHUB_API_URL, query, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    if (response.data.errors) {
      console.error("GitHub API returned errors:", response.data.errors);
      return [];
    }

    console.log("GitHub API Response:", JSON.stringify(response.data, null, 2));
    return response.data.data.viewer.repositories.nodes;
  } catch (error) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    return [];
  }
};

// ➡️ --- NOW ADD this function: (NEW) --- ⬅️
const checkGitHubRateLimit = async () => {
  const query = {
    query: `
      {
        rateLimit {
          limit
          cost
          remaining
          resetAt
        }
      }
    `,
  };

  try {
    const response = await axios.post(GITHUB_API_URL, query, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    return response.data.data.rateLimit;
  } catch (error) {
    console.error(
      "Error checking GitHub Rate Limit:",
      error.response?.data || error.message
    );
    return null;
  }
};

// ➡️ --- Your /api/projects route ---⬅️
// Route to Fetch Projects with Caching
app.get("/api/projects", async (req, res) => {
  /*const skipCache = req.query.refresh === "true"; // if ?refresh=true is passed*/
  const cachedData = cache.get("projects");
  if (cachedData /*&& !skipCache8*/) {
    return res.json(cachedData);
  }

  const allProjects = await getGitHubProjects();

  // 🔥 Filter only repos that have the PROJECT_METADATA comment
  const filteredProjects = allProjects.filter((repo) => {
    const readmeText = repo.readme?.text || "";
    return readmeText.includes("PROJECT_METADATA");
  });

  console.log("Fetched Filtered Projects:", filteredProjects);

  cache.set("projects", filteredProjects);
  res.json(filteredProjects);
});

// ➡️ --- NOW ADD this new route: (NEW) ---⬅️
app.get("/api/rate-limit", async (req, res) => {
  const rateLimit = await checkGitHubRateLimit();

  if (rateLimit) {
    res.json(rateLimit);
  } else {
    res.status(500).json({ error: "Failed to fetch rate limit info" });
  }
});

// ➡️ --- THIS IS FOR DEPLOYING ---⬅️
// Serve Vite static files after build
app.use(express.static(path.join(__dirname, "../dist")));
// Handle client-side routing (send index.html for any other route)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ➡️ --- Your app.listen(PORT) --- ⬅️
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Using PORT from config.js
