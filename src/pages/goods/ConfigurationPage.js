import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Slider,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizeCanvas from "../../components/3D/CustomizeCanvas";
import Pallet401534Scene from "../../components/3D/Pallet401534Scene";
import Pallet601524Scene from "../../components/3D/Pallet601524Scene";
import Pallet601534Scene from "../../components/3D/Pallet601534Scene";
import ProductScene from "../../components/3D/ProductScene";
import { SIZE401534, SIZE601524, SIZE601534 } from "../../constant/pallet";
import { setProductList } from "../../redux/product";
import convertPosToReaclPos from "../../utilityFunc/convertPosToReaclPos";
import * as api from "./../../api";

const GeneratePallet = ({ pallet }) => {
  const type = `${pallet.length}-${pallet.width}-${pallet.height}`;
  switch (type) {
    case SIZE401534:
      return <Pallet401534Scene useCamera={true} />;
    case SIZE601524:
      return <Pallet601524Scene useCamera={true} />;
    case SIZE601534:
      return <Pallet601534Scene useCamera={true} />;
    default:
      return <></>;
  }
};

const UpdatePositionComp = ({
  product,
  isSelected,
  onSelect,
  onChange,
  paramsToUpdate,
}) => {
  const dispatch = useDispatch();

  const [pushMessage, setPushMessage] = useState(false);
  useEffect(() => {
    if (pushMessage) {
      setTimeout(() => {
        setPushMessage(false);
      }, 5000);
    }
  }, [pushMessage]);
  return (
    <>
      <Button
        sx={{ fontSize: ".85rem" }}
        onClick={() => {
          onSelect(isSelected);
        }}
      >
        {`ID: ${product._id}`}
      </Button>
      {isSelected && (
        <>
          <Box sx={{ padding: "0 2rem", marginBottom: "1rem" }}>
            Toa do diem X: {convertPosToReaclPos(product.position)[0]}
            <Slider
              value={convertPosToReaclPos(product.position)[0]}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              onChange={(event) => {
                const newProduct = { ...product };
                newProduct.position = `${event.target.value}-${
                  convertPosToReaclPos(product.position)[1]
                }-${convertPosToReaclPos(product.position)[2]}`;
                onChange(newProduct);
              }}
            />
            Toa do diem Z: {convertPosToReaclPos(product.position)[1]}
            <Slider
              value={convertPosToReaclPos(product.position)[1]}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              onChange={(event) => {
                const newProduct = { ...product };
                newProduct.position = `${
                  convertPosToReaclPos(product.position)[0]
                }-${event.target.value}-${
                  convertPosToReaclPos(product.position)[2]
                }`;
                onChange(newProduct);
              }}
            />
            <Button
              sx={{ margin: "0 .2rem" }}
              variant="contained"
              color="error"
              onClick={async () => {
                const res = await api.productAPI.remove_from_pallet(
                  paramsToUpdate.id_agent,
                  paramsToUpdate.id_warehouse,
                  product._id
                );
                if (res.status === "Successfully") {
                  api.productAPI
                    .get_all(
                      paramsToUpdate.id_agent,
                      paramsToUpdate.id_warehouse
                    )
                    .then((data) => {
                      if (data.status === "Successfully") {
                        dispatch(setProductList(data.data));
                      } else {
                        dispatch(setProductList([]));
                      }
                    });
                } else {
                  console.log("failure");
                }
              }}
            >
              Go bo
            </Button>
            <Button
              sx={{ margin: "0 .2rem" }}
              variant="contained"
              onClick={async () => {
                const position = `${
                  convertPosToReaclPos(product.position)[0]
                }-${convertPosToReaclPos(product.position)[1]}-${
                  convertPosToReaclPos(product.position)[2]
                }`;
                const res = await api.productAPI.update_position(
                  paramsToUpdate.id_agent,
                  paramsToUpdate.id_warehouse,
                  product._id,
                  position
                );
                if (res.status === "Successfully") {
                  api.productAPI
                    .get_all(
                      paramsToUpdate.id_agent,
                      paramsToUpdate.id_warehouse
                    )
                    .then((data) => {
                      if (data.status === "Successfully") {
                        dispatch(setProductList(data.data));
                        setPushMessage(true);
                      } else {
                        dispatch(setProductList([]));
                      }
                    });
                } else {
                  console.log("failure");
                }
              }}
            >
              Cap nhat
            </Button>
          </Box>
          {pushMessage && (
            <Alert
              sx={{
                marginTop: ".5rem",
                display: "flex",
                justifyContent: "center",
              }}
              severity="success"
            >
              Cap nhat thanh cong!!!
            </Alert>
          )}
        </>
      )}
    </>
  );
};

