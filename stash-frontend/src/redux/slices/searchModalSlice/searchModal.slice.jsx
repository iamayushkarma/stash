import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const SearchModalSlice = createSlice({
  name: "searchModalSlice",
  initialState,
  reducers: {
    toggleSearchModal: (state) => !state,
  },
});

export const { toggleSearchModal } = SearchModalSlice.actions;
export default SearchModalSlice.reducer;
