import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSearchModal } from "../../redux/slices/searchModalSlice/searchModal.slice";
import SearchModal from "../../components/SearchModal";

function SearchButton({ text }) {
  const modalState = useSelector((state) => state.toggleModal);
  console.log(modalState);

  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => dispatch(toggleSearchModal())}
        className="flex items-center justify-center gap-2 bg-bg-dark-primary/5 dark:bg-bg-light-primary/5 border-1 border-border-light dark:border-border-dark rounded-lg dark:text-text-dark-secondary text-text-light-secondary hover:dark:text-text-dark-primary hover:text-text-light-primary px-2 py-1.5 text-[.8rem]"
      >
        <span>
          <Search size={15} />
        </span>
        <span className="">{text}</span>
      </button>
      {modalState == true && <SearchModal />}
    </>
  );
}

export default SearchButton;
