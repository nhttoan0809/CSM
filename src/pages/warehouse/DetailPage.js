import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AddDrawer from "../../components/AddDrawer";
import BasicTable from "../../components/BasicTable";
import { setPalletList } from "../../redux/pallet";
import { setProductList } from "../../redux/product";
import { setCurrentTab } from "../../redux/tabs";
import * as api from "./../../api";

const headCellsPallet = [
  {
    id: "_id",
    alignRight: false,
    label: "ID",
  },
  {
    id: "is_used",
    alignRight: true,
    label: "Trang thai",
  },
  {
    id: "pallet_template_id",
    alignRight: true,
    label: "Template",
  },
];
const headCellsProduct = [
  {
    id: "_id",
    alignRight: false,
    label: "ID",
  },
  {
    id: "is_used",
    alignRight: true,
    label: "Trang thai",
  },
  {
    id: "width",
    alignRight: true,
    label: "Rong",
  },
  {
    id: "length",
    alignRight: true,
    label: "Dai",
  },
  {
    id: "height",
    alignRight: true,
    label: "Cao",
  },
];

const convertObjectListToRowsData = (
  headCells,
  objectList,
  beforeConvert,
  afterConvert
) => {
  let data = objectList;

  data = beforeConvert(data);

  const keys = headCells.map((cell) => cell.id);

  data = data.map((object) => {
    let newObject = {};
    keys.forEach((key) => {
      newObject[key] = object[key];
    });
    return newObject;
  });

  data = afterConvert(data);

  return data;
};

const WarehouseDetailPage = () => {
  const [expandedPallet, setExpandedPallet] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(false);

  const agentList = useSelector((state) => state.agent.agentList);
  const warehouseList = useSelector((state) => state.warehouse.warehouseList);
  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const currentWarehouse = useSelector(
    (state) => state.warehouse.currentWarehouse
  );
  const palletList = useSelector((state) => state.pallet.palletList);
  const productList = useSelector((state) => state.product.productList);

  const dispatch = useDispatch();

  const warehouseInformation = useMemo(() => {
    if (currentAgent !== -1 && currentWarehouse !== -1) {
      const agent = agentList.filter((agent) => agent._id === currentAgent)[0];
      let warehouseInfor = warehouseList.filter(
        (warehouse) => warehouse.warehouse_id === currentWarehouse
      )[0];
      warehouseInfor = {
        ...warehouseInfor,
        owner: agent.agent_owner,
      };
      return warehouseInfor;
    }
  }, [currentWarehouse, currentAgent, warehouseList, agentList]);

  useEffect(() => {
    api.palletAPI.get_all(currentAgent, currentWarehouse).then((data) => {
      if (data.status === "Successfully") {
        dispatch(setPalletList(data.data));
      } else {
        dispatch(setPalletList([]));
      }
    });
    api.productAPI.get_all(currentAgent, currentWarehouse).then((data) => {
      if (data.status === "Successfully") {
        dispatch(setProductList(data.data));
      } else {
        dispatch(setProductList([]));
      }
    });
  }, [currentAgent, currentWarehouse, dispatch]);

  if (currentWarehouse === -1) {
    return <Navigate to="/agent" replace={true} />;
  }

  return (
    <>
      {/* <AddDrawer
        text={`+`}
        title={`Thêm Kho`}
        handleFunc={async () => {
          // await fetch();
          console.log("handle Them kho");
        }}
      >
        Noi dung cua Them kho
      </AddDrawer> */}

      {currentWarehouse !== -1 && (
        <>
          <Box sx={{ textAlign: "left", width: "100%" }}>
            <h1>Thông tin chi tiết kho</h1>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  minWidth: "9rem",
                  textAlign: "right",
                  marginRight: "2rem",
                }}
              >
                Kho:
              </h3>
              <Typography sx={{ flex: 1, fontSize: "2rem" }}>
                {warehouseInformation.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  minWidth: "9rem",
                  textAlign: "right",
                  marginRight: "2rem",
                }}
              >
                Địa chỉ:
              </h3>
              <Typography sx={{ flex: 1, fontSize: "1.3rem" }}>
                {warehouseInformation.address}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  minWidth: "9rem",
                  textAlign: "right",
                  marginRight: "2rem",
                }}
              >
                Kích thước:
              </h3>
              <Typography sx={{ flex: 1, fontSize: "1.3rem" }}>
                {`${warehouseInformation.width}:${warehouseInformation.length}:${warehouseInformation.height}`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  minWidth: "9rem",
                  textAlign: "right",
                  marginRight: "2rem",
                }}
              >
                Chủ sở hữu:
              </h3>
              <Typography sx={{ flex: 1, fontSize: "2rem" }}>
                {warehouseInformation.owner}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: "left", width: "100%" }}>
            <h1>Các thông tin khác</h1>
          </Box>
          {/* Pallet Table */}
          <Accordion
            expanded={expandedPallet}
            onChange={() => {
              setExpandedPallet(!expandedPallet);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Pallet</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {palletList.length !== 0 ? (
                <BasicTable
                  headCells={headCellsPallet}
                  rows={convertObjectListToRowsData(
                    headCellsPallet,
                    [...palletList],
                    (newPalletList) => newPalletList,
                    (newPalletList) => {
                      newPalletList.forEach((pallet) => {
                        if (pallet.is_used === true) {
                          pallet.is_used = "Dang su dung";
                        } else {
                          pallet.is_used = "San sang";
                        }
                      });
                      return newPalletList;
                    }
                  )}
                />
              ) : (
                <h3>Không có sẵn pallet</h3>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Product Table */}
          <Accordion
            expanded={expandedProduct}
            onChange={() => {
              setExpandedProduct(!expandedProduct);
            }}
            sx={{ marginTop: "1rem" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Hàng hóa</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {productList.length !== 0 ? (
                <BasicTable
                  headCells={headCellsProduct}
                  rows={convertObjectListToRowsData(
                    headCellsProduct,
                    [...productList],
                    (oldProductList) => {
                      let newProductList = oldProductList.map((product) => {
                        return {
                          ...product,
                          is_used: product.position
                            ? "Dang su dung"
                            : "San sang",
                        };
                      });
                      return newProductList;
                    },
                    (newProductList) => newProductList
                  )}
                />
              ) : (
                <h3>Không có sẵn hàng hóa</h3>
              )}
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  );
};

export default WarehouseDetailPage;
