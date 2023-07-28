import {createSlice} from "@reduxjs/toolkit";

export const HomepageSlice = createSlice({
  name: "HomePageData",
  initialState: {
    cityList: [],
    offerCoupons: [],
    recentProduct: [],
    reviews: [],
    newProduct: [],
    limitedDiscount: [],
    trendindProduct: [],
    designComboProduct: [],
  },
  reducers: {
    addCityList(state, action) {
      state.cityList = action.payload;
    },
    offersAndCuponsList(state, action) {
      state.offerCoupons = action.payload;
    },
    addRecentlyViewedProduct(state, action) {
      state.recentProduct = action.payload;
    },
    addGoogleReviews(state, action) {
      state.reviews = action.payload;
    },
    addNewlaunchedProducts(state, action) {
      state.newProduct = action.payload;
    },
    addLimitedPreiodDiscount(state, action) {
      state.limitedDiscount = action.payload;
    },
    addtrendingproduct(state, action) {
      state.trendindProduct = action.payload;
    },
    addComboProducts(state, action) {
      state.designComboProduct = action.payload;
    },
  },
});

export const {
  addCityList,
  offersAndCuponsList,
  addRecentlyViewedProduct,
  addGoogleReviews,
  addNewlaunchedProducts,
  addLimitedPreiodDiscount,
  addtrendingproduct,
  addComboProducts,
} = HomepageSlice.actions;
