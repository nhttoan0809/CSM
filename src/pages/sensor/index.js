import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BasicTabs from "../../components/Tabs";
import { setCurrentTab } from "../../redux/tabs";
import * as api from "./../../api";
import { setIotAccountList } from "../../redux/iotAccount";

const tabsList = [
  {
    title: "Chi tiet",
    url: "detail",
  },
  {
    title: "Cau hinh",
    url: "config",
  },
];

const SensorPage = () => {
  const idAgent = useSelector((state) => state.agent.currentAgent);
  const idWarehouse = useSelector((state) => state.warehouse.currentWarehouse);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/sensor") {
      navigate(tabsList[0].url);
    }
  });

  // useEffect(() => {
  //   const load_data = async () => {
  //     const allDataList = [];
  //     try {
  //       console.log("iotAccountList: ", iotAccountList);
  //       const iotAccountListPromise = iotAccountList.map(async (account) => {
  //         return await api.stationAPI
  //           .get_all(idAgent, idWarehouse, account.iotAccount_id)
  //           .then(async (res) => {
  //             if (res.status === "Successfully") {
  //               const stationList = res.data;
  //               const sensorListPromise = stationList.map(async (station) => {
  //                 return await api.sensorAPI
  //                   .get_all(
  //                     idAgent,
  //                     idWarehouse,
  //                     account.iotAccount_id,
  //                     station._id
  //                   )
  //                   .then((res) => {
  //                     return {
  //                       ...station,
  //                       sensorList:
  //                         res.status === "Successfully" ? res.data : [],
  //                     };
  //                   });
  //               });
  //               const resSensorList = await Promise.all(sensorListPromise);
  //               return {
  //                 ...account,
  //                 stationList: resSensorList,
  //               };
  //             }
  //             return {
  //               ...account,
  //               stationList: [],
  //             };
  //           });
  //       });

  //       const data = await Promise.all(iotAccountListPromise);
  //       setAllDataSensor(data);
  //     } catch (error) {
  //       console.log("error: ", error);
  //       setAllDataSensor([]);
  //     }
  //   };

  //   load_data();
  // }, [idAgent, idWarehouse, iotAccountList]);

  useEffect(() => {
    if (idWarehouse !== -1) {
      const load_data = async () => {
        try {
          const resIotAccount = await api.iotAccountAPI.get_all(
            idAgent,
            idWarehouse
          );

          if (resIotAccount.status !== "Successfully") {
            return dispatch(setIotAccountList([]));
          }

          let iotAccountList = resIotAccount.data;

          const iotAccountListPromise = iotAccountList.map(async (account) => {
            return await api.stationAPI
              .get_all(idAgent, idWarehouse, account.iotAccount_id)
              .then(async (res) => {
                if (res.status === "Successfully") {
                  const stationList = res.data;
                  const sensorListPromise = stationList.map(async (station) => {
                    return await api.sensorAPI
                      .get_all(
                        idAgent,
                        idWarehouse,
                        account.iotAccount_id,
                        station._id
                      )
                      .then((res) => {
                        return {
                          ...station,
                          sensorList:
                            res.status === "Successfully" ? res.data : [],
                        };
                      });
                  });
                  const resSensorList = await Promise.all(sensorListPromise);
                  return {
                    ...account,
                    stationList: resSensorList,
                  };
                }
                return {
                  ...account,
                  stationList: [],
                };
              });
          });

          iotAccountList = await Promise.all(iotAccountListPromise);
          dispatch(setIotAccountList(iotAccountList));
        } catch (error) {
          console.log('erro')
          dispatch(setIotAccountList([]));
        }
      };

      load_data();
    } else {
      dispatch(setIotAccountList([]));
    }
  }, [idAgent, idWarehouse, dispatch]);

  useEffect(() => {
    dispatch(setCurrentTab("sensor"));
  }, []);

  return (
    <>
      {/* Title */}
      <Typography variant="h3">Cảm biến</Typography>
      <BasicTabs tabsList={tabsList} />
    </>
  );
};

export default SensorPage;
