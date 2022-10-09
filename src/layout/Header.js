import React, { useEffect, useState } from "react";
import SelectHeader from "../components/SelectHeader";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWarehouse, setWarehouseList } from "../redux/warehouse";
import { setCurrentAgent } from "../redux/agent";
import Account from './../components/Account'

const convertAgentList = (agentList) => {
  let newAgentList =
    agentList.length === 0
      ? []
      : agentList.map((agent) => ({
        value: agent.agent_id,
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
        value: warehouse.warehosue_id,
        title: warehouse.warehosue_name,
      }));
  newWarehouseList.push({ value: -1, title: "None" });
  return newWarehouseList;
};

const Header = () => {
  const agentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);

  const dispatch = useDispatch();

  const handleChangeSelectAgent = (agentId) => {
    dispatch(setCurrentAgent(agentId));
    // Handle get warehouseList
    let newWarehouseList = [];
    fetch("http://localhost:5000/test_data/getAllWarehouse")
      .then((response) => response.json())
      .then((data) => {
        newWarehouseList = [...data.data];
        dispatch(setWarehouseList(newWarehouseList));
      });
  };

  const handleChangeSelectWarehouse = (warehouseId) => {
    dispatch(setCurrentWarehouse(warehouseId));
  };

  return (
    <div style={{flex: 1, display: 'flex', justifyContent: 'space-between'}}>
      <div style={{ display: "flex" }}>
        <SelectHeader
          label={`Đại lý`}
          itemList={convertAgentList(agentList)}
          handleChangeSelect={handleChangeSelectAgent}
        />
        <SelectHeader
          label={`Kho`}
          itemList={convertWarehouseList(warehouseList)}
          handleChangeSelect={handleChangeSelectWarehouse}
        />
      </div>
      <div>
        <Account name="Toan Nguyen"/>
      </div>
    </div>
  );
};

export default Header;
