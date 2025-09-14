import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { toggleSearchModal } from "../redux/slices/searchModalSlice/searchModal.slice";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./components.css";

const codingWords = [
  "algorithm",
  "variable",
  "function",
  "loop",
  "array",
  "object",
  "string",
  "boolean",
  "recursion",
  "callback",
  "syntax",
  "parameter",
  "class",
  "inheritance",
  "debugging",
  "compiler",
  "framework",
  "API",
  "binary",
  "asynchronous",
];

function SearchModal() {
  const [userSearch, setUserSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(userSearch);
  const [result, setResult] = useState([]);
  const [cache, setCache] = useState({});
  const dispatch = useDispatch();

  // debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(userSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [userSearch]);

  // get results
  useEffect(() => {
    let querySearch = debouncedSearch.trim().toLowerCase();
    if (querySearch === "") {
      setResult([]);
      return;
    }
    if (cache[querySearch]) {
      setResult(cache[querySearch]);
      return;
    }
    const words = codingWords.filter((word) =>
      word.toLowerCase().includes(querySearch)
    );

    setCache((prev) => ({ ...prev, [querySearch]: words }));
    setResult(words);
    console.log("serching for", userSearch);
  }, [debouncedSearch]);

  const handleToggleModal = () => dispatch(toggleSearchModal());
  return createPortal(
    <>
      <style>{`
        /* Firefox */
        .scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 100, 100, 0.7) transparent;
          }
        .scrollbar::-webkit-scrollbar-button {
          display: none;
          }
        /* Chrome, Edge, Safari */
        .scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.7);
          border-radius: 9999px;
        }
        .scrollbar::-webkit-scrollbar-track {
          background: transparent;
          }
      `}</style>
      <div className="w-full touch-none z-[999999] h-svh fixed inset-0 flex justify-center">
        <div
          onClick={handleToggleModal}
          className="w-full h-svh absolute inset-0 backdrop-blur-[5px] "
        ></div>
        <div className="relative top-[6rem]">
          <div className="flex md:w-[25rem] dark:bg-bg-dark-secondary bg-bg-light-secondary text-text-light-primary dark:text-text-dark-primary items-center gap-2 shadow-lg border-[1px] dark:border-border-dark border-border-light rounded-lg">
            <div className="px-2 pr-0 flex items-center justify-center">
              <Search size={16} />
            </div>
            <input
              className="border-l-1 w-full max-sm:placeholder:text-[0.9rem] px-3 py-1.5 pr-1 focus:outline-none dark:border-border-dark border-border-light"
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search..."
              autoFocus
            />
            <div className="p-2 pl-0 flex items-center justify-cente">
              <X onClick={handleToggleModal} size={16} />
            </div>
          </div>
          {/* results */}
          <div className="flex w-full">
            <ul className="cursor-pointer dark:text-text-dark-primary text-text-light-primary mt-1 md:mt-2 border-1 rounded-md dark:border-border-dark border-border-light w-full bg-bg-light-secondary dark:bg-bg-dark-secondary max-h-[25rem] overflow-y-auto scrollbar">
              {userSearch.trim() === "" ? (
                <div className="dark:text-text-dark-secondary text-text-light-secondary p-2 lg:p-3 text-[.9rem] lg:text-[1rem] flex text-center items-center justify-center">
                  Type to search...
                </div>
              ) : result.length === 0 ? (
                <div className="dark:text-text-dark-secondary text-text-light-secondary p-2 lg:p-3 text-[.9rem] lg:text-[1rem] flex text-center items-center justify-center">
                  No results found
                </div>
              ) : (
                <div>
                  {result.map((word, id) => {
                    return (
                      <li
                        className="mx-2 font-medium border-b-[0.5px] dark:border-border-dark border-border-light flex items-center px-2 py-1.5"
                        key={id}
                      >
                        {word}
                      </li>
                    );
                  })}
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("search-btn-modal-portal")
  );
}

export default SearchModal;
