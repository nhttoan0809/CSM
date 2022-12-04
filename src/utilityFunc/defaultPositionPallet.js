export default (warehouseSize, palletSize) => {
  const [whPosX, whPosZ, whPosY] = warehouseSize;
  const [paSizeX, paSizeZ, paSizeY] = palletSize;
  return [
    -whPosX / 2 + paSizeX / 2,
    -whPosY / 2 + (paSizeY + 2) / 2,
    -whPosZ / 2 + paSizeZ / 2,
  ];
};
