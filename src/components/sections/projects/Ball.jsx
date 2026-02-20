import { useGLTF } from '@react-three/drei'
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Ball({ speed = 1, radius = 0.5, direction = [1, 0, 0], ...props }) {
  
  const group = useRef()

  const { nodes, materials, scene } = useGLTF('/models/ball.gltf')

  const dir = useRef(new THREE.Vector3(...direction).normalize())

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return

    const dist = speed * delta
    g.position.addScaledVector(dir.current, dist)

    const theta = dist / radius

    const up = new THREE.Vector3(0, 1, 0)
    const axis = new THREE.Vector3().crossVectors(up, dir.current).normalize()

    g.rotateOnAxis(axis, theta)
  })

  return (
    <group ref={group} position={[0, 0.2, 0]} rotation={[0, 1.6, 0]} scale={0.07} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sphere_0">
          <mesh name="Object_4" object={scene} geometry={nodes.Object_4.geometry} material={materials['Material.001']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/ball.gltf')
