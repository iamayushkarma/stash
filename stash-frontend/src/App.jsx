import {
  MainLayout,
  Home,
  Login,
  Register,
  PageNotFound,
  Dashboard,
  Snippets,
  Image,
  Categories,
  Help,
  DashboardHome,
} from "./index.js";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Docs from "./pages/Docs.jsx";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

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
              <Route path="/docs" element={<Docs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Route>
            <Route path="/user/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="snippets" element={<Snippets />} />
              <Route path="images" element={<Image />} />
              <Route path="categories" element={<Categories />} />
              <Route path="help" element={<Help />} />
            </Route>
            {/* Handle unknown routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
