import axios from "axios";
import { serverUrl } from "../pages/constents";
import { createContext, useState, useEffect } from "react";

export const UserTextSnippetContext = createContext();

export const UserTextSnippetContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [allSnippets, setAllSnippets] = useState([]);
  const [showAllSnippets, setShowAllSnippets] = useState(false);

  const [stats, setStats] = useState({
    totalStashes: 0,
    totalTexts: 0,
    uniqueCategories: 0,
  });

  // Helper function to calculate stats from snippets array
  const calculateStats = (snippetsArray) => {
    const totalStashes = snippetsArray.length;
    const totalTexts = snippetsArray.filter((s) => s.type === "text").length;
    const uniqueCategories = new Set(snippetsArray.map((s) => s.category)).size;
    return { totalStashes, totalTexts, uniqueCategories };
  };

  // We combine all setup logic into a single useEffect hook
  useEffect(() => {
    // --- 1. Initial Data Fetch ---
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Not authenticated");

        const response = await axios.get(`${serverUrl}stashes/textSnippets`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setSnippets(data);
        setAllSnippets(data);
        console.log("Text data", data);

        // Calculate stats based on the initial fetch
        setStats(calculateStats(data));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <UserTextSnippetContext.Provider
      value={{
        snippets,
        allSnippets,
        stats,
        setSnippets,
        setStats,
        calculateStats,
        loading,
        showAllSnippets,
        setShowAllSnippets,
      }}
    >
      {children}
    </UserTextSnippetContext.Provider>
  );
};
