import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EnhancedTable from "../../components/Table";
import { setPalletList } from "../../redux/pallet";
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
    id: "is_used",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "import_date",
    numeric: false,
    disablePadding: false,
    label: "Ngày nhập",
  },
  {
    id: "storage_start_date",
    numeric: false,
    disablePadding: false,
    label: "Ngày SD",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Vị trí",
  },
];

export const convertPalletToRowsData = (palletList) => {
  const keys = headCells.map((cell) => cell.id);

  const data = palletList.map((pallet) => {
    let newPallet = {};
    keys.forEach((key) => {
      newPallet[key] = pallet[key];
    });
    return newPallet;
  });

  return data;
};

const PalletDetailPage = () => {
  const id_agent = useSelector((state) => state.agent.currentAgent);
  const id_warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const palletList = useSelector((state) => state.pallet.palletList);

  const dispatch = useDispatch();

  useEffect(() => {
    api.palletAPI.get_all(id_agent, id_warehouse).then((data) => {
      if (data.status === "Successfully") {
        dispatch(setPalletList(data.data));
      } else {
        dispatch(setPalletList([]));
      }
    });
  }, []);

  if (id_warehouse === -1) {
    return <Navigate to="/agent" replace={true} />;
  }

  return (
    <>
      <EnhancedTable
        title={{ id: `Pallet`, name: `Pallet` }}
        headCells={headCells}
        rows={convertPalletToRowsData(palletList)}
      />
    </>
  );
};

export default PalletDetailPage;
