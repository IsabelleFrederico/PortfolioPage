import { useMemo, useState, useEffect } from "react"

export function useScenePoses({ viewport, menuOpened, catAnimation }) {
    const isRunning = catAnimation === "CatRunning"
    const isMobile = window.innerWidth < 768
    const isWindowM = window.innerWidth < 1024
    const isWindowG = window.innerWidth < 1170
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
                    scale: officeScaleRatio * avatarScale
                },
            ),

            1: byMenu(
                {
                    x: isMobile ? 0.24 : -0.05,
                    y: isMobile ? -viewH - 0.81 : -viewH - 2.6,
                    z: isMobile ? -1.2 : -5,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: isMobile ? avatarScale + 0.001 : avatarScale + 0.0075
                },
                {
                    x: isMobile ? 5 : 7,
                    y: isMobile ? -viewH - 1.65 : -viewH - 2.5,
                    z: isMobile ? -1 : -2,
                    rotateX: 0,
                    rotateY: 0.15,
                    rotateZ: 0,
                    scale: isMobile ? avatarScale + 0.003 : avatarScale + 0.009
                }
            ),

            2: byMenu(
                {
                    x: isMobile ? -1 : isWindowM ? -2.3 : isWindowG ? -3.1 : -3.5,
                    y: isMobile ? -viewH - 4.73 : -viewH - 4.81,
                    z: -2,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0.01
                },
                {
                    x: isMobile ? 1 : isWindowM ? 1.7 : isWindowG ? 1 : 0.3,
                    y: isMobile ? -viewH - 4 : -viewH - 3.9,
                    z: isMobile ? 0.2 : -2,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0.01
                }
            ),

            3: byMenu(
                {
                    x: isMobile ? 0.3 : 0.5,
                    y: isMobile ? -viewH * 3.942 : -viewH * 3.642,
                    z: isMobile ? -3 : -2,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: isMobile ? viewH / 500 : 0.01
                },
                {
                    x: 2,
                    y: -viewH * 3.65,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 0.013
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
                    x: isMobile ? 0.5 : isWindowM ? 0.5 : -1.5,
                    y: isMobile ? -viewH - 0.45 : -viewH - 2,
                    z: isMobile ? -viewH + 2.5 : -viewH - 1,
                    rotateX: -Math.PI / 2.9,
                    rotateY: 0.15,
                    rotateZ: -1.3,
                    scale: isMobile ? runningScaleBoost + 0.05 : runningScaleBoost + 1,
                },
                {
                    x: isMobile ? 3 : 0.6,
                    y: isMobile ? -viewH - 1.07 : -viewH - 0.5,
                    z: isMobile ? -0.3 : 1.4,
                    rotateX: -Math.PI / 4,
                    rotateY: 0.15,
                    rotateZ: -1.3,
                    scale: isMobile ? runningScaleBoost + 0.3 : 1.1 * runningScaleBoost,
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
                    x: -1 + catXOffset,
                    y: -viewH - 3.5,
                    z: catXOffset,
                    rotateX: -Math.PI / 2 + 0.3,
                    rotateY: 0.9,
                    rotateZ: -1.4,
                    scale: 1 * runningScaleBoost,
                }
            ),

            3: byMenu(
                {
                    x: isMobile ? -0.85 : -1.5,
                    y: isMobile ? -viewH * 3.89 : -viewH * 3.59,
                    z: -4,
                    rotateX: 2.2,
                    rotateY: -2.6,
                    rotateZ: 1,
                    scale: isMobile ? viewH * runningScaleBoost - 1.3 : 1.9 * runningScaleBoost,
                },
                {
                    x: isMobile ? -0.7 : 3,
                    y: isMobile ? -viewH * 3.1 : -viewH * 3.58,
                    z: -2,
                    rotateX: 2.2,
                    rotateY: -2.6,
                    rotateZ: 1,
                    scale: 2.5 * runningScaleBoost,
                }
            ),
        }

        // =========================
        // Project VARIANTS
        // =========================

        const ballVariants = {
            2: byMenu(
                {
                    x: isMobile ? 0 : 0,
                    y: isMobile ? -viewH - 5 : -viewH - 4.8,
                    z: isMobile ? -2 : -2,
                    rotateX: isMobile ? -0.01 : 0,
                    rotateY: isMobile ? 0 : 0,
                    rotateZ: isMobile ? 0 : 0,
                    scale: isMobile ? 1 : 1,
                },
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 0,
                    y: isMobile ? -viewH - 4 : -viewH - 3.9,
                    z: isMobile ? -2 : -2,
                    rotateX: 0,
                    rotateY: -1.01,
                    rotateZ: 0,
                    scale: 1,
                }
            )
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
        // STAGE
        // =========================

        const stageVariants = {
            1: byMenu(
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 0,
                    y: isMobile ? -viewH + 1.5 : -viewH + 2.5,
                    z: isMobile ? 2 : 0.2,
                    rotateX: isMobile ? -0.01 : 0,
                    rotateY: isMobile ? 0 : 0,
                    rotateZ: isMobile ? 0 : 0,
                    scale: isMobile ? 0.4 : 1,
                },
                {
                    x: isMobile ? 1 : 1,
                    y: isMobile ? -viewH + 1.5 : -viewH + 3,
                    z: isMobile ? 1.8 : 1.8,
                    rotateX: isMobile ? Math.PI - 3.1 : 0,
                    rotateY: -1,
                    rotateZ: isMobile ? 0.01 : 0,
                    scale: isMobile ? 0.55 : 1,
                }
            )
        }

        // =========================
        // SkillsOrbit
        // =========================

        const skillsVariants = {
            1: byMenu(
                {
                    x: isMobile ? 0.18 : -0.1,
                    y: isMobile ? -viewH + 0.25 : -viewH - 0.5,
                    z: isMobile ? -0.9 : -4.5,
                    scale: isMobile ? 0.35 : 0.8,
                },
                {
                    x: isMobile ? 4.5 : 6.5,
                    y: isMobile ? -viewH - 0.25 : -viewH - 0.25,
                    z: isMobile ? -0.7 : -1.6,
                    scale: isMobile ? 0.55 : 0.9,
                }
            )
        }

        // =========================
        // Contact Office
        // =========================

        const contactOfficeVariants = {
            3: byMenu(
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 3.955 : -viewH * 3.68,
                    z: isMobile ? -4.9 : -2.9,
                    rotateY: Math.PI,
                    scale: isMobile ? viewH / 3 : viewH - 0.91,
                },
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 3.68 : -viewH * 3.68,
                    z: isMobile ? 0 : -2.9,
                    rotateY: Math.PI - 1,
                    scale: isMobile ? viewH / 2 : viewH - 0.91,
                }
            )
        }

        const contactBackgroundVariants = {
            1: byMenu(
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 4 : -viewH * 2.5,
                    z: isMobile ? 0 : -0.2,
                    rotateX: 0,
                    rotateY: Math.PI,
                    rotateZ: 0,
                    scaleX: 4,
                    scaleY: 3,
                    scaleZ: 3,
                },
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 3.7 : -viewH * 3.7,
                    z: isMobile ? 0 : -0.2,
                    rotateX: 0,
                    rotateY: Math.PI - 1,
                    rotateZ: 0,
                    scaleX: 4,
                    scaleY: 3,
                    scaleZ: 3,
                }
            ),
            3: byMenu(
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 4 : -viewH * 3.7,
                    z: isMobile ? 0 : -0.2,
                    rotateX: 0,
                    rotateY: Math.PI,
                    rotateZ: 0,
                    scaleX: 4,
                    scaleY: 3,
                    scaleZ: 3,
                },
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 3.7 : -viewH * 3.7,
                    z: isMobile ? 0 : -0.2,
                    rotateX: 0,
                    rotateY: Math.PI - 1,
                    rotateZ: 0,
                    scaleX: 4,
                    scaleY: 3,
                    scaleZ: 3,
                }
            )
        }

        return {
            avatarVariants,
            catVariants,
            avatarScale,
            officeVariants,
            officeScale,
            contactOfficeVariants,
            contactBackgroundVariants,
            stageVariants,
            ballVariants,
            skillsVariants
        }
    }, [viewH, viewW, menuOpened, viewport, catAnimation, isRunning, catXOffset, isMobile, officeScaleRatio])
}
