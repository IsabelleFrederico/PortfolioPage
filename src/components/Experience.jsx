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
import { useScenePoses } from "../hooks/useScenePoses"
import { Cellphone } from "./Cellphone"
import { Background } from "./Background"
import { OfficeContact } from "./OfficeContact"
import { OfficeBackground } from "./OffineBackground"
import { SkillsOrbit } from "./SkillsOrbit"
import { Floor } from "./BackgoundSkill/floor"
import { Stage } from "./BackgoundSkill/Stage"
import { Elements } from "./BackgoundSkill/Elements"
import { Plant } from "./BackgoundSkill/Plant"

export const Experience = ({ menuOpened, section }) => {
  const { viewport } = useThree()

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

  const { avatarVariants, skillsVariants, stageVariants, catVariants, officeVariants, avatarScale, officeScale, contactOfficeVariants, contactBackgroundVariants } = useScenePoses({ viewport, menuOpened, catAnimation })

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
        <CatMia animation={catAnimation} section={section} />
      </motion.group >
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