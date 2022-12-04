export default (pos) => {
  if (!pos) return;
  return pos.split("-").map((val) => parseFloat(val));
};
