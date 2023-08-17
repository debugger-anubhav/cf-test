import {createSlice} from "@reduxjs/toolkit";

export const CategoryPageSlice = createSlice({
  name: "CategoryPageData",
  initialState: {
    filteredItems: [],
    prdoucWithFilter: null,
    singleProduct: [],
    setProduct: [],
    outStockProduct: [],
  },
  reducers: {
    addFilteredItem(state, action) {
      state.filteredItems = action.payload;
    },
    addPrdoucWithFilter(state, action) {
      state.prdoucWithFilter = action.payload;
    },
    addSingleProduct: (state, action) => {
      // state.subProduct.push(...action.payload )
      state.singleProduct = action.payload;
    },
    addSetProduct: (state, action) => {
      // state.subProduct.push(...action.payload )
      state.setProduct = action.payload;
    },
    addOutStockProduct: (state, action) => {
      // state.subProduct.push(...action.payload )
      state.outStockProduct = action.payload;
    },
  },
});

export const {
  addFilteredItem,
  addPrdoucWithFilter,
  addSingleProduct,
  addSetProduct,
  addOutStockProduct,
} = CategoryPageSlice.actions;
