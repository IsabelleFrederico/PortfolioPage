import { Text, useCursor } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useState, useMemo, useRef } from "react"
import { motion } from "framer-motion-3d"
import { projects } from "../utils/constants"
import { RoundedImage } from "./ProjectCard"

const Project = (props) => {
    const { project } = props
    const [hovered, setHovered] = useState(false)
    useCursor(hovered)


    const TitleBold = ({ children, position, ...rest }) => (
        <group position={position}>
            <Text
                {...rest}
                position={[0, 0, 0]}
                color="#000"
                toneMapped={false}
                depthTest={false}
                depthWrite={false}
                renderOrder={1000}
            >
                {children}
            </Text>

            <Text
                {...rest}
                position={[0.007, 0, 0.001]}
                color="#000"
                toneMapped={false}
                depthTest={false}
                depthWrite={false}
                renderOrder={1001}
            >
                {children}
            </Text>
        </group>
    )

    return (
        <group>
            <motion.group
                animate={{
                    scale: hovered ? 1.05 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
            >
                <mesh
                    position={[0.3, -1, -0.001]}
                    onPointerEnter={(e) => {
                        e.stopPropagation()
                        setHovered(true)
                    }}
                    onPointerLeave={(e) => {
                        e.stopPropagation()
                        setHovered(false)
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.url, "_blank")
                    }}
                >
                    <planeGeometry args={[2.2, 2]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
                <RoundedImage
                    src={project.image}
                    position={[0.3, -1, 0]}
                    size={[2, 1.2]}
                    radius={0.14}
                    fit="cover"
                    renderOrder={10}
                />
            </motion.group>
            <group raycast={() => null}>
                <motion.group
                    animate={{ scale: hovered ? 1.08 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <TitleBold
                        maxWidth={2}
                        anchorX="left"
                        anchorY="top"
                        fontSize={0.1}
                        position={[-0.7, -1.65, 0]}
                    >
                        {project.title.toUpperCase()}
                    </TitleBold>
                </motion.group>
            </group>
        </group>
    )
}

export const Projects = ({ section, freeze }) => {
    const { viewport } = useThree()

    const projectsSection = 2
    const cached = useRef(null)

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
                    <Project project={project} />
                </motion.group>
            )
        })
    }, [])

    if (!freeze) {
        cached.current = content
    }

    return (
        <group
            position-y={-viewport.height * 2 + 1}
            visible={section === projectsSection}
        >
            {cached.current}
        </group>
    )
}

