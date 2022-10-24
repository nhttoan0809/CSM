import axiosClient from "./axiosClient";
import qs from "qs";

const companyAPI = {
  // [GET] auth/company/getInfor
  // path_getInfor: `[GET] auth/company/getInfor`,
  getInfor: async () => {
    const data = await axiosClient.get("auth/company/getInfor");
    return data;
  },

  // [POST] auth/company/update
  // path_update: `[POST] auth/company/update`,
  update: async (companyName, address) => {
    const body = {
      companyName,
      address,
    };
    const data = await axiosClient.post(
      "auth/company/update",
      qs.stringify(body)
    );
    return data;
  },
};

export default companyAPI;
