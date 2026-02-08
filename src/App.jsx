import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience"
import { Suspense, useEffect, useState } from "react"
import { ScrollControls, Scroll } from "@react-three/drei"
import { Interface } from "./components/Interface"
import { ScrollManager } from "./components/ScrollManager.jsx"
import { MotionConfig } from "framer-motion"
import { framerMotionConfig } from "./config"
import { Menu } from "./components/Menu"
import { LoadingScreen } from "./components/LoadingScreen.jsx"

function App() {
  const [section, setSection] = useState(0)
  const [started, setStarted] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    setMenuOpened(false)
  }, [section])

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas gl={{ localClippingEnabled: true }} shadows camera={{ position: [0, 1, 5], fov: 30 }}>
          <color attach="background" args={["#d5d5d5"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              {started && (
                <Experience section={section} menuOpened={menuOpened} />
              )}
            </Scroll>

            <Scroll html>
              {started && <Interface setSection={setSection} />}
            </Scroll>
          </ScrollControls>
        </Canvas >
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
      </MotionConfig >
    </>
  )
}

export default App
