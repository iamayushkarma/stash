import { useUserContext } from "../../hooks/useUserContext";
import {
  SquareBottomDashedScissors,
  FileImage,
  LayoutDashboard,
  Copy,
  Check,
  SquarePen,
  Trash2,
  Search,
  Settings2,
} from "lucide-react";
import { FaSort } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import { useUserSnippetContext } from "../../hooks/useUserSnippetContext";
import "../../App.css";
import "./dashboard.css";
import { copyToClipboard } from "../../utils/functions/copyToClipboard";
import { useEffect, useRef, useState } from "react";
import { serverUrl } from "../constents";
import axios from "axios";
import Input from "../../utils/ui/Input";
import "react-loading-skeleton/dist/skeleton.css";

function DashboardHome() {
  const { user } = useUserContext();
  const { copy } = copyToClipboard();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState(null);
  const [copiedMap, setCopiedMap] = useState({});

  const { snippets, stats, setSnippets, setStats, calculateStats, loading } =
    useUserSnippetContext();
  console.log("value", isDeleteModalOpen);

  const handleCopy = async (id, text) => {
    await copy(text);
    setCopiedMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

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

  // const isCode = (text) => {
  //   if (typeof text !== "string") return false;

  //   // 1. Check for multiple lines, which is common in code
  //   const hasMultipleLines = text.includes("\n");

  //   // 2. Check for common code characters
  //   const hasCodeCharacters = /[{}()[\];=><]/.test(text);

  //   // 3. Check for common keywords
  //   const hasCodeKeywords =
  //     /\b(const|let|var|function|import|export|if|else|return|div|span|class)\b/.test(
  //       text
  //     );

  //   // If text has multiple lines AND (code characters OR keywords), it's likely code.
  //   return hasMultipleLines && (hasCodeCharacters || hasCodeKeywords);
  // };
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
          <UserSnippetInfoBox
            title="Text"
            icon={<MdTextFields className="w-3.5" />}
            count={stats?.totalTexts || 0}
          />
        </div>
      </div>
      {/* user data */}
      <div className="w-full mt-6 md:mt-4 rounded-lg px-3 box-border bg-bg-light-primary dark:bg-bg-dark-primary flex border-1 border-border-light dark:border-border-dark">
        {/* shows user all data */}
        <div className="w-full lg:w-[80%] px-1 min-sm:border-r-[0.5px] border-border-light dark:border-border-dark">
          <div className="p-3 md:pb-2 pb-0 border-b-1 border-border-light dark:border-border-dark">
            <div className="w-full flex justify-between md:justify-between gap-4 items-center">
              {/* heading */}
              <div className="hidden md:block w-1/2 font-semibold">
                Your Collection
              </div>
              {/* search box for mobile */}
              <div className="flex sm:hidden relative">
                <span className="absolute right-2 z-[50000000] top-5">
                  <Search size={15} />
                </span>
                <Input
                  placeholder="Search"
                  type="text"
                  className="pr-8"
                ></Input>
              </div>
              {/* filters and search box  */}
              <div className="md:w-1/2 flex items-center justify-end gap-4">
                <div className=" hidden md:flex items-center relative">
                  <input
                    className="border-[0.5px] rounded-md border-border-light dark:border-border-dark px-2 py-1 pr-8"
                    type="text"
                    placeholder="Search"
                  />
                  <span className="absolute right-2">
                    <Search className="w-4" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Settings2 className="w-4" />

                    <span className="hidden md:flex">filter</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaSort className="w-4" />
                    <span className="hidden md:flex">sort</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="">
              {/* Loading... */}
              <LoadingSkleton />
            </div>
          ) : snippets.length === 0 ? (
            <div className="p-8 text-center text-text-light-secondary dark:text-text-dark-secondary">
              Looks like it’s empty here… add a snippet to make this space
              yours.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-2">
              {snippets.map((s) => {
                const isImage =
                  s.type === "image" ||
                  s.content.match(/\.(jpeg|jpg|gif|png|webp)$/i);

                return (
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
                          <span>
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
        <div className="hidden min-sm:flex flex-col box-border p-3 lg:w-[20%]">
          <span>Recently Added</span>
          <div className="flex max-h-[15rem] p-2 overflow-y-auto flex-col mt-1 rounded-lg text-text-light-secondary dark:text-text-dark-secondary">
            {snippets.map((s) => {
              return (
                <span
                  className="mb-1 border-b-[0.5px] border-border-light dark:border-border-dark"
                  key={s._id}
                >
                  {s.title}
                </span>
              );
            })}
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
import { createPortal } from "react-dom";
import Button from "../../utils/ui/Buttons/Button";

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
        <div className="flex items-center justify-center h-full ">
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
import hljs from "highlight.js";
import lightTheme from "highlight.js/styles/github.css?inline";
import darkTheme from "highlight.js/styles/github-dark.css?inline";
import { useTheme } from "../../hooks/useTheme";
import LoadingSkleton from "../../utils/ui/LoadingSkleton";

const SyntexHighliter = ({ text }) => {
  const codeRef = useRef(null);
  const { theme } = useTheme();

  const isCodeContent = () => {
    const result = hljs.highlightAuto(text);
    return result.language !== undefined && result.relevance > 5;
  };

  useEffect(() => {
    if (!codeRef.current || !isCodeContent()) return;

    hljs.highlightElement(codeRef.current);

    const existing = document.getElementById("hljs-theme");
    if (existing) existing.remove();

    // Inject the current theme
    const style = document.createElement("style");
    style.id = "hljs-theme";
    style.innerHTML = theme === "dark" ? darkTheme : lightTheme;
    document.head.appendChild(style);
  }, [text, theme]);
  if (!isCodeContent()) {
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
