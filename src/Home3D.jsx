import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience.jsx"
import { useEffect, useState, useRef } from "react"
import { ScrollControls, Scroll } from "@react-three/drei"
import { Interface } from "./components/Interface"
import { ScrollManager } from "./components/ScrollManager.jsx"
import { MotionConfig } from "framer-motion"
import { framerMotionConfig } from "./config"
import { Menu } from "./components/Menu"
import { LoadingScreen } from "./components/LoadingScreen.jsx"
import { LogoButton } from "./components/LogoButton"
import { useSection } from "./components/state/SectionContext.jsx"
import { useLocation } from "react-router-dom"

function Home3D() {
    const { section, setSection, started, setStarted } = useSection()
    const [menuOpened, setMenuOpened] = useState(false)
    const location = useLocation()

    const lastAppliedKeyRef = useRef(null)
    const isProgrammaticNavRef = useRef(false)


    useEffect(() => {
        setMenuOpened(false)
    }, [section])

    useEffect(() => {
        if (location.pathname !== "/") return
        if (lastAppliedKeyRef.current === location.key) return
        lastAppliedKeyRef.current = location.key

        const params = new URLSearchParams(location.search)
        const s = params.get("section")

        if (s !== null) {
            const n = Number(s)
            if (!Number.isNaN(n)) {
                isProgrammaticNavRef.current = true
                setSection(n)
                setTimeout(() => { isProgrammaticNavRef.current = false }, 600)
            }
        }

        // setStarted(true)
    }, [location.key, location.pathname, location.search, setSection, setStarted])

    return (
        <>
            <LoadingScreen started={started} setStarted={setStarted} />
            {started && (
                <>
                    <LogoButton section={section} setSection={setSection} />
                    <Menu
                        setSection={setSection}
                        menuOpened={menuOpened}
                        setMenuOpened={setMenuOpened}
                    />

                    <MotionConfig
                        transition={{
                            ...framerMotionConfig,
                        }}
                    >
                        <Canvas gl={{ localClippingEnabled: true }} shadows camera={{ position: [0, 1, 5], fov: 30 }}>
                            <color attach="background" args={["#d5d5d5"]} />
                            <ScrollControls pages={5} damping={0.2}>
                                <ScrollManager section={section} setSection={setSection} started={started} isProgrammaticNavRef={isProgrammaticNavRef} />
                                <Scroll>
                                    {started && (
                                        <Experience section={section} menuOpened={menuOpened} />
                                    )}
                                </Scroll>

                                <Scroll html>
                                    {started && <Interface section={section} setSection={setSection} />}
                                </Scroll>
                            </ScrollControls>
                        </Canvas >
                    </MotionConfig >
                </>
            )}
        </>
    )
}

export default Home3D