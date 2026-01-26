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
import { useScroll } from "@react-three/drei"
import { useScenePoses } from "../hooks/useScenePoses"

export const Experience = (props) => {
  const { menuOpened } = props
  const mouseInstance = useMemo(() => new THREE.Group(), [])
  const [mouseMode, setMouseMode] = useState("desk")
  const [preFalling, setPreFalling] = useState(false)
  const [section, setSection] = useState(0)
  const { targetOffice, targetAll, targetCat } = useScenePoses(section, menuOpened)
  const data = useScroll()

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  const world = useRef()

  const worldX = useMotionValue(0)
  const worldY = useMotionValue(0)
  const worldZ = useMotionValue(0)
  const worldRX = useMotionValue(0)
  const worldRY = useMotionValue(0)
  const worldRZ = useMotionValue(0)
  const worldS = useMotionValue(1)

  useEffect(() => {
    animate(worldX, targetOffice.x, framerMotionConfig)
    animate(worldY, targetOffice.y, framerMotionConfig)
    animate(worldZ, targetOffice.z, framerMotionConfig)
    animate(worldRX, targetOffice.rotateX, framerMotionConfig)
    animate(worldRY, targetOffice.rotateY, framerMotionConfig)
    animate(worldRZ, targetOffice.rotateZ, framerMotionConfig)
    animate(worldS, targetOffice.scale, framerMotionConfig)
  }, [targetOffice])

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -4 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 4 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useFrame((state) => {
    if (world.current) {
      world.current.position.set(worldX.get(), worldY.get(), worldZ.get())
      world.current.rotation.set(worldRX.get(), worldRY.get(), worldRZ.get())
      world.current.scale.setScalar(worldS.get())
    }
    const curSection = Math.floor(data.scroll.current * data.pages)

    if (curSection !== section) {
      setSection(curSection)
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  const finalAvatarAnim =
    section === 0 ? "Typing"
      : section === 1 ? "Stretching"
        : section === 2 ? "Pointing"
          : "StandUp"

  const finalCatAnim =
    section === 0 ? "CatBathing"
      : section === 1 ? "CatStanding"
        : "Stretch"

  const [avatarAnim, setAvatarAnim] = useState(finalAvatarAnim)
  const [catAnim, setCatAnim] = useState(finalCatAnim)

  useEffect(() => {
    setPreFalling(true)

    const step1 = window.setTimeout(() => {
      setAvatarAnim("Falling")
      setCatAnim("Runnig")

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

  return (
    <>
      <ambientLight intensity={1.5} />
      <Suspense fallback={null}>
        <group ref={world}>
          <Office section={section} mouseObject={mouseInstance} mouseMode={mouseMode} preFalling={preFalling} />
        </group>
        <Mouse object={mouseInstance} />
        <motion.group
          initial={false}
          animate={targetAll}
          transition={{ duration: 0.2 }}
        >
          <Avatar animation={avatarAnim} section={section} preFalling={preFalling} mouseObject={mouseInstance} mouseMode={mouseMode} setMouseMode={setMouseMode} />
          <motion.group initial={false} animate={targetCat} transition={{ duration: 0.2 }}>
            <CatMia animation={catAnim} preFalling={preFalling} />
          </motion.group>
        </motion.group >
      </Suspense >
    </>
  )
}