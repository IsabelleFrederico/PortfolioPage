import { OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Office } from "./Office";
import { CatMia } from "./CatMia";
import { Suspense } from "react";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <OrbitControls />
      <group position-y={-0.5}>
        <Suspense fallback={null}>
          <Office />
        </Suspense>
        <Avatar />
        <CatMia />
      </group>
    </>
  );
};
