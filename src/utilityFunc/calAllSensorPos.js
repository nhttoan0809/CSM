export default (wah) => {
  let pos = [];
  pos[0] = {
    x: 0,
    z: 0,
    y: 0,
  };
  pos[1] = {
    x: wah.length-1,
    z: 0,
    y: 0,
  };
  pos[2] = {
    x: wah.length-1,
    z: wah.width-1,
    y: 0,
  };
  pos[3] = {
    x: 0,
    z: wah.width-1,
    y: 0,
  };
  pos[4] = {
    x: 0,
    z: 0,
    y: wah.height-1,
  };
  pos[5] = {
    x: wah.length-1,
    z: 0,
    y: wah.height-1,
  };
  pos[6] = {
    x: wah.length-1,
    z: wah.width-1,
    y: wah.height-1,
  };
  pos[7] = {
    x: 0,
    z: wah.width-1,
    y: wah.height-1,
  };
  return pos;
};
