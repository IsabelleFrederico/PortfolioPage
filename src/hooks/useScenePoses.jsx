import { scale } from "motion"
import { useMemo } from "react"

export function useScenePoses({ viewport, menuOpened }) {
    const view = viewport?.height ?? 1

    return useMemo(() => {
        const byMenu = (closedPose, openPose) => (menuOpened ? openPose : closedPose)

        const avatarScale = 0.0057
        const officeScale = menuOpened ? 1.5 : 1

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
                    y: -0.49,
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
                    x: -0.3,
                    y: -view - 0.05,
                    z: 2.2,
                    rotateX: 0,
                    rotateY: 0.15,
                    rotateZ: 0,
                }
            ),

            2: byMenu(
                {
                    x: -2,
                    y: -view * 2 + 0.5,
                    z: 0,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                },
                {
                    x: -2.2,
                    y: -view * 2 + 0.65,
                    z: 0.2,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                }
            ),

            3: byMenu(
                {
                    x: 0.3,
                    y: -view * 3 + 1,
                    z: 8.5,
                    rotateX: 0,
                    rotateY: -Math.PI / 4,
                    rotateZ: 0,
                },
                {
                    x: 0.1,
                    y: -view * 3 + 1.15,
                    z: 8.2,
                    rotateX: 0,
                    rotateY: -Math.PI / 4,
                    rotateZ: 0,
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
                    scale: 1,
                },
                {
                    x: 0.35,
                    y: -0.25,
                    z: 1,
                    rotateX: -Math.PI / 2,
                    rotateY: 1,
                    rotateZ: 0,
                    scale: 1,
                }
            ),

            1: byMenu(
                {
                    x: -0.5,
                    y: -view - 0.1,
                    z: 2,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: -0.5,
                    scale: 1.25,
                },
                {
                    x: -0.8,
                    y: -view - 0.05,
                    z: 1.9,
                    rotateX: 0,
                    rotateY: 0.15,
                    rotateZ: -0.5,
                    scale: 1.25,
                }
            ),

            2: byMenu(
                {
                    x: -2,
                    y: -view * 2 + 0.5,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1,
                },
                {
                    x: -2.1,
                    y: -view * 2 + 0.7,
                    z: 0.2,
                    rotateX: 0,
                    rotateY: 0.1,
                    rotateZ: 0,
                    scale: 1,
                }
            ),

            3: byMenu(
                {
                    x: 0.3,
                    y: -view * 3 + 1,
                    z: 8.5,
                    rotateX: 0,
                    rotateY: -Math.PI / 4,
                    rotateZ: 0,
                    scale: 1,
                },
                {
                    x: 0.15,
                    y: -view * 3 + 1.2,
                    z: 8.2,
                    rotateX: 0,
                    rotateY: -Math.PI / 4,
                    rotateZ: 0,
                    scale: 1,
                }
            ),
        }

        const officeVariants = {
            0: byMenu(
                {
                    x: 0.8,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: -0.1,
                    rotateZ: 0,
                    scale: 0,
                },
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scale: 0,
                }
            ),
        }

        return {
            avatarVariants,
            catVariants,
            avatarScale,
            officeVariants,
            officeScale,
        }
    }, [view, menuOpened, viewport])
}
