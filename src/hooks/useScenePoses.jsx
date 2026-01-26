import { useMemo } from "react"

const normalize = (p = {}) => ({
  x: p.x ?? 0,
  y: p.y ?? 0,
  z: p.z ?? 0,
  rotateX: p.rotateX ?? 0,
  rotateY: p.rotateY ?? 0,
  rotateZ: p.rotateZ ?? 0,
  scale: p.scale ?? 1,
})

export function useScenePoses(section, menuOpened) {
  return useMemo(() => {
    // =========================
    // AVATAR (per section)
    // =========================
    const avatarBySection = {
      0: normalize({ x: 0.7, y: -0.5, z: 0, rotateY: 0, scale: 1 }),
      1: normalize({ x: -0.2, y: -3.8, z: 0, rotateY: -1.5, scale: 2 }),
      2: normalize({ x: -0.2, y: -1.2, z: 0.2, rotateY: -0.2, scale: 1 }),
      3: normalize({ x: 0.0, y: -1.8, z: 0.3, rotateY: 0, scale: 1 }),
    }

    // =========================
    // CAT (per section)
    // =========================
    const catBySection = {
      0: normalize({ x: -0.2, y: 0.05, z: 0.8, rotateX: -1.5, rotateY: 0.2, rotateZ: 0, scale: 1 }),
      1: normalize({ x: 0.05, y: 0, z: 0.40, rotateX: -1.5, rotateY: 0.3, rotateZ: 1, scale: 1 }),
      2: normalize({ x: -0.25, y: 0, z: 0.15, rotateX: 0, rotateY: -0.8, rotateZ: 0, scale: 1 }),
      3: normalize({ x: 0.20, y: 0, z: 0.30, rotateX: 0, rotateY: 0.0, rotateZ: 0, scale: 1 }),
    }

    // =========================
    // WORLD (per section + menu)
    // =========================

    // Base (menu closed) per section
    const closedBySection = {
      0: normalize({ x: 0.7, y: -0.5, z: 0, rotateY: 0, scale: 1 }),
      1: normalize({ x: 0.7, y: -1.2, z: 0, rotateY: 0, scale: 1 }),
      2: normalize({ x: 0.7, y: -0.5, z: 0, rotateY: 0, scale: 1 }),
      3: normalize({ x: 0.7, y: -0.5, z: 0, rotateY: 0, scale: 1 }),
    }

    // Menu open per section 
    const openBySection = {
      0: normalize({ x: 0.7, y: -0.5, z: 0.1, rotateY: 0, scale: 1 }),
      1: normalize({ x: 1.0, y: 0.1, z: 2, rotateY: -0.2, scale: 1 }),
      2: normalize({ x: 1.0, y: -0.2, z: 2, rotateY: 0, scale: 1 }),
      3: normalize({ x: 1.0, y: -0.2, z: 2, rotateY: 0, scale: 1 }),
    }

    const safeSection = avatarBySection[section] ? section : 0

    const targetAll = avatarBySection[safeSection]
    const targetCat = catBySection[safeSection]

    const targetOffice = menuOpened
      ? openBySection[safeSection]
      : closedBySection[safeSection]

    return { targetOffice, targetAll, targetCat }
  }, [section, menuOpened])
}
