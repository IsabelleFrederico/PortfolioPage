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
    tl.current.progress(data.scroll.current)
    material.current.color = new THREE.Color(color.current.color)
  })

  useEffect(() => {
    tl.current = gsap.timeline()
    tl.current.to(color.current, {
      color: "#16816f",
    })
    tl.current.to(color.current, {
      color: "#a3d5c8",
    })
    tl.current.to(color.current, {
      color: "#59887d",
    })
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