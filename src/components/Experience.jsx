import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"
import { Suspense, useEffect, useMemo, useState } from "react"
import { Avatar } from "./Avatar"
import { Office } from "./Office"
import { CatMia } from "./CatMia"
import { Mouse } from "./Mouse"
import { motion } from "framer-motion-3d"

export const Experience = (props) => {
  const mouseInstance = useMemo(() => new THREE.Group(), [])
  const [mouseMode, setMouseMode] = useState("desk")

  const { section } = props

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "m") {
        setMouseMode((v) => (v === "desk" ? "hand" : "desk"))
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <ambientLight intensity={1.5} />
      <motion.group position={[1, -0.5, 0]}
        animate={{
          y: section === 0 ? -0.5 : -0.8
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
