"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere } from "@react-three/drei";

/* ============ Floating Data Cubes ============ */
function FloatingCubes({ count = 12 }) {
  const cubes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? "#00e5ff" : "#a855f7",
    }));
  }, [count]);

  return (
    <group>
      {cubes.map((cube, i) => (
        <Float
          key={i}
          speed={cube.speed * 2}
          rotationIntensity={2}
          floatIntensity={2}
          position={cube.position}
        >
          <mesh scale={cube.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
              color={cube.color}
              emissive={cube.color}
              emissiveIntensity={2}
              transparent
              opacity={0.4}
              roughness={0}
              metalness={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ============ Neural Grid with Interconnected Nodes ============ */
function NeuralGrid() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const [nodes, connections] = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10
      ));
    }

    const lines: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 10) {
          lines.push([i, j]);
        }
      }
    }
    return [points, lines];
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    // Smooth mouse parallax
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.1, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.1, 0.05);
    group.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2;
  });

  return (
    <group ref={group}>
      {connections.map(([i, j], idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                nodes[i].x, nodes[i].y, nodes[i].z,
                nodes[j].x, nodes[j].y, nodes[j].z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ============ Data Streams ============ */
function DataStreams() {
  const count = 20;
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 50,
      z: (Math.random() - 0.5) * 20,
      speed: Math.random() * 0.2 + 0.1,
      length: Math.random() * 10 + 5,
    }));
  }, []);

  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.children.forEach((child, i) => {
      child.position.y -= lines[i].speed;
      if (child.position.y < -25) child.position.y = 25;
    });
  });

  return (
    <group ref={meshRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, 25, line.z]}>
          <boxGeometry args={[0.02, line.length, 0.02]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 5, 40]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00e5ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />

      <NeuralGrid />
      <FloatingCubes count={15} />
      <DataStreams />

      {/* Cyberpunk Ground Grid */}
      <gridHelper 
        args={[100, 50, "#00e5ff", "#0a0f1e"]} 
        position={[0, -12, 0]} 
        rotation={[0, 0, 0]}
      >
        <meshBasicMaterial attach="material" transparent opacity={0.05} />
      </gridHelper>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030712]">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      {/* Overlay Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.8)_100%)]" />
    </div>
  );
}