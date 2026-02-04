import axios from "axios";
import { serverUrl } from "../pages/constents";
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const UserImageSnippetContext = createContext();

export const UserImageSnippetContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [allSnippets, setAllSnippets] = useState([]);
  const [showAllSnippets, setShowAllSnippets] = useState(false);

  const [stats, setStats] = useState({
    totalStashes: 0,
    totalImages: 0,
    uniqueCategories: 0,
  });

  // Helper function to calculate stats from snippets array
  const calculateStats = (snippetsArray) => {
    const totalStashes = snippetsArray.length;
    const totalTexts = snippetsArray.filter((s) => s.type === "text").length;
    const uniqueCategories = new Set(snippetsArray.map((s) => s.category)).size;
    return { totalStashes, totalTexts, uniqueCategories };
  };

  // Wait for auth state before fetching user-specific data
  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const token = user?.accessToken || localStorage.getItem("accessToken");
        if (!token) throw new Error("Not authenticated");

        const response = await axios.get(`${serverUrl}stashes/imageSnippets`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setSnippets(data);
        setAllSnippets(data);

        setStats(calculateStats(data));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [user, isLoading]);

  return (
    <UserImageSnippetContext.Provider
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
    </UserImageSnippetContext.Provider>
  );
};
