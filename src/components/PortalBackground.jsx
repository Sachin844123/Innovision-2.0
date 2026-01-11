import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const DigitalGrid = () => {
    return (
        <group>
            {/* Main Floor Grid */}
            <gridHelper
                args={[60, 60, 0x06b6d4, 0x111827]}
                position={[0, -2, 0]}
            />

            {/* Ceiling Grid (Faint) */}
            <gridHelper
                args={[60, 60, 0x06b6d4, 0x111827]}
                position={[0, 10, 0]}
                rotation={[0, 0, 0]}
            />
        </group>
    );
};

const WireframeGlobe = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.2;
            meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[4, 1, -5]} scale={[2, 2, 2]}>
                <icosahedronGeometry args={[1, 2]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </mesh>
            {/* Inner Core */}
            <mesh position={[4, 1, -5]} scale={[1.8, 1.8, 1.8]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    wireframe={true}
                    transparent
                    opacity={0.1}
                />
            </mesh>
        </Float>
    );
};

const FloatingDataPoints = () => {
    // Simulated "Data Packets" moving vertically
    const packetRef = useRef();
    useFrame((state) => {
        // Simple animation placeholder
    });

    return (
        <group>
            {/* Placeholder for particles if needed, keeping it clean for now */}
        </group>
    )
}

const PortalBackground = () => {
    return (
        <div className="absolute inset-0 z-0 bg-void-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 1, 8]} />

                {/* Cold Digital Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#06b6d4" />

                <DigitalGrid />
                <WireframeGlobe />

                {/* Subtle Moving Background Particles (Digital Dust) */}
                <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />

                {/* Fog to fade grid into distance */}
                <fog attach="fog" args={['#020617', 5, 25]} />
            </Canvas>

            {/* Vignette Overlay for Screen Look */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] pointer-events-none opacity-80" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
        </div>
    );
};

export default PortalBackground;
