import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EnhancedTable from "../../components/Table";
import { setProductList } from "../../redux/product";
import * as api from "./../../api";

export const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Mô tả",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Vi tri",
  },
  {
    id: "width",
    numeric: true,
    disablePadding: false,
    label: "Rong",
  },
  {
    id: "length",
    numeric: true,
    disablePadding: false,
    label: "Dai",
  },
  {
    id: "height",
    numeric: true,
    disablePadding: false,
    label: "Cao",
  },
];

export const convertProductToRowsData = (productList) => {
  const keys = headCells.map((cell) => cell.id);

  const data = productList.map((product) => {
    let newProduct = {};
    keys.forEach((key) => {
      newProduct[key] = product[key];
    });
    return newProduct;
  });
  return data;
};

const GoodsDetailPage = () => {
  const id_agent = useSelector((state) => state.agent.currentAgent);
  const id_warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const productList = useSelector((state) => state.product.productList);

  const dispatch = useDispatch();

  useEffect(() => {
    api.productAPI.get_all(id_agent, id_warehouse).then((data) => {
      if (data.status === "Successfully") {
        dispatch(setProductList(data.data));
      } else {
        dispatch(setProductList([]));
      }
    });
  }, []);

  if (id_warehouse === -1) {
    return <Navigate to="/agent" replace={true} />;
  }

  return (
    <>
      {/* Title */}
      {/* <Typography>Chi tiết của hàng hóa</Typography> */}
      <EnhancedTable
        title={{ id: `Goods`, name: "Hang hoa" }}
        headCells={headCells}
        rows={convertProductToRowsData(productList)}
      />
    </>
  );
};

export default GoodsDetailPage;
