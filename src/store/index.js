import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {HomepageSlice} from "./Slices";

export const store = configureStore({
  reducer: {
    homePagedata: HomepageSlice.reducer,
  },
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch;
