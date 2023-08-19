import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {HomepageSlice, ProductpageSlice, SeoAppliancePageSlice} from "./Slices";
import {CategoryPageSlice} from "./Slices/categorySlice";

export const store = configureStore({
  reducer: {
    homePagedata: HomepageSlice.reducer,
    productPageData: ProductpageSlice.reducer,
    seoApplianceData: SeoAppliancePageSlice.reducer,
    categoryPageData: CategoryPageSlice.reducer,
  },
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch;
