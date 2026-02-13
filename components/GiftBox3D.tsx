"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

export function GiftBox3D() {
  const { scene } = useGLTF("/gift_box.glb");
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={2}
      position={[0, 0, 0]}
    />
  );
}

useGLTF.preload("/gift_box.glb");
