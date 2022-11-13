import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWarehouse, setWarehouseList } from "../redux/warehouse";
import { setCurrentAgent } from "../redux/agent";
import Account from './../components/Account'
import * as api from './../api'
import SelectHeaderAgent from "../components/SelectHeaderAgent";
import SelectHeaderWarehouse from "../components/SelectHeaderWarehouse";
import { setPalletList } from "../redux/pallet";
import { setProductList } from "../redux/product";

const convertAgentList = (agentList) => {
  let newAgentList =
    agentList.length === 0
      ? []
      : agentList.map((agent) => ({
        value: agent._id,
        title: agent.agent_name,
      }));
  newAgentList.push({ value: -1, title: "None" });
  return newAgentList
};

const convertWarehouseList = (warehouseList) => {
  let newWarehouseList =
    warehouseList.length === 0
      ? []
      : warehouseList.map((warehouse) => ({
        value: warehouse.warehouse_id,
        title: warehouse.name,
      }));
  newWarehouseList.push({ value: -1, title: "None" });
  return newWarehouseList;
};

const Header = () => {

  const inforUser = useSelector(state => state.user.infor)

  const dispatch = useDispatch();

  const currentAgent = useSelector(state => state.agent.currentAgent)
  const agentList = useSelector((state) => state.agent.agentList);
  const currentWarehouse = useSelector(state => state.warehouse.currentWarehouse)
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);

  useEffect(() => {
    // Handle get warehouseList
    const res = api.warehouseAPI.get_all(currentAgent)
    res.then(data => {
      if (data.status === "Successfully") {
        dispatch(setWarehouseList(data.data))
      }
    })
  }, [currentAgent])

  useEffect(() => {
    if (warehouseList.length > 0)
      dispatch(setCurrentWarehouse(warehouseList[0].warehouse_id))
  }, [warehouseList])

  useEffect(() => {
    if (currentWarehouse === -1) {
      dispatch(setPalletList([]));
      dispatch(setProductList([]));
    } else {
      api.palletAPI.get_all(currentAgent, currentWarehouse)
        .then(data => {
          if (data.status === "Successfully") {
            dispatch(setPalletList(data.data))
          } else {
            dispatch(setPalletList([]))
          }
        })
      api.productAPI.get_all(currentAgent, currentWarehouse)
        .then(data => {
          if (data.status === "Successfully") {
            dispatch(setProductList(data.data))
          } else {
            dispatch(setProductList([]))
          }
        })
    }
  }, [currentWarehouse])

  const handleChangeSelectAgent = (agentId) => {
    if (agentId === -1) {
      dispatch(setCurrentWarehouse(-1));
      dispatch(setCurrentAgent(-1));
      dispatch(setWarehouseList([]))
      return;
    }
    dispatch(setCurrentWarehouse(-1));
    dispatch(setCurrentAgent(agentId));
  };

  const handleChangeSelectWarehouse = (warehouseId) => {
    dispatch(setCurrentWarehouse(warehouseId));
  };

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: "flex", marginTop: '10px' }}>
        <SelectHeaderAgent
          label={`Đại lý`}
          itemList={convertAgentList(agentList)}
          handleChangeSelect={handleChangeSelectAgent}
        />
        <SelectHeaderWarehouse
          label={`Kho`}
          itemList={convertWarehouseList(warehouseList)}
          handleChangeSelect={handleChangeSelectWarehouse}
        />
      </div>
      <div>
        <Account name={inforUser?inforUser.name:"Error Error"} menu={true}/>
      </div>
    </div>
  );
};

export default Header;
