// src/App.jsx
import "./index.css";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

function App() {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedText, setSelectedText] = useState("Loading selected text...");
  const [note, setNote] = useState(""); // FIX #1: Added state for the optional note
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Option 1", "Option 2", "Option 3"];

  const getRootElement = () => {
    return (
      document.getElementById("react-chrome-extension-root") ||
      document.getElementById("root")
    );
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
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

    const messageListener = (message) => {
      if (message.type === "SEND_TEXT_TO_MODAL") {
        setSelectedText(message.text);
        if (rootElement) {
          rootElement.style.display = "block";
        }
      }
    };
    if (window.chrome && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(messageListener);
    } else {
      setSelectedText("This is some example text for local UI development.");
    }
    return () => {
      mediaQuery.removeEventListener("change", darkModeHandler);
      if (window.chrome && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.removeListener(messageListener);
      }
    };
  }, []);

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

    setIsSaving(true); // Set loading to true

    const dataToSave = {
      title,
      category,
      content: selectedText,
    };
    if (note.trim() !== "") {
      dataToSave.note = note;
    }

    try {
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If your API requires authentication, add your Authorization header here
          // "Authorization": "Bearer YOUR_AUTH_TOKEN",
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        // If the server responds with an error, throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // If successful:
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
        <div className="flex w-74 flex-col p-3 border-1 bg-bg-light-primary dark:bg-bg-dark-primary dark:text-text-dark-primary text-text-light-primary dark:border-border-dark border-border-light rounded-lg">
          <div className="flex items-center pb-4 w-full justify-between">
            <span className="font-semibold md:text-lg">Stash</span>
            <span onClick={handleClose} className="cursor-pointer">
              <X size={16} />
            </span>
          </div>
          <div className="w-full bg-bg-light-secondary/30 rounded-md overflow-x-auto dark:bg-bg-dark-secondary/50 dark:text-text-dark-primary text-text-light-primary dark:border-border-dark/50 border-1 border-border-light px-4 py-2">
            {/* FIX #3: Display the selectedText from state, not a hardcoded string */}
            {selectedText}
          </div>
          <div className="py-2 pt-4">
            <div className="relative inline-block w-full text-left">
              <input
                type="text"
                ref={inputRef}
                value={category}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
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
            value={note} // Connect the value to state
            onChange={(e) => setNote(e.target.value)} // Update the state on change
          ></textarea>
          <div className="mt-6">
            <button
              className="w-full px-3 py-1.5 bg-primary text-text-dark-primary rounded-lg transition-all duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}{" "}
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
