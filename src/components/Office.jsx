import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { useGLTF } from '@react-three/drei'
import { useVideoTex } from "../hooks/useVideoTex";

export function Office({ mouseObject, mouseMode, ...props }) {
  const { nodes, materials } = useGLTF('/models/office.gltf')

  const videoTexture1 = useVideoTex("/textures/code_screen.mp4")
  const videoTexture2 = useVideoTex("/textures/front_screen.mp4")

  const deskAnchor = useMemo(() => new THREE.Group(), []);

  useEffect(() => {
    if (!mouseObject) return;
    if (mouseMode !== "desk") return;

    mouseObject.removeFromParent();
    deskAnchor.add(mouseObject);

    mouseObject.position.set(0, 0, 0);
    mouseObject.rotation.set(0, 0, 0);
    mouseObject.scale.setScalar(1);
  }, [mouseMode, mouseObject, deskAnchor]);

  useEffect(() => {
    const startAll = () => {
      videoTexture1.video?.play().catch(() => { });
      videoTexture2.video?.play().catch(() => { });
      window.removeEventListener("pointerdown", startAll);
      window.removeEventListener("keydown", startAll);
      window.removeEventListener("touchstart", startAll);
    };

    window.addEventListener("pointerdown", startAll);
    window.addEventListener("keydown", startAll);
    window.addEventListener("touchstart", startAll);

    return () => {
      window.removeEventListener("pointerdown", startAll);
      window.removeEventListener("keydown", startAll);
      window.removeEventListener("touchstart", startAll);
    };
  }, [videoTexture1.video, videoTexture2.video]);

  return (
    <group {...props} dispose={null} rotation={[0, -1, 0]} scale={0.55}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.413}>
        <mesh geometry={nodes.cpu564.geometry} material={materials['case']} />
        <mesh geometry={nodes.Object_10.geometry} material={materials['book.008']} />
        <mesh geometry={nodes.Object_100.geometry} material={materials.material_63} />
        <mesh geometry={nodes.Object_11.geometry} material={materials['book.009']} />
        <mesh geometry={nodes.Object_110.geometry} material={materials.sofa} />
        <mesh geometry={nodes.Object_111.geometry} material={materials.speaker_2} />
        <mesh geometry={nodes.Object_113.geometry} material={materials['walls.001']} />
        <mesh geometry={nodes.Object_12.geometry} material={materials['book.012']} />
        <mesh geometry={nodes.Object_13.geometry} material={materials['cable.2']} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.canvas} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.clapper_2} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.clapper_3} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.coffee} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.material_41} />
        <mesh geometry={nodes.Object_24.geometry} material={materials.fear_the_dark} position={[0, 7.029, 7.243]} rotation={[-Math.PI, 0, 0]} />
        <mesh geometry={nodes.Object_28.geometry} material={materials.floor_wood} />
        <mesh geometry={nodes.Object_29.geometry} material={materials.lamba} />
        <mesh geometry={nodes.Object_3.geometry} material={materials['Material.006']} />
        <mesh geometry={nodes.Object_30.geometry} material={materials.lamba_effaf} />
        <mesh geometry={nodes.Object_33.geometry} material={materials.mausepad} position={[-0.02, -0.855, 0]} scale={[1.493, 1.56, 1]} />
        <mesh geometry={nodes.Object_36.geometry} material={materials['Material.001']} position={[0, 7.088, 8.902]} rotation={[-Math.PI, 0, 0]} />
        <mesh geometry={nodes.Object_37.geometry} material={materials.paper} />
        <mesh geometry={nodes.Object_38.geometry} material={materials['paper.001']} />
        <mesh geometry={nodes.Object_39.geometry} material={materials['paper.002']} />
        <mesh geometry={nodes.Object_4.geometry} material={materials['Material.017']} />
        <mesh geometry={nodes.Object_43.geometry} material={materials.pc_glass} />
        <mesh geometry={nodes.Object_44.geometry}>
          {videoTexture1.ready ? (
            <meshBasicMaterial map={videoTexture1.tex} toneMapped={false} side={THREE.DoubleSide} />
          ) : (
            <primitive attach="material" object={materials.screen} />
          )}
        </mesh>
        <mesh geometry={nodes.Object_45.geometry}>
          {videoTexture2.ready ? (
            <meshBasicMaterial map={videoTexture2.tex} toneMapped={false} side={THREE.DoubleSide} />
          ) : (
            <primitive attach="material" object={materials["screen.001"]} />
          )}
        </mesh>
        <mesh geometry={nodes.Object_47.geometry} material={materials.trash} />
        <mesh geometry={nodes.Object_48.geometry} material={materials['trash.001']} />
        <mesh geometry={nodes.Object_49.geometry} material={materials.walls} />
        <mesh geometry={nodes.Object_52.geometry} material={materials['Material.003']} />
        <mesh geometry={nodes.Object_53.geometry} material={materials['Material.018']} />
        <mesh geometry={nodes.Object_54.geometry} material={materials['Material.021']} />
        <mesh geometry={nodes.Object_55.geometry} material={materials['Material.022']} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_61.geometry} material={materials.book} />
        <mesh geometry={nodes.Object_62.geometry} material={materials['book.001']} />
        <mesh geometry={nodes.Object_63.geometry} material={materials['book.002']} />
        <mesh geometry={nodes.Object_64.geometry} material={materials['book.003']} />
        <mesh geometry={nodes.Object_65.geometry} material={materials['book.004']} />
        <mesh geometry={nodes.Object_66.geometry} material={materials['book.005']} />
        <mesh geometry={nodes.Object_67.geometry} material={materials['book.006']} />
        <mesh geometry={nodes.Object_68.geometry} material={materials['book.010']} />
        <mesh geometry={nodes.Object_69.geometry} material={materials['book.011']} />
        <mesh geometry={nodes.Object_70.geometry} material={materials.book_inside} />
        <mesh geometry={nodes.Object_71.geometry} material={materials.material} />
        <mesh geometry={nodes.Object_72.geometry} material={materials.box_2} />
        <mesh geometry={nodes.Object_73.geometry} material={materials.box_3} />
        <mesh geometry={nodes.Object_74.geometry} material={materials.bulp} />
        <mesh geometry={nodes.Object_75.geometry} material={materials.cable} />
        <mesh geometry={nodes.Object_76.geometry} material={materials.cable} />
        <mesh geometry={nodes.Object_78.geometry} material={materials['case']} />
        <mesh geometry={nodes.Object_80.geometry} material={materials.clapper} />
        <mesh geometry={nodes.Object_81.geometry} material={materials['clapper_2.001']} />
        <mesh geometry={nodes.Object_82.geometry} material={materials.coffee_table} />
        <mesh geometry={nodes.Object_83.geometry} material={materials.desk_wood} />
        <mesh geometry={nodes.Object_85.geometry} material={materials['door.001']} />
        <mesh geometry={nodes.Object_86.geometry} material={materials.fan_led} />
        <mesh geometry={nodes.Object_88.geometry} material={materials['frame.001']} />
        <mesh geometry={nodes.Object_89.geometry} material={materials.headphone} />
        <mesh geometry={nodes.Object_9.geometry} material={materials['book.007']} />
        <mesh geometry={nodes.Object_90.geometry} material={materials.headphone} position={[-0.027, 0, 0]} />
        <mesh geometry={nodes.Object_91.geometry} material={materials.headphone} />
        <mesh geometry={nodes.Object_92.geometry} material={materials.headphone_snger} position={[-0.027, 0, 0]} />
        <mesh geometry={nodes.Object_93.geometry} material={materials.lamba} />
        <mesh geometry={nodes.Object_94.geometry} material={materials.lamba} />
        <mesh geometry={nodes.Object_95.geometry} material={materials['lamba.001']} />
        <mesh geometry={nodes.Object_96.geometry} material={materials['lamba.001']} />
        <mesh geometry={nodes.Object_97.geometry} material={materials['lamba.001']} />
        <mesh geometry={nodes.Object_98.geometry} material={materials['lamba.2']} />
        <mesh geometry={nodes.Object_99.geometry} material={materials.lambaa} />
        <mesh geometry={nodes.sofa.geometry} material={materials.sofa} />
        <mesh geometry={nodes.Object_75380.geometry} material={materials['case']} position={[-0.05, 0.25, 0]} />
        <mesh geometry={nodes.Object_75380_1.geometry} material={materials.sofa} position={[-0.05, 0.25, 0]} />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.413}>
        <mesh geometry={nodes.cpu2333.geometry} material={materials['monitor_bar.001']} />
        <mesh geometry={nodes.legOfficeChair.geometry} material={materials['case_.002']} position={[-0.05, 0.25, 0]} />
        <mesh geometry={nodes.legOfficeChair001.geometry} material={materials['monitor_bar.001']} position={[-0.05, 0.25, 0]} />
        <mesh geometry={nodes.monitorBase281.geometry} material={materials['monitor_bar.001']} />
        <mesh geometry={nodes.sofaBase.geometry} material={materials['monitor_bar.001']} />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.413}>
        <mesh geometry={nodes.Object_36001.geometry} material={materials['Material.002']} position={[0, 7.092, 8.917]} rotation={[-Math.PI, 0, 0]} />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.413}>
        <mesh geometry={nodes.Object_36002.geometry} material={materials['Material.004']} position={[0, 7.092, 8.917]} rotation={[-Math.PI, 0, 0]} />
      </group>
      <group position={[0.436, 0, -0.185]} rotation={[-Math.PI / 2, 0, 0]} scale={0.413}>
        <mesh geometry={nodes.Object_21.geometry} material={materials['drink.003']} />
        <mesh geometry={nodes.Object_21_1.geometry} material={materials.drink} />
        <mesh geometry={nodes.Object_21_2.geometry} material={materials['drink.001']} />
        <mesh geometry={nodes.Object_21_3.geometry} material={materials['drink.002']} />
        <mesh geometry={nodes.Object_21_4.geometry} material={materials['Material.019']} />
      </group>
      <group position={[0.126, 0, -0.072]} rotation={[-Math.PI / 2, 0, -0.17]} scale={0.413}>
        <mesh geometry={nodes.Object_32.geometry} material={materials.monitor_bar} position={[-0.15, 0.05, 0]} />
        <mesh geometry={nodes.Object_32_1.geometry} material={materials.monitor_1} position={[-0.15, 0.05, 0]} />
        <mesh geometry={nodes.Object_32_2.geometry} material={materials['04_-_CoronaMtl']} />
        <mesh geometry={nodes.Object_32_3.geometry} material={materials.None} />
      </group>
      <group position={[0.233, 0, 0.033]} rotation={[-Math.PI / 2, 0, 0]} scale={0.413}>
        <primitive object={deskAnchor} />
      </group>
      <mesh geometry={nodes.monitor.geometry} material={materials.monitor_1} />
    </group>
  )
}

useGLTF.preload('/models/office.gltf')
