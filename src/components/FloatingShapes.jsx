import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';

const GeometricShape = ({ position, color, geometry }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
                {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
                {geometry === 'torus' && <torusGeometry args={[0.8, 0.2, 16, 32]} />}
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.5}
                    wireframe
                />
            </mesh>
        </Float>
    );
};

const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <GeometricShape position={[-3, 2, -2]} color="#a855f7" geometry="octahedron" />
                <GeometricShape position={[4, -1, -3]} color="#06b6d4" geometry="torus" />
                <GeometricShape position={[-2, -3, -1]} color="#a855f7" geometry="box" />
                <GeometricShape position={[3, 3, -4]} color="#06b6d4" geometry="octahedron" />
                <GeometricShape position={[0, 0, -5]} color="#ffffff" geometry="torus" />
            </Canvas>
        </div>
    );
};

export default FloatingShapes;
