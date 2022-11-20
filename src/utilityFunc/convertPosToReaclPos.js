export default (palletPos) => {
  return palletPos.split("-").map((val) => parseFloat(val));
};
