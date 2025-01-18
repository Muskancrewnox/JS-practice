// js/store.js

let globalUserIds = []; // Array to store all user IDs

// Get the list of all stored user IDs
export function getUserIds() {
    return globalUserIds;
}

// Add a user ID to the global array and localStorage
export function addUserId(username, userId) {
    const userEntry = { username, userId };
    globalUserIds.push(userEntry);

    // Save to localStorage
    localStorage.setItem("userIds", JSON.stringify(globalUserIds));
}

// Load the user IDs array from localStorage on page load
export function loadUserIdsFromStorage() {
    const storedUserIds = JSON.parse(localStorage.getItem("userIds")) || [];
    globalUserIds = storedUserIds;
    return globalUserIds;
}
