import {getLocalStorage} from "@/constants/constant";
import {createSlice} from "@reduxjs/toolkit";

export const HomepageSlice = createSlice({
  name: "HomePageData",
  initialState: {
    cityList: [],
    offerCoupons: [],
    recentProduct: [],
    cityId: getLocalStorage("cityId") || 46,
    cityName: "",
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
    subcategoryId: "",
    categoryId: "",
    catHeading: "",
    inWishList: false,
  },
  reducers: {
    addWhishListProduc(state, action) {
      state.inWishList = action.payload;
    },
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
    addCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    selectedCityId(state, action) {
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
    addCategoryHeading(state, action) {
      state.catHeading = action.payload;
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
    productVideos: [],
    singleProductDetails: [],
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
    getProductVideos(state, action) {
      state.productVideos = action.payload;
    },
    getProductDetails(state, action) {
      state.singleProductDetails = action.payload;
    },
  },
});

export const CartPageSlice = createSlice({
  name: "CartPageData",
  initialState: {
    cartItems: [],
    totalNumberOfItems: 0,
    billBreakout: [],
    couponCodeUsed: "",
    savedAddresses: [],
    showCartItems: false,
    isCityShield: false,
    isCoinApplied: false,
    shoppingCartTab: 0,
  },
  reducers: {
    getCartItems(state, action) {
      state.cartItems = action.payload;
    },
    addItemsToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    deleteItems(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.fc_product.id === action.payload,
      );
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
    getBillDetails(state, action) {
      state.billBreakout = action.payload;
    },
    getCouponCodeUsed(state, action) {
      state.couponCodeUsed = action.payload;
    },
    getSavedAddress(state, action) {
      state.savedAddresses = action.payload;
    },
    setShowCartItem(state, action) {
      state.showCartItems = action.payload;
    },
    setCityShield(state, action) {
      state.isCityShield = action.payload;
    },
    setCoinsApplied(state, action) {
      state.isCoinApplied = action.payload;
    },
    setShoppingCartTab(state, action) {
      state.shoppingCartTab = action.payload;
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
  addCategoryId,
  addCategoryHeading,
  addWhishListProduc,
} = HomepageSlice.actions;

export const {
  addCompleteTheLook,
  addYouMightLike,
  addCareInstructions,
  getBannerImages,
  getCustomerReviews,
  getProductQuesAns,
  getSubscribersVideos,
  getProductVideos,
  getProductDetails,
} = ProductpageSlice.actions;

export const {
  getCartItems,
  deleteItems,
  addItemsToCart,
  getBillDetails,
  getCouponCodeUsed,
  getSavedAddress,
  setShowCartItem,
  setCityShield,
  setCoinsApplied,
  setShoppingCartTab,
} = CartPageSlice.actions;

export const {setSeoApplianceRentalSubCategory, setSeoApplianceCrowd} =
  SeoAppliancePageSlice.actions;
