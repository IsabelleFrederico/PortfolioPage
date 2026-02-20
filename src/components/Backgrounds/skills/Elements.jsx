import * as THREE from "three"
import { color } from "../../../utils/constants"

export function Elements() {
    return (
        <group position={[0, -4, -3]} scale={1}>
            {/* Sphere */}
            <mesh castShadow position={[2.5, -0.89, -2.1]}>
                <sphereGeometry args={[0.20, 48, 48]} />
                <meshStandardMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, -0.045)}
                    roughness={0.25}
                    metalness={0.12}
                    clearcoat={1}
                    clearcoatRoughness={0.2}
                />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.55, -1.1, -2.2]}>
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, -0.6)}
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Cylinder */}
            <mesh castShadow position={[2.8, -0.72, -2.3]}>
                <cylinderGeometry args={[0.11, 0.11, 0.75, 48]} />
                <meshStandardMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, -0.055)}
                    roughness={0.25}
                    metalness={0.12}
                    clearcoat={1}
                    clearcoatRoughness={0.22}
                />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.8, -1.1, -2.3]}>
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, -0.6)}
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Cone and Sphere */}
            {/* Cone */}
            <group position={[0.5, -0.1, 0]}>
                <mesh castShadow position={[1.6, -0.72, -2.3]}>
                    <coneGeometry args={[0.18, 0.5, 48]} />
                    <meshStandardMaterial
                        color={new THREE.Color(color).offsetHSL(0, 0, -0.055)}
                        roughness={0.35}
                        metalness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.2}
                    />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.6, -1, -2.3]}>
                    <circleGeometry args={[0.2, 32]} />
                    <meshBasicMaterial
                        color={new THREE.Color(color).offsetHSL(0, 0, -0.6)}
                        transparent
                        opacity={0.1}
                    />
                </mesh>
                {/* Sphere */}
                <mesh castShadow position={[1.6, -0.4, -2.3]}>
                    <sphereGeometry args={[0.12, 48, 48]} />
                    <meshStandardMaterial
                        color={new THREE.Color(color).offsetHSL(0, 0, -0.045)}
                        roughness={0.25}
                        metalness={0.12}
                        clearcoat={1}
                        clearcoatRoughness={0.2}
                    />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.55, -1.1, -2.2]}>
                    <circleGeometry args={[0.2, 32]} />
                    <meshBasicMaterial
                        color={new THREE.Color(color).offsetHSL(0, 0, -0.6)}
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            </group>

            <mesh castShadow position={[-3.6, 1, -7]} scale={1.2}>
                <sphereGeometry args={[0.28, 64, 64]} />
                <meshStandardMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, 0.1)}
                    roughness={0.35}
                    metalness={0.05}
                    clearcoat={1}
                    clearcoatRoughness={0.15}
                />
            </mesh>
            <mesh castShadow position={[3, 2, -7]} scale={1.6} >
                <sphereGeometry args={[0.28, 64, 64]} />
                <meshStandardMaterial
                    color={new THREE.Color(color).offsetHSL(0, 0, 0.05)}
                    roughness={0.4}
                    metalness={0.08}
                    clearcoat={1}
                    clearcoatRoughness={0.2}
                />
            </mesh>

        </group>
    )
}
