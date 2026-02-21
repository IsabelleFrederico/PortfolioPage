import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useState, useRef } from "react"
import { Avatar } from "./Avatar/Avatar"
import { Office } from "./sections/about/Office"
import { CatMia } from "./Cat/CatMia"
import { Mouse } from "./Avatar/Mouse"
import { motion } from "motion/react"
import { animate, useMotionValue } from "framer-motion"
import { framerMotionConfig } from "../config"
import { useScenePoses } from "../hooks/useScenePoses"
import { Cellphone } from "./Avatar/Cellphone"
import { Background } from "./Backgrounds/Background"
import { OfficeContact } from "./sections/contact/OfficeContact"
import { OfficeBackground } from "./Backgrounds/contact/OffineBackground"
import { SkillsOrbit } from "./sections/skills/SkillsOrbit"
import { Floor } from "./Backgrounds/skills/Floor"
import { Stage } from "./Backgrounds/skills/Stage"
import { Elements } from "./Backgrounds/skills/Elements"
import { Plant } from "./Backgrounds/skills/Plant"
import { Ball } from "./sections/projects/Ball"
import { FloorProjects } from "./Backgrounds/projectsList/FloorProjects"

export const Experience = ({ menuOpened, section }) => {
  const { viewport, mouse, camera } = useThree()
  const target = useRef(new THREE.Vector3())
  const catRef = useRef()
  const isMobile = window.innerWidth < 768

  const mouseInstance = useMemo(() => new THREE.Group(), [])
  const [mouseMode, setMouseMode] = useState("desk")
  const [cellphoneObject, setCellphoneObject] = useState(null)

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

  const { ballVariants, avatarVariants, skillsVariants, stageVariants, catVariants, officeVariants, avatarScale, viewH, officeScale, contactOfficeVariants, contactBackgroundVariants } = useScenePoses({ viewport, menuOpened, catAnimation })

  useEffect(() => {
    setCharacterAnimation("Falling")
    setTimeout(() => {
      setCharacterAnimation(
        section === 0 ? "Typing" :
          section === 1 ? "AirScreen" :
            section === 2 ? "Pointing" :
              section === 3 ? "Cellphone" :
                "StandUp")
    }, 600)

    setCatAnimation("CatRunning")

    setTimeout(() => {
      setCatAnimation(
        section === 0 ? "CatBathing" :
          section === 1 ? "CatStanding" :
            section === 2 ? "CatRunning" :
              section === 3 ? "CatSeated" :
                "CatRunning"
      )
    }, 600)

  }, [section])

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get()
    state.camera.lookAt(cameraLookAtX.get(), 0, 0)
  })

  const showCellphone = characterAnimation === "Cellphone"

  useFrame(() => {
    if (isMobile || menuOpened) return

    target.current.x = mouse.x * 10

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      target.current.x,
      0.05
    )

    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <Background />
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
        <Avatar animation={characterAnimation} section={section} mouseObject={mouseInstance} mouseMode={mouseMode} setMouseMode={setMouseMode} cellphoneObject={cellphoneObject} />
        {showCellphone && (
          <Cellphone ref={setCellphoneObject} scale={0.01} />
        )}
      </motion.group>
      <motion.group
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={catVariants}
      >
        <CatMia ref={catRef} animation={catAnimation} section={section} />
      </motion.group >

      {section === 2 && (
        <motion.group
          animate={"" + section}
          transition={{
            duration: 0.6,
          }}
          variants={ballVariants}
        >
          <Ball speed={menuOpened ? 4 : 1} />
          <FloorProjects />
        </motion.group>
      )}

      {section === 1 && (
        <>
          <motion.group
            animate={"" + section}
            transition={{ duration: 0.6 }}
            variants={skillsVariants}
          >
            <SkillsOrbit
              radius={1.2}
              active
            />
          </motion.group>
          <motion.group
            animate={"" + section}
            transition={{ duration: 0.6 }}
            variants={stageVariants}
          >
            <Floor />
            <Stage />
            <Elements />
            <Plant />
          </motion.group>
        </>

      )}
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
      <motion.group
        animate={"" + section}
        variants={contactOfficeVariants}
        transition={{ duration: 0.6 }}
        visible={section === 3}
      >
        <OfficeContact />
      </motion.group>
      <motion.group
        animate={"" + section}
        variants={contactBackgroundVariants}
        transition={{ duration: 0.6 }}
        visible={section === 3}
      >
        <OfficeBackground />
      </motion.group>
    </>
  )
}