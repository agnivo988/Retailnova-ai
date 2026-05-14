"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ============ Particles ============ */
function FloatingParticles({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      // Wrap around
      for (let j = 0; j < 3; j++) {
        if (arr[i * 3 + j] > 20) arr[i * 3 + j] = -20;
        if (arr[i * 3 + j] < -20) arr[i * 3 + j] = 20;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00e5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ============ Neural Network Lines ============ */
function NeuralNetwork() {
  const linesRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const n: THREE.Vector3[] = [];
    for (let i = 0; i < 30; i++) {
      n.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        )
      );
    }
    return n;
  }, []);

  const connections = useMemo(() => {
    const conn: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 8) {
          conn.push([nodes[i], nodes[j]]);
        }
      }
    }
    return conn;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = clock.elapsedTime * 0.02;
    linesRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <group ref={linesRef}>
      {connections.map((pair, i) => {
        const points = [pair[0], pair[1]];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial
              color="#a855f7"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ============ Neon Grid Floor ============ */
function NeonGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (clock.elapsedTime * 0.3) % 2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[80, 80, "#00e5ff", "#1a1a2e"]}
      position={[0, -8, 0]}
      rotation={[0, 0, 0]}
      material-opacity={0.08}
      material-transparent
    />
  );
}

/* ============ Scene Wrapper ============ */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <FloatingParticles count={400} />
      <NeuralNetwork />
      <NeonGrid />
    </>
  );
}

/* ============ Exported Background Component ============ */
export default function ThreeBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
