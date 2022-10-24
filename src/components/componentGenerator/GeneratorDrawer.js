import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UpdateGoods from "./Goods/UpdateGoods";
import DeletePallet from "./Pallet/DeletePallet";
import UpdatePallet from "./Pallet/UpdatePallet";
import UpdateSensor from "./Sensor/UpdateSensor";

const GeneratorDrawer = () => {
  const { type, action, data } = useSelector((state) => state.drawer.drawerTab);

  if (type === "Pallet") {
    if (action === "Update") {
      return <UpdatePallet data={data} />;
    } else if (action === "Delete") {
      return <DeletePallet data={data} />;
    }
  } else if (type === "Goods") {
    if (action === "Update") {
      return <UpdateGoods data={data} />;
    }
  } else if (type === "Sensor") {
    if (action === "Update") {
      return <UpdateSensor data={data} />;
    }
  }
};

export default GeneratorDrawer;
