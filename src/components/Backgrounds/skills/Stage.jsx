import * as THREE from "three"
import { color } from "../../../utils/constants"

export function Stage() {
    return (
        <group>
            <mesh position={[-0.12, -5, -10]} rotation={[Math.PI / 2, 0, 0]} scale={0.85}>
                <cylinderGeometry args={[3.5, 3, 0.2, 64, 3, true]} />
                <meshBasicMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, -0.09)}
                    transparent
                    opacity={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh position={[-0.12, -5, -10]} scale={0.85}>
                <ringGeometry args={[3, 3.1, 64]} />
                <meshBasicMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, -0.1)}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide} />
            </mesh>
            <mesh receiveShadow position={[0, -5.5, -6.65]} rotation={[-0.21, 0, 0]}>
                <cylinderGeometry args={[3.5, 3.5, 0.06, 64]} />
                <meshStandardMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, 0.08)}
                    roughness={0.4}
                    metalness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.2}
                />
            </mesh>
        </group>
    )
}