import axiosClient from "./axiosClient";
import qs from "qs";

const agentAPI = {

  // [GET] agent/get_all
  get_all: async () => {
    const data = await axiosClient.get("agent/get_all");
    return data;
  },

  // [POST] agent/add
  // path_add_agent: "[POST] agent/add",
  add: async (agent_name, agent_owner, id_company) => {
    const body = {
      agent_name,
      agent_owner,
      id_company,
    };
    const data = await axiosClient.post("agent/add", qs.stringify(body));
    return data;
  },

  // [POST] agent/:id_agent/update
  // path_update: "[POST] agent/:id_agent/update",
  update: async (id_agent, agent_name, agent_owner) => {
    const body = {
      agent_name,
      agent_owner,
    };
    const data = await axiosClient.post(
      `agent/${id_agent}/update`,
      qs.stringify(body)
    );
    return data;
  },

  // [DELETE] agent/:id_agent/delete
  // path_delete: "[GET] agent/:id_agent/delete",
  delete: async (id_agent) => {
    const data = await axiosClient.delete(`agent/${id_agent}/delete`);
    return data;
  },
};

export default agentAPI;
