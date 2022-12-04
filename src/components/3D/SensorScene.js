import React from "react";
import convertPosToReaclPos from "../../utilityFunc/convertPosToReaclPos";
import convertToWarehouseSize from "../../utilityFunc/convertToWarehouseSize";
import defaultPositionSensor from "../../utilityFunc/defaultPositionSensor";

const SensorScene = ({ warehouseSize, sensor }) => {
  // if (!(warehouseSize && sensor.length > 0)) return <></>;
  const size = warehouseSize ? convertToWarehouseSize(warehouseSize) : null;
  console.log("warehouse size: ", size);
  let defPos = size
    ? defaultPositionSensor(Object.values(size), [5, 5, 5])
    : [0, 0, 0];
  console.log("sensor: ", sensor);
  const position = sensor ? convertPosToReaclPos(sensor.position) : [0, 0, 0];
  console.log("defPos: ", defPos);
  console.log("position: ", position);
  console.log(`${defPos[0] + position[0]}-${defPos[1] + position[2]}-${
    defPos[2] + position[1]
  }
  `);

  return (
    <>
      {defPos.length > 0 && position.length > 0 && (
        <mesh
          position={[
            defPos[0] + position[0],
            defPos[1] + position[2],
            defPos[2] + position[1],
          ]}
        >
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </>
  );
};

export default SensorScene;
