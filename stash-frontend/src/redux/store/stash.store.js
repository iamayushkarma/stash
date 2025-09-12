import { configureStore } from "@reduxjs/toolkit";
import SearchModalReducer from "../slices/searchModalSlice/searchModal.slice.jsx";

export const store = configureStore({
  reducer: {
    toggleModal: SearchModalReducer,
  },
});
