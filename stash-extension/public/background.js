// // public/background.js

// chrome.runtime.onInstalled.addListener(() => {
//   // Option for saving selected text
//   chrome.contextMenus.create({
//     id: "saveText",
//     title: "Save Text to Stash",
//     contexts: ["selection"],
//   });

//   // New option for saving a right-clicked image
//   chrome.contextMenus.create({
//     id: "saveImage",
//     title: "Save Image to Stash",
//     contexts: ["image"], // This is key: only shows up when right-clicking an image
//   });
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // Check if this is the token sync message
//   if (message.type === "SYNC_TOKEN") {
//     if (message.token) {
//       // Save the received token to the extension's global storage
//       chrome.storage.local.set({ token: message.token }, () => {
//         console.log("Token has been received and stored in chrome.storage.");
//         sendResponse({ status: "Token saved" });
//       });
//       return true; // Indicates you will send a response asynchronously
//     }
//   }
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   // A helper function to inject the UI if it's not already there
//   const injectUI = (callback) => {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: tab.id },
//         func: () => !!document.getElementById("react-chrome-extension-root"),
//       },
//       (injectionResults) => {
//         if (
//           chrome.runtime.lastError ||
//           !injectionResults ||
//           !injectionResults[0]
//         ) {
//           return; // Fail silently
//         }
//         if (!injectionResults[0].result) {
//           chrome.scripting.insertCSS({
//             target: { tabId: tab.id },
//             files: ["content.css"],
//           });
//           chrome.scripting.executeScript(
//             { target: { tabId: tab.id }, files: ["content.js"] },
//             callback
//           );
//         } else {
//           callback(); // UI is already there, just run the callback
//         }
//       }
//     );
//   };

//   // If "Save Text" was clicked
//   if (info.menuItemId === "saveText" && info.selectionText) {
//     injectUI(() => {
//       chrome.tabs.sendMessage(tab.id, {
//         type: "SHOW_MODAL",
//         dataType: "text",
//         data: info.selectionText,
//       });
//     });
//   }

//   // If "Save Image" was clicked
//   if (info.menuItemId === "saveImage" && info.srcUrl) {
//     injectUI(() => {
//       chrome.tabs.sendMessage(tab.id, {
//         type: "SHOW_MODAL",
//         dataType: "image",
//         data: info.srcUrl, // The URL of the right-clicked image
//       });
//     });
//   }
// });

// public/background.js

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

  if (message.type === "GET_STASH_DATA") {
    sendResponse(stashedData); // Send the stored data back to the app
    stashedData = null; // Clear the data after sending it
    return true;
  }
});

// This onClicked listener is now updated with the new, more reliable logic.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // 1. Store the data in our temporary variable
  if (info.menuItemId === "saveText") {
    stashedData = {
      dataType: "text",
      data: info.selectionText,
      sourceUrl: tab.url,
    };
  } else if (info.menuItemId === "saveImage") {
    stashedData = { dataType: "image", data: info.srcUrl, sourceUrl: tab.url };
  } // 2. Inject the UI (if it's not already there)

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => !!document.getElementById("react-chrome-extension-root"),
    },
    (injectionResults) => {
      if (
        chrome.runtime.lastError ||
        !injectionResults ||
        !injectionResults[0]
      ) {
        return; // Fail silently if there's an issue
      }

      if (!injectionResults[0].result) {
        // If UI is not injected, inject the scripts. The React app will then ask for the data.
        chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ["content.css"],
        });
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });
      } else {
        // If UI is already there (just hidden), send a message to tell it to show itself and fetch new data.
        chrome.tabs.sendMessage(tab.id, { type: "SHOW_EXISTING_MODAL" });
      }
    }
  );
});
