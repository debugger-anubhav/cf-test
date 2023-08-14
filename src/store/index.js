import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {HomepageSlice} from "./Slices";
import {CategoryPageSlice} from "./Slices/categorySlice";

export const store = configureStore({
  reducer: {
    homePagedata: HomepageSlice.reducer,
    categoryPageData: CategoryPageSlice.reducer,
  },
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch;
