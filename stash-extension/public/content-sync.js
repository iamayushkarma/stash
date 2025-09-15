// public/content-sync.js

// This script runs only on your website to read the token.

// Get the access token from the page's localStorage
const token = localStorage.getItem("accessToken");

// Check if the token was found
if (token) {
  // Send a message to the background script with the token
  chrome.runtime.sendMessage(
    { type: "SYNC_TOKEN", token: token },
    (response) => {
      if (chrome.runtime.lastError) {
        // This can happen if the background script is not ready yet.
        // We can ignore this error for this specific purpose.
      } else {
        console.log("Token sent to background for syncing.", response);
      }
    }
  );
}
