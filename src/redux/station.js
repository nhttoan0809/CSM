import { createSlice } from "@reduxjs/toolkit";

export const stationSlice = createSlice({
    name: "station",
    initialState: {
        stationList: [],
        // [
        //     {
        //         idIotAccount: '123',
        //         stationList: [

        //         ]
        //     },
        //     {
        //         idIotAccount: '123',
        //         stationList: [

        //         ]
        //     }
        // ]
    },
    reducers: {
        setStationList: (state, actions) => {
            return {
                ...state,
                stationList: actions.payload,
            };
        },
    },
});

export const { setStationList } = stationSlice.actions;
export default stationSlice.reducer;
