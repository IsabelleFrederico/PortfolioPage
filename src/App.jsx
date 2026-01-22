import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience"
import { Suspense } from "react"
import { ScrollControls, Scroll } from "@react-three/drei"
import { Interface } from "./components/Interface"

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={4} damping={0.1}>
          <Suspense fallback={null}>
            <Experience />
            <Scroll html>
              <Interface />
            </Scroll>
          </Suspense>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App
