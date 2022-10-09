import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EnhancedTable from "../../components/Table";
import { setPalletList } from "../../redux/pallet";

const headCells = [
  {
    id: 'pallet_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'pallet_template_id',
    numeric: false,
    disablePadding: false,
    label: 'Pallet mẫu',
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
    id: 'is_used',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'import_data',
    numeric: false,
    disablePadding: false,
    label: 'Ngày nhập',
  },
  {
    id: 'storage_start_data',
    numeric: false,
    disablePadding: false,
    label: 'Ngày SD',
  },
  {
    id: 'position',
    numeric: false,
    disablePadding: false,
    label: 'Vị trí',
  },
];

// const rows = []

const PalletDetailPage = () => {

  const rows = useSelector(state => state.pallet.palletList)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch("http://localhost:5000/test_data/getAllPallet")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data: ", data)
        const payloadCustomize = data.data.map((pallet)=>(
          {
            pallet_id: pallet.pallet_id,
            pallet_template_id: pallet.pallet_template_id,
            warehouse_id: pallet.warehouse_id,
            description: pallet.description,
            is_used: pallet.is_used,
            import_data: pallet.import_data,
            storage_start_data: pallet.storage_start_data,
            position: pallet.position,
          }
        ))
        dispatch(setPalletList(payloadCustomize))
      });
  }, []);

  return (
    <>
      {/* Title */}
      {/* <Typography>Chi tiết của pallet</Typography> */}
      <EnhancedTable headCells={headCells} rows={rows}/>
    </>
  );
};

export default PalletDetailPage;
