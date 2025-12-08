import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Image, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// A placeholder loader that isn't ugly
function Loader() {
  return (
    <mesh>
      <circleGeometry args={[1, 32]} />
      <meshBasicMaterial color="#3B1F5D" transparent opacity={0.5} />
    </mesh>
  );
}

function Card({ position, rotation, color, delay = 0 }) {
  const ref = useRef();
  
  useFrame((state) => {
    // Very slow, premium float feel
    const t = state.clock.getElapsedTime();
    ref.current.position.y += Math.sin(t * 0.5 + delay) * 0.002;
    // Subtle tilt based on float
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.3 + delay) * 0.02;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={ref}>
        {/* Rounded corners using a simple trick or just standard plane */}
        <planeGeometry args={[2.2, 3.2]} /> 
        <meshStandardMaterial 
          color={color} 
          roughness={0.4} 
          metalness={0.2} 
        />
      </mesh>
      {/* Add a thin white border to pop against dark background */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.2, 3.2)]} />
        <lineBasicMaterial color="white" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[50vh] min-h-[400px] w-full relative z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 30 }} dpr={[1, 1.5]}>
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} />
        <pointLight position={[-10, -5, 5]} color="#FACC6B" intensity={1} />

        <Suspense fallback={<Loader />}>
            <group position={[0, 0.5, 0]}>
                
                {/* --- THE FAN --- 
                    Pushed back (z = -2) and spread wide (x = +/- 2.5 and 4.5)
                */}
                
                {/* Far Left - Purple */}
                <Card 
                  position={[-4.5, -0.5, -2]} 
                  rotation={[0, 0, 0.2]} // Tilted right
                  color="#3B1F5D" 
                  delay={0}
                />
                
                {/* Near Left - Pink/Magenta */}
                <Card 
                  position={[-2.2, 0, -1]} 
                  rotation={[0, 0, 0.1]} 
                  color="#DD45E0" 
                  delay={1}
                />

                {/* Near Right - Gold */}
                <Card 
                  position={[2.2, 0, -1]} 
                  rotation={[0, 0, -0.1]} 
                  color="#FACC6B" 
                  delay={2}
                />

                {/* Far Right - Blue */}
                <Card 
                  position={[4.5, -0.5, -2]} 
                  rotation={[0, 0, -0.2]} 
                  color="#3730A3" 
                  delay={3}
                />
                
                {/* --- THE LOGO --- 
                    Pulled forward (z = 1) to float above cards 
                */}
                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                    <Image 
                      url="/logo.png" 
                      transparent 
                      scale={[3.5, 3.5]} // Made slightly bigger
                      position={[0, 0, 1.5]} // High Z-index prevents overlapping
                    />
                </Float>
            </group>

            {/* Soft floor shadow to ground the composition */}
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
