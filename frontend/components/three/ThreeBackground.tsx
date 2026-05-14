"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { 
  Float, Sphere, Points, PointMaterial, Stars, 
  PerspectiveCamera, Float as FloatDrei
} from "@react-three/drei";

/* ============ 1. GALACTIC DUST & PARTICLES ============ */
function GalacticParticles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a galactic distribution (more dense in center)
      const radius = Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = radius * Math.cos(phi);

      // Random space colors (cyan, purple, white)
      const mix = Math.random();
      if (mix < 0.3) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1; // Cyan
      } else if (mix < 0.6) {
        colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 1; // Purple
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // White
      }
    }
    return { positions: p, colors };
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <Points ref={ref} positions={points.positions} colors={points.colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

/* ============ 2. NEBULA GLOWS ============ */
function NebulaClouds() {
  const clouds = useMemo(() => {
    return Array.from({ length: 6 }, () => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30,
      ] as [number, number, number],
      scale: Math.random() * 15 + 10,
      color: Math.random() > 0.5 ? "#00e5ff" : "#a855f7",
      speed: Math.random() * 0.2 + 0.1,
    }));
  }, []);

  return (
    <group>
      {clouds.map((c, i) => (
        <FloatDrei key={i} speed={c.speed} rotationIntensity={1} floatIntensity={1} position={c.position}>
          <Sphere args={[1, 32, 32]} scale={c.scale}>
            <meshBasicMaterial
              color={c.color}
              transparent
              opacity={0.03}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </Sphere>
        </FloatDrei>
      ))}
    </group>
  );
}

/* ============ 3. SHOOTING STARS ============ */
function ShootingStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 5 }, () => ({
      position: [
        (Math.random() - 0.5) * 100,
        Math.random() * 50 + 50,
        (Math.random() - 0.5) * 50,
      ] as [number, number, number],
      speed: Math.random() * 1.5 + 1,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.y -= stars[i].speed;
      child.position.x -= stars[i].speed * 0.5;
      if (child.position.y < -50) {
        child.position.y = 50;
        child.position.x = (Math.random() - 0.5) * 100;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((_, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.05, 2, 0.05]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const { mouse } = useThree();
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    // Smooth Mouse Parallax
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, mouse.x * 0.15, 0.05);
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -mouse.y * 0.15, 0.05);
  });

  return (
    <group ref={sceneRef}>
      <Stars radius={100} depth={50} count={6000} factor={6} saturation={1} fade speed={2} />
      <GalacticParticles count={3000} />
      <NebulaClouds />
      <ShootingStars />
      
      <ambientLight intensity={0.1} />
      <pointLight position={[30, 30, 30]} intensity={1} color="#00e5ff" />
      <pointLight position={[-30, -30, -30]} intensity={1} color="#a855f7" />

      {/* Cyberpunk Ground Grid (Subtle) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -25, 0]}>
        <planeGeometry args={[200, 200, 50, 50]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.02} />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 40], fov: 45 }}>
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 20, 80]} />
        <Scene />
        <PerspectiveCamera makeDefault position={[0, 0, 40]} />
      </Canvas>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
      
      {/* Subtle Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}