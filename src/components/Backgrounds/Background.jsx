import { Sphere, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export const Background = () => {
  const material = useRef()
  const color = useRef({
    color: "#9ec1c3",
  })
  const data = useScroll()

  const tl = useRef()

  useFrame(() => {
    const t = tl.current
    const s = data?.scroll?.current

    if (t && typeof s === "number") {
      t.progress(s)
    }

    if (material.current) {
      material.current.color = new THREE.Color(color.current.color)
    }
  })

  useEffect(() => {
    const timeline = gsap.timeline()

    timeline.to(color.current, { color: "#16816f" })
    timeline.to(color.current, { color: "#a9d4c8" })
    timeline.to(color.current, { color: "#84aba2" })
    tl.current = timeline

    return () => {
      timeline.kill()
      tl.current = null
    }
  }, [])

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  )
}