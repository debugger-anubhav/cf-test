export const endPoints = {
  cityList: "fc-list-values/getAllCities",
  offersAndCupons: "fc-site-offers/getOffersAndCoupons",
  recentlyViewedProduct: "fc-view-products/getRecentlyViewedProducts",
  googleReviews: "fc-google-review-lists/getAllGoogleReviews",
  newlylaunchedProduct: "fc-products/getNewLaunchProducts",
  limitedPreiod: "fc-products/getProductsOnSale",
  trendingProduct: "fc-products/getTrendingProducts",
  productCombos: "fc-products/getCombosProducts",
  category: "fc-categories/all",
  allAndSubCategory: "fc-categories/getAllCategoriesAndSubCategories",
  sidebarMenuLists: "fc-categories/getSidebarMenuLists",
  rentNowBanners: "fc-app-product-urls/getBanners?isHomePage=1",
  trendingSearchConstants: "fc-products/trendingSearchConstants",
  productWithFilter: "fc-products/getProductsWithFilter",
  faqsLandingPage: "fc-faqs/getHomePageFAQS",
  // searchKey: "fc-products/search?searchKey=",
  homePageHappySubscriber:
    "fc-care-instructions/getHomePageHappyCustomerStories",
  homePageTextContent: "fc-admin-settings/getHomePageTextContent",
  cityIdByCityName: "fc-list-values/getCityIdByCityName?cityName=",
  seoApplianceRentalSubCategory:
    "fc-categories/getRentalApplianceSubCategories",
  seoApplianceTtrendingProduct:
    "fc-products/getRentalFurnitureCrowdFavourites?cityId=",
  seoApplianceBanners: "fc-app-product-urls/getBanners?categoryId=26",
  seoApplianceFaqs: "fc-faqs/getSeoApplianceRentalPageFAQS",
  seoApplianceHappyCustomer:
    "fc-care-instructions/getSeoApplianceRentalPageHappyCustomerStories",
  seoAppliancesTextContent: "fc-city-category-seo-data/getSeoPageTextContent",
  seoFurnitureRentalSubCategory: "fc-categories/all",
  seoFurnitureTtrendingProduct:
    "fc-products/getRentalFurnitureCrowdFavourites?cityId=",
  seoFurnitureBanners: "fc-app-product-urls/getBanners?categoryId=27",
  seoFurnitureFaqs: "fc-faqs/getSeoFurnitureRentalPageFAQS",
  seoFurnitureHappyCustomer:
    "fc-care-instructions/getSeoFurnitureRentalPageHappyCustomerStories",
  seoFurnitureTextContent: "fc-city-category-seo-data/getSeoPageTextContent",
  sessionUserUrl: "node-sessions/createSessionData",
  addRecentViewProduct: "fc-view-products/createRecentlyViewedProduct",
  addWishListProduct: "fc-product-likes/addToWishlistProduct",
  deleteWishListProduct: "fc-product-likes/deleteWishlistProduct",

  searchKey: (key, cityId) =>
    `fc-products/search?searchKey=${key}&&cityId=${cityId}`,

  productPage: {
    completeTheLook: id =>
      `fc-products/getRecommendedProducts?productId=${id}&cityId=50`,
    youMightLike: id =>
      `fc-products/getYouMightAlsoLikeProducts?productId=${id}&cityId=50`,
    monthlyRent: id =>
      `fc-subproducts/getProductForThePeriod?productId=${id}&cityId=46`,
    careInstructions: id =>
      `fc-care-instructions/getProductCareInstructions?productId=${id}`,
    bannerImages: id => `fc-product-banners/getProductBanners?productId=${id}`,
    productVideos: id => `fc-product-videos/getProductVideos?productId=${id}`,
    customerReviews: id =>
      `fc-user-reviews/getProductUserReviews?productId=${id}&cityId=45`,
    qna: id => `fc-faq-products/getProductPageFAQs?productId=${id}`,
    happySubscribers: id =>
      `fc-care-instructions/getCustomerHappyStories?productId=${id}`,
    singleProductDetails: id =>
      `fc-products/getSingleProductDetails?productId=${id}&cityId=50`,
    addToCart: `fc-shopping-carts/addToCart`,
  },

  addToCart: {
    deleteItem: (id, userId) =>
      `fc-shopping-carts/delete?id=${id}&userId=${userId}`,
    fetchCartItems: (cityId, userId) =>
      `fc-shopping-carts/fetchAddToCartItems?cityId=${cityId}&userId=${userId}`,
    updateQuantity: `fc-shopping-carts/updateQuantity`,
    fetchCoins: userId => `fc-my-wallets/getMyWalletDetails?userId=${userId}`,
    fetchBill: "fc-shopping-carts/generatedBill",
  },

  // categoryHappySubscriber:
  //   "fc-care-instructions/getCategoryPageHappyCustomerStories",

  categoryHappySubscriber: id =>
    `fc-care-instructions/getCategoryPageHappyCustomerStories?parentCategoryId=${id}`,
  categortFaq: "fc-faqs/getCategoryPageFAQS",
  categoryContent: "fc-city-category-datas/getCategoryPageTextContent",
  savedItems: "fc-product-likes/getWishlistProducts",
  categorySingleProduct: "fc-products/getSingleProducts",
  categoryComboProduct: "fc-products/getSetProducts",
  categoryStockOutProduct: "fc-products/getOutOfStockProducts",
  categoryFilterOption: "fc-products/getProductFilters",
  categoryInstruction: "fc-care-instructions/getProductCareInstructions",
};
