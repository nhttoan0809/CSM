import axiosClient from "./axiosClient";
import qs from "qs";

const warehouseAPI = {
  // [GET] agent/:id_agent/warehouse/get_all
  // path_get_all: `[GET] agent/:id_agent/warehouse/get_all`,
  get_all: async (id_agent) => {
    const data = await axiosClient.get(`agent/${id_agent}/warehouse/get_all`);
    return data;
  },

  // [POST] agent/:id_agent/warehouse/add
  // path_add: `[POST] agent/:id_agent/warehouse/add`,
  add: async (id_agent, warehouse_name, address, length, width, height) => {
    const body = {
      warehouse_name,
      address,
      length,
      width,
      height,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/add`,
      qs.stringify(body)
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/update
  // path_update: `[POST] agent/:id_agent/warehouse/:id_warehouse/update`,
  update: async (
    id_agent,
    id_warehouse,
    warehouseName,
    address,
    length,
    width,
    height
  ) => {
    const body = {
      warehouseName,
      address,
      length,
      width,
      height,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/update`,
      qs.stringify(body)
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/import
  // path_import: `[POST] agent/:id_agent/warehouse/:id_warehouse/import`,
  import: async (
    id_agent,
    id_warehouse,
    description,
    width,
    length,
    height
  ) => {
    const body = {
      description,
      width,
      length,
      height,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/import`,
      qs.stringify(body)
    );
    return data;
  },

  // [DELETE] agent/:id_agent/warehouse/:id_warehouse/export
  // path_export: `[DELETE] agent/:id_agent/warehouse/:id_warehouse/export`,
  export: async (id_agent, id_warehouse, id_product) => {
    const body = { id_product };
    const data = await axiosClient.delete(
      `agent/${id_agent}/warehouse/${id_warehouse}/export`,
      qs.stringify(body)
    );
    return data;
  },

  // [DELETE] agent/:id_agent/warehouse/:id_warehouse/delete
  // path_delete: `[DELETE] agent/:id_agent/warehouse/:id_warehouse/delete`,
  delete: async (id_agent, id_warehouse) => {
    const data = await axiosClient.delete(
      `agent/${id_agent}/warehouse/${id_warehouse}/delete`
    );
    return data;
  },
};

export default warehouseAPI;
