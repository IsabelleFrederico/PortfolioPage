export function stripRootPosition(clip, rootBoneName = "Bone") {
  if (!clip?.tracks) return clip

  const regex = new RegExp(`(^|\\|)${rootBoneName}\\.position$`)

  clip.tracks = clip.tracks.filter((t) => !regex.test(t.name || ""))
  return clip
}

// export function buildClip(anims, name, root = "Bone") {
//   const c = anims?.[0]
//   if (!c) return null
//   c.name = name
//   return stripRootPosition(c, root)
// }

export function buildClip(anims, name, root = "Bone") {
  if (!anims || anims.length === 0) return null

  // Garante que o clip realmente exista
  const original = anims[0]
  if (!original) return null

  // Clone para não mutar o original
  const clip = original.clone()

  // Força o nome que você quer usar
  clip.name = name

  // Remove posição do root, se necessário
  return stripRootPosition(clip, root)
}