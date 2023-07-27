import {createSlice} from "@reduxjs/toolkit";

export const HomepageSlice = createSlice({
  name: "HomePageData",
  initialState: {
    cityList: [],
  },
  reducers: {
    addCityList(state, action) {
      state.cityList = action.payload;
    },
  },
});

export const {addCityList} = HomepageSlice.actions;
