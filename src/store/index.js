import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {
  HomepageSlice,
  ProductpageSlice,
  SeoAppliancePageSlice,
  CartPageSlice,
  ProfileSettingSlice,
  KycPageSlice,
  InvoiceSlice,
  orderSlice,
  paymentSuccessSlice,
} from "./Slices";
import {CategoryPageSlice} from "./Slices/categorySlice";

export const store = configureStore({
  reducer: {
    homePagedata: HomepageSlice.reducer,
    productPageData: ProductpageSlice.reducer,
    seoApplianceData: SeoAppliancePageSlice.reducer,
    categoryPageData: CategoryPageSlice.reducer,
    cartPageData: CartPageSlice.reducer,
    profileData: ProfileSettingSlice.reducer,
    kycPage: KycPageSlice.reducer,
    invoicePage: InvoiceSlice.reducer,
    order: orderSlice.reducer,
    successPayment: paymentSuccessSlice.reducer,
  },
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch;
