// src/index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

console.log(
  "--- Stash Extension Log #1: Content script (index.jsx) is running. ---"
);

const rootId = "react-chrome-extension-root";

if (!document.getElementById(rootId)) {
  console.log(
    `--- Stash Extension Log #2: Root element #${rootId} not found. Creating it. ---`
  );

  const rootElement = document.createElement("div");
  rootElement.id = rootId;
  document.body.appendChild(rootElement);

  console.log(
    "--- Stash Extension Log #3: Root element has been created and appended to the body. ---",
    rootElement
  );

  const root = ReactDOM.createRoot(rootElement);
  console.log(
    "--- Stash Extension Log #4: React root created. Preparing to render App component. ---"
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log("--- Stash Extension Log #5: root.render() has been called. ---");
} else {
  console.log(
    `--- Stash Extension Log #2-B: Root element #${rootId} was already found. ---`
  );
}
