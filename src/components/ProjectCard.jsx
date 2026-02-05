import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { useMemo } from "react"

export const ProjectCard = ({
  src,
  position = [0, 0.3, 0.001],
  size = [2, 1.2],
  radius = 0.12,       
  fit = "contain",       
}) => {
  const tex = useTexture(src)

  const mask = useMemo(() => {
    const s = 256
    const r = Math.max(1, Math.floor((radius / Math.min(size[0], size[1])) * (s / 2)))
    const c = document.createElement("canvas")
    c.width = s
    c.height = s
    const ctx = c.getContext("2d")

    ctx.clearRect(0, 0, s, s)
    ctx.fillStyle = "white"

    const rr = (x, y, w, h, rad) => {
      ctx.beginPath()
      ctx.moveTo(x + rad, y)
      ctx.arcTo(x + w, y, x + w, y + h, rad)
      ctx.arcTo(x + w, y + h, x, y + h, rad)
      ctx.arcTo(x, y + h, x, y, rad)
      ctx.arcTo(x, y, x + w, y, rad)
      ctx.closePath()
      ctx.fill()
    }
    rr(0, 0, s, s, r)

    const t = new THREE.CanvasTexture(c)
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
    t.needsUpdate = true
    return t
  }, [radius, size])

  useMemo(() => {
    if (!tex?.image) return

    const imgAspect = tex.image.width / tex.image.height
    const planeAspect = size[0] / size[1]

    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping

      if (imgAspect > planeAspect) {
        const scale = planeAspect / imgAspect
        tex.repeat.set(scale, 1)
        tex.offset.set((1 - scale) / 2, 0)
      } else {
        const scale = imgAspect / planeAspect
        tex.repeat.set(1, scale)
        tex.offset.set(0, (1 - scale) / 2)
      }

    tex.needsUpdate = true
  }, [tex, size, fit])

  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        map={tex}
        alphaMap={mask}
        transparent
        alphaTest={0.5}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  )
}
