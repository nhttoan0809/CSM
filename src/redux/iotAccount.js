import { createSlice } from "@reduxjs/toolkit";

export const iotAccountSlice = createSlice({
    name: "iotAccount",
    initialState: {
        iotAccountList: [],
    },
    reducers: {
        setIotAccountList: (state, actions) => {
            return {
                ...state,
                iotAccountList: actions.payload,
            };
        },
    },
});

export const { setIotAccountList } = iotAccountSlice.actions;
export default iotAccountSlice.reducer;
