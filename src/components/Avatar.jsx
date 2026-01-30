import React, { useEffect, useRef, useMemo } from 'react'
import * as THREE from "three"
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { motion } from "framer-motion-3d"

const handBone = "RightHand"
const mouseRanges = [[0, 2.485], [9.58, 12]]

function inRanges(t, ranges) {
  return ranges.some(([a, b]) => t >= a && t <= b)
}

export function Avatar({ animation = "Typing", mouseObject, mouseMode, setMouseMode, ...props }) {
  const { section } = props
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/model.glb')
  const originalParent = useRef(null)

  const { animations: typingAnimation } = useFBX('/animations/typing.fbx')
  const { animations: fallingAnimation } = useFBX('/animations/falling.fbx')
  const { animations: standUpAnimation } = useFBX('/animations/standup.fbx')
  const { animations: pointingAnimation } = useFBX('/animations/pointing.fbx')
  const { animations: stretchingAnimation } = useFBX('/animations/stretching.fbx')

  if (typingAnimation[0]) typingAnimation[0].name = "Typing"
  if (fallingAnimation[0]) fallingAnimation[0].name = "Falling"
  if (standUpAnimation[0]) standUpAnimation[0].name = "StandUp"
  if (pointingAnimation[0]) pointingAnimation[0].name = "Pointing"
  if (stretchingAnimation[0]) stretchingAnimation[0].name = "Stretching"

  const allAnims = useMemo(
    () => [
      ...(typingAnimation || []),
      ...(fallingAnimation || []),
      ...(standUpAnimation || []),
      ...(pointingAnimation || []),
      ...(stretchingAnimation || []),
    ],
    [
      typingAnimation,
      fallingAnimation,
      standUpAnimation,
      pointingAnimation,
      stretchingAnimation,
    ]
  )

  const { actions } = useAnimations(allAnims, group)

  // useFrame(
  //   (state) => {
  //     group.current?.getObjectByName("Head").lookAt(state.camera.position)
  //     group.current?.getObjectByName("Neck").lookAt(state.camera.position)
  //   }
  //   , [])

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].reset().fadeOut(0.5);
    };
  }, [animation]);

  // const prev = useRef(null)
  // useEffect(() => {
  //   const next = actions?.[animation]
  //   if (!next) return

  //   next.reset()
  //   next.fadeIn(0.2)
  //   next.play()

  //   if (prev.current && prev.current !== next) {
  //     prev.current.fadeOut(0.2)
  //   }
  //   prev.current = next

  // }, [animation, actions])

  useEffect(() => {
    if (animation !== "Typing") {
      setMouseMode?.("desk")
    }
  }, [animation, setMouseMode])

  useFrame(() => {
    if (animation !== "Typing") return
    const a = actions?.Typing
    if (!a || !setMouseMode) return

    const t = a.time
    setMouseMode(inRanges(t, mouseRanges) ? "hand" : "desk")
  })

  useEffect(() => {
    if (!mouseObject || !group.current) return

    if (!originalParent.current) {
      originalParent.current = mouseObject.parent || null
    }

    if (mouseMode === "hand") {
      const hand = group.current.getObjectByName(handBone)
      if (!hand) return

      mouseObject.removeFromParent()
      hand.add(mouseObject)

      mouseObject.position.set(0.65, -0.85, 1.13)
      mouseObject.rotation.set(0, Math.PI, 0)
      mouseObject.scale.setScalar(0.5)
      return
    }

    if (mouseMode === "desk" && originalParent.current) {
      mouseObject.removeFromParent()
      originalParent.current.add(mouseObject)

      mouseObject.position.set(0, 0, 0)
      mouseObject.rotation.set(0, 0, 0)
      mouseObject.scale.setScalar(1)
    }
  }, [mouseMode, mouseObject])


  return (
    <group ref={group} {...props} dispose={null} >
      <group name="Scene" >
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="avaturn_body" geometry={nodes.avaturn_body.geometry} material={materials.avaturn_body_material} skeleton={nodes.avaturn_body.skeleton} />
          <skinnedMesh name="avaturn_glasses_0" geometry={nodes.avaturn_glasses_0.geometry} material={materials.avaturn_glasses_0_material} skeleton={nodes.avaturn_glasses_0.skeleton} />
          <skinnedMesh name="avaturn_glasses_1" geometry={nodes.avaturn_glasses_1.geometry} material={materials.avaturn_glasses_1_material} skeleton={nodes.avaturn_glasses_1.skeleton} />
          <skinnedMesh name="avaturn_hair_0" geometry={nodes.avaturn_hair_0.geometry} material={materials.avaturn_hair_0_material} skeleton={nodes.avaturn_hair_0.skeleton} cale={[1.06, 1.06, 1.06]} />
          <skinnedMesh name="avaturn_hair_1" geometry={nodes.avaturn_hair_1.geometry} material={materials.avaturn_hair_1_material} skeleton={nodes.avaturn_hair_1.skeleton} cale={[1.06, 1.06, 1.06]} />
          <skinnedMesh name="avaturn_look_0" geometry={nodes.avaturn_look_0.geometry} material={materials.avaturn_look_0_material} skeleton={nodes.avaturn_look_0.skeleton} />
          <skinnedMesh name="avaturn_look_1" geometry={nodes.avaturn_look_1.geometry} material={materials.avaturn_look_1_material} skeleton={nodes.avaturn_look_1.skeleton} />
          <skinnedMesh name="avaturn_shoes_0" geometry={nodes.avaturn_shoes_0.geometry} material={materials.avaturn_shoes_0_material} skeleton={nodes.avaturn_shoes_0.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/model.glb')
