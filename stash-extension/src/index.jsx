// src/index.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootId = "react-chrome-extension-root";

if (!document.getElementById(rootId)) {
  const rootElement = document.createElement("div");
  rootElement.id = rootId;
  document.body.appendChild(rootElement);
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log(
    `--- Stash Extension Log: Root element #${rootId} was already found. ---`
  );
}
