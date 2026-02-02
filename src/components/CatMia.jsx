import React, { useEffect, useRef, useMemo } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { motion } from "framer-motion-3d"

function stripRootPosition(clip, rootBoneName = "Bone") {
  if (!clip?.tracks) return clip

  const regex = new RegExp(`(^|\\|)${rootBoneName}\\.position$`)

  clip.tracks = clip.tracks.filter((t) => !regex.test(t.name || ""))
  return clip
}

export function CatMia({ animation = "CatBathing", ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/cat.gltf')
  const { animations: catBathAnimation } = useFBX('/animations/catBath.fbx')
  // const { animations: catRunningAnimation } = useGLTF('/animations/catRunning1.glb')
  const { animations: catRunningAnimation } = useFBX('/animations/catRunning.fbx')
  const { animations: catStandingAnimation } = useFBX('/animations/catStanding.fbx')

  catBathAnimation[0].name = "CatBathing"
  stripRootPosition(catBathAnimation[0], "Bone")
  catStandingAnimation[0].name = "CatStanding"
  stripRootPosition(catStandingAnimation[0], "Bone")
  catRunningAnimation[0].name = "CatRunning"
  stripRootPosition(catRunningAnimation[0], "Bone")

  const bathClip = useMemo(() => {
    const c = catBathAnimation?.[0]
    if (!c) return null
    c.name = "CatBathing"
    return stripRootPosition(c, "Bone")
  }, [catBathAnimation])

  const runningClip = useMemo(() => {
    const c = catRunningAnimation?.[0]
    if (!c) return null
    c.name = "CatRunning"
    return stripRootPosition(c, "Bone")
  }, [catRunningAnimation])

  const standingClip = useMemo(() => {
    const c = catStandingAnimation?.[0]
    if (!c) return null
    c.name = "CatStanding"
    return stripRootPosition(c, "Bone")
  }, [catStandingAnimation])

  const allAnims = useMemo(() => {
    return [bathClip, standingClip, runningClip].filter(Boolean)
  }, [bathClip, standingClip, runningClip])

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

  return (
    <group {...props} ref={group} dispose={null} rotation={[0, -Math.PI / 4, 0.5]}>
      <group name="CatModelOffset" scale={0.03}>
        <group name="reference">
          <primitive object={nodes.Bone} />
        </group>
        <skinnedMesh frustumCulled={false} geometry={nodes.eye2.geometry} material={materials.SHD_eye} skeleton={nodes.eye2.skeleton} />
        <skinnedMesh frustumCulled={false} geometry={nodes.eye2001.geometry} material={materials.whiskers} skeleton={nodes.eye2001.skeleton} />
        <skinnedMesh frustumCulled={false} geometry={nodes.high_poly.geometry} material={materials.SHD_frip} skeleton={nodes.high_poly.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/cat.gltf')
