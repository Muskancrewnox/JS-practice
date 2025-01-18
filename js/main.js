// js/main.js

import { getUserIds, addUserId, loadUserIdsFromStorage } from "./store.js";
import { fetchGitHubUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    // Load user IDs from localStorage on page load
    const storedUserIds = loadUserIdsFromStorage();
    updateAllComponents(storedUserIds);

    // Attach event listener to "Get Info" button
    document.getElementById("info").addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const resultDiv = document.getElementById("result");

        resultDiv.innerHTML = "";
        if (!username) {
            resultDiv.innerHTML = `<p class="error">Please enter a GitHub username.</p>`;
            return;
        }

        const userInfo = await fetchGitHubUser(username);

        if (userInfo) {
            const userId = userInfo.id;
            addUserId(username, userId); // Add to global and local storage
            updateAllComponents(getUserIds());
            displayUserInfo(userInfo);
        } else {
            resultDiv.innerHTML = `<p class="error">User not found</p>`;
        }

        document.getElementById("username").value = "";
    });

    // Attach event listener to "Clear Local Storage" button
    document.getElementById("clear-storage").addEventListener("click", () => {
        localStorage.removeItem("userIds");
        updateAllComponents([]);
    });

    // Update storage displays
    updateStorageDisplay();
});

// Function to update all components with the new user IDs
const updateAllComponents = (userEntries) => {
    const userList = userEntries
        .map(entry => `<li>${entry.username} - ID: ${entry.userId}</li>`)
        .join("");

    document.getElementById("navbar-user").innerHTML = `<ul>${userList || "No users found"}</ul>`;
    document.getElementById("profile-user").innerHTML = `<ul>${userList || "No users found"}</ul>`;
    document.getElementById("billing-user").innerHTML = `<ul>${userList || "No users found"}</ul>`;

    updateStorageDisplay();
};

// Function to display user information in the result div
const displayUserInfo = (userInfo) => {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${userInfo.name || "N/A"}</p>
        <p><strong>Bio:</strong> ${userInfo.bio || "N/A"}</p>
        <p><strong>Public Repos:</strong> ${userInfo.public_repos}</p>
        <p><strong>Followers:</strong> ${userInfo.followers}</p>
        <p><strong>Following:</strong> ${userInfo.following}</p>
        <p><strong>Profile:</strong> <a href="${userInfo.html_url}" target="_blank">View on GitHub</a></p>
    `;
};

// Function to update storage displays
const updateStorageDisplay = () => {
    const globalStorageValue = JSON.stringify(getUserIds(), null, 2);
    const localStorageValue = localStorage.getItem("userIds") || "[]";

    document.getElementById("global-storage").textContent = globalStorageValue;
    document.getElementById("local-storage").textContent = localStorageValue;
};
