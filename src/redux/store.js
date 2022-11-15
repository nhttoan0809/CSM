import { configureStore } from '@reduxjs/toolkit'
import agentReducer from './agent'
import drawerReducer from './drawer'
import iotAccountReducer from './iotAccount'
import palletReducer from './pallet'
import pallet_templateReducer from './pallet_template'
import productReducer from './product'
import sensorReducer from './sensor'
import tabReducer from './tabs'
import userReducer from './user'
import warehouseReducer from './warehouse'
import stationReducer from './station'

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
        pallet_template: pallet_templateReducer,
        iotAccount: iotAccountReducer,
        station: stationReducer,
    },
})