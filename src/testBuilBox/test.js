class TemperatureBox {
  constructor(Box) {
    this.size = Box.size;
    this.position = Box.position;
    this.A = {
      x: this.position.x - this.size.length / 2 + 0.5,
      z: this.position.z - this.size.width / 2 + 0.5,
      y: this.position.y - this.size.height / 2 + 0.5,
    };
    this.a = {
      x: this.position.x - this.size.length / 2 + 0.5,
      z: this.position.z - this.size.width / 2 + 0.5,
      y: this.position.y + this.size.height / 2 - 0.5,
    };
    this.B = {
      x: this.position.x + this.size.length / 2 - 0.5,
      z: this.position.z - this.size.width / 2 + 0.5,
      y: this.position.y - this.size.height / 2 + 0.5,
    };
    this.b = {
      x: this.position.x + this.size.length / 2 - 0.5,
      z: this.position.z - this.size.width / 2 + 0.5,
      y: this.position.y + this.size.height / 2 - 0.5,
    };
    this.C = {
      x: this.position.x + this.size.length / 2 - 0.5,
      z: this.position.z + this.size.width / 2 - 0.5,
      y: this.position.y - this.size.height / 2 + 0.5,
    };
    this.c = {
      x: this.position.x + this.size.length / 2 - 0.5,
      z: this.position.z + this.size.width / 2 - 0.5,
      y: this.position.y + this.size.height / 2 - 0.5,
    };
    this.D = {
      x: this.position.x - this.size.length / 2 + 0.5,
      z: this.position.z + this.size.width / 2 - 0.5,
      y: this.position.y - this.size.height / 2 + 0.5,
    };
    this.d = {
      x: this.position.x - this.size.length / 2 + 0.5,
      z: this.position.z + this.size.width / 2 - 0.5,
      y: this.position.y + this.size.height / 2 - 0.5,
    };
    this.ABCD = {
      constPos: {
        type: "y",
        value: this.position.y - this.size.height / 2 + 0.5,
      },
      start: {
        x: this.position.x - this.size.length / 2 + 0.5,
        z: this.position.z - this.size.width / 2 + 0.5,
      },
      end: {
        x: this.position.x + this.size.length / 2 - 0.5,
        z: this.position.z + this.size.width / 2 - 0.5,
      },
    };
    this.abcd = {
      constPos: {
        type: "y",
        value: this.position.y + this.size.height / 2 - 0.5,
      },
      start: {
        x: this.position.x - this.size.length / 2 + 0.5,
        z: this.position.z - this.size.width / 2 + 0.5,
      },
      end: {
        x: this.position.x + this.size.length / 2 - 0.5,
        z: this.position.z + this.size.width / 2 - 0.5,
      },
    };
    this.ABba = {
      constPos: {
        type: "z",
        value: this.position.z - this.size.width / 2 + 0.5,
      },
      start: {
        x: this.position.x - this.size.length / 2 + 0.5,
        y: this.position.y + this.size.height / 2 - 0.5,
      },
      end: {
        x: this.position.x + this.size.length / 2 - 0.5,
        y: this.position.y - this.size.height / 2 + 0.5,
      },
    };
    this.DCcd = {
      constPos: {
        type: "z",
        value: this.position.z + this.size.width / 2 - 0.5,
      },
      start: {
        x: this.position.x - this.size.length / 2 + 0.5,
        y: this.position.y + this.size.height / 2 - 0.5,
      },
      end: {
        x: this.position.x + this.size.length / 2 - 0.5,
        y: this.position.y - this.size.height / 2 + 0.5,
      },
    };
    this.BCcb = {
      constPos: {
        type: "x",
        value: this.position.x + this.size.length / 2 - 0.5,
      },
      start: {
        y: this.position.y + this.size.height / 2 - 0.5,
        z: this.position.z + this.size.width / 2 - 0.5,
      },
      end: {
        y: this.position.y - this.size.height / 2 + 0.5,
        z: this.position.z - this.size.width / 2 + 0.5,
      },
    };
    this.ADda = {
      constPos: {
        type: "x",
        value: this.position.x - this.size.length / 2 + 0.5,
      },
      start: {
        y: this.position.y + this.size.height / 2 - 0.5,
        z: this.position.z + this.size.width / 2 - 0.5,
      },
      end: {
        y: this.position.y - this.size.height / 2 + 0.5,
        z: this.position.z - this.size.width / 2 + 0.5,
      },
    };
  }

  buildABCDMatrix() {
    let nodeList = [];
    const staz = this.ABCD.start.z;
    const endz = this.ABCD.end.z;
    const stax = this.ABCD.start.x;
    const endx = this.ABCD.end.x;
    const y = this.ABCD.constPos.value;
    for (let z = staz; z <= endz; z++) {
      for (let x = stax; x <= endx; x++) {
        nodeList.push([x, z, y]);
      }
    }
    return nodeList;
  }
  buildabcdMatrix() {
    let nodeList = [];
    const staz = this.abcd.start.z;
    const endz = this.abcd.end.z;
    const stax = this.abcd.start.x;
    const endx = this.abcd.end.x;
    const y = this.abcd.constPos.value;
    for (let z = staz; z <= endz; z++) {
      for (let x = stax; x <= endx; x++) {
        nodeList.push([x, z, y]);
      }
    }
    return nodeList;
  }
  buildABbaMatrix() {
    let nodeList = [];
    const stax = this.ABba.start.x;
    const endx = this.ABba.end.x;
    const stay = this.ABba.start.y;
    const endy = this.ABba.end.y;
    const z = this.ABba.constPos.value;
    for (let x = stax; x <= endx; x++) {
      for (let y = stay; y >= endy; y--) {
        nodeList.push([x, z, y]);
      }
    }
    return nodeList;
  }
  buildDCcdMatrix() {
    let nodeList = [];
    const stax = this.DCcd.start.x;
    const endx = this.DCcd.end.x;
    const stay = this.DCcd.start.y;
    const endy = this.DCcd.end.y;
    const z = this.DCcd.constPos.value;
    for (let x = stax; x <= endx; x++) {
      for (let y = stay; y >= endy; y--) {
        nodeList.push([x, z, y]);
      }
    }
    return nodeList;
  }
  buildBCcbMatrix() {
    let nodeList = [];
    const stay = this.BCcb.start.y;
    const endy = this.BCcb.end.y;
    const staz = this.BCcb.start.z;
    const endz = this.BCcb.end.z;
    const x = this.BCcb.constPos.value;
    for (let y = stay; y >= endy; y--) {
      for (let z = staz; z >= endz; z--) {
        nodeList.push([x, z, y]);
      }
    }
    return nodeList;
  }
  buildADdaMatrix() {
    let nodeList = [];
    const stay = this.ADda.start.y;
    const endy = this.ADda.end.y;
    const staz = this.ADda.start.z;
    const endz = this.ADda.end.z;
    const x = this.ADda.constPos.value;
    for (let y = stay; y >= endy; y--) {
      for (let z = staz; z >= endz; z--) {
        nodeList.push([x, z, y]);
      }
    }
    return nodeList;
  }

  buildAllFace() {
    const ABCD = this.buildABCDMatrix();
    const abcd = this.buildabcdMatrix();
    const ABba = this.buildABbaMatrix();
    const DCcd = this.buildDCcdMatrix();
    const BCcb = this.buildBCcbMatrix();
    const ADda = this.buildADdaMatrix();
    return [ABCD, abcd, ABba, DCcd, BCcb, ADda];
  }
}

