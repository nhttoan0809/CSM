import axiosClient from "./axiosClient";

const pallet_template = {
  // [GET] pallet_template/get_all
  // path_get_all: "[GET] pallet_template/get_all",
  get_all: async () => {
    const data = await axiosClient.get("pallet_template/get_all");
    return data;
  },
};

export default pallet_template;
