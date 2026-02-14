import React from 'react'
import { useGLTF } from '@react-three/drei'

export function OfficeBackground(props) {
    const { nodes, materials } = useGLTF('/models/officeCall.gltf')
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.413}>
                <mesh geometry={nodes.Object_28.geometry} material={materials.floor_wood} />
                <mesh geometry={nodes.Object_50001.geometry} material={materials['walls.002']} />
                {/* <mesh geometry={nodes.Object_51001.geometry} material={materials.walls_invis} /> */}
            </group>
        </group>
    )
}

useGLTF.preload('/models/officeCall.gltf')
