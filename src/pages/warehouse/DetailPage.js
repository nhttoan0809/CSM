import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import EnhancedTable from "./../../components/Table";
import * as api from './../../api'
import { useSelector } from "react-redux";

const WarehouseDetailPage = () => {

  useEffect(() => {
    // const res = api.warehouseAPI.get_all(currentAgent)
    // res.then(data => {
    //   if(data.status === "Successfully"){
    //     console.log('data warehouse: ', data.data)
    //   }
    // })
  }, []);

  return (
    <>
      {/* <EnhancedTable /> */}
    </>
  );
};

export default WarehouseDetailPage;
