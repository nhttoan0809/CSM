import React, { useEffect, useState } from 'react'
import SelectHeader from '../components/SelectHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentWarehouse, setWarehouseList } from '../redux/warehouse'
import { setCurrentAgent } from '../redux/agent'

const Header = () => {

    const agentList = useSelector( state => state.agent.agentList)
    const warehouseList = useSelector( state => state.warehouse.warehouseList)

    const dispatch = useDispatch()

    const handleChangeSelectAgent = async (agentId) => {
        dispatch(setCurrentAgent(agentId))
        // Handle get warehouseList
        const newWarehouseList = [
            {
                id: 'agent1warehouse1',
                name: 'DL1 Kho 1'
            },
            {
                id: 'agent1warehouse2',
                name: 'DL2 Kho 2'
            }
        ]

        dispatch(setWarehouseList(newWarehouseList))
    }

    const handleChangeSelectWarehouse = (warehouseId) => {
        dispatch(setCurrentWarehouse(warehouseId))
    }

    return (
        <div style={{ display: 'flex' }}>
            <SelectHeader label={`Đại lý`}
                itemList={agentList.map(agent => ({value: agent.id, title: agent.name}))}
                handleChangeSelect={handleChangeSelectAgent}
            />
            <SelectHeader label={`Kho`} 
                itemList={warehouseList.map(warehouse => ({title: warehouse.name, value: warehouse.id}))}
                handleChangeSelect={handleChangeSelectWarehouse} 
            />
        </div>
    )
}

export default Header