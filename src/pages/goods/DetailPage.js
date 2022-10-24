import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EnhancedTable from "../../components/Table";
import { setProductList } from "../../redux/product";

const headCells = [
  {
    id: 'product_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'warehouse_id',
    numeric: false,
    disablePadding: false,
    label: 'ID kho',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Mô tả',
  },
  {
    id: 'pallet_id',
    numeric: false,
    disablePadding: false,
    label: 'ID Pallet',
  },
  {
    id: 'position',
    numeric: false,
    disablePadding: false,
    label: 'Vị trí',
  },
  {
    id: 'storage_time',
    numeric: false,
    disablePadding: false,
    label: 'TG lưu trữ',
  },
  {
    id: 'width',
    numeric: true,
    disablePadding: false,
    label: 'rộng',
  },
  {
    id: 'length',
    numeric: true,
    disablePadding: false,
    label: 'dài',
  },
  {
    id: 'height',
    numeric: true,
    disablePadding: false,
    label: 'cao',
  },
];

const GoodsDetailPage = () => {

  const rows = useSelector(state => state.product.productList)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch("http://localhost:5000/test_data/getAllProduct")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data: ", data)
        const payloadCustomize = data.data.map((goods) => (
          {
            "product_id": goods.product_id,
            "warehouse_id": goods.warehouse_id,
            "description": goods.description,
            "pallet_id": goods.pallet_id,
            "position": goods.position,
            "storage_time": goods.storage_time,
            "width": goods.width,
            "length": goods.length,
            "height": goods.height,
          }
        ))
        dispatch(setProductList(payloadCustomize))
      });
  }, []);

  return (
    <>
      {/* Title */}
      {/* <Typography>Chi tiết của hàng hóa</Typography> */}
      <EnhancedTable title={{id: `Goods`, name: 'Hang hoa'}} headCells={headCells} rows={rows} />
    </>
  );
};

export default GoodsDetailPage;
