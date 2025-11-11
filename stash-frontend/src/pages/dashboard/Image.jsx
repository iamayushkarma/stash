import {
  SquareBottomDashedScissors,
  FileImage,
  LayoutDashboard,
  Copy,
  Check,
  SquarePen,
  Trash2,
  Search,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import "../../App.css";
import "./dashboard.css";
import axios from "axios";
import { useMemo } from "react";
import hljs from "highlight.js";
import { createPortal } from "react-dom";
import { serverUrl } from "../constents";
import { MdTextFields } from "react-icons/md";
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
import { useUserImageSnippetContext } from "../../hooks/useUserImageSnippetsContent";

function DashboardHome() {
  // custom hooks
  const { user } = useUserContext();
  const { copy } = copyToClipboard();
  const {
    snippets,
    allSnippets,
    stats,
    setSnippets,
    setStats,
    calculateStats,
    showAllSnippets,
    setShowAllSnippets,
  } = useUserImageSnippetContext();
  // state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState(null);
  const [copiedMap, setCopiedMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [editingSnippetId, setEditingSnippetId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  //- functional code

  // function for generating greatings
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours(); // 0 - 23

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  const getGreetingMessage = () => {
    const now = new Date();
    const hour = now.getHours(); // 0 - 23

    if (hour >= 5 && hour < 12) {
      return "hope you have a productive morning 🔆";
    } else if (hour >= 12 && hour < 17) {
      return "keep up the great work this afternoon 🌤️";
    } else if (hour >= 17 && hour < 21) {
      return "hope you had a great day ⭐";
    } else {
      return "rest well tonight 🌙";
    }
  };
  const username = String(user.username);
  const userName = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const diaplaygreetings = `${getGreeting()}! ${userName}, ${getGreetingMessage()}`;

  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const date = today.toLocaleDateString("en-US", options);

  // update snippet
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

      setSnippets((prev) =>
        prev.map((snippet) =>
          snippet._id === id ? response.data.data : snippet
        )
      );
      handleCancelEdit();
    } catch (err) {
      console.error("Failed to update snippet:", err);
      alert("Error: Could not update the snippet.");
    }
  };

  // deleting snippet
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");
      await axios.delete(`${serverUrl}stashes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedSnippets = snippets.filter((item) => item._id !== id);
      setSnippets(updatedSnippets);

      setStats(calculateStats(updatedSnippets));
      setSnippets((prev) => prev.filter((item) => item._id !== id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete snippet");
    } finally {
      setLoading(false);
    }
  };

  // copying text
  const handleCopy = async (id, text) => {
    await copy(text);
    setCopiedMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  //   debounced search
  const debouncedSearchTerm = useDebounce(searchTerm, 350); // 500ms delay
  useEffect(() => {
    const fetchSnippets = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        let url = `${serverUrl}stashes/imageSnippets`;
        if (debouncedSearchTerm) {
          url += `?search=${debouncedSearchTerm}`;
        }
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnippets(response.data);
        console.log("search result", response.data);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSnippets();
  }, [debouncedSearchTerm, setSnippets]);

  return (
    <div className="w-full text-text-light-primary py-5 px-3 md:p-15 dark:text-text-dark-primary">
      {/* greatings */}
      <div className="flex flex-col">
        <span className="text-text-light-secondary dark:text-text-dark-secondary text-[.9rem] md:text-[1rem]">
          {date}
        </span>
        <span className="font-semibold text-md sm:text-lg mt-1 md:mt-2 md:text-2xl">
          {diaplaygreetings}
        </span>
      </div>
      {/* total count of snippets */}
      <div className="py-3 md:w-[75%] lg:w-[39rem] md:py-6 cursor-default">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-2">
          <UserSnippetInfoBox
            title="Snippets"
            icon={<SquareBottomDashedScissors className="w-3.5" />}
            count={stats?.totalStashes || 0}
          />
          <UserSnippetInfoBox
            title="Categorys"
            icon={<FileImage className="w-3.5" />}
            count={stats?.uniqueCategories || 0}
          />
          <UserSnippetInfoBox
            title="Images"
            icon={<LayoutDashboard className="w-3.5" />}
            count={stats?.totalImages || 0}
          />
        </div>
      </div>
      {/* user data */}
      <div className="w-full mt-6 md:mt-4 rounded-lg px-3 box-border bg-bg-light-primary dark:bg-bg-dark-primary flex border-1 border-border-light dark:border-border-dark">
        {/* shows user all data */}
        <div className="w-full lg:w-[80%] px-1 min-sm:border-r-[0.5px] border-border-light dark:border-border-dark">
          <div className="py-2 md:p-3 pb-2 border-b-1 border-border-light dark:border-border-dark">
            <div className="w-full flex justify-between md:justify-between gap-4 items-center">
              {/* heading */}
              <div className="md:w-1/2 font-semibold text-[.9rem] md:text-[1rem]">
                Your Collection
              </div>
              <div className=" md:w-1/2 flex items-center justify-end gap-4">
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
          </div>

          {isFetching ? (
            <div className="">
              <LoadingSkleton />
            </div>
          ) : snippets.length === 0 ? (
            searchTerm ? (
              <div className="p-8 text-center ...">
                No results found for "{searchTerm}".
              </div>
            ) : (
              <div className="p-8 text-center ...">
                Looks like it’s empty here…
              </div>
            )
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-2">
              {snippets.map((s) => {
                const isImage =
                  s.type === "image" ||
                  s.content.match(/\.(jpeg|jpg|gif|png|webp)$/i);
                return editingSnippetId === s._id ? (
                  <div
                    key={s._id}
                    className="break-inside-avoid border-[0.5px] border-border-light dark:border-border-dark p-2 rounded-md mb-4 bg-bg-light-secondary/50 dark:bg-bg-dark-secondary"
                  >
                    {/* title and category */}
                    <div className=" mb-2 flex gap-0 flex-col">
                      <div className="flex justify-between">
                        {/* titel */}
                        {/* <span className="font-medium">{s.title}</span> */}
                        <input
                          name="title"
                          value={editFormData.title ?? ""}
                          onChange={handleFormInputChange}
                          className="w-full font-medium bg-transparent outline-none mb-1 pr-2"
                        />
                        {/* content controls */}
                        <div className="flex gap-2.5">
                          <span
                            className=""
                            onClick={() => {
                              setSnippetToDelete(s._id);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 text-text-light-secondary dark:text-text-dark-secondary hover:text-error dark:group-hover:text-error transition-all duration-100" />
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

                    {/* content */}
                    <div className="">
                      {s.type === "text" && (
                        <textarea
                          name="content"
                          value={editFormData.content ?? ""}
                          onChange={handleFormInputChange}
                          rows={5}
                          className="p-2 w-full max-w-[305px] max-h-[40rem] resize-none rounded-md border-dashed border-2 border-border-light dark:border-border-dark object-cover"
                        />
                      )}
                    </div>

                    {s.note && (
                      <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/30 dark:to-gray-700/30 border-l-4 border-[#0883fe] dark:border-[#0883fe] rounded-r-lg">
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
                    {/* source link */}
                    <input
                      name="sourceUrl"
                      value={editFormData.sourceUrl ?? ""}
                      onChange={handleFormInputChange}
                      className="w-full text-xs text-blue-600 bg-transparent outline-none mb-3"
                    />
                    <div className="flex justify-end gap-3">
                      <button onClick={handleCancelEdit}>
                        <X
                          size={18}
                          className="text-gray-500 hover:text-red-500"
                        />
                      </button>
                      <button onClick={() => handleUpdateSnippet(s._id)}>
                        <Check
                          size={18}
                          className="text-gray-500 hover:text-green-500"
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={s._id}
                    className="break-inside-avoid border-[0.5px] border-border-light dark:border-border-dark p-2 rounded-md mb-4 bg-bg-light-secondary/50 dark:bg-bg-dark-secondary"
                  >
                    {/* title and category */}
                    <div className=" mb-2 flex gap-0 flex-col">
                      <div className="flex justify-between">
                        {/* titel */}
                        <span className="font-medium">{s.title}</span>
                        {/* content controls */}
                        <div className="flex gap-2.5">
                          <span onClick={() => handleEditClick(s)}>
                            <SquarePen className="w-4 text-text-light-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary transition-all duration-100" />
                          </span>
                          <span
                            className=""
                            onClick={() => {
                              setSnippetToDelete(s._id);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 text-text-light-secondary dark:text-text-dark-secondary hover:text-error dark:group-hover:text-error transition-all duration-100" />
                          </span>
                        </div>
                      </div>
                      <span className="font-normal text-text-light-secondary dark:text-text-dark-secondary">
                        from category {s.category}
                      </span>
                    </div>

                    {/* content */}
                    <div className="w-fit">
                      {isImage ? (
                        <img
                          src={s.content}
                          alt={s.title || "snippet"}
                          className="w-full max-w-[305px] rounded-md border-dashed border-2 border-border-light dark:border-border-dark object-cover"
                        />
                      ) : (
                        <div className="px-1.5 font-medium min-w-20 py-[2px] rounded-sm border-dashed border-2 border-border-light dark:border-border-dark">
                          <SyntexHighliter text={s.content} />
                        </div>
                      )}
                    </div>

                    {!isImage && (
                      <div
                        className="px-2 w-fit pt-2 flex text-[.9rem] items-center text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary gap-1.5 cursor-pointer"
                        onClick={() => handleCopy(s._id, s.content)}
                      >
                        {copiedMap[s._id] ? (
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
                    {s.note && (
                      <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/30 dark:to-gray-700/30 border-l-4 border-[#0883fe] dark:border-[#0883fe] rounded-r-lg">
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
                            {s.note}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* source link */}
                    <div className="px-2 overflow-hidden">
                      {s.sourceUrl && (
                        <a
                          href={s.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[0.85rem] inline-block mt-2 text-blue-600 dark:text-blue-400 underline cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 break-words"
                        >
                          {new URL(s.sourceUrl).hostname +
                            (new URL(s.sourceUrl).pathname.length > 20
                              ? new URL(s.sourceUrl).pathname.slice(0, 20) +
                                "..."
                              : new URL(s.sourceUrl).pathname)}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* shows recent data */}
        <div className="hidden min-sm:flex flex-col box-border p-4 lg:w-[20%]">
          {/* Header with subtle accent */}
          <div className="flex items-center space-x-2 mb-3">
            <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              Recently Added
            </h3>
          </div>

          {/* Items list */}
          <div className="max-h-[15rem] overflow-y-auto space-y-1 py-1">
            {(showAllSnippets ? allSnippets : allSnippets.slice(0, 5)).map(
              (s) => (
                <div
                  key={s._id}
                  className="group flex items-start space-x-1 cursor-default"
                >
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary transition-colors leading-relaxed">
                    {s.title}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Show more/less button */}
          <div className="mt-3 pt-2 border-t border-border-light/30 dark:border-border-dark/30">
            <button
              onClick={() => setShowAllSnippets(!showAllSnippets)}
              className="group flex items-center justify-center space-x-1 w-full py-1 text-xs font-medium transition-all duration-200 text-text-light-secondary dark:text-text-dark-secondary hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="capitalize">
                {showAllSnippets ? "Show less" : "Show more"}
              </span>
              {showAllSnippets ? (
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>
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

export default DashboardHome;

// user snippet info box
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
        className="fixed inset-0 w-full h-svh backdrop-blur-[2px]"
      >
        <div className="flex items-center justify-center h-full shadow-lg">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-80 box-border px-4 py-4 rounded-lg bg-bg-light-secondary dark:bg-bg-dark-secondary border-[0.5px] border-border-light dark:border-border-dark shadow-2xs"
          >
            <h1 className="mb-2 font-semibold text-text-light-primary dark:text-text-dark-primary text-[1.1rem]">
              Delete Snippet?
            </h1>
            <span className="mt-1 text-[1rem] w-full text-text-light-secondary dark:text-text-dark-secondary leading-[0.8]">
              This snippet will be permanently removed from your collection. Are
              you sure you want to proceed?
            </span>
            <div className="w-full flex items-center mt-4">
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
              ></Button>
            </div>
          </div>
        </div>
      </div>
    ),
    document.getElementById("delete-confirmation-modal-portal")
  );
};

// code highlight
const SyntexHighliter = ({ text }) => {
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

    // Inject the current theme
    const style = document.createElement("style");
    style.id = "hljs-theme";
    style.innerHTML = theme === "dark" ? darkTheme : lightTheme;
    document.head.appendChild(style);
  }, [text, theme]);
  if (!isCodeContent) {
    return (
      <span
        className=""
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
