import { Grid } from "@react-three/drei"

export function Floor() {
    return (
        <group position={[0, -6.25, 5]}>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial transparent opacity={1} color="#3f887a" />
            </mesh>

            <Grid
                position={[0, 1, 0]}
                args={[30, 30]}
                cellSize={0.8}
                cellThickness={0.8}
                sectionSize={3.5}
                sectionThickness={1.2}
                fadeDistance={14}
                fadeStrength={3}
                infiniteGrid
            />
        </group>
    )
}          
