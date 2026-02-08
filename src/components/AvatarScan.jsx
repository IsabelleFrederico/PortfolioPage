import * as THREE from "three"
import { useMemo } from "react"

export function AvatarScan({ AvatarComponent, plane }) {
  // acima do plane: mostra normal
  const clipAbove = useMemo(() => [plane], [plane])

  // abaixo do plane: invertendo a normal pra recortar o lado oposto
  const planeInv = useMemo(() => plane.clone().negate(), [plane])
  const clipBelow = useMemo(() => [planeInv], [planeInv])

  return (
    <group position={[0, 0.18, 0]} /* centraliza em cima do stand */>
      {/* Avatar NORMAL (fica acima do anel) */}
      <group>
        <AvatarComponent
          // você precisa “passar” clipping pro material dentro do Avatar
          // (se seu Avatar usa materiais do GLTF, dá pra setar em runtime)
          clippingPlanes={clipAbove}
          clipShadows
          mode="normal"
        />
      </group>

      {/* Avatar WIREFRAME (fica abaixo do anel) */}
      <group>
        <AvatarComponent
          clippingPlanes={clipBelow}
          clipShadows
          mode="wireframe"
        />
      </group>
    </group>
  )
}
