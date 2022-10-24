import axiosClient from "./axiosClient";
import qs from "qs";

const palletAPI = {
  // [GET] agent/:id_agent/warehouse/:id_warehouse/pallet/get_all
  // path_get_all: "[GET] agent/:id_agent/warehouse/:id_warehouse/pallet/get_all",
  get_all: async (id_agent, id_warehouse) => {
    const data = await axiosClient.get(
      `agent/${id_agent}/warehouse/${id_warehouse}/pallet/get_all`
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/pallet/import
  // path_import: `[POST] agent/:id_agent/warehouse/:id_warehouse/pallet/import`,
  import: async (id_agent, id_warehouse, pallet_template_id, description) => {
    const body = {
      pallet_template_id,
      description,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/pallet/import`,
      qs.stringify(body)
    );
    return data;
  },

  // [DELETE] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/delete
  // path_delete: `[DELETE] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/delete`,
  deleta_pallet: async (id_agent, id_warehouse, id_pallet) => {
    const data = await axiosClient.delete(
      `agent/${id_agent}/warehouse/${id_warehouse}/pallet/${id_pallet}/delete`
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/add_to_warehouse
  // path_add_to_warehouse: `[POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/add_to_warehouse`,
  add_to_warehouse: async (
    id_agent,
    id_warehouse,
    id_pallet,
    position,
    storage
  ) => {
    const body = {
      position,
      storage,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/pallet/${id_pallet}/add_to_warehouse`,
      qs.stringify(body)
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/remove_from_warehouse
  // path_remove_from_warehouse: `[POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/remove_from_warehouse`,
  remove_from_warehouse: async (id_agent, id_warehouse, id_pallet) => {
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/pallet/${id_pallet}/remove_from_warehouse`
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/update_information
  // path_update_information: `[POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/update_information`,
  update_information: async (
    id_agent,
    id_warehouse,
    id_pallet,
    description
  ) => {
    const body = {
      description,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/pallet/${id_pallet}/update_information`,
      qs.stringify(body)
    );
    return data;
  },

  // [POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/update_position
  // path_update_position: `[POST] agent/:id_agent/warehouse/:id_warehouse/pallet/:id_pallet/update_position`,
  update_position: async (id_agent, id_warehouse, id_pallet, position) => {
    const body = {
      position,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/warehouse/${id_warehouse}/pallet/${id_pallet}/update_position`,
      qs.stringify(body)
    );
    return data;
  },
};

export default palletAPI;
