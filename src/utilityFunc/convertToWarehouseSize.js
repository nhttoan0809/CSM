import { SIZE522, SIZE523, SIZE422 } from "../constant/warehouse";

export default (sizeByString) => {
  switch (sizeByString) {
    case SIZE522:
      return {
        x: 500,
        z: 200,
        y: 200,
      };
    case SIZE523:
      return {
        x: 500,
        z: 200,
        y: 300,
      };
    case SIZE422:
      return {
        x: 400,
        z: 200,
        y: 200,
      };
    default:
      return {};
  }
};
