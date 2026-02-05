import { useGLTF } from '@react-three/drei'
import { forwardRef } from "react"

export const Cellphone = forwardRef(function Cellphone(props, ref) {
  const { nodes, materials } = useGLTF('/models/cellphone.gltf')
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_0.geometry} material={materials['camera3.002']} />
        <mesh geometry={nodes.Object_0_1.geometry} material={materials.camera1} />
        <mesh geometry={nodes.Object_0_2.geometry} material={materials['camera2.001']} />
        <mesh geometry={nodes.Object_0_3.geometry} material={materials['camera3.001']} />
        <mesh geometry={nodes.Object_0_4.geometry} material={materials.camera4} />
        <mesh geometry={nodes.Object_0_5.geometry} material={materials.camera_cell} />
        <mesh geometry={nodes.Object_0_6.geometry} material={materials.flash1} />
        <mesh geometry={nodes.Object_0_7.geometry} material={materials.flash2} />
        <mesh geometry={nodes.Object_0_8.geometry} material={materials.holes} />
        <mesh geometry={nodes.Object_0_9.geometry} material={materials.screen} />
        <mesh geometry={nodes.Object_0_10.geometry} material={materials.screen_on} />
      </group>
    </group>
  )
})

useGLTF.preload('/models/cellphone.gltf')
