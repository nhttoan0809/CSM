import React from "react";
import convertPosToReaclPos from "./convertPosToReaclPos";

const convertToFakeSenPos = (position) => {
  // console.log("before convert: ", position);
  let newPos = convertPosToReaclPos(position);
  // console.log("convert to real: ", position);
  newPos = newPos.map((i) => (parseInt(i) === 0 ? parseInt(i) : parseInt(i) - 4));
  // console.log("after convert: ", `${newPos[0]}-${newPos[1]}-${newPos[2]}`);
  return `${newPos[0]}-${newPos[1]}-${newPos[2]}`;
};

export default convertToFakeSenPos;
