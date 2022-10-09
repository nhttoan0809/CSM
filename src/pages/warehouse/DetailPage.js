import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import EnhancedTable from "./../../components/Table";

const WarehouseDetailPage = () => {
  useEffect(() => {
    fetch("http://localhost:5000/test_data/getAllWarehouse")
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data)
        
      });
  }, []);

  return (
    <>
      {/* <EnhancedTable /> */}
    </>
  );
};

export default WarehouseDetailPage;
