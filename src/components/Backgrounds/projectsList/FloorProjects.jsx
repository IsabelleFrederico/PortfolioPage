import { Grid } from "@react-three/drei"

export function FloorProjects() {
    return (
        <group rotation={[0, 0, 0]}>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[30, 5]} />
                <meshStandardMaterial transparent opacity={1} color="#51a896" />
            </mesh>
        </group>
    )
}          
