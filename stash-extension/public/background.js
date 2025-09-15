// public/background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveToStash",
    title: "Save to Stash",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveToStash" && info.selectionText) {
    // A function to send the message, which we'll call at the right time.
    const sendMessage = () => {
      chrome.tabs.sendMessage(tab.id, {
        type: "SEND_TEXT_TO_MODAL",
        text: info.selectionText,
      });
    };

    // 1. Check if the UI's root element already exists.
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => !!document.getElementById("react-chrome-extension-root"),
      },
      (injectionResults) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Script injection failed:",
            chrome.runtime.lastError.message
          );
          return;
        }

        if (injectionResults && injectionResults[0]) {
          const isUiInjected = injectionResults[0].result;

          if (!isUiInjected) {
            // 2a. If the UI is not there, inject the scripts...
            console.log("Injecting UI scripts.");
            chrome.scripting.insertCSS({
              target: { tabId: tab.id },
              files: ["content.css"],
            });
            // ...and send the message ONLY AFTER the script is confirmed to be injected.
            chrome.scripting.executeScript(
              {
                target: { tabId: tab.id },
                files: ["content.js"],
              },
              sendMessage // <-- Call sendMessage in the callback
            );
          } else {
            // 2b. If the UI is already there, just send the message immediately.
            sendMessage();
          }
        }
      }
    );
  }
});