const Box = {
  size: {
    length: 4,
    width: 4,
    height: 4,
  },
  position: {
    x: 3,
    z: 3,
    y: 3,
  },
};

const tempBox = new TemperatureBox(Box);
console.log("############ TEST TEMPARETURE BOX ############");
// console.log("all face: ", tempBox.buildAllFace());
// tempBox.calInterpoolAt();

const demoWahPos = {
  length: 5,
  width: 2,
  height: 2,
};

const calAllSensorPos = (wah) => {
  let pos = [];
  pos[0] = {
    x: 0,
    z: 0,
    y: 0,
  };
  pos[1] = {
    x: wah.length - 1,
    z: 0,
    y: 0,
  };
  pos[2] = {
    x: wah.length - 1,
    z: wah.width - 1,
    y: 0,
  };
  pos[3] = {
    x: 0,
    z: wah.width - 1,
    y: 0,
  };
  pos[4] = {
    x: 0,
    z: 0,
    y: wah.height - 1,
  };
  pos[5] = {
    x: wah.length - 1,
    z: 0,
    y: wah.height - 1,
  };
  pos[6] = {
    x: wah.length - 1,
    z: wah.width - 1,
    y: wah.height - 1,
  };
  pos[7] = {
    x: 0,
    z: wah.width - 1,
    y: wah.height - 1,
  };
  return pos;
};

const allSensorPos = calAllSensorPos(demoWahPos);
// console.log("all pos for wah with size 500-200-200: ", allSensorPos);
const allSensorPosAndValue = allSensorPos.map((sensor) => ({
  pos: {
    x: sensor.x,
    z: sensor.z,
    y: sensor.y,
  },
  value: Math.random() * 7 + 8,
}));
const testPoint = {
  x: 4.9,
  y: 1.9,
  z: 1.9,
};

const calInterpoolAt = ([A, B, C, D, a, b, c, d], posX) => {
  console.log("A: ", A);
  console.log("B: ", B);
  console.log("C: ", C);
  console.log("D: ", D);
  console.log("a: ", a);
  console.log("b: ", b);
  console.log("c: ", c);
  console.log("d: ", d);
  console.log("posX: ", posX);
  
  const x = posX.x - A.pos.x;
  const y = posX.y - A.pos.y;
  const z = posX.z - A.pos.z;

  console.log("x: ", x);
  console.log("y: ", y);
  console.log("z: ", z);

  const val =
    A.value * (1 - x) * (1 - y) * (1 - z) +
    B.value * x * (1 - y) * (1 - z) +
    C.value * x * (1 - y) * z +
    D.value * (1 - x) * (1 - y) * z +
    a.value * (1 - x) * y * (1 - z) +
    b.value * x * y * (1 - z) +
    c.value * x * y * z +
    d.value * (1 - x) * y * z;
  return val
};

console.log('value at position 25-25-25: ',  calInterpoolAt([...allSensorPosAndValue], testPoint))