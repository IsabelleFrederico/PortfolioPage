import { useEffect, useRef, useMemo } from 'react'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { buildClip } from '../hooks/useAnimation'

export function CatMia({ animation = "CatBathing", ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/cat.gltf')
  const { animations: catBathAnimation } = useFBX('/animations/catBath.fbx')
  const { animations: catRunningAnimation } = useFBX('/animations/catRunning.fbx')
  const { animations: catStandingAnimation } = useFBX('/animations/catStanding.fbx')
  const { animations: catSeatedAnimation } = useFBX('/animations/catSeated.fbx')
  // const { animations: catSeatedAnimation } = useGLTF('/animations/catSeated.glb')

  const bathClip = useMemo(
    () => buildClip(catBathAnimation, "CatBathing", "Bone"),
    [catBathAnimation]
  )

  const runningClip = useMemo(
    () => buildClip(catRunningAnimation, "CatRunning", "Bone"),
    [catRunningAnimation]
  )

  const standingClip = useMemo(
    () => buildClip(catStandingAnimation, "CatStanding", "Bone"),
    [catStandingAnimation]
  )

  const seatedClip = useMemo(
    () => buildClip(catSeatedAnimation, "CatSeated", "Bone"),
    [catSeatedAnimation]
  )

  const allAnims = useMemo(() => {
    return [bathClip, standingClip, runningClip, seatedClip].filter(Boolean)
  }, [bathClip, standingClip, runningClip, seatedClip])

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
