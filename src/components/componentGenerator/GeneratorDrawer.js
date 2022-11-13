import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UpdateGoods from "./Goods/UpdateGoods";
import ImportPallet from "./Pallet/ImportPallet";
import DeletePallet from "./Pallet/DeletePallet";
import UpdatePallet from "./Pallet/UpdatePallet";
import UpdateSensor from "./Sensor/UpdateSensor";
import ImportGoods from "./Goods/ImportGoods";
import ExportGoods from "./Goods/ExportGoods";
import AddAgent from "./Agent/AddAgent";
import DeleteAgent from "./Agent/DeleteAgent";
import AddWarehouse from "./Warehouse/AddWarehouse";
import DeleteWarehouse from "./Warehouse/DeleteWarehouse";

const GeneratorDrawer = () => {
  const { type, action, data } = useSelector((state) => state.drawer.drawerTab);

  if (type === "Pallet") {
    if (action === "Import") {
      return <ImportPallet />;
    } else if (action === "Update") {
      return <UpdatePallet data={data} />;
    } else if (action === "Delete") {
      return <DeletePallet data={data} />;
    }
  } else if (type === "Goods") {
    if (action === "Import") {
      return <ImportGoods />;
    } else if (action === "Update") {
      return <UpdateGoods data={data} />;
    } else if (action === "Export") {
      return <ExportGoods data={data} />;
    }
  } else if (type === "Sensor") {
    if (action === "Update") {
      return <UpdateSensor data={data} />;
    }
  } else if (type === "Agent") {
    if (action === "Add") {
      return <AddAgent />;
    }
    if (action === "Delete") {
      return <DeleteAgent data={data} />;
    }
  } else if (type === "Warehouse") {
    if (action === "Add") {
      return <AddWarehouse data={data} />;
    }
    if (action === "Delete") {
      return <DeleteWarehouse data={data} />;
    }
  }
};

export default GeneratorDrawer;
