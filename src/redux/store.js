import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import agentReducer from './agent'
import warehouseReducer from './warehouse'
import palletReducer from './pallet'
import productReducer from './product'
import sensorReducer from './sensor'
import tabReducer from './tabs'
import drawerReducer from './drawer'
import pallet_templateReducer from './pallet_template'

export default configureStore({
    reducer: {
        user: userReducer,
        agent: agentReducer,
        warehouse: warehouseReducer,
        pallet: palletReducer,
        product: productReducer,
        sensor: sensorReducer,
        tab: tabReducer,
        drawer: drawerReducer,
        pallet_template: pallet_templateReducer,
    },
})