import qs from "qs";
import axiosClient from "./axiosClient";

const sensorAPI = {
  get_all: async (id_agent, id_warehouse, id_iot_account, id_station) => {
    const data = await axiosClient.get(
      `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/${id_iot_account}/station/${id_station}/sensor/get_all`
    );
    return data;
  },

  get_data: async (id_agent, id_warehouse, id_iot_account, id_station, id_sensor) => {
    const data = await axiosClient.get(
      `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/${id_iot_account}/station/${id_station}/sensor/${id_sensor}/get_data`
    );
    return data;
  },

  set_status: async (id_agent, id_warehouse, id_iot_account, id_station, id_sensor, status) => {
    const body = {
      status,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/${id_iot_account}/station/${id_station}/sensor/${id_sensor}/set_status`,
      qs.stringify(body)
    );
    return data;
  },

  set_position: async (id_agent, id_warehouse, id_iot_account, id_station, id_sensor, position) => {
    const body = {
      position,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/${id_iot_account}/station/${id_station}/sensor/${id_sensor}/set_position`,
      qs.stringify(body)
    );
    return data;
  },
};

export default sensorAPI;
