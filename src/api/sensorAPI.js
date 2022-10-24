import axiosClient from "./axiosClient";
import qs from "qs";

const sensorAPI = {
  // [GET] agent/:id_agent/warehouse/:id_warehouse/sensor/get_all
  path_get_all: `[GET] agent/:id_agent/warehouse/:id_warehouse/sensor/get_all`,
  get_all: async (id_agent, id_warehouse) => {
    const data = await axiosClient.get(
      `agent/${id_agent}/warehouse/${id_warehouse}/sensor/get_all`
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/sensor/:id_sensor/assign
  path_assign: `[POST] agent/:id_agent/warehouse/:id_warehouse/sensor/:id_sensor/assign`,
  assign: async (id_agent, id_warehouse, id_sensor, position) => {
    const body = {
      position,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/sensor/${id_sensor}/assign`,
      qs.stringify(body)
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/sensor/:id_sensor/update_position
  path_update_position: `[POST] agent/:id_agent/warehouse/:id_warehouse/sensor/:id_sensor/update_position`,
  update_position: async (id_agent, id_warehouse, id_sensor, position) => {
    const body = {
      position,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/sensor/${id_sensor}/update_position`,
      qs.stringify(body)
    );
    return data;
  },

  // [DELETE] agent/:id_agent/warehouse/:id_warehouse/sensor/:id_sensor/remove
  path_remove: `[DELETE] agent/:id_agent/warehouse/:id_warehouse/sensor/:id_sensor/remove`,
  remove: async (id_agent, id_warehouse, id_sensor) => {
    const data = await axiosClient.delete(
      `agent/${id_agent}/warehouse/${id_warehouse}/sensor/${id_sensor}/remove`
    );
    return data;
  },
};

export default sensorAPI;
