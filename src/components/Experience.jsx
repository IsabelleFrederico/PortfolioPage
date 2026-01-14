import { OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Office } from "./Office";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <group position-y={-1}>
        <Office />
        <Avatar />
        <ambientLight intensity={1} />
      </group>
    </>
  );
};
