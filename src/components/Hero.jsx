import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FloatingShapes from './FloatingShapes';

const Hero = () => {
    const titleRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        );

        // Magnetic Button Effect
        const btn = btnRef.current;
        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <FloatingShapes />

            <div className="relative z-10 text-center px-4">
                <div ref={titleRef} className="mb-8">
                    <h2 className="text-xl md:text-2xl text-cyber-blue tracking-[0.5em] mb-4 font-light">
                        DEFY REALITY
                    </h2>
                    <h1 className="text-6xl md:text-8xl font-orbitron font-black text-white mb-2 neon-text glitch-effect">
                        INNOVISION
                    </h1>
                    <h1 className="text-6xl md:text-8xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-cyber-blue">
                        2.0
                    </h1>
                </div>

                <p className="text-gray-400 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
                    Organized by IT Dept.
                </p>

                <button
                    ref={btnRef}
                    className="relative px-8 py-4 bg-transparent border border-neon-purple text-white font-orbitron font-bold tracking-wider rounded-full overflow-hidden group hover:bg-neon-purple/10 transition-colors"
                >
                    <span className="relative z-10">REGISTER NOW</span>
                    <div className="absolute inset-0 bg-neon-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-white rounded-full animate-scroll-down"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
