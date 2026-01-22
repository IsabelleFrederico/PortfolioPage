import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"
import { Suspense, useEffect, useMemo, useState } from "react"
import { Avatar } from "./Avatar"
import { Office } from "./Office"
import { CatMia } from "./CatMia"
import { Mouse } from "./Mouse"

export const Experience = () => {
  const mouseInstance = useMemo(() => new THREE.Group(), [])
  const [mouseMode, setMouseMode] = useState("desk")

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
      <group position-y={-0.5}>
        <Suspense fallback={null}>
          <Office mouseObject={mouseInstance} mouseMode={mouseMode} />
          <Mouse object={mouseInstance} />
          <Avatar mouseObject={mouseInstance} mouseMode={mouseMode} setMouseMode={setMouseMode} />
          <CatMia />
        </Suspense>
      </group>
    </>
  )
}
