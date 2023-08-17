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
    announcementBar: false,
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
    setAnnouncementBar(state, action) {
      state.announcementBar = action.payload;
    },
  },
});

export const ProductpageSlice = createSlice({
  name: "ProductPageData",
  initialState: {
    completeTheLook: [],
    youMightLike: [],
    careInstructions: [],
    bannerImages: [],
    customerReviews: [],
    qna: [],
  },
  reducers: {
    addCompleteTheLook(state, action) {
      state.completeTheLook = action.payload;
    },
    addYouMightLike(state, action) {
      state.youMightLike = action.payload;
    },
    addCareInstructions(state, action) {
      state.careInstructions = action.payload;
    },
    getBannerImages(state, action) {
      state.bannerImages = action.payload;
    },
    getCustomerReviews(state, action) {
      state.customerReviews = action.payload;
    },
    getProductQuesAns(state, action) {
      state.qna = action.payload;
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
  setAnnouncementBar,
} = HomepageSlice.actions;

export const {
  addCompleteTheLook,
  addYouMightLike,
  addCareInstructions,
  getBannerImages,
  getCustomerReviews,
  getProductQuesAns,
} = ProductpageSlice.actions;
