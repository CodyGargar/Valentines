"use client";

import { useEffect, useRef, useState } from "react";

export default function GiftBox3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const threeSceneRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let THREE: any;
    let GLTFLoader: any;

    const initThree = async () => {
      THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

      const scene = new THREE.Scene();
      threeSceneRef.current = scene;
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 2, 5);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(240, 240);
      renderer.domElement.style.display = "block";
      containerRef.current!.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load(
        "/gift_box.glb",
        (gltf: any) => {
          gltf.scene.scale.set(2.25, 2.25, 2.25);
          gltf.scene.position.y = -0.5;
          scene.add(gltf.scene);
          sceneRef.current = gltf.scene;
          rendererRef.current = renderer;

          const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            if (sceneRef.current) {
              sceneRef.current.rotation.y += 0.015;
            }
            renderer.render(threeSceneRef.current, cameraRef.current);
          };
          animate();
        },
        undefined,
        (error: any) => {
          console.error("Error loading GLB:", error);
        }
      );
    };

    initThree();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && rendererRef.current?.domElement) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          // Element may already be removed
        }
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="text-4xl">🎁</div>;
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto flex items-center justify-center"
      style={{ width: "240px", height: "240px" }}
    />
  );
}
