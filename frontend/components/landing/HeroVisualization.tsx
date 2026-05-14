"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, Sphere, MeshDistortMaterial, PerspectiveCamera, 
  Torus, Text, Box, Points, PointMaterial,
  Line, Stars, Float as FloatDrei
} from "@react-three/drei";
import * as THREE from "three";

/* ============ 1. MASSIVE CENTRAL AI CORE ============ */
function CentralAICore() {
  const coreRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.z = t * 0.2;
      const s = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.set(s, s, s);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.2;
      shellRef.current.rotation.x = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        {/* Core Heart */}
        <group ref={coreRef}>
          <Sphere args={[2.5, 64, 64]}>
            <MeshDistortMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={2}
              distort={0.4}
              speed={4}
              roughness={0}
              metalness={1}
            />
          </Sphere>
          
          <Sphere args={[1.5, 32, 32]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </Sphere>
        </group>

        {/* Outer Holographic Shell */}
        <group ref={shellRef}>
          <Sphere args={[3.2, 32, 32]}>
            <meshPhysicalMaterial
              color="#00e5ff"
              transparent
              opacity={0.1}
              transmission={0.9}
              thickness={1}
              roughness={0}
              wireframe
            />
          </Sphere>
        </group>

        {/* Cyber Rings */}
        <group ref={ringRef}>
          <Torus args={[4.5, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
          </Torus>
          <Torus args={[5.2, 0.015, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
          </Torus>
          <Torus args={[6, 0.01, 16, 100]} rotation={[-Math.PI / 4, 0, 0]}>
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} />
          </Torus>
        </group>
      </Float>

      {/* Energy Expansion Rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <EnergyPulse key={i} delay={i * 2} />
      ))}
    </group>
  );
}

function EnergyPulse({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.getElapsedTime() + delay) % 6;
      const scale = t * 3;
      ref.current.scale.set(scale, scale, scale);
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 1 - t / 6) * 0.15;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.98, 1, 64]} />
      <meshBasicMaterial color="#00e5ff" transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ============ 2. ANTI-GRAVITY FLOATING HUD ============ */
function FloatingHUD() {
  const cards = useMemo(() => [
    { title: "INVENTORY_LVL", val: "94.2%", color: "#00e5ff", pos: [7, 4, 2] },
    { title: "DEMAND_PRED", val: "HIGH", color: "#f43f5e", pos: [-8, -3, 4] },
    { title: "REV_METRICS", val: "+12.4%", color: "#10b981", pos: [6, -5, -2] },
    { title: "AI_STATUS", val: "ACTIVE", color: "#a855f7", pos: [-7, 5, -3] },
  ], []);

  return (
    <group>
      {cards.map((card, i) => (
        <FloatDrei key={i} speed={2 + Math.random()} rotationIntensity={1.5} floatIntensity={2} position={card.pos as [number, number, number]}>
          <group>
            {/* Glass Card */}
            <Box args={[3.2, 1.6, 0.1]}>
              <meshPhysicalMaterial
                color="#0a1525"
                transparent
                opacity={0.9}
                metalness={1}
                roughness={0.1}
                transmission={0.5}
                thickness={0.5}
                emissive={card.color}
                emissiveIntensity={0.2}
              />
            </Box>
            
            {/* Animated Border */}
            <Line
              points={[[-1.6, 0.8, 0.06], [1.6, 0.8, 0.06], [1.6, -0.8, 0.06], [-1.6, -0.8, 0.06], [-1.6, 0.8, 0.06]]}
              color={card.color}
              lineWidth={1.5}
              transparent
              opacity={0.5}
            />

            <Text position={[0, 0.45, 0.1]} fontSize={0.22} color={card.color} font="var(--font-orbitron)" letterSpacing={0.1}>
              {card.title}
            </Text>
            <Text position={[0, -0.15, 0.1]} fontSize={0.45} color="white" fontWeight="black">
              {card.val}
            </Text>
            
            {/* Scanning Line */}
            <Scanline color={card.color} />
          </group>
        </FloatDrei>
      ))}
    </group>
  );
}

function Scanline({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 3) * 0.65;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0.11]}>
      <planeGeometry args={[3, 0.02]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

/* ============ 3. SPACE TYPE ANIMATION (GALAXY VORTEX) ============ */
function SpaceVortex({ count = 1500 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spiral galaxy distribution
      const radius = Math.random() * 25 + 5;
      const spin = radius * 0.8;
      const angle = Math.random() * Math.PI * 2 + spin;
      
      p[i * 3] = Math.cos(angle) * radius;
      p[i * 3 + 1] = (Math.random() - 0.5) * 5;
      p[i * 3 + 2] = Math.sin(angle) * radius;

      // Galaxy colors
      const mix = Math.random();
      if (mix < 0.4) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1; // Cyan
      } else if (mix < 0.7) {
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
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points ref={ref} positions={points.positions} colors={points.colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

/* ============ 4. ENERGY & PARTICLES ============ */
function EnergyEnvironment() {
  const particles = useMemo(() => {
    const p = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, []);

  return (
    <group>
      <Stars radius={120} depth={60} count={6000} factor={6} saturation={1} fade speed={2} />
      <Points positions={particles} stride={3}>
        <PointMaterial 
          transparent 
          color="#00e5ff" 
          size={0.1} 
          sizeAttenuation 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
          opacity={0.3}
        />
      </Points>
      
      {/* Nebula Glows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <FloatDrei key={i} speed={0.5} position={[(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, -10]}>
          <Sphere args={[10, 32, 32]}>
            <meshBasicMaterial color={i % 2 === 0 ? "#00e5ff" : "#a855f7"} transparent opacity={0.02} depthWrite={false} />
          </Sphere>
        </FloatDrei>
      ))}

      {/* Cyberpunk Ground Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -18, 0]}>
        <planeGeometry args={[150, 150, 50, 50]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

/* ============ MAIN SCENE ============ */
function Scene() {
  const { mouse, camera } = useThree();
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth Cinematic Parallax
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, mouse.x * 0.15, 0.05);
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -mouse.y * 0.15, 0.05);
    
    // Camera Drift
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 3, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={sceneRef}>
      <CentralAICore />
      <SpaceVortex count={2000} />
      <FloatingHUD />
      <EnergyEnvironment />
      
      <ambientLight intensity={0.6} />
      <pointLight position={[15, 15, 15]} intensity={2.5} color="#00e5ff" />
      <pointLight position={[-15, -15, -15]} intensity={2} color="#a855f7" />
      <spotLight position={[0, 30, 10]} angle={0.4} penumbra={1} intensity={1.5} color="#ffffff" />
    </group>
  );
}

export default function HeroVisualization() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 15], fov: 45 }}
        className="!w-full !h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
        <fog attach="fog" args={["#030712", 15, 55]} />
        <Scene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.4)_100%)]" />
    </div>
  );
}
