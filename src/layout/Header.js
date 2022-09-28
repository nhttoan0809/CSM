import React from 'react'
import SelectHeader from '../components/SelectHeader'

const Header = () => {

    const [agentList, setAgentList] = React.useState([{ title: 'Đại lý 1', value: 'agent 1' }])
    const [warehouseList, setWarehouseList] = React.useState([{ title: 'Kho 1', value: 'warehouse 1' }])

    // React.useEffect(() => {

    // }, [])

    return (
        <div style={{display: 'flex'}}>
            <SelectHeader label={`Đại lý`} itemList={agentList} />
            <SelectHeader label={`Kho`} itemList={warehouseList} />
        </div>
    )
}

export default Header