import * as THREE from "three"
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react"
import { Avatar } from "./Avatar"
import { Office } from "./Office"
import { CatMia } from "./CatMia"
import { Mouse } from "./Mouse"
import { motion } from "framer-motion-3d"
import { animate, useMotionValue } from "framer-motion"
import { framerMotionConfig } from "../config";

export const Experience = (props) => {
  const mouseInstance = useMemo(() => new THREE.Group(), [])
  const [mouseMode, setMouseMode] = useState("desk")

  const { section, menuOpened } = props

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -4 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 4 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <motion.group position={[1, -0.5, 0]}
        animate={{
          x: menuOpened ? 1 : 0.7,
          y: menuOpened ? -0.2 : section === 0 ? -0.5 : -0.8,
          z: menuOpened ? 2 : 0,
        }}
      >
        <Suspense fallback={null}>
          <Office section={section} mouseObject={mouseInstance} mouseMode={mouseMode} />
          <Mouse object={mouseInstance} />
          <Avatar mouseObject={mouseInstance} mouseMode={mouseMode} setMouseMode={setMouseMode} />
          <CatMia />
        </Suspense>
      </motion.group>
    </>
  )
}
