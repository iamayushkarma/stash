// This variable will temporarily hold the data for the modal
let stashedData = null;

// This onInstalled listener is correct and remains the same.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save Text to Stash",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "saveImage",
    title: "Save Image to Stash",
    contexts: ["image"],
  });
});

// This is now a single, combined listener for all messages.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Your existing logic for syncing the token from your website
  if (message.type === "SYNC_TOKEN") {
    if (message.token) {
      chrome.storage.local.set({ token: message.token }, () => {
        console.log("Token has been received and stored in chrome.storage.");
        sendResponse({ status: "Token saved" });
      });
      return true; // Keep the message channel open for the async response
    }
  } // The new logic for when the React app asks for the stash data
  else if (message.type === "LOGOUT") {
    chrome.storage.local.remove("token", () => {
      console.log("Token removed. Extension is logged out.");
      sendResponse({ status: "Logout successful" });
    });
    return true;
  } else if (message.type === "GET_STASH_DATA") {
    sendResponse(stashedData); // Send the stored data back to the app
    stashedData = null; // Clear the data after sending it
    return true;
  }
});

// This onClicked listener is now updated with the new, more reliable logic.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // We only need to do this for the 'saveText' action
  if (info.menuItemId === "saveText") {
    // 1. Execute our new script to get the text with proper formatting
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["getSelection.js"],
      },
      (injectionResults) => {
        if (
          chrome.runtime.lastError ||
          !injectionResults ||
          !injectionResults[0]
        ) {
          console.error("Could not get selection.");
          return;
        }

        // The result of the script is the formatted text
        const formattedText = injectionResults[0].result;

        // 2. Store the data and inject the UI as before
        stashedData = {
          dataType: "text",
          data: formattedText,
          sourceUrl: tab.url,
        };
        injectUI(); // Call your existing UI injection logic
      }
    );
  }
  // The image saving logic remains the same
  else if (info.menuItemId === "saveImage") {
    stashedData = {
      dataType: "image",
      data: info.srcUrl,
      sourceUrl: tab.url,
    };
    injectUI();
  }

  // A helper function to inject the UI if it's not already there
  const injectUI = () => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => !!document.getElementById("react-chrome-extension-root"),
      },
      (results) => {
        if (chrome.runtime.lastError || !results || !results[0]) return;
        if (!results[0].result) {
          chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["content.css"],
          });
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
          });
        } else {
          chrome.tabs.sendMessage(tab.id, { type: "SHOW_EXISTING_MODAL" });
        }
      }
    );
  };
});
