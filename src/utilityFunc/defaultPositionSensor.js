export default (warehouseSize, sensorSize) => {
  const [whPosX, whPosZ, whPosY] = warehouseSize;
  const [seSizeX, seSizeZ, seSizeY] = sensorSize;
  return [
    -whPosX / 2 + seSizeX / 2,
    -whPosY / 2 + seSizeY / 2,
    -whPosZ / 2 + seSizeZ / 2,
  ];
};
