import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience"
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

function Home3D() {
    const { section, setSection, started, setStarted } = useSection()
    const [menuOpened, setMenuOpened] = useState(false)
    const [scrollTarget, setScrollTarget] = useState(null)
    const PAGES = 4.3
    const navToSectionRef = useRef(false)

    const navigateToSection = ({ section: s, page }) => {
        navToSectionRef.current = true
        setSection(s)
        setScrollTarget(page)
    }

    useEffect(() => {
        setMenuOpened(false)
    }, [section])

    useEffect(() => {
        const applyFromUrl = () => {
            if (window.location.pathname !== "/") return

            const params = new URLSearchParams(window.location.search)

            const s = params.get("section")
            if (s !== null) setSection(Number(s))

            const st = params.get("scroll")
            setScrollTarget(st !== null ? Number(st) : null)

            setStarted(true)
        }

        applyFromUrl()
        window.addEventListener("popstate", applyFromUrl)
        return () => window.removeEventListener("popstate", applyFromUrl)
    }, [setSection, setStarted])


    return (
        <>
            <LoadingScreen started={started} setStarted={setStarted} />
            <LogoButton section={section} setSection={setSection} />
            <Menu
                onSectionChange={navigateToSection}
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
                    <ScrollControls pages={PAGES} damping={0.1}>
                        <ScrollManager navToSectionRef={navToSectionRef} pages={PAGES} section={section} onSectionChange={setSection} started={started} sections={4} scrollTarget={scrollTarget} />
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
    )
}

export default Home3D