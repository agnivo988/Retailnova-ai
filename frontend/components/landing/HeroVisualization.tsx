"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function RotatingRing() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.2;
      ref.current.rotation.x = clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10, 0.05, 16, 100]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function DataPoints() {
  const points = useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      scale: Math.random() * 0.1 + 0.05,
    }));
  }, []);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroVisualization() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[4, 64, 64]}>
            <MeshDistortMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={0.5}
              distort={0.4}
              speed={2}
              roughness={0}
              metalness={1}
              transparent
              opacity={0.3}
            />
          </Sphere>
        </Float>

        <RotatingRing />
        <DataPoints />
      </Canvas>
    </div>
  );
}
