import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {HomepageSlice, ProductpageSlice} from "./Slices";

export const store = configureStore({
  reducer: {
    homePagedata: HomepageSlice.reducer,
    productPageData: ProductpageSlice.reducer,
  },
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch;
