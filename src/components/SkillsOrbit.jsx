import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { skills } from "../utils/constants"
import { useTexture, Billboard } from "@react-three/drei"

export function SkillsOrbit({
    radius,
}) {
    const group = useRef()

    const textures = useTexture(
        skills.reduce((acc, s) => {
            acc[s.id] = s.icon
            return acc
        }, {})
    )

    useFrame((_, delta) => {
        if (!group.current) return

        group.current.rotation.y -= delta * 0.9
    })

    return (
        <group ref={group}>
            {skills.map((s, i) => {
                const a = (i / skills.length) * Math.PI * 2
                const x = Math.cos(a) * radius
                const z = Math.sin(a) * radius

                return (
                    <group key={s.id} position={[x, 0, z]}>
                        <Billboard>

                            <mesh>
                                <planeGeometry args={[0.28, 0.28]} />
                                <meshBasicMaterial map={textures[s.id]} transparent />
                            </mesh>
                        </Billboard>
                    </group>
                )
            })}
        </group>
    )
}
