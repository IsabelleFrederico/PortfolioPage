import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export function Stage({ active = false, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/stage.gltf')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (!actions || !names?.length) return

    const clipName = names[0]
    const action = actions[clipName]
    if (!action) return

    if (active) {
      action.reset().fadeIn(0.2).play()
    } else {
      action.fadeOut(0.2)
      // action.stop()
    }

    return () => {
      action.fadeOut(0.2)
    }
  }, [active, actions, names])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.057}>
          <group name="000846fff9e546569ee038af7e24655afbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="holo" scale={1.877}>
                  <group position={[0, 15, 0]}>
                    <group name="group36" rotation={[-Math.PI, 1.545, -Math.PI]} scale={0.989}>
                      <group name="group39" rotation={[Math.PI, -1.091, Math.PI]}>
                        <group name="group37" position={[-1.781, 3.611, 1.298]} rotation={[-1.011, 0.97, -2.235]}>
                          <group name="group31" position={[0, -0.737, 0]} scale={0.001}>
                            <group name="pPlatonic3" position={[-0.348, -0.125, -0.324]} scale={4.971} />
                            <group name="group35" position={[0.224, 0.107, 0.003]} rotation={[Math.PI, -1.463, Math.PI]}>
                              <group name="group38" position={[0.039, 0.754, 0.248]}>
                                <group name="group22" position={[-0.027, -10.244, -0.036]}>
                                  <group name="group15" position={[-11.2, 10.697, 0]} scale={0.096}>
                                    <group name="group8" position={[0.001, 0.007, -0.002]}>
                                      <group name="group1" position={[0.001, 0.007, -0.002]} rotation={[-0.513, 0, 0]} scale={[1.223, 0.98, 1.223]}>
                                        <group name="pCylinder2" position={[-0.002, 0.001, 0]} scale={3.569}>
                                          <mesh name="pCylinder2_holo1_0" geometry={nodes.pCylinder2_holo1_0.geometry} material={materials.holo1} position={[0, 0.001, 0]} />
                                        </group>
                                        <group name="pCylinder3" position={[-0.002, 0.001, 0]} scale={3.665}>
                                          <mesh name="pCylinder3_holo1_0" geometry={nodes.pCylinder3_holo1_0.geometry} material={materials.holo1} />
                                        </group>
                                      </group>
                                    </group>
                                    <group name="MASH1_ReproMesh6" position={[0.001, 0.244, -0.002]} rotation={[0, 0, Math.PI / 2]} scale={[1.033, 1, 1.033]}>
                                      <group name="MASH1_ReproMesh13" position={[0.007, -0.002, 0.002]}>
                                        <mesh name="MASH1_ReproMesh13_holo1_0" geometry={nodes.MASH1_ReproMesh13_holo1_0.geometry} material={materials.holo1} position={[0.007, -0.002, 0.002]} />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="group23" position={[-0.027, -10.244, -0.036]} rotation={[0, -Math.PI / 4, 0]}>
                                  <group name="group16" position={[-11.2, 10.696, 0]} scale={0.096}>
                                    <group name="group9" position={[-0.001, 0.001, 0.001]} scale={1.303}>
                                      <group name="group2" position={[-0.001, -0.003, 0.001]} rotation={[-0.623, -0.617, 0.102]}>
                                        <group name="pCube1" position={[0.003, -0.001, 0.003]} scale={4.808}>
                                          <mesh name="pCube1_holo1_0" geometry={nodes.pCube1_holo1_0.geometry} material={materials.holo1} position={[0, 0, 0]} />
                                        </group>
                                        <group name="pCube2" position={[0.003, -0.001, 0.003]} scale={4.918}>
                                          <mesh name="pCube2_holo1_0" geometry={nodes.pCube2_holo1_0.geometry} material={materials.holo1} />
                                        </group>
                                      </group>
                                    </group>
                                    <group name="MASH1_ReproMesh7" position={[-0.002, 0.239, 0.002]} rotation={[0, 0, Math.PI / 2]} scale={[1.033, 1, 1.033]}>
                                      <group name="MASH1_ReproMesh14" position={[0.001, 0.002, 0.001]}>
                                        <mesh name="MASH1_ReproMesh14_holo1_0" geometry={nodes.MASH1_ReproMesh14_holo1_0.geometry} material={materials.holo1} position={[0.001, 0.002, 0.001]} />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="group25" position={[-0.027, -10.244, -0.036]} rotation={[Math.PI, -Math.PI / 4, Math.PI]}>
                                  <group name="group18" position={[-11.205, 10.696, 0]} scale={0.097}>
                                    <group name="group11" position={[0, 0.001, 0.001]}>
                                      <group name="group5" position={[0, 0.001, 0.001]} rotation={[0.222, 0.16, 0.928]} scale={1.89}>
                                        <group name="pTorus1" position={[0.003, 0.001, 0]}>
                                          <mesh name="pTorus1_holo1_0" geometry={nodes.pTorus1_holo1_0.geometry} material={materials.holo1} position={[0.003, 0.001, 0]} />
                                        </group>
                                        <group name="pTorus2" position={[0.003, 0.001, 0]}>
                                          <mesh name="pTorus2_holo1_0" geometry={nodes.pTorus2_holo1_0.geometry} material={materials.holo1} position={[0.003, 0.001, 0]} />
                                        </group>
                                      </group>
                                    </group>
                                    <group name="MASH1_ReproMesh9" position={[0, 0.239, 0.003]} rotation={[0, 0, Math.PI / 2]} scale={[1.033, 1, 1.033]}>
                                      <group name="MASH1_ReproMesh16" position={[0.003, 0.001, -0.001]}>
                                        <mesh name="MASH1_ReproMesh16_holo1_0" geometry={nodes.MASH1_ReproMesh16_holo1_0.geometry} material={materials.holo1} position={[0.003, 0.001, -0.001]} />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="group26" position={[-0.027, -10.244, -0.036]} rotation={[-Math.PI, 0, -Math.PI]}>
                                  <group name="group19" position={[-11.2, 10.697, 0]} scale={0.096}>
                                    <group name="group12" position={[-0.002, -0.001, 0]}>
                                      <group name="group4" position={[-0.254, 1.105, -0.401]} rotation={[-0.176, -0.673, 0.273]} scale={1.554}>
                                        <group name="pPyramid1" position={[0, 0.002, 0]} scale={[5.263, 7.637, 5.263]}>
                                          <mesh name="pPyramid1_holo1_0" geometry={nodes.pPyramid1_holo1_0.geometry} material={materials.holo1} />
                                        </group>
                                        <group name="pPyramid2" position={[0, 0.002, 0]} scale={[5.572, 8.085, 5.572]}>
                                          <mesh name="pPyramid2_holo1_0" geometry={nodes.pPyramid2_holo1_0.geometry} material={materials.holo1} />
                                        </group>
                                      </group>
                                    </group>
                                    <group name="MASH1_ReproMesh10" position={[0, 0.241, 0.001]} rotation={[0, 0, Math.PI / 2]} scale={[1.033, 1, 1.033]}>
                                      <group name="MASH1_ReproMesh17" position={[0.002, 0.002, 0]}>
                                        <mesh name="MASH1_ReproMesh17_holo1_0" geometry={nodes.MASH1_ReproMesh17_holo1_0.geometry} material={materials.holo1} position={[0.002, 0.002, 0]} />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="group27" position={[-0.027, -10.244, -0.036]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]}>
                                  <group name="group20" position={[-11.2, 10.697, 0]} scale={0.096}>
                                    <group name="group13" position={[-0.001, 0, 0.001]}>
                                      <group name="group6" position={[0.001, 0.029, 0]} rotation={[0.479, 0.1, -0.002]} scale={2.37}>
                                        <group name="pHelix1" position={[0, 0, 0.001]}>
                                          <mesh name="pHelix1_holo1_0" geometry={nodes.pHelix1_holo1_0.geometry} material={materials.holo1} position={[0, 0, 0.001]} />
                                        </group>
                                        <group name="pHelix2" position={[0, 0, 0.001]}>
                                          <mesh name="pHelix2_holo1_0" geometry={nodes.pHelix2_holo1_0.geometry} material={materials.holo1} position={[0, 0, 0.001]} />
                                        </group>
                                      </group>
                                    </group>
                                    <group name="MASH1_ReproMesh11" position={[0, 0.237, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1.033, 1, 1.033]}>
                                      <group name="MASH1_ReproMesh18" position={[-0.002, -0.002, 0]}>
                                        <mesh name="MASH1_ReproMesh18_holo1_0" geometry={nodes.MASH1_ReproMesh18_holo1_0.geometry} material={materials.holo1} position={[-0.002, -0.002, 0]} />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="group28" position={[-0.027, -10.244, -0.036]} rotation={[0, 1.571, 0]}>
                                  <group name="group21001" position={[-11.2, 10.697, 0]} scale={0.096}>
                                    <group name="group14001" position={[0, -0.003, 0.002]}>
                                      <group name="group7" position={[0, -0.003, 0.002]} rotation={[0.317, -0.659, 1.521]} scale={2.048}>
                                        <group name="pGear1" position={[-0.001, 0, -0.001]}>
                                          <mesh name="pGear1_holo1_0" geometry={nodes.pGear1_holo1_0.geometry} material={materials.holo1} position={[-0.001, 0, -0.001]} />
                                        </group>
                                        <group name="pGear2" position={[-0.001, 0, -0.001]}>
                                          <mesh name="pGear2_holo1_0" geometry={nodes.pGear2_holo1_0.geometry} material={materials.holo1} position={[-0.001, 0, -0.001]} />
                                        </group>
                                      </group>
                                    </group>
                                    <group name="MASH1_ReproMesh12001" position={[0.001, 0.235, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1.033, 1, 1.033]}>
                                      <group name="MASH1_ReproMesh19" position={[-0.001, 0.002, 0]}>
                                        <mesh name="MASH1_ReproMesh19_holo1_0" geometry={nodes.MASH1_ReproMesh19_holo1_0.geometry} material={materials.holo1} position={[-0.001, 0.002, 0]} />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="group29" position={[-0.027, -10.244, -0.036]} rotation={[0, Math.PI / 4, 0]}>
                                  <group name="group21" position={[-11.2, 10.696, 0]} scale={0.096}>
                                    <group name="group14" position={[-0.001, 0, 0.001]}>
                                      <group name="group30" position={[-0.001, 0, 0.001]} rotation={[0.492, 0, 0]} scale={3.169}>
                                        <group name="pSuperShape2" position={[0, -0.001, -0.002]} scale={2.076}>
                                          <mesh name="pSuperShape2_holo1_0" geometry={nodes.pSuperShape2_holo1_0.geometry} material={materials.holo1} position={[0, 0.001, 0.001]} />
                                        </group>
                                        <group name="pSuperShape3" position={[0, -0.001, -0.002]} scale={2.076}>
                                          <mesh name="pSuperShape3_holo1_0" geometry={nodes.pSuperShape3_holo1_0.geometry} material={materials.holo1} position={[0, 0.001, 0.001]} />
                                        </group>
                                      </group>
                                    </group>
                                    <group name="MASH1_ReproMesh12" position={[-0.001, 0.242, -0.002]} rotation={[0, 0, Math.PI / 2]} scale={[1.033, 1, 1.033]}>
                                      <mesh name="MASH1_ReproMesh12_holo1_0" geometry={nodes.MASH1_ReproMesh12_holo1_0.geometry} material={materials.holo1} position={[0, -0.001, 0]} />
                                    </group>
                                  </group>
                                </group>
                                <group name="pCylinder4" position={[-0.027, 0.458, -0.036]} scale={[0.084, 0.018, 0.084]}>
                                  <mesh name="pCylinder4_holo1_0" geometry={nodes.pCylinder4_holo1_0.geometry} material={materials.holo1} position={[0, -0.021, 0.001]} />
                                </group>
                              </group>
                              <group name="group24" position={[0.021, -10.724, 0.223]} rotation={[0, -1.571, 0]}>
                                <group name="group17" position={[-12.356, 11.797, 0.232]} scale={0.097}>
                                  <group name="group10" position={[0.001, 0, -0.001]}>
                                    <group name="group3" position={[0.001, 0, -0.001]} scale={1.445}>
                                      <group name="pPlatonic1" scale={3.239}>
                                        <mesh name="pPlatonic1_holo1_0" geometry={nodes.pPlatonic1_holo1_0.geometry} material={materials.holo1} position={[-0.001, -0.001, 0.001]} />
                                      </group>
                                      <group name="pPlatonic2" scale={3.414}>
                                        <mesh name="pPlatonic2_holo1_0" geometry={nodes.pPlatonic2_holo1_0.geometry} material={materials.holo1} position={[0, 0.001, 0]} />
                                      </group>
                                    </group>
                                  </group>
                                  <group name="MASH1_ReproMesh8" position={[0.229, 0.007, -0.55]} rotation={[0, 0, Math.PI / 2]} scale={[0.818, 0.792, 0.818]}>
                                    <group name="MASH1_ReproMesh15" position={[0.001, -0.003, -0.002]}>
                                      <mesh name="MASH1_ReproMesh15_holo1_0" geometry={nodes.MASH1_ReproMesh15_holo1_0.geometry} material={materials.holo1} position={[0.001, -0.003, -0.002]} />
                                    </group>
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group name="ground" position={[0, 0.39, 0]}>
                    <group name="pPipe1">
                      <group name="MASH1_ReproMesh1" scale={[1.033, 1, 1.033]}>
                        <mesh name="MASH1_ReproMesh1_holo1_0" geometry={nodes.MASH1_ReproMesh1_holo1_0.geometry} material={materials.material} />
                      </group>
                      <mesh name="pPipe1_holo1_0" geometry={nodes.pPipe1_holo1_0.geometry} material={materials.holo1} />
                    </group>
                    <group name="pPipe2" position={[0, -0.576, 0]}>
                      <group name="MASH1_ReproMesh3" position={[0, 0.576, 0]} scale={[0.819, 0.804, 0.819]}>
                        <mesh name="MASH1_ReproMesh3_holo1_0" geometry={nodes.MASH1_ReproMesh3_holo1_0.geometry} material={materials.holo1} />
                      </group>
                      <group name="pPipe3" rotation={[0, 0.684, 0]} scale={0.856}>
                        <mesh name="pPipe3_holo1_0" geometry={nodes.pPipe3_holo1_0.geometry} material={materials.holo1} />
                      </group>
                      <mesh name="pPipe2_holo1_0" geometry={nodes.pPipe2_holo1_0.geometry} material={materials.holo1} />
                    </group>
                    <group name="pPipe4" position={[0, -0.429, 0]}>
                      <group name="MASH1_ReproMesh2" position={[0, 0.429, 0]}>
                        <mesh name="MASH1_ReproMesh2_holo1_0" geometry={nodes.MASH1_ReproMesh2_holo1_0.geometry} material={materials.holo1} />
                      </group>
                      <mesh name="pPipe4_holo1_0" geometry={nodes.pPipe4_holo1_0.geometry} material={materials.holo1} />
                    </group>
                    <group name="pDisc1" position={[0, -0.388, 0]} scale={11.114}>
                      <mesh name="pDisc1_holo1_0" geometry={nodes.pDisc1_holo1_0.geometry} material={materials.holo1} />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/stage.gltf')
