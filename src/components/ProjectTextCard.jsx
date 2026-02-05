import { Text, useCursor } from "@react-three/drei"
import { useState, useEffect } from "react"
import { motion } from "framer-motion-3d"
import { ProjectCard } from "./ProjectCard"

export const ProjectTextCard = (props) => {
    const { project, isProjectsActiveRef } = props
    const [hovered, setHovered] = useState(false)
    useCursor(isProjectsActiveRef.current && hovered)

    useEffect(() => {
        if (!isProjectsActiveRef.current) setHovered(false)
    }, [hovered, isProjectsActiveRef])

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
        <motion.group >
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
                        if (!isProjectsActiveRef.current) return
                        e.stopPropagation()
                        setHovered(true)
                    }}
                    onPointerLeave={(e) => {
                        if (!isProjectsActiveRef.current) return
                        e.stopPropagation()
                        setHovered(false)
                    }}
                    onClick={(e) => {
                        if (!isProjectsActiveRef.current) return
                        e.stopPropagation()
                        window.open(project.url, "_blank")
                    }}
                >
                    <planeGeometry args={[2.2, 2]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
                <ProjectCard
                    src={project.image}
                    position={[0.3, -1, 0]}
                    size={[2, 1.2]}
                    radius={0.14}
                    fit="cover"
                    renderOrder={10}
                />
            </motion.group>
            <group>
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
        </motion.group>
    )
}