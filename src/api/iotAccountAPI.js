import qs from "qs";
import axiosClient from "./axiosClient";

const iotaccountAPI = {

    add: async (id_agent, id_warehouse, iot_username, iot_password) => {

        const body = {
            username: iot_username,
            password: iot_password,
        };
        const data = await axiosClient.post(
            `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/add`, qs.stringify(body)
        );
        return data;
    },

    get_all: async (id_agent, id_warehouse) => {
        const data = await axiosClient.get(
            `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/get_all`
        );
        return data;
    },


    remove: async (id_agent, id_warehouse, id_iot_account) => {
        const data = await axiosClient.delete(
            `agent/${id_agent}/warehouse/${id_warehouse}/iot_account/${id_iot_account}/remove`
        );
        return data;
    },
};

export default iotaccountAPI;
