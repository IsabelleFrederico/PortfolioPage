import React, { useEffect, useRef } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useFBX,useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function CatMia(props) {
  const group = useRef()
  const { scene } = useGLTF('/models/cat.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { animations: catBathAnimation } = useFBX('/animations/catBath.fbx')


  catBathAnimation[0].name = "catbathing"

  const { actions } = useAnimations(catBathAnimation, group)

  useEffect(() => {
    actions["catbathing"].reset().play()
  }, [])

  return (
    <group {...props} ref={group} dispose={null}>
      <group position={[0, 0.2, 1]} rotation={[5, 0, 0]} scale={0.03}>
        <primitive object={nodes.Bone} />
        <skinnedMesh geometry={nodes.eye2.geometry} material={materials.SHD_eye} skeleton={nodes.eye2.skeleton} />
        <skinnedMesh geometry={nodes.eye2001.geometry} material={materials.whiskers} skeleton={nodes.eye2001.skeleton} />
        <skinnedMesh geometry={nodes.high_poly.geometry} material={materials.SHD_frip} skeleton={nodes.high_poly.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/cat.gltf')
