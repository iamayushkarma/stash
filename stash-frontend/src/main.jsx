import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import { UserSnippetContextProvider } from "./context/UserSnippetsContext.jsx";
import { UserTextSnippetContextProvider } from "./context/UserTextSnippetsContent.jsx";
import { UserImageSnippetContextProvider } from "./context/UserImageSnippetsContent.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <UserSnippetContextProvider>
      <UserTextSnippetContextProvider>
        <UserImageSnippetContextProvider>
          <App />
        </UserImageSnippetContextProvider>
      </UserTextSnippetContextProvider>
    </UserSnippetContextProvider>
  </UserProvider>
);
