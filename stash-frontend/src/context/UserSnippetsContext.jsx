import { createContext, useState, useEffect } from "react";
import { serverUrl } from "../pages/constents";
import axios from "axios";
import { io } from "socket.io-client";

export const UserSnippetContext = createContext();

export const UserSnippetContextProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);
  const [stats, setStats] = useState({
    totalStashes: 0,
    totalImages: 0,
    totalTexts: 0,
    uniqueCategories: 0,
  });

  // Helper function to calculate stats from snippets array
  const calculateStats = (snippetsArray) => {
    const totalStashes = snippetsArray.length;
    const totalImages = snippetsArray.filter((s) => s.type === "image").length;
    const totalTexts = snippetsArray.filter((s) => s.type === "text").length;
    const uniqueCategories = new Set(snippetsArray.map((s) => s.category)).size;
    return { totalStashes, totalImages, totalTexts, uniqueCategories };
  };

  // We combine all setup logic into a single useEffect hook
  useEffect(() => {
    // --- 1. Initial Data Fetch ---
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Not authenticated");

        const response = await axios.get(`${serverUrl}stashes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setSnippets(data);
        console.log(data);

        // Calculate stats based on the initial fetch
        setStats(calculateStats(data));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <UserSnippetContext.Provider
      value={{ snippets, stats, setSnippets, setStats, calculateStats }}
    >
      {children}
    </UserSnippetContext.Provider>
  );
};
