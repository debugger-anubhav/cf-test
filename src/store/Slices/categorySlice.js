import {createSlice} from "@reduxjs/toolkit";

export const CategoryPageSlice = createSlice({
  name: "CategoryPageData",
  initialState: {
    filteredItems: [],
    prdoucWithFilter: null,
    singleProduct: [],
    setProduct: [],
    outStockProduct: [],
    happySucbscriber: [],
    categoryContentData: [],
    savedProducts: [],
    tendingItems: [],
    categoryFilterData: null,
    categoryMetaData: [],
    categoryMetaSubProduct: [],
    categoryMetaOutStock: [],
    isAllProduct: false,
    parentCategoryId: 27,
    singleProductAll: [],
  },
  reducers: {
    addParentCategoryId(state, action) {
      state.parentCategoryId = action.payload;
    },
    addAllProduct(state, action) {
      state.isAllProduct = action.payload;
    },
    addFilterMetaData(state, action) {
      state.categoryFilterData = action.payload;
    },
    addFilteredItem(state, action) {
      state.filteredItems = action.payload;
    },
    addPrdoucWithFilter(state, action) {
      state.prdoucWithFilter = action.payload;
    },
    addSubCategoryMetaData(state, action) {
      state.categoryMetaData = action.payload;
    },
    addSubCategoryMetaSubProduct(state, action) {
      state.categoryMetaSubProduct = action.payload;
    },
    addSubCategoryMetaOutStockProduct(state, action) {
      state.categoryMetaOutStock = action.payload;
    },
    addSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    addSingleAllProduct: (state, action) => {
      state.singleProductAll = action.payload;
    },
    clearSingleProducts: state => {
      state.singleProduct = [];
      state.singleProductAll = [];
    },
    addSetProduct: (state, action) => {
      state.setProduct = action.payload;
    },
    addOutStockProduct: (state, action) => {
      state.outStockProduct = action.payload;
    },
    addHappySubscriber: (state, action) => {
      state.happySucbscriber = action.payload;
    },
    addCategoryContentData: (state, action) => {
      state.categoryContentData = action.payload;
    },
    addSaveditems: (state, action) => {
      state.savedProducts = action.payload;
    },
    addCategoryTrendingProduct(state, action) {
      state.tendingItems = action.payload;
    },
  },
});

export const {
  addFilteredItem,
  addPrdoucWithFilter,
  addSingleProduct,
  addSetProduct,
  addOutStockProduct,
  addHappySubscriber,
  addCategoryContentData,
  addSaveditems,
  addCategoryTrendingProduct,
  addFilterMetaData,
  addSubCategoryMetaData,
  addSubCategoryMetaSubProduct,
  addSubCategoryMetaOutStockProduct,
  addAllProduct,
  addParentCategoryId,
  addSingleAllProduct,
  clearSingleProducts,
} = CategoryPageSlice.actions;
