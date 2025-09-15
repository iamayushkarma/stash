// src/App.jsx
import "./index.css";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { serverUrl } from "./constants";

function App() {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [inputValue, setInputValue] = useState("");

  // ADDON: New state to track if we're saving 'text' or an 'image'
  const [stashType, setStashType] = useState("text");

  // CHANGED: Renamed `selectedText` to `contentData` to be more generic
  const [contentData, setContentData] = useState("Loading...");

  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [sourceUrl, setSourceUrl] = useState("");

  const getRootElement = () => {
    return (
      document.getElementById("react-chrome-extension-root") ||
      document.getElementById("root")
    );
  };

  const getHostname = (url) => {
    try {
      return new URL(url).hostname;
    } catch (error) {
      return url;
    }
  };

  const fetchCategories = async () => {
    console.log("Debug 1: Attempting to fetch categories...");

    try {
      const { token } = await chrome.storage.local.get("token");
      if (!token) {
        console.log("Debug 2: No token found. Aborting fetch.");
        return;
      }
      console.log("Debug 2: Token found, proceeding with fetch.");

      const response = await fetch(`${serverUrl}api/stashes/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Debug 3: API response received.", response);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch categories. Status: ${response.status}`
        );
      }

      const categories = await response.json();
      console.log(
        "Debug 4: Categories successfully fetched from DB:",
        categories
      );

      setOptions(categories);
    } catch (error) {
      console.error("Debug 5: CATCH BLOCK - An error occurred.", error);
    }
  };

  useEffect(() => {
    // This focus management and dark mode logic remains the same.
    if (modalRef.current) modalRef.current.focus();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const rootElement = getRootElement();
    const updateDarkMode = (isDark) => {
      if (rootElement) {
        isDark
          ? rootElement.classList.add("dark")
          : rootElement.classList.remove("dark");
      }
    };
    updateDarkMode(mediaQuery.matches);
    const darkModeHandler = (e) => updateDarkMode(e.matches);
    mediaQuery.addEventListener("change", darkModeHandler);

    // --- THIS IS THE NEW DATA FETCHING LOGIC ---
    // This function asks the background script for the data.
    const fetchData = () => {
      if (window.chrome?.runtime) {
        // Send a message to the background asking for the stashed data
        chrome.runtime.sendMessage({ type: "GET_STASH_DATA" }, (response) => {
          // The background script will send the data back in the response
          if (chrome.runtime.lastError) {
            // Handle any errors (e.g., if the background script is not available)
            console.error(chrome.runtime.lastError);
            return;
          }
          if (response) {
            // Update the component's state with the received data
            setStashType(response.dataType);
            setContentData(response.data);
            setSourceUrl(response.sourceUrl);

            // Reset form fields
            setTitle("");
            setCategory("");
            setInputValue("");
            setNote("");
            fetchCategories();

            // Make sure the modal is visible
            if (rootElement) rootElement.style.display = "block";
          }
        });
      } else {
        // For local development, just use mock data
        setStashType("image");
        setContentData(
          "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=2574&auto-format&fit=crop"
        );
        fetchCategories();
      }
    };

    fetchData(); // Run this function once when the component first mounts

    // This new listener handles subsequent clicks when the modal is already on the page (just hidden)
    const subsequentClickListener = (message) => {
      if (message.type === "SHOW_EXISTING_MODAL") {
        fetchData(); // Re-fetch the new data and show the modal
      }
    };
    if (window.chrome?.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener(subsequentClickListener);
    }

    // The cleanup function removes all listeners when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", darkModeHandler);
      if (window.chrome?.runtime?.onMessage) {
        chrome.runtime.onMessage.removeListener(subsequentClickListener);
      }
    };
  }, []); // The empty array ensures this effect only runs once on mount
  const handleSelect = (option) => {
    setCategory(option);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setCategory(e.target.value);
    setInputValue(e.target.value);
  };

  const handleAddCategory = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !category) {
      alert("Please fill in both title and category.");
      return;
    }
    setIsSaving(true);

    // CHANGED: The data object now includes the 'type' and correct 'content'
    const dataToSave = {
      title,
      category,
      type: stashType,
      content: contentData,
      sourceUrl: sourceUrl,
    };
    if (note.trim() !== "") {
      dataToSave.note = note.trim();
    }

    try {
      const { token } = await chrome.storage.local.get("token");
      if (!token) {
        alert("Authentication error: You are not logged in.");
        setIsSaving(false);
        return;
      }

      // CHANGED: The URL now points to your single, unified endpoint
      const response = await fetch(`${serverUrl}api/stashes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save the stash.");
      }
      alert("Stash saved successfully!");
      handleClose();
    } catch (error) {
      console.error("Failed to save stash:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    const rootElement = getRootElement();
    if (rootElement && rootElement.id === "react-chrome-extension-root") {
      rootElement.style.display = "none";
    }
  };

  return (
    <div className="w-full h-svh flex items-center justify-center">
      <form
        ref={modalRef}
        tabIndex="-1"
        className="outline-none"
        onSubmit={handleSave}
      >
        <div className="flex w-74 box-shadow-box flex-col p-3 border-1 bg-bg-light-primary dark:bg-bg-dark-primary dark:text-text-dark-primary text-text-light-primary dark:border-border-dark border-border-light rounded-lg">
          <div className="flex items-center pb-4 w-full justify-between">
            <span className="font-semibold md:text-lg">Stash</span>
            <span onClick={handleClose} className="cursor-pointer">
              <X size={16} />
            </span>
          </div>
          <div className="w-full bg-bg-light-secondary/30 rounded-md dark:bg-bg-dark-secondary/50 dark:border-border-dark/50 border-1 border-border-light max-h-40 overflow-auto">
            {stashType === "text" && (
              <p className="p-2 text-sm whitespace-pre-wrap break-words">
                {contentData}
              </p>
            )}
            {stashType === "image" && (
              <img
                src={contentData}
                alt="Stash preview"
                className="w-full h-auto object-contain rounded"
              />
            )}
          </div>
          <div className="text-xs text-[0.8rem] mr-[.5rem] mt-2 dark:text-text-dark-secondary text-text-light-secondary truncate">
            from {getHostname(sourceUrl)}
          </div>
          <div className="py-2 pt-0 run build">
            <div className="relative inline-block w-full text-left">
              <input
                type="text"
                ref={inputRef}
                value={category}
                onChange={handleInputChange}
                onFocus={() => {
                  setIsOpen(true);
                  fetchCategories();
                }}
                className="w-full px-4 py-2 bg-bg-light-secondary/30 active:outline-none focus:outline-bg-dark-primary/70 dark:focus:outline-bg-dark-primary/10 dark:bg-bg-dark-secondary/50 border border-border-light dark:border-border-dark/30 rounded-md text-gray-700 dark:text-gray-200"
                placeholder="Select or type a category"
              />
              {isOpen && (
                <div className="absolute mt-2 w-full bg-bg-light-primary dark:bg-bg-dark-primary border border-border-light dark:border-border-dark rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {options
                    .filter(
                      (option) =>
                        option
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) &&
                        option !== inputValue
                    )
                    .map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="px-4 py-2 cursor-pointer border-b-1 border-border-light dark:border-border-dark hover:bg-bg-light-secondary dark:hover:bg-bg-dark-secondary"
                      >
                        {option}
                      </div>
                    ))}
                  <div
                    onClick={handleAddCategory}
                    className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-bg-light-secondary dark:hover:bg-bg-dark-secondary"
                  >
                    + Add "{inputValue}"
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="pb-2">
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
            />
          </div>
          <textarea
            rows={4}
            className="pb-8 h-20 resize-none rounded-lg px-3 py-2 border-1 bg-bg-light-secondary/30 dark:bg-bg-dark-secondary/30 dark:border-border-dark/60 border-border-light"
            placeholder="Add a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <div className="mt-6">
            <button
              className="w-full px-3 py-1.5 bg-primary text-text-dark-primary rounded-lg transition-all duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;

const Input = ({ type, name, placeholder, className, value, onChange }) => {
  return (
    <input
      className={`${className || ""} w-full rounded-lg px-3 py-2 border-1 bg-bg-light-secondary/30 dark:bg-bg-dark-secondary/30 dark:border-border-dark/60 border-border-light`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
