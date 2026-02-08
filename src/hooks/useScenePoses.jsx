import { scale } from "motion"
import { useMemo, useState, useEffect } from "react"

export function useScenePoses({ viewport, menuOpened, catAnimation }) {
    const isRunning = catAnimation === "CatRunning"
    const isMobile = window.innerWidth < 768
    const viewH = viewport?.height ?? 1
    const viewW = viewport?.width ?? 1
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
    const targetVW = 1.6
    const responsiveRatio = viewW / targetVW

    const officeScaleRatio = menuOpened
        ? clamp(0.5 * responsiveRatio, 0.35, 1.5)
        : clamp(0.35 * responsiveRatio, 0.3, 1.0)

    const [catXOffset, setCatXOffset] = useState(0)

    useEffect(() => {
        if (!isRunning) {
            setCatXOffset(0)
            return
        }

        let i = 0
        setCatXOffset(0)

        const id = setInterval(() => {
            i += 0.04
            setCatXOffset(i)
        }, 50)

        return () => clearInterval(id)
    }, [isRunning])

    return useMemo(() => {
        const byMenu = (closedPose, openPose) => (menuOpened ? openPose : closedPose)

        const avatarScale = 0.0057
        const officeScale = [officeScaleRatio, officeScaleRatio, officeScaleRatio]
        const runningScaleBoost = isRunning ? 1.2 : 1

        const section0MenuClosed = isMobile
            ? [0.1 * officeScaleRatio, -viewH / 2.5, 0]
            : [0.7, -0.5, 0]

        const section0MenuOpen = isMobile
            ? [2 * officeScaleRatio, -0.8, 1]
            : [2.5, -0.8, 1]

        const section0Position = menuOpened ? section0MenuOpen : section0MenuClosed

        const stick0Position = (lx, ly, lz) => ({
            x: section0Position[0] + lx * officeScaleRatio,
            y: section0Position[1] + ly * officeScaleRatio,
            z: section0Position[2] + lz * officeScaleRatio,
        })

        // =========================
        // AVATAR VARIANTS
        // =========================
        const avatarVariants = {
            0: byMenu(
                {
                    ...stick0Position(0.15, 0.01, -0.05),
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: officeScaleRatio * avatarScale,
                },
                {
                    ...stick0Position(0.3, 0.01, -0.15),
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: officeScaleRatio  * avatarScale
                },
            ),

            1: byMenu(
                {
                    x: 0,
                    y: -viewH - 0.1,
                    z: 2.5,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                },
                {
                    x: -0.2,
                    y: -viewH - 0.5,
                    z: 2.5,
                    rotateX: 0,
                    rotateY: 0.15,
                    rotateZ: 0,
                    scale: 0.01
                }
            ),

            2: byMenu(
                {
                    x: -2.5,
                    y: -viewH * 2 - 1,
                    z: 0,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0.007
                },
                {
                    x: -0.9,
                    y: -viewH * 2 - 0.7,
                    z: 0.2,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0.008
                }
            ),

            3: byMenu(
                {
                    x: 0.3,
                    y: -viewH * 3.15,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 0.008
                },
                {
                    x: 3.8,
                    y: -viewH * 3.5,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 0.014
                }
            ),
        }

        // =========================
        // CAT VARIANTS
        // =========================
        const catVariants = {
            0: byMenu(
                {
                    ...stick0Position(-0.1, 0.1, 1),
                    rotateX: -Math.PI / 2,
                    rotateY: 1,
                    rotateZ: 0,
                    scale: officeScaleRatio * runningScaleBoost,
                },
                {
                    ...stick0Position(0, 0.1, 1),
                    rotateX: -Math.PI / 2,
                    rotateY: 1,
                    rotateZ: 0,
                    scale: officeScaleRatio * runningScaleBoost,
                }
            ),

            1: byMenu(
                {
                    x: -0.5,
                    y: -viewH - 0.1,
                    z: 2,
                    rotateX: -Math.PI / 2.9,
                    rotateY: 0.15,
                    rotateZ: -1.3,
                    scale: 1.25 * runningScaleBoost,
                },
                {
                    x: -1.7,
                    y: -viewH + 0.08,
                    z: 3,
                    rotateX: -Math.PI / 4,
                    rotateY: 0.15,
                    rotateZ: -1.3,
                    scale: 1.25 * runningScaleBoost,
                }
            ),

            2: byMenu(
                {
                    x: -2 + catXOffset,
                    y: -viewH * 2 - 1.25,
                    z: 0,
                    rotateX: -Math.PI / 2,
                    rotateY: 0.8,
                    rotateZ: 0,
                    scale: 1 * runningScaleBoost,
                },
                {
                    x: 0.2 + catXOffset,
                    y: -viewH * 2 - 1.5,
                    z: 0,
                    rotateX: -Math.PI / 2,
                    rotateY: 0.8,
                    rotateZ: -0.2,
                    scale: 1 * runningScaleBoost,
                }
            ),

            3: byMenu(
                {
                    x: -0.8,
                    y: -viewH * 3.12,
                    z: 0,
                    rotateX: 2,
                    rotateY: -2.6,
                    rotateZ: 1,
                    scale: 1.5 * runningScaleBoost,
                },
                {
                    x: 0.7,
                    y: -viewH * 3.1,
                    z: 1,
                    rotateX: 2.2,
                    rotateY: -2.6,
                    rotateZ: 1,
                    scale: 1.68 * runningScaleBoost,
                }
            ),
        }

        // =========================
        // OFFICE VARIANTS
        // =========================

        const officeVariants = byMenu(
            {
                position: [isMobile ? 0.1 * officeScaleRatio : 0.7, isMobile ? -viewport.height / 2.5 : -0.5, 0],
            },
            {
                position: [isMobile ? 2 * officeScaleRatio : 2.5, isMobile ? -0.8 : -0.8, 1],
            }
        )

        // =========================
        // CARDS PROJECTS VARIANTS
        // =========================
        const projectsVariants = {
            2: byMenu(
                {
                    x: 0,
                    y: isMobile ? 0 : -0.2,
                    z: isMobile ? 0 : 0,
                    rotateX: isMobile ? 0 : -0.02,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: isMobile ? 0 : 0.9,
                },
                {
                    x: 3,
                    y: 3.4,
                    z: 0,
                    rotateX: 0,
                    rotateY: -1,
                    rotateZ: 0,
                    scale: 1.4,
                }
            ),
        }

        return {
            avatarVariants,
            catVariants,
            avatarScale,
            officeVariants,
            officeScale,
            projectsVariants
        }
    }, [viewH, menuOpened, viewport, catAnimation, isRunning, catXOffset])
}
