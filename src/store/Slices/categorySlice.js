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
  },
  reducers: {
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
      // console.log(action.payload, "payload")
      state.singleProduct = action.payload;
      // console.log([...state.singleProduct, { ...action.payload }], "afterappending data")
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
} = CategoryPageSlice.actions;
