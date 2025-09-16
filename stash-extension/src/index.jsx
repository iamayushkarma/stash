// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// const rootId = "react-chrome-extension-root";

// if (!document.getElementById(rootId)) {
//   const rootElement = document.createElement("div");
//   rootElement.id = rootId;
//   document.body.appendChild(rootElement);
//   const root = ReactDOM.createRoot(rootElement);

//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// } else {
//   console.log(
//     `--- Stash Extension Log: Root element #${rootId} was already found. ---`
//   );
// }

// src/index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootId = "react-chrome-extension-root";

// Find or create the host element on the page
let hostElement = document.getElementById(rootId);
if (!hostElement) {
  hostElement = document.createElement("div");
  hostElement.id = rootId;
  document.body.appendChild(hostElement);
}

// 1. Create a Shadow DOM on the host element
const shadowRoot = hostElement.attachShadow({ mode: "open" });

// 2. Create a new element inside the Shadow DOM for React to render into
const appContainer = document.createElement("div");
shadowRoot.appendChild(appContainer);

// 3. Inject your CSS styles directly into the Shadow DOM
const styleEl = document.createElement("style");
// Fetch the CSS file's content and apply it
fetch(chrome.runtime.getURL("content.css"))
  .then((response) => response.text())
  .then((css) => {
    styleEl.textContent = css;
    shadowRoot.appendChild(styleEl);
  });

// 4. Render your React App into the container inside the Shadow DOM
const root = ReactDOM.createRoot(appContainer);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
