import {
  MainLayout,
  Home,
  Login,
  Register,
  PageNotFound,
  Dashboard,
} from "./index.js";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/user/dashboard" element={<Dashboard />} />
            {/* Handle unknown routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
