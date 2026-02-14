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
                    x: isMobile ? 0.24 : isWindowM ? 0.25 : -0.05,
                    y: isMobile ? -viewH + 0 : -viewH - 0.83,
                    z: isMobile ? -0.1 : 0.2,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: isMobile ? avatarScale / 1.25 : avatarScale + 0.003
                },
                {
                    x: isMobile ? 1 : 1,
                    y: isMobile ? -viewH - 0.9 : -viewH - 0.7,
                    z: isMobile ? 1.7 : 1.8,
                    rotateX: 0,
                    rotateY: 0.15,
                    rotateZ: 0,
                    scale: isMobile ? avatarScale + 0.003 : isWindowM ? avatarScale + 0.003 : avatarScale + 0.005
                }
            ),

            2: byMenu(
                {
                    x: isMobile ? -viewW / 2.8 : isWindowM ? -viewW / 2.5 : isWindowG ? -2.1 : -2.5,
                    y: isMobile ? -viewH * 2 - 1 : isWindowM ? -viewH * 2 - 1 : -viewH * 2 - 1,
                    z: 0,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0.007
                },
                {
                    x: isMobile ? -viewW / 30 : isWindowM ? -viewW / 30 : isWindowG ? -viewW / 10 : -1,
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
                    x: isMobile ? 0.3 : 0.5,
                    y: -viewH * 3.642,
                    z: -2,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: isMobile ? 0 : 0.01
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
                    x: isMobile ? 0.25 : isWindowM ? 0.5 : -0.8,
                    y: isMobile ? -viewH + 0.25 : -viewH - 0.65,
                    z: -0.3,
                    rotateX: -Math.PI / 2.9,
                    rotateY: 0.15,
                    rotateZ: -1.3,
                    scale: isMobile ? runningScaleBoost - 0.3 : runningScaleBoost + 0.4,
                },
                {
                    x: -1.7,
                    y: -viewH + 0.08,
                    z: 3,
                    rotateX: -Math.PI / 4,
                    rotateY: 0.15,
                    rotateZ: -1.3,
                    scale: isMobile ? runningScaleBoost : isWindowM ? runningScaleBoost : 1.05 * runningScaleBoost,
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
                    rotateZ: 0,
                    scale: 1 * runningScaleBoost,
                }
            ),

            3: byMenu(
                {
                    x: isMobile ? -0.7 : -1.5,
                    y: isMobile ? -viewH * 3.1 : -viewH * 3.58,
                    z: -4,
                    rotateX: 2.2,
                    rotateY: -2.6,
                    rotateZ: 1,
                    scale: 1.9 * runningScaleBoost,
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
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : -0.1,
                    y: isMobile ? -viewH : -viewH - 0.9,
                    z: isMobile ? 0 : 0.2,
                    scale: isMobile ? 0.25 : 0.5,
                },
                {
                    x: isMobile ? 1 : 1,
                    y: isMobile ? -viewH - 0.9 : -viewH - 0.75,
                    z: isMobile ? 1.8 : 1.8,
                    scale: isMobile ? 0.4 : isWindowM ? 0.55 : 0.65,
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
                    y: isMobile ? -viewH * 3.68 : -viewH * 3.68,
                    z: isMobile ? 0 : -2.9,
                    rotateY: Math.PI,
                    scale: isMobile ? viewH / 3 : viewH -0.91,
                },
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 3.68 : -viewH * 3.68,
                    z: isMobile ? 0 : -2.9,
                    rotateY: Math.PI - 1,
                    scale: isMobile ? viewH / 2 : viewH -0.91,
                }
            )
        }

        const contactBackgroundVariants = {
            3: byMenu(
                {
                    x: isMobile ? 0.2 : isWindowM ? 0.2 : 1,
                    y: isMobile ? -viewH * 3.7 : -viewH * 3.7,
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
            stageVariants
        }
    }, [viewH, viewW, menuOpened, viewport, catAnimation, isRunning, catXOffset, isMobile, officeScaleRatio])
}
