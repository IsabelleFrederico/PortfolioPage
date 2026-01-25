import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Suspense, useEffect, useMemo, useState, useRef } from "react"
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
  const [preFalling, setPreFalling] = useState(false)

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

  const finalAvatarAnim =
    section === 0 ? "Typing"
      : section === 1 ? "Stretching"
        : section === 2 ? "Pointing"
          : "StandUp"

  const finalCatAnim =
    section === 0 ? "catbathing"
      : "Stretch"

  const [avatarAnim, setAvatarAnim] = useState(finalAvatarAnim)
  const [catAnim, setCatAnim] = useState(finalCatAnim)

  useEffect(() => {
    setPreFalling(true)

    const step1 = window.setTimeout(() => {
      setAvatarAnim("Falling")
      setCatAnim("Jump")

      const step2 = window.setTimeout(() => {
        setPreFalling(false)
        setAvatarAnim(finalAvatarAnim)
        setCatAnim(finalCatAnim)
      }, 600)

      return () => window.clearTimeout(step2)
    }, 200)

    return () => window.clearTimeout(step1)
  }, [section])

  const firstMotion = useRef(true)
  useEffect(() => {
    firstMotion.current = false
  }, [])

  const poses = {
    0: { x: 0, y: 0, z: 0, rotateY: 0 },
    1: { x: -1, y: -3.4, z: 0, rotateY: -1.5, scale: 2 },
    2: { x: -0.2, y: -1.2, z: 0.2, rotateY: -0.2 },
    3: { x: 0.0, y: -1.8, z: 0.3, rotateY: 0 },
  }

  const target = poses[section] ?? poses[0]

  return (
    <>
      <ambientLight intensity={1.5} />
      <motion.group position={[1, -0.5, 0]}
        animate={{
          x: menuOpened ? 1 : 0.7,
          y: menuOpened ? -0.2 : -0.5,
          z: menuOpened ? 2 : 0,
        }}
      >
        <Suspense fallback={null}>
          <Office section={section} mouseObject={mouseInstance} mouseMode={mouseMode} preFalling={preFalling} />
          <Mouse object={mouseInstance} />
          <motion.group
            initial={false}
            animate={target}
            transition={{ duration: 0.2 }}
          >
            <Avatar animation={avatarAnim} section={section} preFalling={preFalling} mouseObject={mouseInstance} mouseMode={mouseMode} setMouseMode={setMouseMode} />
            <CatMia animation={catAnim} section={section} preFalling={preFalling} />
          </motion.group >
        </Suspense >
      </motion.group>

    </>
  )
}