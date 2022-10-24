import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        expandDrawer: false,
        drawerTab: {
            type: '', // warehouse, pallet, goods, sensor
            action: '', // update, delete
            data: '', // data to generate component
        }
    },
    reducers: {
        setExpandDrawer: (state, actions) => {
            return {
                ...state,
                expandDrawer: actions.payload
            }
        },
        setDrawerTab: (state, actions) => {
            return {
                ...state,
                drawerTab: actions.payload
            }
        },
    }
})

export const {setExpandDrawer, setDrawerTab} = drawerSlice.actions

export default drawerSlice.reducer