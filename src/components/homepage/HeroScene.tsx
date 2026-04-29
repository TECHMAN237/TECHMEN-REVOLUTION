"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// --- Robot Figure (white, low-opacity, background) ---
function Robot() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    }
  });

  const mat = (
    <meshStandardMaterial
      color="#ffffff"
      transparent
      opacity={0.06}
      metalness={0.5}
      roughness={0.5}
    />
  );

  const glowMat = (
    <meshStandardMaterial
      color="#4488ff"
      emissive="#2244aa"
      emissiveIntensity={0.8}
      transparent
      opacity={0.15}
    />
  );

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group} scale={1.6}>
        {/* Head */}
        <mesh position={[0, 1.6, 0]}>{<boxGeometry args={[0.6, 0.55, 0.5]} />}{mat}</mesh>
        {/* Eyes */}
        <mesh position={[-0.12, 1.65, 0.26]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          {glowMat}
        </mesh>
        <mesh position={[0.12, 1.65, 0.26]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          {glowMat}
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.8, 0]}>{<boxGeometry args={[0.8, 1, 0.45]} />}{mat}</mesh>
        {/* Chest light */}
        <mesh position={[0, 0.95, 0.24]}>
          <circleGeometry args={[0.1, 32]} />
          {glowMat}
        </mesh>
        {/* Arms */}
        <mesh position={[-0.7, 0.85, 0]}>
          <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
          {mat}
        </mesh>
        <mesh position={[0.7, 0.85, 0]}>
          <capsuleGeometry args={[0.1, 0.7, 8, 16]} />
          {mat}
        </mesh>
        {/* Legs */}
        <mesh position={[-0.22, -0.05, 0]}>
          <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
          {mat}
        </mesh>
        <mesh position={[0.22, -0.05, 0]}>
          <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
          {mat}
        </mesh>
      </group>
    </Float>
  );
}

// --- Floating CS Tool Abstractions (white, very low opacity) ---
function FloatingTool({
  position,
  type,
  speed,
}: {
  position: [number, number, number];
  type: "cube" | "ring" | "octahedron" | "torus";
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.25;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case "cube":
        return <boxGeometry args={[0.3, 0.3, 0.3]} />;
      case "ring":
        return <torusGeometry args={[0.2, 0.05, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.22]} />;
      case "torus":
        return <torusKnotGeometry args={[0.15, 0.04, 64, 8]} />;
    }
  }, [type]);

  return (
    <Float speed={1.2 + speed} rotationIntensity={0.8} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </Float>
  );
}

const floatingTools = [
  { position: [-4, 2, -3] as [number, number, number], type: "cube" as const, speed: 0.4 },
  { position: [4, -0.5, -2] as [number, number, number], type: "ring" as const, speed: 0.6 },
  { position: [-3, -1.5, 1] as [number, number, number], type: "octahedron" as const, speed: 0.5 },
  { position: [3.5, 2.5, -3.5] as [number, number, number], type: "torus" as const, speed: 0.35 },
  { position: [-2, 3.5, -3] as [number, number, number], type: "cube" as const, speed: 0.7 },
  { position: [1.5, -2.5, 0.5] as [number, number, number], type: "ring" as const, speed: 0.45 },
  { position: [-5, 0, -4] as [number, number, number], type: "octahedron" as const, speed: 0.3 },
  { position: [5, 1, -3] as [number, number, number], type: "torus" as const, speed: 0.55 },
];

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.05} />
      {/* Deep blue accent lights */}
      <pointLight position={[-6, 4, 3]} intensity={2} color="#0044cc" />
      <pointLight position={[6, -2, 4]} intensity={1.5} color="#0033aa" />
      <pointLight position={[0, 3, -4]} intensity={1} color="#0055dd" />
      <pointLight position={[-3, -4, 2]} intensity={0.8} color="#0066ff" />
      <directionalLight position={[3, 3, 3]} intensity={0.3} color="#334466" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLights />
        <Robot />
        {floatingTools.map((tool, i) => (
          <FloatingTool key={i} {...tool} />
        ))}
      </Canvas>
    </div>
  );
}
