export default (warehouseSize, palletSize) => {
  const [whPosX, whPosZ, whPosY] = warehouseSize;
  const [paPosX, paPosZ, paPosY] = palletSize;
  return [
    -whPosX / 2 + paPosX / 2,
    -whPosY / 2 + (paPosY + 2) / 2,
    -whPosZ / 2 + paPosZ / 2,
  ];
};
