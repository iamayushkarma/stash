import {
  SquareBottomDashedScissors,
  FileImage,
  Copy,
  Check,
  SquarePen,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Folder,
} from "lucide-react";
import "../../App.css";
import "./dashboard.css";
import axios from "axios";
import { useMemo } from "react";
import hljs from "highlight.js";
import { createPortal } from "react-dom";
import { serverUrl } from "../constents";
import { useTheme } from "../../hooks/useTheme";
import "react-loading-skeleton/dist/skeleton.css";
import useDebounce from "../../hooks/useDebounce";
import Button from "../../utils/ui/Buttons/Button";
import { useEffect, useRef, useState } from "react";
import LoadingSkleton from "../../utils/ui/LoadingSkleton";
import { useUserContext } from "../../hooks/useUserContext";
import lightTheme from "highlight.js/styles/github.css?inline";
import darkTheme from "highlight.js/styles/github-dark.css?inline";
import { copyToClipboard } from "../../utils/functions/copyToClipboard";

function Categories() {
  const { user } = useUserContext();
  const { copy } = copyToClipboard();

  // State
  const [categories, setCategories] = useState({});
  const [allSnippets, setAllSnippets] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState(null);
  const [copiedMap, setCopiedMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [editingSnippetId, setEditingSnippetId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  // Fetch snippets and group by category
  useEffect(() => {
    const fetchSnippets = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        let url = `${serverUrl}stashes`;
        if (debouncedSearchTerm) {
          url += `?search=${debouncedSearchTerm}`;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const snippets = response.data;
        setAllSnippets(snippets);

        // Group snippets by category
        const grouped = snippets.reduce((acc, snippet) => {
          const category = snippet.category || "Uncategorized";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(snippet);
          return acc;
        }, {});

        setCategories(grouped);

        // Expand all categories by default
        const expanded = {};
        Object.keys(grouped).forEach((cat) => {
          expanded[cat] = true;
        });
        setExpandedCategories(expanded);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSnippets();
  }, [debouncedSearchTerm]);

  // Toggle category expansion
  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  // Greeting functions
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "hope you have a productive morning 🔆";
    if (hour >= 12 && hour < 17)
      return "keep up the great work this afternoon 🌤️";
    if (hour >= 17 && hour < 21) return "hope you had a great day ⭐";
    return "rest well tonight 🌙";
  };

  const username = String(user.username);
  const userName = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const displayGreetings = `${getGreeting()}! ${userName}, ${getGreetingMessage()}`;

  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const date = today.toLocaleDateString("en-US", options);

  // Update snippet
  const handleEditClick = (snippet) => {
    setEditingSnippetId(snippet._id);
    setEditFormData({ ...snippet });
  };

  const handleCancelEdit = () => {
    setEditingSnippetId(null);
    setEditFormData({});
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSnippet = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${serverUrl}stashes/${id}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update in allSnippets
      setAllSnippets((prev) =>
        prev.map((snippet) =>
          snippet._id === id ? response.data.data : snippet
        )
      );

      // Regroup categories
      const updatedSnippets = allSnippets.map((snippet) =>
        snippet._id === id ? response.data.data : snippet
      );

      const grouped = updatedSnippets.reduce((acc, snippet) => {
        const category = snippet.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(snippet);
        return acc;
      }, {});

      setCategories(grouped);
      handleCancelEdit();
    } catch (err) {
      console.error("Failed to update snippet:", err);
      alert("Error: Could not update the snippet.");
    }
  };

  // Delete snippet
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      await axios.delete(`${serverUrl}stashes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedSnippets = allSnippets.filter((item) => item._id !== id);
      setAllSnippets(updatedSnippets);

      // Regroup categories
      const grouped = updatedSnippets.reduce((acc, snippet) => {
        const category = snippet.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(snippet);
        return acc;
      }, {});

      setCategories(grouped);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete snippet");
    }
  };

  // Copy text
  const handleCopy = async (id, text) => {
    await copy(text);
    setCopiedMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const totalCategories = Object.keys(categories).length;
  const totalSnippets = allSnippets.length;

  return (
    <div className="w-full text-text-light-primary py-5 px-3 md:p-15 dark:text-text-dark-primary">
      {/* Greetings */}
      <div className="flex flex-col">
        <span className="text-text-light-secondary dark:text-text-dark-secondary text-[.9rem] md:text-[1rem]">
          {date}
        </span>
        <span className="font-semibold text-md sm:text-lg mt-1 md:mt-2 md:text-2xl">
          {displayGreetings}
        </span>
      </div>

      {/* Stats */}
      <div className="py-3 md:w-[75%] lg:w-[39rem] md:py-6 cursor-default">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-2">
          <UserSnippetInfoBox
            title="Total Snippets"
            icon={<SquareBottomDashedScissors className="w-3.5" />}
            count={totalSnippets}
          />
          <UserSnippetInfoBox
            title="Categories"
            icon={<Folder className="w-3.5" />}
            count={totalCategories}
          />
          <UserSnippetInfoBox
            title="Images"
            icon={<FileImage className="w-3.5" />}
            count={allSnippets.filter((s) => s.type === "image").length}
          />
        </div>
      </div>

      {/* Categories Container */}
      <div className="w-full mt-6 md:mt-4 rounded-lg px-3 box-border bg-bg-light-primary dark:bg-bg-dark-primary border-1 border-border-light dark:border-border-dark">
        {/* Header */}
        <div className="py-2 md:p-3 pb-2 border-b-1 border-border-light dark:border-border-dark">
          <div className="w-full flex justify-between items-center">
            <div className="font-semibold text-[.9rem] md:text-[1rem]">
              Categories
            </div>
            <div className="flex items-center relative">
              <input
                className="border-[0.5px] rounded-md border-border-light dark:border-border-dark px-2 py-1 md:pr-8"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-2">
                <Search className="w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Categories List */}
        {isFetching ? (
          <LoadingSkleton />
        ) : Object.keys(categories).length === 0 ? (
          <div className="p-8 text-center">
            {searchTerm
              ? `No results found for "${searchTerm}".`
              : "No categories yet. Start adding snippets!"}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {Object.entries(categories).map(([categoryName, snippets]) => (
              <div
                key={categoryName}
                className="border-[0.5px] border-border-light dark:border-border-dark rounded-lg overflow-hidden bg-bg-light-secondary/30 dark:bg-bg-dark-secondary/30"
              >
                {/* Category Header */}
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-bg-light-secondary dark:hover:bg-bg-dark-secondary transition-colors"
                  onClick={() => toggleCategory(categoryName)}
                >
                  <div className="flex items-center gap-3">
                    <Folder className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">
                      {categoryName}
                    </span>
                    <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      ({snippets.length})
                    </span>
                  </div>
                  {expandedCategories[categoryName] ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>

                {/* Category Content */}
                {expandedCategories[categoryName] && (
                  <div className="p-3 pt-0">
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                      {snippets.map((s) => {
                        const isImage =
                          s.type === "image" ||
                          s.content.match(/\.(jpeg|jpg|gif|png|webp)$/i);

                        return editingSnippetId === s._id ? (
                          <SnippetEditCard
                            key={s._id}
                            snippet={s}
                            editFormData={editFormData}
                            handleFormInputChange={handleFormInputChange}
                            handleUpdateSnippet={handleUpdateSnippet}
                            handleCancelEdit={handleCancelEdit}
                            setSnippetToDelete={setSnippetToDelete}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                          />
                        ) : (
                          <SnippetCard
                            key={s._id}
                            snippet={s}
                            isImage={isImage}
                            copiedMap={copiedMap}
                            handleCopy={handleCopy}
                            handleEditClick={handleEditClick}
                            setSnippetToDelete={setSnippetToDelete}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
        snippetId={snippetToDelete}
      />
    </div>
  );
}

export default Categories;

// Snippet Card Component
const SnippetCard = ({
  snippet,
  isImage,
  copiedMap,
  handleCopy,
  handleEditClick,
  setSnippetToDelete,
  setIsDeleteModalOpen,
}) => {
  return (
    <div className="break-inside-avoid border-[0.5px] border-border-light dark:border-border-dark p-2 rounded-md mb-4 bg-bg-light-secondary/50 dark:bg-bg-dark-secondary">
      {/* Title and controls */}
      <div className="mb-2 flex gap-0 flex-col">
        <div className="flex justify-between">
          <span className="font-medium">{snippet.title}</span>
          <div className="flex gap-2.5">
            <span onClick={() => handleEditClick(snippet)}>
              <SquarePen className="w-4 text-text-light-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary transition-all duration-100 cursor-pointer" />
            </span>
            <span
              onClick={() => {
                setSnippetToDelete(snippet._id);
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 className="w-4 text-text-light-secondary dark:text-text-dark-secondary hover:text-error dark:hover:text-error transition-all duration-100 cursor-pointer" />
            </span>
          </div>
        </div>
        <span className="font-normal text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {snippet.category}
        </span>
      </div>

      {/* Content */}
      <div className="w-fit">
        {isImage ? (
          <img
            src={snippet.content}
            alt={snippet.title || "snippet"}
            className="w-full max-w-[305px] rounded-md border-dashed border-2 border-border-light dark:border-border-dark object-cover"
          />
        ) : (
          <div className="px-1.5 font-medium min-w-20 py-[2px] rounded-sm border-dashed border-2 border-border-light dark:border-border-dark">
            <SyntaxHighlighter text={snippet.content} />
          </div>
        )}
      </div>

      {/* Copy button for text */}
      {!isImage && (
        <div
          className="px-2 w-fit pt-2 flex text-[.9rem] items-center text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary gap-1.5 cursor-pointer"
          onClick={() => handleCopy(snippet._id, snippet.content)}
        >
          {copiedMap[snippet._id] ? (
            <>
              <Check size={14} className="text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </div>
      )}

      {/* Note */}
      {snippet.note && (
        <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/30 dark:to-gray-700/30 border-l-4 border-[#0883fe] rounded-r-lg">
          <div className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-[#0883fe] mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {snippet.note}
            </p>
          </div>
        </div>
      )}

      {/* Source URL */}
      {snippet.sourceUrl && (
        <div className="px-2 overflow-hidden">
          <a
            href={snippet.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[0.85rem] inline-block mt-2 text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 break-words"
          >
            {new URL(snippet.sourceUrl).hostname +
              (new URL(snippet.sourceUrl).pathname.length > 20
                ? new URL(snippet.sourceUrl).pathname.slice(0, 20) + "..."
                : new URL(snippet.sourceUrl).pathname)}
          </a>
        </div>
      )}
    </div>
  );
};

// Snippet Edit Card Component
const SnippetEditCard = ({
  snippet,
  editFormData,
  handleFormInputChange,
  handleUpdateSnippet,
  handleCancelEdit,
  setSnippetToDelete,
  setIsDeleteModalOpen,
}) => {
  return (
    <div className="break-inside-avoid border-[0.5px] border-border-light dark:border-border-dark p-2 rounded-md mb-4 bg-bg-light-secondary/50 dark:bg-bg-dark-secondary">
      <div className="mb-2 flex gap-0 flex-col">
        <div className="flex justify-between">
          <input
            name="title"
            value={editFormData.title ?? ""}
            onChange={handleFormInputChange}
            className="w-full font-medium bg-transparent outline-none mb-1 pr-2"
          />
          <div className="flex gap-2.5">
            <span
              onClick={() => {
                setSnippetToDelete(snippet._id);
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 className="w-4 text-text-light-secondary dark:text-text-dark-secondary hover:text-error transition-all duration-100 cursor-pointer" />
            </span>
          </div>
        </div>
        <input
          name="category"
          value={editFormData.category ?? ""}
          onChange={handleFormInputChange}
          className="w-full text-sm text-gray-500 bg-transparent outline-none mb-2"
        />
      </div>

      <div>
        {snippet.type === "text" && (
          <textarea
            name="content"
            value={editFormData.content ?? ""}
            onChange={handleFormInputChange}
            rows={5}
            className="p-2 w-full max-w-[305px] max-h-[40rem] resize-none rounded-md border-dashed border-2 border-border-light dark:border-border-dark"
          />
        )}
      </div>

      {snippet.note && (
        <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/30 dark:to-gray-700/30 border-l-4 border-[#0883fe] rounded-r-lg">
          <div className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-[#0883fe] mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <textarea
              name="note"
              value={editFormData.note ?? ""}
              onChange={handleFormInputChange}
              placeholder="Add a note..."
              rows={3}
              className="w-full text-sm rounded outline-none max-h-[3rem] resize-none"
            />
          </div>
        </div>
      )}

      <input
        name="sourceUrl"
        value={editFormData.sourceUrl ?? ""}
        onChange={handleFormInputChange}
        className="w-full text-xs text-blue-600 bg-transparent outline-none mb-3 mt-2"
      />

      <div className="flex justify-end gap-3">
        <button onClick={handleCancelEdit}>
          <X size={18} className="text-gray-500 hover:text-red-500" />
        </button>
        <button onClick={() => handleUpdateSnippet(snippet._id)}>
          <Check size={18} className="text-gray-500 hover:text-green-500" />
        </button>
      </div>
    </div>
  );
};

// Stats Box Component
const UserSnippetInfoBox = ({ title, icon, count }) => {
  return (
    <div className="flex w-full flex-col justify-center px-3 py-1 border-1 bg-bg-light-secondary dark:bg-bg-dark-secondary text-text-light-secondary dark:text-text-dark-secondary border-border-light dark:border-border-dark rounded-lg">
      <div className="flex gap-2 items-center">
        <span>{icon}</span>
        <span className="text-[.9rem]">{title}</span>
      </div>
      <div className="font-semibold text-[1.2rem] text-text-light-primary dark:text-text-dark-primary">
        {count}
      </div>
    </div>
  );
};

// Delete Modal Component
const DeleteConfirmationModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleDelete,
  snippetId,
}) => {
  return createPortal(
    isDeleteModalOpen && (
      <div
        onClick={() => setIsDeleteModalOpen(false)}
        className="fixed inset-0 w-full h-svh backdrop-blur-[2px] z-50"
      >
        <div className="flex items-center justify-center h-full">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-80 box-border px-4 py-4 rounded-lg bg-bg-light-secondary dark:bg-bg-dark-secondary border-[0.5px] border-border-light dark:border-border-dark shadow-2xl"
          >
            <h1 className="mb-2 font-semibold text-text-light-primary dark:text-text-dark-primary text-[1.1rem]">
              Delete Snippet?
            </h1>
            <span className="mt-1 text-[1rem] w-full text-text-light-secondary dark:text-text-dark-secondary">
              This snippet will be permanently removed from your collection. Are
              you sure you want to proceed?
            </span>
            <div className="w-full flex items-center mt-4 gap-2">
              <span
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-1/2 text-center cursor-pointer text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary hover:dark:text-text-dark-primary"
              >
                Cancel
              </span>
              <Button
                onClick={() => handleDelete(snippetId)}
                className="w-1/2! bg-error! hover:bg-error/90!"
                text="Delete"
              />
            </div>
          </div>
        </div>
      </div>
    ),
    document.getElementById("delete-confirmation-modal-portal")
  );
};

// Syntax Highlighter Component
const SyntaxHighlighter = ({ text }) => {
  const codeRef = useRef(null);
  const { theme } = useTheme();

  const isCodeContent = useMemo(() => {
    const result = hljs.highlightAuto(text);
    return result.language !== undefined && result.relevance > 5;
  }, [text]);

  useEffect(() => {
    if (!codeRef.current || !isCodeContent) return;

    hljs.highlightElement(codeRef.current);

    const existing = document.getElementById("hljs-theme");
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = "hljs-theme";
    style.innerHTML = theme === "dark" ? darkTheme : lightTheme;
    document.head.appendChild(style);
  }, [text, theme, isCodeContent]);

  if (!isCodeContent) {
    return (
      <span
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 400,
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <pre
      ref={codeRef}
      className={`hljs ${theme === "dark" ? "hljs-dark" : "hljs-light"}`}
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontSize: "0.875rem",
        lineHeight: "1.4",
        padding: "8px",
        borderRadius: "6px",
        overflow: "auto",
        background: "transparent",
        fontFamily: "'Fira Code', 'Monaco', 'Cascadia Code', monospace",
        margin: 0,
      }}
    >
      <code>{text}</code>
    </pre>
  );
};
