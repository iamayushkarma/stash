// public/background.js

let stashedData = null;

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SYNC_TOKEN") {
    if (message.token) {
      chrome.storage.local.set({ token: message.token }, () => {
        console.log("Token has been received and stored in chrome.storage.");
        sendResponse({ status: "Token saved" });
      });
      return true;
    }
  } else if (message.type === "LOGOUT") {
    chrome.storage.local.remove("token", () => {
      console.log("Token removed. Extension is logged out.");
      sendResponse({ status: "Logout successful" });
    });
    return true;
  } else if (message.type === "GET_STASH_DATA") {
    sendResponse(stashedData);
    stashedData = null;
    return true;
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  // --- FIX: The injectUI function is now defined at the top ---
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

  // Now, the logic below can safely call injectUI()
  if (info.menuItemId === "saveText") {
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
        const formattedText = injectionResults[0].result;

        stashedData = {
          dataType: "text",
          data: formattedText,
          sourceUrl: tab.url,
        };
        injectUI(); // This call now works
      }
    );
  } else if (info.menuItemId === "saveImage") {
    stashedData = {
      dataType: "image",
      data: info.srcUrl,
      sourceUrl: tab.url,
    };
    injectUI(); // This call now works
  }
});
