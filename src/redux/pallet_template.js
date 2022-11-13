import { createSlice } from "@reduxjs/toolkit";

const pallet_templateSlice = createSlice({
    name: 'pallet_template',
    initialState: {
        currentPalletTemplate: -1,
        palletTemplateList: [],
    },
    reducers: {
        setCurrentPalletTemplate: (state, actions) => {
            return {
                ...state,
                currentPalletTemplate: actions.payload
            }
        },
        setPalletTemplateList: (state, actions) => {
            return {
                ...state,
                palletTemplateList: actions.payload
            }
        }
    }
})

export const {setCurrentPalletTemplate, setPalletTemplateList} = pallet_templateSlice.actions

export default pallet_templateSlice.reducer