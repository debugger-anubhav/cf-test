import {createSlice} from "@reduxjs/toolkit";

export const HomepageSlice = createSlice({
  name: "HomePageData",
  initialState: {
    cityList: [],
    offerCoupons: [],
    recentProduct: [],
    cityId: 46,
    cityName: "Bangalore",
    reviews: [],
    newProduct: [],
    limitedDiscount: [],
    trendindProduct: [],
    designComboProduct: [],
    category: [],
    allAndSubCategory: [],
    sidebarMenuLists: [],
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
    selectedCityId(state, action) {
      state.cityId = action.payload;
    },
    selectedCityName(state, action) {
      state.cityName = action.payload;
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
    addCategory(state, action) {
      state.category = action.payload;
    },
    addAllAndSubCategory(state, action) {
      state.allAndSubCategory = action.payload;
    },
    addSidebarMenuLists(state, action) {
      state.sidebarMenuLists = action.payload;
    },
  },
});

export const {
  addCityList,
  offersAndCuponsList,
  addRecentlyViewedProduct,
  selectedCityId,
  selectedCityName,
  addGoogleReviews,
  addNewlaunchedProducts,
  addLimitedPreiodDiscount,
  addtrendingproduct,
  addComboProducts,
  addCategory,
  addAllAndSubCategory,
  addSidebarMenuLists,
} = HomepageSlice.actions;
