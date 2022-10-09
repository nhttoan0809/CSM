import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        currentTab: ''
    },
    reducers: {
        setCurrentTab: (state, actions) => {
            return {
                ...state,
                currentTab: actions.payload
            }
        }
    }
})

export const {setCurrentTab} = tabSlice.actions
export default tabSlice.reducer