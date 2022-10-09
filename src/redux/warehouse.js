import { createSlice } from "@reduxjs/toolkit";

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
        currentWarehouse: -1,
        warehouseList: [
            // {
            //     id: -1,
            //     name: 'None'
            // }
        ]
    },
    reducers: {
        setCurrentWarehouse: (state, actions) => {
            console.log("Handle dispath: setCurrentWarehouse")
            return {
                ...state, 
                currentWarehouse: actions.payload
            }
        },

        setWarehouseList: (state, actions) => {
            console.log("Handle dispath: setWarehouseList")
            return {
                ...state,
                warehouseList: actions.payload
            }
        }
    }
})

export const { setCurrentWarehouse, setWarehouseList } = warehouseSlice.actions

export default warehouseSlice.reducer