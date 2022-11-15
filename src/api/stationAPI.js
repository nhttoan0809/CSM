import axiosClient from "./axiosClient";

const stationAPI = {
  get_all: async (id_agent, id_warehouse, id_iot_account) => {
    const data = await axiosClient.get(
      `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/${id_iot_account}/station/get_all`
    );
    return data;
  },
};

export default stationAPI;
