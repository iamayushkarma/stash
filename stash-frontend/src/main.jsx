import App from "./App.jsx";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import { store } from "./redux/store/stash.store.js";
import { UserSnippetContextProvider } from "./context/UserSnippetsContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <UserSnippetContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserSnippetContextProvider>
  </UserProvider>
);
