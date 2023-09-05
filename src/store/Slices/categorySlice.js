import {createSlice} from "@reduxjs/toolkit";

export const CategoryPageSlice = createSlice({
  name: "CategoryPageData",
  initialState: {
    filteredItems: [],
    prdoucWithFilter: null,
    singleProduct: [],
    setProduct: [],
    setProductAll: [],
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
    outStockProductAll: [],
    filterData: [],
    isfilter: false,
    sortKey: ["subproducts", "ASC"],
    categoryInstruction: [],
    filterProduct: [],
    savedProductID: [],
    categorTextContent: [],
    addRemoveWhislitItem: false,
  },
  reducers: {
    addParentCategoryId(state, action) {
      state.parentCategoryId = action.payload;
    },
    addCategoryTextContent(state, action) {
      state.categorTextContent = action.payload;
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
    addSetProduct: (state, action) => {
      state.setProduct = action.payload;
    },
    addSetProductAll: (state, action) => {
      state.setProductAll = action.payload;
    },
    addOutStockProduct: (state, action) => {
      state.outStockProduct = action.payload;
    },
    addOutStockProductAll: (state, action) => {
      state.outStockProductAll = action.payload;
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
    addRemoveWhishListitems: (state, action) => {
      state.addRemoveWhislitItem = action.payload;
    },
    addSaveditemID: (state, action) => {
      state.savedProductID = action.payload;
    },
    addCategoryTrendingProduct(state, action) {
      state.tendingItems = action.payload;
    },
    addFilterData(state, action) {
      state.filterData = action.payload;
    },
    isFilterApplied(state, action) {
      state.isfilter = action.payload;
    },
    addSortKey(state, action) {
      state.sortKey = action.payload;
    },
    addCategoryInstruction(state, action) {
      state.categoryInstruction = action.payload;
    },
    addFilterProduct(state, action) {
      state.filterProduct = action.payload;
    },
  },
});

export const {
  addCategoryInstruction,
  addFilteredItem,
  addSortKey,
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
  addSetProductAll,
  addOutStockProductAll,
  addFilterData,
  isFilterApplied,
  addFilterProduct,
  addSaveditemID,
  addCategoryTextContent,
  addRemoveWhishListitems,
} = CategoryPageSlice.actions;
