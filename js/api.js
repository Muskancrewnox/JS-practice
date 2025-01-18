// js/api.js

// Function to fetch GitHub user information
export const fetchGitHubUser = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error("Error fetching GitHub user:", error);
        return null;
    }
};
