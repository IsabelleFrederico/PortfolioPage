import { Grid } from "@react-three/drei"

export function Floor() {
    return (
        <group position={[0, -6.25, 5]}>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial transparent opacity={1} color="#3f887a" />
            </mesh>
        </group>
    )
}          
