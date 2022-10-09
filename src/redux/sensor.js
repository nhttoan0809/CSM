import { createSlice } from "@reduxjs/toolkit";

export const sensorSlice = createSlice({
  name: "sensor",
  initialState: {
    sensorList: [],
  },
  reducers: {
    setSensorList: (state, actions) => {
      console.log("Handle dispath: setSensorList")
      return {
        ...state,
        sensorList: actions.payload,
      };
    },
  },
});

export const { setSensorList } = sensorSlice.actions;
export default sensorSlice.reducer;
