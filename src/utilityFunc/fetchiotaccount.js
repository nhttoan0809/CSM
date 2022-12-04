import { setIotAccountList } from "../redux/iotAccount";
import * as api from "./../api";

export default (idAgent, idWarehouse, dispatch) => {
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
        console.log("erro");
        dispatch(setIotAccountList([]));
      }
    };

    load_data();
  } else {
    dispatch(setIotAccountList([]));
  }
};
