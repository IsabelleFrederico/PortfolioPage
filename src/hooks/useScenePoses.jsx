import { useMemo, useState, useEffect } from "react"

export function useScenePoses({ viewport, menuOpened, catAnimation }) {
    const isRunning = catAnimation === "CatRunning"
    const view = viewport?.height ?? 1
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
        const officeScale = menuOpened ? 1.5 : 1
        const runningScaleBoost = isRunning ? 1.2 : 1

        // =========================
        // AVATAR VARIANTS
        // =========================
        const avatarVariants = {
            0: byMenu(
                {
                    x: 0.85,
                    y: -0.49,
                    z: -0.05,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                },
                {
                    x: 2.8,
                    y: -0.79,
                    z: 0.85,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0.00855
                },
            ),

            1: byMenu(
                {
                    x: 0,
                    y: -view - 0.1,
                    z: 2.5,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                },
                {
                    x: -0.2,
                    y: -view - 0.5,
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
                    y: -view * 2 - 1,
                    z: 0,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0.007
                },
                {
                    x: -0.9,
                    y: -view * 2 - 0.7,
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
                    y: -view * 3 - 0.7,
                    z: 0,
                    rotateX: 0,
                    rotateY: -Math.PI / 0.5,
                    rotateZ: 0,
                    scale: 0.008   
                },
                {
                    x: 0.1,
                    y: -view * 3 + 1.15,
                    z: 0,
                    rotateX: 0,
                    rotateY: -Math.PI / 4,
                    rotateZ: 0,
                    // scale: 1
                }
            ),
        }

        // =========================
        // CAT VARIANTS
        // =========================
        const catVariants = {
            0: byMenu(
                {
                    x: 0.6,
                    y: -0.4,
                    z: 1,
                    rotateX: -Math.PI / 2,
                    rotateY: 1,
                    rotateZ: 0,
                    scale: 1 * runningScaleBoost,
                },
                {
                    x: 2.5,
                    y: -0.7,
                    z: 2,
                    rotateX: -Math.PI / 2,
                    rotateY: 1,
                    rotateZ: 0,
                    scale: 1.3 * runningScaleBoost,
                }
            ),

            1: byMenu(
                {
                    x: -0.5,
                    y: -view - 0.1,
                    z: 2,
                    rotateX: -Math.PI / 2.9,
                    rotateY: 0.15,
                    rotateZ: -1.3,
                    scale: 1.25 * runningScaleBoost,
                },
                {
                    x: -1.7,
                    y: -view + 0.08,
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
                    y: -view * 2 - 1.25,
                    z: 0,
                    rotateX: -Math.PI / 2,
                    rotateY: 0.8,
                    rotateZ: 0,
                    scale: 1 * runningScaleBoost,
                },
                {
                    x: 0.2 + catXOffset,
                    y: -view * 2 - 1.5,
                    z: 0,
                    rotateX: -Math.PI / 2,
                    rotateY: 0.8,
                    rotateZ: -0.2,
                    scale: 1 * runningScaleBoost,
                }
            ),

            3: byMenu(
                {
                    x: -1,
                    y: -view * 3 - 0.5,
                    z: 0,
                    rotateX: 2,
                    rotateY: -2.6,
                    rotateZ: 1,
                    scale: 1.5 * runningScaleBoost,
                },
                {
                    x: 0,
                    y: -view * 3 + 1.2,
                    z: 0,
                    rotateX: 0,
                    rotateY: -Math.PI / 4,
                    rotateZ: 0,
                    scale: 1 * runningScaleBoost,
                }
            ),
        }

        // =========================
        // OFFICE VARIANTS
        // =========================

        const officeVariants = byMenu(
            {
                position: [0.7, -0.5, 0],
            },
            {
                position: [2.5, -0.8, 1],
            }
        )

        // =========================
        // CARDS PROJECTS VARIANTS
        // =========================
        const projectsVariants = {
            2: byMenu(
                {
                    x: 0,
                    y: -0.2,
                    z: 0,
                    rotateX: -0.02,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 0.9,
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
    }, [view, menuOpened, viewport, catAnimation, isRunning, catXOffset])
}
