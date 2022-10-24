import { createSlice } from "@reduxjs/toolkit";

export const palletSlice = createSlice({
  name: "pallet",
  initialState: {
    palletList: [
      //   {
      //     pallet_id: "palletId23",
      //     pallet_template_id: "PalletTemplateId1",
      //     warehouse_id: "warehouse123",
      //     description: "",
      //     is_used: false,
      //     import_data: "8/9/2000",
      //     storage_start_data: "8/10/2000",
      //     position: "",
      //   },
      //   {
      //     pallet_id: "palletId456",
      //     pallet_template_id: "PalletTemplateId2",
      //     warehouse_id: "warehouse456",
      //     description: "",
      //     is_used: false,
      //     import_data: "8/9/2000",
      //     storage_start_data: "8/10/2000",
      //     position: "",
      //   },
    ],
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
