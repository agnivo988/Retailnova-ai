"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, Sphere, MeshDistortMaterial, PerspectiveCamera, 
  Torus, Text, Box, Points, PointMaterial, MeshWobbleMaterial,
  Trail, Line, Stars, Environment
} from "@react-three/drei";
import * as THREE from "three";

/* ============ 1. CENTRAL AI CORE ============ */
function CentralAICore() {
  const coreRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = clock.elapsedTime * 0.4;
      coreRef.current.rotation.z = clock.elapsedTime * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -clock.elapsedTime * 0.2;
      outerRef.current.rotation.x = clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Inner Energy Sphere */}
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <group ref={coreRef}>
          <Sphere args={[2.5, 64, 64]}>
            <MeshDistortMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={2}
              distort={0.5}
              speed={3}
              roughness={0}
              metalness={1}
              transparent
              opacity={0.6}
            />
          </Sphere>
          
          {/* Inner Glowing Core */}
          <Sphere args={[1.5, 32, 32]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </Sphere>
        </group>
      </Float>

      {/* Rotating Cyber Rings */}
      <group ref={outerRef}>
        <Torus args={[4.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
        </Torus>
        <Torus args={[5.2, 0.02, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
        </Torus>
        <Torus args={[6, 0.01, 16, 100]} rotation={[-Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.1} />
        </Torus>
      </group>

      {/* Energy Pulses (Planes) */}
      {Array.from({ length: 3 }).map((_, i) => (
        <PulseCircle key={i} delay={i * 2} />
      ))}
    </group>
  );
}

function PulseCircle({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.elapsedTime + delay) % 6;
      const scale = t * 2;
      ref.current.scale.set(scale, scale, scale);
      ref.current.material.opacity = Math.max(0, 1 - t / 6) * 0.1;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1, 64]} />
      <meshBasicMaterial color="#00e5ff" transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ============ 2. DEEP NEURAL NETWORK ============ */
function NeuralNetwork({ count = 80 }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15
      ));
    }
    return p;
  }, [count]);

  const lines = useMemo(() => {
    const l: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 8) {
          l.push([i, j]);
        }
      }
    }
    return l;
  }, [points]);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
        </mesh>
      ))}
      {lines.map((pair, i) => (
        <Line
          key={i}
          points={[points[pair[0]], points[pair[1]]]}
          color="#00e5ff"
          lineWidth={0.5}
          transparent
          opacity={0.05}
        />
      ))}
    </group>
  );
}

/* ============ 3. ANTI-GRAVITY HUD CARDS ============ */
function HUDCards() {
  const cards = useMemo(() => [
    { title: "INVENTORY", val: "94%", color: "#00e5ff", pos: [8, 5, 2] },
    { title: "DEMAND", val: "CRITICAL", color: "#f43f5e", pos: [-9, -4, 4] },
    { title: "REVENUE", val: "+12%", color: "#10b981", pos: [7, -6, -2] },
    { title: "AI STATUS", val: "ACTIVE", color: "#a855f7", pos: [-8, 6, -3] },
  ], []);

  return (
    <group>
      {cards.map((card, i) => (
        <Float key={i} speed={2 + i} rotationIntensity={1.5} floatIntensity={2} position={card.pos as [number, number, number]}>
          <group>
            {/* Glass Card */}
            <Box args={[3, 1.5, 0.1]}>
              <meshPhysicalMaterial
                color="#0a0f1e"
                transparent
                opacity={0.8}
                metalness={1}
                roughness={0}
                transmission={0.5}
                thickness={0.5}
                emissive={card.color}
                emissiveIntensity={0.1}
              />
            </Box>
            {/* Animated Border */}
            <mesh>
              <Box args={[3.1, 1.6, 0.05]} />
              <meshBasicMaterial color={card.color} wireframe transparent opacity={0.2} />
            </mesh>
            
            <Text position={[0, 0.4, 0.1]} fontSize={0.2} color={card.color} font="var(--font-orbitron)" letterSpacing={0.1}>
              {card.title}
            </Text>
            <Text position={[0, -0.1, 0.1]} fontSize={0.4} color="white" fontWeight="black">
              {card.val}
            </Text>
            
            {/* Decorative Scanline */}
            <Scanline width={2.8} color={card.color} />
          </group>
        </Float>
      ))}
    </group>
  );
}

function Scanline({ width, color }: { width: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.6;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0.11]}>
      <planeGeometry args={[width, 0.02]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

/* ============ 4. ATMOSPHERE & PARTICLES ============ */
function Atmosphere() {
  return (
    <group>
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      {/* Floating Dust */}
      <Points count={500}>
        <PointMaterial transparent color="#00e5ff" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
        {Array.from({ length: 500 }).map((_, i) => (
          <primitive key={i} object={new THREE.Vector3((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50)} attach="positions" />
        ))}
      </Points>
    </group>
  );
}

/* ============ MAIN SCENE ============ */
function Scene() {
  const { mouse, camera } = useThree();
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    
    // Smooth Parallax
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, mouse.x * 0.15, 0.05);
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -mouse.y * 0.15, 0.05);
    
    // Subtle Camera Drift
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={sceneRef}>
      <CentralAICore />
      <NeuralNetwork />
      <HUDCards />
      <Atmosphere />
      
      {/* Retail Objects */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={Math.random() * 2 + 1} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10]}>
          <Box args={[0.5, 0.5, 0.5]}>
            <MeshWobbleMaterial factor={0.4} speed={2} color="#00e5ff" transparent opacity={0.2} wireframe />
          </Box>
        </Float>
      ))}

      {/* Cyber Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -12, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.03} />
      </mesh>

      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#00e5ff" />
      <pointLight position={[-10, -10, 10]} intensity={2} color="#a855f7" />
      <spotLight position={[0, 20, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" castShadow />
    </group>
  );
}

export default function HeroVisualization() {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[700px] relative overflow-hidden">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 22]} fov={45} />
        <fog attach="fog" args={["#030712", 15, 45]} />
        <Scene />
      </Canvas>
      {/* Background Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.4)_100%)]" />
    </div>
  );
}
