import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export function Mouse({ object, ...props }) {
  const { nodes, materials } = useGLTF("/models/office.gltf");

  useEffect(() => {
    if (!object) return;

    while (object.children.length) object.remove(object.children[0]);

    const m1 = new THREE.Mesh(nodes.Object_33_1.geometry, materials.mouse);
    const m2 = new THREE.Mesh(nodes.Object_33_2.geometry, materials.monitor_1);
    const m3 = new THREE.Mesh(nodes.Object_33_3.geometry, materials.Material_1233);

    object.add(m1, m2, m3);
  }, [object, nodes, materials]);

  return <primitive object={object} {...props} />;
}

useGLTF.preload("/models/office.gltf");
