"use client";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// --- 3D Rotating Tech Globe ---
function TechGlobe() {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Create sphere of points
  const points = useMemo(() => {
    const positions: number[] = [];
    const count = 800;
    const radius = 1.2;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = (2 * Math.PI * i) / count * 6.0;
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      pointsRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Wireframe sphere */}
      <Float speed={1} floatIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshStandardMaterial
            color="#111133"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>
      {/* Orbiting ring */}
      <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.5}>
        <mesh rotation={[0.5, 0, 0.3]}>
          <torusGeometry args={[1.6, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#4488ff"
            emissive="#4488ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.4}>
        <mesh rotation={[-0.3, 0.8, 0]}>
          <torusGeometry args={[1.8, 0.008, 16, 100]} />
          <meshStandardMaterial
            color="#6677aa"
            emissive="#6677aa"
            emissiveIntensity={0.3}
            transparent
            opacity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function TechTools() {
  const tools = [
    { name: "React", icon: "⚛", desc: "Component-based UI" },
    { name: "Next.js", icon: "◈", desc: "Full-stack framework" },
    { name: "TypeScript", icon: "◆", desc: "Type-safe JavaScript" },
    { name: "Three.js", icon: "◇", desc: "3D WebGL rendering" },
    { name: "MongoDB", icon: "▪", desc: "NoSQL database" },
    { name: "Tailwind", icon: "◻", desc: "Utility-first CSS" },
    { name: "Framer Motion", icon: "✦", desc: "Animation library" },
    { name: "Node.js", icon: "⬡", desc: "Server runtime" },
    { name: "Figma", icon: "◎", desc: "Design & prototyping" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/[0.06]">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <ScrollReveal>
            <div className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
              Modern Stack
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
              We build with the
              <br />
              tools that matter.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.name} delay={i * 0.05}>
                <div className="group p-3 border border-white/[0.06] bg-surface hover:bg-surface-hover hover:border-white/20 transition-all duration-300 cursor-default">
                  <div className="text-lg mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    {tool.icon}
                  </div>
                  <div className="text-xs font-medium">{tool.name}</div>
                  <div className="text-[10px] text-muted/60 mt-0.5">{tool.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 3D Globe */}
        <ScrollReveal delay={0.2}>
          <div className="aspect-square relative">
            <Canvas
              camera={{ position: [0, 0, 4], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.1} />
              <directionalLight position={[5, 5, 5]} intensity={0.5} />
              <pointLight position={[-3, 3, 2]} intensity={0.3} color="#4488ff" />
              <TechGlobe />
              <Environment preset="city" />
            </Canvas>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
