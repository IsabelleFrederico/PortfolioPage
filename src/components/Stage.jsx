import * as THREE from "three"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial } from "@react-three/drei"

export function Stage({
  children,           // aqui dentro vai o Avatar (normal e wireframe)
  headY = 1.35,       // ajuste: altura da cabeça (em unidades do seu avatar)
  feetY = 0.05,       // ajuste: altura do pé/chão
  duration = 2.2,     // tempo da varredura
  radius = 0.62,      // tamanho do anel
}) {
  const ringRef = useRef()

  // clipping plane que desce
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), -headY), [headY])

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() % duration) / duration
    const y = THREE.MathUtils.lerp(headY, feetY, t)

    // move anel
    if (ringRef.current) ringRef.current.position.y = y

    // plane: n·p + constant = 0  => constant = -y
    plane.constant = -y
  })

  return (
    <group>
      {/* ===== Stand ===== */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.75, 0.85, 0.18, 48]} />
        <meshStandardMaterial color="#0b0d10" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Anel emissivo na base */}
      <mesh position={[0, 0.09, 0]}>
        <torusGeometry args={[0.73, 0.02, 16, 80]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={2.5} color="#111" />
      </mesh>

      {/* ===== Anel scanner (flutuante) ===== */}
      <mesh ref={ringRef} position={[0, headY, 0]}>
        <torusGeometry args={[radius, 0.015, 16, 120]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={4} color="#111" />
      </mesh>

      {/* ===== Avatar (normal + wireframe com clipping) ===== */}
      {/* Passamos o plane pros filhos via props (ver abaixo) */}
      {typeof children === "function" ? children({ plane }) : children}
    </group>
  )
}
