import axiosClient from "./axiosClient";
import qs from "qs";

const authAPI = {
  // [POST] auth/login
  // path_login: `[POST] auth/login`,
  login: async (username, password) => {
    const body = {
      username,
      password,
    };
    const data = await axiosClient.post("auth/login", qs.stringify(body));
    return data;
  },

  // [GET] auth/reLogin
  // path_reLogin: `[GET] auth/reLogin`,
  reLogin: async () => {
    const data = await axiosClient.get("auth/reLogin");
    return data;
  },

  // [GET] auth/logout
  // path_logout: `[GET] auth/logout`,
  logout: async () => {
    const data = await axiosClient.get("auth/logout");
    return data;
  },

  // [POST] auth/register
  // path_register: `[POST] auth/register`,
  register: async (username, password, name, email, companyName) => {
    const body = {
      username,
      password,
      name,
      email,
      companyName,
    };
    const data = await axiosClient.post("auth/register", qs.stringify(body));
    return data;
  },

  // [GET] auth/getInfor
  // path_getInfor: `auth/getInfor`,
  getInfor: async () => {
    const data = await axiosClient.get("auth/getInfor");
    return data;
  },

  // [POST] auth/updateInfor
  // path_updateInfor: `[POST] auth/updateInfor`,
  updateInfor: async (name, email) => {
    const body = {
      name,
      email,
    };
    const data = await axiosClient.post("auth/updateInfor", qs.stringify(body));
    return data;
  },
};

export default authAPI;
