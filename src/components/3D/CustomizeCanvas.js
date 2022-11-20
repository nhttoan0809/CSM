import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function CustomizeCanvas({ children }) {
  return (
    <Suspense fallback={null}>
      <Canvas shadows flat linear>
        <color attach="background" args={["#fefefe"]} />
        <fog attach="fog" args={["#fefefe", 0.1, 2000]} />
        <group dispose={null}>{children}</group>
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
}
