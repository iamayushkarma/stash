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

// Apply positioning as INLINE styles on the host element.
// Inline styles have the highest specificity — no page CSS can override them.
Object.assign(hostElement.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  zIndex: "2147483647",
  margin: "0",
  padding: "0",
  border: "none",
  background: "none",
  float: "none",
  transform: "none",
  opacity: "1",
  visibility: "visible",
  boxSizing: "border-box",
  overflow: "hidden",
  colorScheme: "light dark",
});

// 1. Create a Shadow DOM on the host element
const shadowRoot = hostElement.attachShadow({ mode: "open" });

// 2. Create the app container — this fills the host and centers content
const appContainer = document.createElement("div");
appContainer.id = "stash-shadow-container";
Object.assign(appContainer.style, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  fontFamily: "'Roboto', 'Segoe UI', system-ui, -apple-system, sans-serif",
  fontSize: "16px",
  lineHeight: "1.5",
  fontWeight: "400",
  WebkitFontSmoothing: "antialiased",
  WebkitTextSizeAdjust: "100%",
  boxSizing: "border-box",
});
shadowRoot.appendChild(appContainer);

// 3. Create a zoom wrapper for the React content.
//    rem units in Shadow DOM reference the document <html> font-size.
//    If a site uses html { font-size: 62.5% } (10px), all Tailwind
//    rem-based utilities shrink. Zoom on this inner wrapper compensates
//    WITHOUT distorting the viewport overlay/centering above.
const zoomWrapper = document.createElement("div");
const htmlFontSize = parseFloat(
  getComputedStyle(document.documentElement).fontSize
);
if (htmlFontSize && Math.abs(htmlFontSize - 16) > 0.5) {
  zoomWrapper.style.zoom = String(16 / htmlFontSize);
}
appContainer.appendChild(zoomWrapper);

// 4. Inject CSS styles into the Shadow DOM
const styleEl = document.createElement("style");
fetch(chrome.runtime.getURL("content.css"))
  .then((response) => response.text())
  .then((css) => {
    styleEl.textContent = css;
    shadowRoot.appendChild(styleEl);
  });

// 5. Render React App into the zoom wrapper
const root = ReactDOM.createRoot(zoomWrapper);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
