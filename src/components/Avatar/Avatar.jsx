import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { buildClip } from '../../hooks/useAnimation'

const handBone = "RightHand"
const mouseRanges = [[0, 2.485], [9.58, 12]]

function inRanges(t, ranges) {
  return ranges.some(([a, b]) => t >= a && t <= b)
}

export function Avatar({ animation = "Typing", mouseObject, mouseMode, setMouseMode, cellphoneObject, mode = "normal", wireOpacity = 0.35, ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/avatar.glb')
  const originalParent = useRef(null)
  const cellphoneOriginalParent = useRef(null)

  const { animations: typingAnimation } = useFBX('/animations/typing.fbx')
  const { animations: fallingAnimation } = useFBX('/animations/falling.fbx')
  const { animations: cellphoneAnimation } = useFBX('/animations/call.fbx')
  const { animations: pointingAnimation } = useFBX('/animations/pointing.fbx')
  const { animations: airScreenAnimationRaw } = useFBX('/animations/airScreen.fbx')

  if (typingAnimation[0]) typingAnimation[0].name = "Typing"
  if (fallingAnimation[0]) fallingAnimation[0].name = "Falling"
  if (cellphoneAnimation[0]) cellphoneAnimation[0].name = "Cellphone"
  if (pointingAnimation[0]) pointingAnimation[0].name = "Pointing"
  
  const airScreenAnimation = useMemo(() => {
    if (!airScreenAnimationRaw?.length) return []
    const valid = airScreenAnimationRaw.filter(c => (c?.duration ?? 0) > 0.0001)
    const clip = valid[0] || null
    if (!clip) return []
    clip.name = "AirScreen"
    return [clip]
  }, [airScreenAnimationRaw])

  const typingClip = useMemo(
    () => buildClip(typingAnimation, "Typing", "Bone"),
    [typingAnimation]
  )

  const fallingClip = useMemo(
    () => buildClip(fallingAnimation, "Falling", "Bone"),
    [fallingAnimation]
  )

  const pointingClip = useMemo(
    () => buildClip(pointingAnimation, "Pointing", "Bone"),
    [pointingAnimation]
  )

  const airScreenClip = useMemo(
    () => buildClip(airScreenAnimation, "AirScreen", "Bone"),
    [airScreenAnimation]
  )

  const cellphoneClip = useMemo(
    () => buildClip(cellphoneAnimation, "Cellphone", "Bone"),
    [cellphoneAnimation]
  )

  const allAnims = useMemo(() => {
    return [
      typingClip,
      fallingClip,
      pointingClip,
      airScreenClip,
      cellphoneClip
    ].filter(Boolean)
  }, [
    typingClip,
    fallingClip,
    pointingClip,
    airScreenClip,
    cellphoneClip
  ])

  const { actions } = useAnimations(allAnims, group)

  useEffect(() => {
    const action = actions?.[animation]
    if (!action) return

    action.reset().fadeIn(0.2).play()

    return () => {
      action.fadeOut(0.2)
    }
  }, [animation, actions])

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

  useEffect(() => {
    if (!cellphoneObject || !group.current) return
    if (!cellphoneOriginalParent.current) {
      cellphoneOriginalParent.current = cellphoneObject.parent || null
    }

    const hand = group.current.getObjectByName(handBone)
    if (!hand) return

    hand.attach(cellphoneObject)

    cellphoneObject.position.set(0.008, 0.065, 0.015)
    cellphoneObject.rotation.set(-0.15, -0.15, -0.9)
    cellphoneObject.scale.setScalar(1.05)

  }, [cellphoneObject])

  return (
    <group ref={group} {...props} dispose={null} >
      <group name="Scene" >
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="avaturn_body" frustumCulled={false} geometry={nodes.avaturn_body.geometry} material={materials.avaturn_body_material} skeleton={nodes.avaturn_body.skeleton} />
          <skinnedMesh name="avaturn_glasses_0" frustumCulled={false} geometry={nodes.avaturn_glasses_0.geometry} material={materials.avaturn_glasses_0_material} skeleton={nodes.avaturn_glasses_0.skeleton} />
          <skinnedMesh name="avaturn_glasses_1" frustumCulled={false} geometry={nodes.avaturn_glasses_1.geometry} material={materials.avaturn_glasses_1_material} skeleton={nodes.avaturn_glasses_1.skeleton} />
          <skinnedMesh name="avaturn_hair_0" frustumCulled={false} geometry={nodes.avaturn_hair_0.geometry} material={materials.avaturn_hair_0_material} skeleton={nodes.avaturn_hair_0.skeleton} scale={[1.06, 1.06, 1.06]} />
          <skinnedMesh name="avaturn_hair_1" frustumCulled={false} geometry={nodes.avaturn_hair_1.geometry} material={materials.avaturn_hair_1_material} skeleton={nodes.avaturn_hair_1.skeleton} scale={[1.06, 1.06, 1.06]} />
          <skinnedMesh name="avaturn_look_0" frustumCulled={false} geometry={nodes.avaturn_look_0.geometry} material={materials.avaturn_look_0_material} skeleton={nodes.avaturn_look_0.skeleton} />
          <skinnedMesh name="avaturn_look_1" frustumCulled={false} geometry={nodes.avaturn_look_1.geometry} material={materials.avaturn_look_1_material} skeleton={nodes.avaturn_look_1.skeleton} />
          <skinnedMesh name="avaturn_shoes_0" frustumCulled={false} geometry={nodes.avaturn_shoes_0.geometry} material={materials.avaturn_shoes_0_material} skeleton={nodes.avaturn_shoes_0.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/model.glb')
useFBX.preload('/animations/typing.fbx')
useFBX.preload('/animations/falling.fbx')
useFBX.preload('/animations/call.fbx')
useFBX.preload('/animations/pointing.fbx')
useFBX.preload('/animations/airScreen.fbx')