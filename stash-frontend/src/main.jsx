import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import { UserSnippetContextProvider } from "./context/UserSnippetsContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <UserSnippetContextProvider>
      <App />
    </UserSnippetContextProvider>
  </UserProvider>
);
