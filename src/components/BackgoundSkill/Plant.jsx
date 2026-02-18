import * as THREE from "three"
import React, { useMemo } from "react"
import { color } from "../../utils/constants"

export function Plant() {
    const detail = 64

    const baseColor = useMemo(() => new THREE.Color(color), [])

    const shades = useMemo(() => {
        const shade = (h = 0, s = 0, l = 0) => baseColor.clone().offsetHSL(h, s, l)

        return {
            leaf: shade(0, 0.01, -0.1),
            leafLeft: shade(0, 0.1, -0.13),          
            leafBack: shade(0.02, 0.05, -0.7), 
            stem: shade(0.01, -0.02, -0.10),    

            pot: shade(0.05, -0.1, -0.125),          
            rim: shade(0, -0.05, -0.24),          

            soil: shade(0.03, -0.20, -0.35),   
        }
    }, [baseColor])

    const { leafGeo, stems } = useMemo(() => {
        const ovalHole = (shape, x, y, rx, ry, rot = 0) => {
            const p = new THREE.Path()
            const steps = 40
            for (let i = 0; i <= steps; i++) {
                const a = (i / steps) * Math.PI * 2
                let px = Math.cos(a) * rx
                let py = Math.sin(a) * ry
                const rpx = px * Math.cos(rot) - py * Math.sin(rot)
                const rpy = px * Math.sin(rot) + py * Math.cos(rot)
                if (i === 0) p.moveTo(x + rpx, y + rpy)
                else p.lineTo(x + rpx, y + rpy)
            }
            p.closePath()
            shape.holes.push(p)
        }

        // ---------- Leaves ----------
        const s = new THREE.Shape()
        // Base
        s.moveTo(0.0, -1.10)

        // Left Format 
        s.bezierCurveTo(-0.5, -1.6, -1, -0.55, -0.8, 0.02)
        s.bezierCurveTo(-0.65, 0.50, -0.15, 1.15, -0.10, 1.25)

        // Base Formart
        s.bezierCurveTo(-0.02, 1.30, -0.05, 1.30, 0, 1.30)
        s.bezierCurveTo(0.05, 1.32, 0.02, 1.30, 0.10, 1.25)

        // Right Format 
        s.bezierCurveTo(0.19, 1.1, 1, 0.51, 1.0, 0.05)
        s.bezierCurveTo(1, -0.65, 1.05, -1.20, 0.0, -1.10)
        s.closePath()

        // Central Slit
        const slit = new THREE.Path()
        slit.moveTo(0.03, 1.05)
        slit.bezierCurveTo(0.1, 0.85, 0.12, 0.10, 0.05, -0.55)
        slit.bezierCurveTo(0.00, -0.85, 0.02, -0.95, 0.10, -1.00)
        slit.bezierCurveTo(0.22, -0.88, 0.20, -0.72, 0.18, -0.55)
        slit.bezierCurveTo(0.12, 0.10, 0.18, 0.55, 0.16, 1.02)
        slit.closePath()
        s.holes.push(slit)

        // Left Slit
        ovalHole(s, -0.22, 0.55, 0.22, 0.09, -0.45)
        ovalHole(s, -0.4, 0.20, 0.24, 0.10, -0.45)
        ovalHole(s, -0.48, -0.18, 0.24, 0.10, -0.45)
        ovalHole(s, -0.55, -0.65, 0.255, 0.1, -0.45)

        // Right Slit
        ovalHole(s, 0.5, 0.52, 0.22, 0.09, 0.45)
        ovalHole(s, 0.66, 0.15, 0.24, 0.10, 0.45)
        ovalHole(s, 0.58, -0.23, 0.24, 0.10, 0.45)
        ovalHole(s, 0.55, -0.60, 0.18, 0.08, 0.45)

        const leafGeo = new THREE.ShapeGeometry(s, detail)
        leafGeo.computeVertexNormals()
        leafGeo.center()

        // STEMS 
        const mkStem = (points, r = 0.06) => {
            const curve = new THREE.CatmullRomCurve3(points)
            const geo = new THREE.TubeGeometry(curve, 64, r, 10, false)
            return geo
        }

        const stems = {
            left: mkStem(
                [
                    new THREE.Vector3(-0.15, -0.35, 0),
                    new THREE.Vector3(-0.25, 0.15, 0),
                    new THREE.Vector3(-0.55, 0.70, 0),
                    new THREE.Vector3(-0.80, 1.05, 0),
                ],
                0.055
            ),
            center: mkStem(
                [
                    new THREE.Vector3(0.0, -0.35, 0),
                    new THREE.Vector3(0.02, 0.25, 0),
                    new THREE.Vector3(0.10, 0.95, 0),
                    new THREE.Vector3(0.12, 1.25, 0),
                ],
                0.06
            ),
            right: mkStem(
                [
                    new THREE.Vector3(0.15, -0.35, 0),
                    new THREE.Vector3(0.28, 0.20, 0),
                    new THREE.Vector3(0.55, 0.75, 0),
                    new THREE.Vector3(0.80, 1.05, 0),
                ],
                0.055
            ),
        }

        return { leafGeo, stems }
    }, [])

    return (
        <group scale={0.25} position={[-2, -4.9, -5.9]}>
            {/* VASE */}
            <group scale={0.8} position={[0, -0.5, 0]}>
                <mesh castShadow receiveShadow position={[0, -0.45, 0]}>
                    <cylinderGeometry args={[0.85, 0.65, 1, 64]} />
                    <meshStandardMaterial
                        color={shades.pot}
                        roughness={0.45}
                        metalness={0.28}
                        clearcoat={2}
                        clearcoatRoughness={0.3}
                    />
                </mesh>

                <mesh castShadow receiveShadow position={[0, -0.08, 0]}>
                    <cylinderGeometry args={[0.90, 0.90, 0.10, 64]} />
                    <meshStandardMaterial
                        color={shades.rim}
                        roughness={0.35}
                        metalness={0.10}
                        clearcoat={1}
                        clearcoatRoughness={0.18}
                    />
                </mesh>

                <mesh receiveShadow position={[0, -0.03, 0]}>
                    <cylinderGeometry args={[0.78, 0.78, 0.06, 64]} />
                    <meshStandardMaterial
                        color={shades.soil}
                        roughness={0.9}
                        metalness={0}
                    />
                </mesh>
            </group>

            {/* STEMS */}
            <mesh castShadow receiveShadow geometry={stems.left}>
                <meshStandardMaterial color={shades.stem} />
            </mesh>

            <mesh castShadow receiveShadow geometry={stems.center}>
                <meshStandardMaterial color={shades.stem} />
            </mesh>

            <mesh castShadow receiveShadow geometry={stems.right}>
                <meshStandardMaterial color={shades.stem} />
            </mesh>

            {/* LEAVES */}
            <mesh
                castShadow
                receiveShadow
                geometry={leafGeo}
                position={[-1.2, 0.4, 0]}
                rotation={[0, 0, 2.5]}
                scale={0.70}
            >
                <meshStandardMaterial
                    color={shades.leafLeft}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={leafGeo}
                position={[1.5, 0.5, 0]}
                rotation={[0, Math.PI, 2.5]}
                scale={0.82}
            >
                <meshStandardMaterial
                    color={shades.leaf}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={leafGeo}
                position={[-0.4, 1.4, 0]}
                rotation={[1, Math.PI, -2]}
                scale={0.76}
            >
                <meshStandardMaterial
                    color={shades.leafBack}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}
