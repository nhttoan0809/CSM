import React, { useEffect, useState } from "react";
import convertPosToReaclPos from "../../utilityFunc/convertPosToReaclPos";

const ProductScene = ({ product }) => {
  const [isClick, setIsClick] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [realPos, setRealPos] = useState([0, 0, 0]);
  useEffect(() => {
    setRealPos(convertPosToReaclPos(product.position));
  }, [product.position]);

  return (
    <>
      <mesh
        position={[realPos[0], realPos[2], realPos[1]]}
        onClick={() => {
          setIsClick(!isClick);
        }}
        onPointerOver={() => {
          setIsHover(true);
        }}
        onPointerOut={() => {
          setIsHover(false);
        }}
      >
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial
          color={isClick ? "#00daf5" : isHover ? "#00daf5" : "#7af973"}
        />
      </mesh>
    </>
  );
};

export default ProductScene;
