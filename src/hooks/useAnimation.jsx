export function stripRootPosition(clip, rootBoneName = "Bone") {
  if (!clip?.tracks) return clip

  const regex = new RegExp(`(^|\\|)${rootBoneName}\\.position$`)

  clip.tracks = clip.tracks.filter((t) => !regex.test(t.name || ""))
  return clip
}

export function buildClip(anims, name, root = "Bone") {
  if (!anims || anims.length === 0) return null

  const original = anims[0]
  if (!original) return null

  const clip = original.clone()

  clip.name = name

  return stripRootPosition(clip, root)
}