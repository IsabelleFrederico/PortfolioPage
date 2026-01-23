import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience"
import { Suspense, useEffect, useState } from "react"
import { ScrollControls, Scroll } from "@react-three/drei"
import { Interface } from "./components/Interface"
import { ScrollManager } from "./components/ScrollManager.jsx"
import { MotionConfig } from "framer-motion"
import { framerMotionConfig } from "./config"
import { Menu } from "./components/Menu"

function App() {
  const [section, setSection] = useState(0)
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    setMenuOpened(false)
  }, [section])

  return (
    <>
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas shadows camera={{ position: [0, 1, 5], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <ScrollControls pages={5} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              {/* <Suspense fallback={null}> */}
              <Experience section={section} />
            </Scroll>

            <Scroll html>
              <Interface />
            </Scroll>
            {/* </Suspense> */}
          </ScrollControls>
        </Canvas >
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
      </MotionConfig >
      {/* <Leva hidden /> */}
    </>
  )
}

export default App
