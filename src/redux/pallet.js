import { createSlice } from "@reduxjs/toolkit";

export const palletSlice = createSlice({
  name: "pallet",
  initialState: {
    palletList: [],
  },
  reducers: {
    setPalletList: (state, actions) => {
      // console.log("Handle dispath: setPalletList")
      return {
        ...state,
        palletList: actions.payload,
      };
    },
  },
});

export const { setPalletList } = palletSlice.actions;
export default palletSlice.reducer;
