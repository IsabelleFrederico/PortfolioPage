import React, { useEffect, useRef, useMemo } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { motion } from "framer-motion-3d"

export function CatMia({animation = "CatBathing", props}) {
  const group = useRef()
  const { scene } = useGLTF('/models/cat.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  const { animations: catBathAnimation } = useFBX('/animations/catBath.fbx')
  const { animations: catRunningAnimation } = useFBX('/animations/catRunning.fbx')
  const { animations: catStandingAnimation } = useFBX('/animations/catStanding1.fbx')

  catBathAnimation[0].name = "CatBathing"
  catStandingAnimation[0].name = "CatStanding"
  catRunningAnimation[0].name = "CatRunning"

  const allAnims = useMemo(
    () => [
      ...(catBathAnimation || []),
      ...(catStandingAnimation || []),
      ...(catRunningAnimation || [])
    ],
    [
      catBathAnimation,
      catStandingAnimation,
      catRunningAnimation
    ]
  )

  const { actions } = useAnimations(allAnims, group)

  const prev = useRef(null)
  useEffect(() => {
    const next = actions?.[animation]
    if (!next) return

    next.reset()
    next.fadeIn(0.2)
    next.play()

    if (prev.current && prev.current !== next) {
      prev.current.fadeOut(0.2)
    }
    prev.current = next

  }, [animation, actions])

  useEffect(() => {
    if (!group.current) return
    group.current.traverse((o) => {
      if (o.isSkinnedMesh) o.frustumCulled = false
    })
  }, [])


  // useEffect(() => {
  //   actions["catbathing"].reset().play()
  // }, [])

  return (
    <group {...props} ref={group} dispose={null}>
      <motion.group scale={0.03}>
        <primitive object={nodes.Bone} />
        <skinnedMesh geometry={nodes.eye2.geometry} material={materials.SHD_eye} skeleton={nodes.eye2.skeleton} />
        <skinnedMesh geometry={nodes.eye2001.geometry} material={materials.whiskers} skeleton={nodes.eye2001.skeleton} />
        <skinnedMesh geometry={nodes.high_poly.geometry} material={materials.SHD_frip} skeleton={nodes.high_poly.skeleton} />
      </motion.group>
    </group>
  )
}

useGLTF.preload('/models/cat.gltf')
