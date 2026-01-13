import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import PortalBackground from './PortalBackground';
import './mobile.css';

const HUDBox = ({ title, value, subtext, delay }) => {
    return (
        <div className={`relative p-6 border border-neon-purple/30 bg-void-black/50 backdrop-blur-sm rounded-sm animate-fade-in-up`} style={{ animationDelay: `${delay}ms` }}>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-purple"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-purple"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-purple"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-purple"></div>

            <h3 className="text-neon-purple font-mono text-xs tracking-widest mb-2 opacity-70">{title}</h3>
            <div className="text-3xl font-orbitron font-bold text-white mb-1">{value}</div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider">{subtext}</p>
        </div>
    );
};

const Hero = () => {
    const titleRef = useRef(null);
    const sectionRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    useEffect(() => {
        // Clock
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        // Title Setup
        gsap.fromTo(titleRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.5 }
        );

        return () => clearInterval(timer);
    }, []);

    const handleEnter = () => {
        document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={sectionRef} className="hero-section relative w-full h-screen flex flex-col items-center justify-center bg-void-black overflow-hidden font-mono">

            {/* 3D Background with Parallax */}
            <motion.div
                className="absolute inset-0 w-full h-full z-0"
                style={{ y }}
            >
                <PortalBackground />
            </motion.div>

            {/* HUD OVERLAY LAYER */}
            <div className="absolute inset-0 z-10 p-4 md:p-10 pointer-events-none flex flex-col justify-between">
                {/* Top HUD */}
                <div className="hud-top-container flex justify-between items-start opacity-80 mt-20 md:mt-24">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="hud-label text-green-400 text-xs tracking-widest">SYSTEM ONLINE</span>
                        </div>
                        <span className="hud-text-sm text-neon-purple/50 text-[10px]">V.2.0.4.1</span>
                    </div>
                    <div className="text-right">
                        <span className="hud-label text-neon-purple text-xs tracking-[0.2em]">{currentTime}</span>
                        <div className="w-32 h-[1px] bg-neon-purple/30 mt-1"></div>
                        <span className="hud-text-sm text-neon-purple/50 text-[10px]">SERVER: ASIA-SOUTH</span>
                    </div>
                </div>

                {/* Bottom HUD - Decorative Lines */}
                <div className="w-full flex items-end opacity-60">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent w-full"></div>
                </div>
            </div>

            {/* CENTER CONTENT */}
            <motion.div
                className="hero-content relative z-20 text-center px-4 max-w-5xl w-full"
                style={{ opacity, scale }}
            >

                {/* Main Title */}
                <div className="mb-8 md:mb-12">
                    <h1 ref={titleRef} className="hero-title text-6xl md:text-9xl font-orbitron font-black text-white relative inline-block">
                        INNOVISION
                        <span className="hero-subtitle text-neon-purple absolute -top-4 -right-8 md:-top-6 md:-right-16 text-3xl md:text-5xl">2.0</span>
                    </h1>
                    <p className="mt-4 text-neon-purple/80 tracking-[0.5em] text-sm uppercase">
                        Organized by IT Dept
                    </p>
                </div>

                {/* Data Grid */}
                <div className="hud-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
                    <HUDBox
                        title="EVENTS LOADED"
                        value="45 / 45"
                        subtext="Data Upload Complete"
                        delay="200"
                    />
                    <HUDBox
                        title="PARTICIPANTS"
                        value="1,328"
                        subtext="Online Status: Active"
                        delay="400"
                    />
                    <HUDBox
                        title="INNOVATION LEVEL"
                        value="98%"
                        subtext="System Optimized"
                        delay="600"
                    />
                </div>

                {/* Main CTA */}
                <button
                    onClick={handleEnter}
                    className="cta-button relative px-12 py-4 bg-neon-purple/10 border border-neon-purple hover:bg-neon-purple/20 transition-all duration-300 group"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple group-hover:h-[80%] transition-all duration-300"></div>
                    <div className="absolute top-0 right-0 w-1 h-full bg-neon-purple group-hover:h-[80%] transition-all duration-300"></div>

                    <span className="cta-text font-orbitron font-bold text-white tracking-widest text-lg">
                        DEPLOY REGISTRATION
                    </span>
                </button>

            </motion.div>

        </section>
    );
};

export default Hero;
