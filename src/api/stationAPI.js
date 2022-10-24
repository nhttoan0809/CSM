import axiosClient from "./axiosClient";

const stationAPI = {
  // [GET] agent/:id_agent/warehouse/:id_warehouse/station/connect
  path_connect: `[GET] agent/:id_agent/warehouse/:id_warehouse/station/connect`,
  connect: async (id_agent, id_warehouse, iot_username, iot_password) => {
    const data = await axiosClient.get(
      `agent/${id_agent}/warehouse/${id_warehouse}/station/connect?iot_username=${iot_username}&iot_password=${iot_password}`
    );
    return data;
  },

  // [DELETE] agent/:id_agent/warehouse/:id_warehouse/station/:id_station/disconnect
  path_disconnect: `[DELETE] agent/:id_agent/warehouse/:id_warehouse/station/:id_station/disconnect`,
  disconnect: async (id_agent, id_warehouse, id_station) => {
    const data = await axiosClient.delete(
      `agent/${id_agent}/warehouse/${id_warehouse}/station/${id_station}/disconnect`
    );
    return data;
  },
};

export default stationAPI;
