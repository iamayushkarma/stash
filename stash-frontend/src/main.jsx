import App from "./App.jsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import { store } from "./redux/store/stash.store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </StrictMode>
);
