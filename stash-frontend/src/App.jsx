import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <ThemeProvider>
        <MainLayout>
          <Home />
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
