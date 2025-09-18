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

        // Calculate stats based on the initial fetch
        const totalStashes = data.length;
        const totalImages = data.filter((s) => s.type === "image").length;
        const totalTexts = data.filter((s) => s.type === "text").length;
        const uniqueCategories = new Set(data.map((s) => s.category)).size;
        setStats({ totalStashes, totalImages, totalTexts, uniqueCategories });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();

    // --- 2. Socket.IO Real-time Listener ---
    const socket = io(serverUrl, { transports: ["websocket"] });

    socket.on("newStash", (newStash) => {
      console.log("New stash received via socket:", newStash);

      // Update both snippets and stats when a new stash arrives
      setSnippets((prevSnippets) => [newStash, ...prevSnippets]);

      setStats((prevStats) => {
        const allSnippets = [newStash, ...snippets];
        const uniqueCategories = new Set(allSnippets.map((s) => s.category))
          .size;

        return {
          totalStashes: prevStats.totalStashes + 1,
          totalImages:
            prevStats.totalImages + (newStash.type === "image" ? 1 : 0),
          totalTexts: prevStats.totalTexts + (newStash.type === "text" ? 1 : 0),
          uniqueCategories: uniqueCategories,
        };
      });
    });

    // --- 3. Cleanup ---
    return () => socket.disconnect();
  }, [snippets]);

  return (
    <UserSnippetContext.Provider value={{ snippets, stats }}>
      {children}
    </UserSnippetContext.Provider>
  );
};
