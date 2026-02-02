import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useState, useRef } from "react"
import { Avatar } from "./Avatar"
import { Office } from "./Office"
import { CatMia } from "./CatMia"
import { Mouse } from "./Mouse"
import { motion } from "framer-motion-3d"
import { animate, useMotionValue } from "framer-motion"
import { framerMotionConfig } from "../config"
import { useScroll, OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"
import { useScenePoses } from "../hooks/useScenePoses"
import { Projects } from "./Projects"

export const Experience = (props) => {
  const { menuOpened } = props
  const { viewport } = useThree()
  const data = useScroll()
  const mouseInstance = useMemo(() => new THREE.Group(), [])
  const [mouseMode, setMouseMode] = useState("desk")

  const [section, setSection] = useState(0)

  const cameraPositionX = useMotionValue(0)
  const cameraLookAtX = useMotionValue(0)

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -4 : 0, {
      ...framerMotionConfig,
    })
    animate(cameraLookAtX, menuOpened ? 4 : 0, {
      ...framerMotionConfig,
    })
  }, [menuOpened])

  const characterContainerAboutRef = useRef()

  const [characterAnimation, setCharacterAnimation] = useState("Typing")
  const [catAnimation, setCatAnimation] = useState("CatRunning")

  const { avatarVariants, catVariants, officeVariants, avatarScale, officeScale } = useScenePoses({ viewport, menuOpened, catAnimation })

  useEffect(() => {
    setCharacterAnimation("Falling")
    setTimeout(() => {
      setCharacterAnimation(
        section === 0 ? "Typing" :
          section === 1 ? "Stretching" :
            section === 2 ? "Pointing" :
              "StandUp")
    }, 600)
    setCatAnimation("CatRunning")
    setTimeout(() => {
      setCatAnimation(
        section === 0 ? "CatBathing" :
          section === 1 ? "CatStanding" :
            section === 2 ? "CatRunning" :
              "CatRunning"
      )
    }, 600)
  }, [section])


  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages)

    if (curSection > 3) {
      curSection = 3
    }

    if (curSection !== section) {
      setSection(curSection)
    }

    state.camera.position.x = cameraPositionX.get()
    state.camera.lookAt(cameraLookAtX.get(), 0, 0)
  })

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />
      <motion.group
        scale={avatarScale}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={avatarVariants}
      >
        <Avatar animation={characterAnimation} section={section} mouseObject={mouseInstance} mouseMode={mouseMode} setMouseMode={setMouseMode} />
      </motion.group>
      <motion.group
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={catVariants}
      >
        <CatMia animation={catAnimation} section={section} />
      </motion.group >
      <motion.group
        position={officeVariants.position}
        scale={officeScale}
        transition={{ duration: 0.6 }}
        visible={section === 0}
      >
        <Office section={section} mouseObject={mouseInstance} mouseMode={mouseMode} />
        <Mouse object={mouseInstance} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 3, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>
      <Projects section={section} />
    </>
  )
}