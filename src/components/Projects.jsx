import { useThree } from "@react-three/fiber"
import { useMemo, useRef, useEffect } from "react"
import { motion } from "framer-motion-3d"
import { projects } from "../utils/constants"
import { ProjectTextCard } from "./ProjectTextCard"

export const Projects = ({ section, freeze }) => {
    const { viewport } = useThree()

    const projectsSection = 2
    const cached = useRef(null)
    const isProjectsActiveRef = useRef(false)
    isProjectsActiveRef.current = section === projectsSection

    const content = useMemo(() => {
        const COLS = 3
        const gapX = 2.2
        const gapY = 1.65

        return projects.map((project, index) => {
            const col = index % COLS
            const row = Math.floor(index / COLS)

            const x = (col - (COLS - 1) / 2) * gapX
            const y = -row * gapY
            return (
                <motion.group key={"project_" + index} position={[x, y, -3]}>
                    <ProjectTextCard isProjectsActiveRef={isProjectsActiveRef} project={project} />
                </motion.group>
            )
        })
    }, [])

    if (!freeze) {
        cached.current = content
    }

    useEffect(() => {
        if (section !== projectsSection) {
            document.body.style.cursor = "auto"
        }
    }, [section])

    return (
        <group
            position-y={-viewport.height * 2 + 1}
            visible={section === projectsSection}
            raycast={section === projectsSection ? undefined : () => null}
        >
            {cached.current}
        </group>
    )
}

