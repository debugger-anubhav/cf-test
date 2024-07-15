import {getLocalStorage} from "@/constants/constant";
import {createSlice} from "@reduxjs/toolkit";
import Worker from "worker-loader!../../constants/commonWorkers/homepageCardsWorker.js";

export const WorkersSlice = createSlice({
  name: "workers",
  initialState: {
    homepageCardsWorker: null,
  },
  reducers: {
    setHomepageCardWorker(state, action) {
      state.homepageCardsWorker = action.payload;
    },
  },
});

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
    serviceRequestType: "",
    serviceRequestDrawer: false,
    loginPopupState: false,
    isLogin: false,
    docSidebarActiveItem: "",
    showAllRentLink: false,
    createRequestApiCalled: true,
    isFirstUser: false,
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
    setServiceRequestType(state, action) {
      state.serviceRequestType = action.payload;
    },
    setServiceRequestDrawer(state, action) {
      state.serviceRequestDrawer = action.payload;
    },
    setLoginPopupState(state, action) {
      state.loginPopupState = action.payload;
    },
    setLoginState(state, action) {
      state.isLogin = action.payload;
    },
    setDocSidebarActiveItem(state, action) {
      state.docSidebarActiveItem = action.payload;
    },
    setShowAllRentLink(state, action) {
      state.showAllRentLink = action.payload;
    },
    setCreateRequestApiCalled(state, action) {
      state.createRequestApiCalled = action.payload;
    },
    setISFirstUser(state, action) {
      state.isFirstUser = action.payload;
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
    isCityShield: true,
    isCoinApplied: false,
    shoppingCartTab: 0,
    isOfflineCustomer: 0,
    isCitymaxOrder: false,
    monthlyUpfrontLoader: true,
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
    emptyCart(state, action) {
      state.cartItems.splice(0, state.cartItems.length);
    },
    getBillDetails(state, action) {
      state.billBreakout = action.payload;
    },
    setMonthlyUpfrontLoader(state, action) {
      state.monthlyUpfrontLoader = action.payload;
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
    setIsOfflineCustomer(state, action) {
      state.isOfflineCustomer = action.payload;
    },
    setCitymaxOrder(state, action) {
      state.isCitymaxOrder = action.payload;
    },
  },
});

export const ProfileSettingSlice = createSlice({
  name: "UserProfileData",
  initialState: {
    name: "",
    contact: "",
    email: "",
  },
  reducers: {
    getUserName(state, action) {
      state.name = action.payload;
    },
    getUserContact(state, action) {
      state.contact = action.payload;
    },
    getUserEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const ServiceRequestSlice = createSlice({
  name: "SRData",
  initialState: {
    requestLoader: false,
  },
  reducers: {
    setRequestLoader(state, action) {
      state.requestLoader = action.payload;
    },
  },
});

export const KycPageSlice = createSlice({
  name: "KycPage",
  initialState: {
    orderId: "",
    cibilDocsData: "",
  },
  reducers: {
    getOrderId(state, action) {
      state.orderId = action.payload;
    },
    setCibilDocsData(state, action) {
      state.cibilDocsData = action.payload;
    },
  },
});

export const InvoiceSlice = createSlice({
  name: "InvoicePage",
  initialState: {
    isCoinApplied: false,
    availableCoins: 0,
    usedCoins: 0,
  },
  reducers: {
    getCoinsState(state, action) {
      state.isCoinApplied = action.payload;
    },
    getAvailableCoins(state, action) {
      state.availableCoins = action.payload;
    },
    setUsedCoins(state, action) {
      state.usedCoins = action.payload;
    },
  },
});

export const orderSlice = createSlice({
  name: "orderPage",
  initialState: {
    orderId: null,
    isModalOpen: false,
    subscriptionId: null,
  },
  reducers: {
    setOrderIdFromOrderPage: (state, action) => {
      state.orderId = action.payload;
    },
    reduxSetModalState: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setSubscriptionNumber: (state, action) => {
      state.subscriptionId = action.payload;
    },
  },
});

export const citymaxSlice = createSlice({
  name: "citymax",
  initialState: {
    isHalfYearly: false,
  },
  reducers: {
    setIsHalfYearlyState: (state, action) => {
      state.isHalfYearly = action.payload;
    },
  },
});

export const paymentSuccessSlice = createSlice({
  name: "paymentSuccessPage",
  initialState: {
    TransactionReferenceNumber: "",
    PGTransactionID: "",
    amountPaid: 0,
  },
  reducers: {
    setTransactionReferenceNumber: (state, action) => {
      state.TransactionReferenceNumber = action.payload;
    },
    setPGTransactionID: (state, action) => {
      state.PGTransactionID = action.payload;
    },
    setAmountPaid: (state, action) => {
      state.amountPaid = action.payload;
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
  setServiceRequestType,
  setServiceRequestDrawer,
  setLoginPopupState,
  setLoginState,
  setDocSidebarActiveItem,
  setShowAllRentLink,
  setCreateRequestApiCalled,
  setISFirstUser,
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
  emptyCart,
  setIsOfflineCustomer,
  setCitymaxOrder,
  setMonthlyUpfrontLoader,
} = CartPageSlice.actions;

export const {setSeoApplianceRentalSubCategory, setSeoApplianceCrowd} =
  SeoAppliancePageSlice.actions;

export const {getUserName, getUserContact, getUserEmail} =
  ProfileSettingSlice.actions;

export const {setRequestLoader} = ServiceRequestSlice.actions;

export const {getOrderId, setCibilDocsData} = KycPageSlice.actions;

export const {getAvailableCoins, getCoinsState, setUsedCoins} =
  InvoiceSlice.actions;

export const {
  setOrderIdFromOrderPage,
  reduxSetModalState,
  setSubscriptionNumber,
} = orderSlice.actions;

export const {
  setTransactionReferenceNumber,
  setPGTransactionID,
  setAmountPaid,
} = paymentSuccessSlice.actions;

export const {setIsHalfYearlyState} = citymaxSlice.actions;

export const {setHomepageCardWorker} = WorkersSlice.actions;
