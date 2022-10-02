import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import agentReducer from './agent'
import warehouseReducer from './warehouse'

export default configureStore({
    reducer: {
        user: userReducer,
        // company: companyReducer,
        agent: agentReducer,
        warehouse: warehouseReducer,
        // pallet: palletReducer,
        // product: productReducer,
        // sensor: sensorReducer,
    },
})