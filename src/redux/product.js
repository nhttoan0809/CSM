import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
  },
  reducers: {
    setProductList: (state, actions) => {
      console.log("Handle dispath: setProductList")
      return {
        ...state,
        productList: actions.payload,
      };
    },
  },
});

export const { setProductList } = productSlice.actions;
export default productSlice.reducer;
