import {createSlice} from "@reduxjs/toolkit";

export const CategoryPageSlice = createSlice({
  name: "CategoryPageData",
  initialState: {
    filteredItems: [],
  },
  reducers: {
    addFilteredItem(state, action) {
      state.filteredItems = action.payload;
    },
  },
});

export const {addFilteredItem} = CategoryPageSlice.actions;
