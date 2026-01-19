import React, { useEffect, useRef, useMemo } from 'react'
import * as THREE from "three"
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

const handBone = "RightHand"
const mouseRanges = [[0, 2.485], [9.58, 12]]

function inRanges(t, ranges) {
  return ranges.some(([a, b]) => t >= a && t <= b)
}

export function Avatar({ mouseObject, mouseMode, setMouseMode, ...props }) {
  const group = React.useRef()
  const { scene } = useGLTF('/models/model.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { animations: typingAnimation } = useFBX('/animations/typing.fbx')
  const lastMode = useRef(null)

  typingAnimation[0].name = "Typing"

  const { actions } = useAnimations(typingAnimation, group)

  // useFrame(
  //   (state) => {
  //     group.current?.getObjectByName("Head").lookAt(state.camera.position)
  //     group.current?.getObjectByName("Neck").lookAt(state.camera.position)
  //   }
  //   , [])

  useEffect(() => {
    const a = actions?.Typing
    if (!a) return

    a.reset().play()

    return () => {
      a.stop()
    }
  }, [actions])


  useFrame(() => {
    const a = actions?.Typing
    if (!a || !setMouseMode) return

    const t = a.time
    const nextMode = inRanges(t, mouseRanges) ? "hand" : "desk"

    if (lastMode.current !== nextMode) {
      lastMode.current = nextMode
      setMouseMode(nextMode)
    }
  })

  useEffect(() => {
    if (!group.current || !mouseObject) return
    if (mouseMode !== "hand") return

    const hand = group.current.getObjectByName(handBone)

    if (!hand) {
      const names = []
      group.current.traverse((o) => names.push(o.name))
      return
    }

    mouseObject.removeFromParent()
    hand.add(mouseObject)

    mouseObject.position.set(0.65, -0.85, 1.13)
    mouseObject.rotation.set(0, Math.PI, 0)
    mouseObject.scale.setScalar(0.5)
  }, [mouseMode, mouseObject])

  // useFrame(() => {
  //   const t = actions?.Typing?.time ?? 0
  //   // só pra debug (remove depois)
  //   if (Math.floor(t * 10) % 10 === 0) console.log("Typing time:", t.toFixed(2))
  // })

  return (
    <group ref={group} {...props} position={[0.16, 0.015, -0.05]} rotation={[0, Math.PI / 2, 0]} dispose={null} scale={0.0057}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="avaturn_body" geometry={nodes.avaturn_body.geometry} material={materials.avaturn_body_material} skeleton={nodes.avaturn_body.skeleton} />
          <skinnedMesh name="avaturn_glasses_0" geometry={nodes.avaturn_glasses_0.geometry} material={materials.avaturn_glasses_0_material} skeleton={nodes.avaturn_glasses_0.skeleton} />
          <skinnedMesh name="avaturn_glasses_1" geometry={nodes.avaturn_glasses_1.geometry} material={materials.avaturn_glasses_1_material} skeleton={nodes.avaturn_glasses_1.skeleton} />
          <skinnedMesh name="avaturn_hair_0" geometry={nodes.avaturn_hair_0.geometry} material={materials.avaturn_hair_0_material} skeleton={nodes.avaturn_hair_0.skeleton} />
          <skinnedMesh name="avaturn_hair_1" geometry={nodes.avaturn_hair_1.geometry} material={materials.avaturn_hair_1_material} skeleton={nodes.avaturn_hair_1.skeleton} />
          <skinnedMesh name="avaturn_look_0" geometry={nodes.avaturn_look_0.geometry} material={materials.avaturn_look_0_material} skeleton={nodes.avaturn_look_0.skeleton} scale={[1.06, 1.06, 1.06]} />
          <skinnedMesh name="avaturn_look_1" geometry={nodes.avaturn_look_1.geometry} material={materials.avaturn_look_1_material} skeleton={nodes.avaturn_look_1.skeleton} scale={[1.06, 1.06, 1.06]} />
          <skinnedMesh name="avaturn_shoes_0" geometry={nodes.avaturn_shoes_0.geometry} material={materials.avaturn_shoes_0_material} skeleton={nodes.avaturn_shoes_0.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/model.glb')