const PalletListAccordion = ({
  pallet,
  selected,
  onClick,
  onChangeProduct,
  productList,
}) => {
  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const currentWarehouse = useSelector(
    (state) => state.warehouse.currentWarehouse
  );
  const [editingProduct, setEditingProduct] = useState(null);
  useEffect(() => {
    if (!selected) {
      setEditingProduct(null);
    }
  }, [selected]);

  return (
    <Box sx={{ padding: "0 .5rem", marginBottom: ".5rem" }}>
      <Accordion
        expanded={selected}
        onChange={() => {
          onClick();
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{pallet._id}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {productList.length < 1 ? (
            <p>Pallet nay ko co san pham</p>
          ) : (
            <>
              {productList.map((product, ind) => (
                <UpdatePositionComp
                  key={ind}
                  product={product}
                  isSelected={
                    editingProduct && editingProduct._id === product._id
                  }
                  onSelect={(isSelected) => {
                    if (isSelected) {
                      setEditingProduct(null);
                    } else {
                      setEditingProduct(product);
                    }
                  }}
                  onChange={(newProduct) => {
                    const newProductList = [...productList];
                    newProductList[ind] = newProduct;
                    onChangeProduct(newProductList);
                  }}
                  paramsToUpdate={{
                    id_agent: currentAgent,
                    id_warehouse: currentWarehouse,
                  }}
                />
              ))}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const SetupPositionComp = ({
  product,
  isSelected,
  onSelect,
  onChange,
  currentPallet,
  paramsToAdd,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        sx={{ fontSize: ".85rem" }}
        onClick={() => {
          onSelect(isSelected);
        }}
      >
        {`ID: ${product._id}`}
      </Button>
      {isSelected && (
        <Box sx={{ padding: "0 2rem", marginBottom: "1rem" }}>
          Toa do diem X: {convertPosToReaclPos(product.position)[0]}
          <Slider
            value={convertPosToReaclPos(product.position)[0]}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            onChange={(event) => {
              const newProduct = { ...product };
              newProduct.position = `${event.target.value}-${
                convertPosToReaclPos(product.position)[1]
              }-${convertPosToReaclPos(product.position)[2]}`;
              onChange(newProduct);
            }}
          />
          Toa do diem Y: {convertPosToReaclPos(product.position)[2]}
          <Slider
            value={convertPosToReaclPos(product.position)[2]}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            onChange={(event) => {
              const newProduct = { ...product };
              newProduct.position = `${
                convertPosToReaclPos(product.position)[0]
              }-${convertPosToReaclPos(product.position)[1]}-${
                event.target.value
              }`;
              onChange(newProduct);
            }}
          />
          Toa do diem Z: {convertPosToReaclPos(product.position)[1]}
          <Slider
            value={convertPosToReaclPos(product.position)[1]}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            onChange={(event) => {
              const newProduct = { ...product };
              newProduct.position = `${
                convertPosToReaclPos(product.position)[0]
              }-${event.target.value}-${
                convertPosToReaclPos(product.position)[2]
              }`;
              onChange(newProduct);
            }}
          />
          <Button
            sx={{ margin: "0 .2rem" }}
            disabled={currentPallet ? false : true}
            variant="contained"
            onClick={async () => {
              const position = `${convertPosToReaclPos(product.position)[0]}-${
                convertPosToReaclPos(product.position)[1]
              }-${convertPosToReaclPos(product.position)[2]}`;
              const res = await api.productAPI.add_to_pallet(
                paramsToAdd.id_agent,
                paramsToAdd.id_warehouse,
                product._id,
                currentPallet._id,
                position
              );
              if (res.status === "Successfully") {
                api.productAPI
                  .get_all(paramsToAdd.id_agent, paramsToAdd.id_warehouse)
                  .then((data) => {
                    if (data.status === "Successfully") {
                      dispatch(setProductList(data.data));
                      onSelect(true);
                    } else {
                      dispatch(setProductList([]));
                    }
                  });
              } else {
                console.log("failure");
              }
            }}
          >
            Them hang hoa
          </Button>
        </Box>
      )}
    </>
  );
};

const GoodsConfigurationPage = () => {
  const currentAgent = useSelector((state) => state.agent.currentAgent);
  const currentWarehouse = useSelector(
    (state) => state.warehouse.currentWarehouse
  );
  const palletList = useSelector((state) => state.pallet.palletList);
  const palletTemplateList = useSelector(
    (state) => state.pallet_template.palletTemplateList
  );
  const productList = useSelector((state) => state.product.productList);

  const usedPalletList = palletList.filter((pallet) => pallet.is_used);

  const usedPalletListWithSize = useMemo(() => {
    if (usedPalletList.length === 0) return [];

    let newPalletList = [...usedPalletList];
    newPalletList = newPalletList.map((pallet) => {
      const palletTemplate = palletTemplateList.filter((palletTemplate) => {
        return palletTemplate._id === pallet.pallet_template_id;
      })[0];
      return {
        ...pallet,
        length: palletTemplate.length,
        width: palletTemplate.width,
        height: palletTemplate.height,
      };
    });
    return newPalletList;
  }, [usedPalletList, palletTemplateList, productList]);

  const [currentPallet, setCurrentPallet] = useState(
    usedPalletListWithSize.length > 0 ? usedPalletListWithSize[0] : null
  );

  useEffect(() => {
    if (usedPalletList.length < 1) {
      setCurrentPallet(null);
    }
  }, [usedPalletList]);

  // useEffect(() => {
  //   if (usedPalletListWithSize.length === 0) setCurrentPallet(null);
  //   else {
  //     if(currentPallet===null) setCurrentPallet(usedPalletListWithSize[0])
  //     else{
  //       setCurrentPallet(
  //         usedPalletListWithSize.filter(
  //           (pallet) => pallet._id === currentPallet._id
  //         )[0] ?? null
  //       );
  //     }
  //   }
  // }, [usedPalletListWithSize]);

  const [usedProductList, unUsedProductList] = useMemo(() => {
    let usedProductList = [];
    let unUsedProductList = [];

    if (currentPallet) {
      usedProductList = productList.filter(
        (product) =>
          product.pallet_id && product.pallet_id === currentPallet._id
      );
    }
    unUsedProductList = productList.filter((product) => !product.pallet_id);

    return [usedProductList, unUsedProductList];
  }, [currentPallet, productList]);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentUsedProduct, setCurrentUsedProduct] = useState(null);
  const [tempUsedProductList, setTempUsedProductList] = useState([]);
  const [tempUnUsedProductList, setTempUnUsedProductList] = useState([]);

  useEffect(() => {
    setTempUsedProductList(usedProductList);
    setTempUnUsedProductList(
      unUsedProductList.map((product) => ({ ...product, position: "0-0-0" }))
    );
  }, [usedProductList, unUsedProductList]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "70vh",
          display: "flex",
          flex: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginRight: "2rem",
            minHeight: "600px",
            minWidth: "600px",
            flex: 1,
          }}
        >
          <CustomizeCanvas>
            {currentPallet && (
              <>
                <GeneratePallet pallet={currentPallet} />
                <hemisphereLight
                  name="Default Ambient Light"
                  intensity={0.75}
                  color="#eaeaea"
                />
                <directionalLight color="white" position={[0, 0, 5]} />
                <directionalLight color="white" position={[5, 0, 0]} />
                <directionalLight color="white" position={[-5, 0, 0]} />
                <directionalLight color="white" position={[0, 0, -5]} />
                <directionalLight color="white" position={[0, 5, 0]} />
                <directionalLight color="white" position={[0, -5, 0]} />
              </>
            )}
            {tempUsedProductList.length > 0 && (
              <>
                {tempUsedProductList.map((product, ind) => {
                  return <ProductScene key={ind} product={product} />;
                })}
              </>
            )}
            {currentProduct && <ProductScene product={currentProduct} />}
          </CustomizeCanvas>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            minWidth: "20rem",
            position: "relative",
            height: "70vh",
            overflow: "scroll",
            maxWidth: "27rem"
          }}
        >
          <h5>Danh Sách Pallet</h5>
          {usedPalletListWithSize.length > 0 ? (
            <>
              {usedPalletListWithSize.map((pallet, ind) => (
                <Box key={ind}>
                  <PalletListAccordion
                    pallet={pallet}
                    selected={currentPallet && pallet._id === currentPallet._id}
                    onClick={() => {
                      setCurrentPallet(pallet);
                    }}
                    productList={
                      currentPallet
                        ? pallet._id === currentPallet._id
                          ? tempUsedProductList
                          : []
                        : []
                    }
                    onChangeProduct={(newProductList) => {
                      setTempUsedProductList(newProductList);
                    }}
                  />
                </Box>
              ))}
            </>
          ) : (
            <p>Kho lanh nay khong co san pallet</p>
          )}
          <h5>Danh sach san pham chua duoc dung</h5>
          {tempUnUsedProductList.length > 0 && (
            <>
              {tempUnUsedProductList.map((product, ind) => {
                return (
                  <Box key={ind}>
                    <SetupPositionComp
                      product={product}
                      isSelected={
                        currentProduct && currentProduct._id === product._id
                      }
                      onSelect={(isSelected) => {
                        if (isSelected) {
                          setCurrentProduct(null);
                        } else {
                          setCurrentProduct(product);
                        }
                      }}
                      productList
                      onChange={(newProduct) => {
                        const newTempUnUsedProductList = [
                          ...tempUnUsedProductList,
                        ];
                        newTempUnUsedProductList[ind] = newProduct;
                        setTempUnUsedProductList(newTempUnUsedProductList);
                        setCurrentProduct(newProduct);
                      }}
                      currentPallet={currentPallet ?? null}
                      paramsToAdd={{
                        id_agent: currentAgent,
                        id_warehouse: currentWarehouse,
                      }}
                    />
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default GoodsConfigurationPage;
