import {createSlice} from "@reduxjs/toolkit";

export const HomepageSlice = createSlice({
  name: "HomePageData",
  initialState: {
    cityList: [],
    offerCoupons: [],
    recentProduct: [],
    cityId: 46,
    cityName: "Bangalore",
    productName: "",
    productCategory: "",
    reviews: [],
    newProduct: [],
    limitedDiscount: [],
    trendindProduct: [],
    designComboProduct: [],
    category: [],
    allAndSubCategory: [],
    sidebarMenuLists: [],
    announcementBar: false,
    seoFurnitureSubCategory: [],
    subcategoryId: "270",
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
    addSubCategoryId(state, action) {
      state.subcategoryId = action.payload;
    },
    selectedCityId(state, action) {
      // console.log(action?.payload, "action")
      state.cityId = action.payload;
    },
    selectedCityName(state, action) {
      // console.log(action.payload, "actions");
      state.cityName = action.payload;
    },
    addProductName(state, action) {
      state.productName = action.payload;
    },
    addProductCategory(state, action) {
      state.productCategory = action.payload;
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
    setSeoFurnitureRentalSubCategory(state, action) {
      state.seoFurnitureSubCategory = action.payload;
    },
  },
});

export const SeoAppliancePageSlice = createSlice({
  name: "SeoAppliancePageData",
  initialState: {
    seoApplianceSubCategory: [],
    seoApplianceCrowd: [],
  },
  reducers: {
    setSeoApplianceRentalSubCategory(state, action) {
      state.seoApplianceSubCategory = action.payload;
    },
    setSeoApplianceCrowd(state, action) {
      state.seoApplianceCrowd = action.payload;
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
    happySubscribersVideos: [],
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
    getSubscribersVideos(state, action) {
      state.happySubscribersVideos = action.payload;
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
  setSeoFurnitureRentalSubCategory,
  addProductName,
  addProductCategory,
  addSubCategoryId,
} = HomepageSlice.actions;

export const {
  addCompleteTheLook,
  addYouMightLike,
  addCareInstructions,
  getBannerImages,
  getCustomerReviews,
  getProductQuesAns,
  getSubscribersVideos,
} = ProductpageSlice.actions;

export const {setSeoApplianceRentalSubCategory, setSeoApplianceCrowd} =
  SeoAppliancePageSlice.actions;
