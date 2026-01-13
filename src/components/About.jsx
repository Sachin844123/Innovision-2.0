import React from 'react';
import { Cpu, Zap, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    const cards = [
        {
            icon: <Cpu className="w-8 h-8 text-neon-purple" />,
            title: "TECHNICAL EVENT",
            description: "Innovative technology-driven events focused on problem-solving, coding, and real-world applications."
        },
        {
            icon: <Zap className="w-8 h-8 text-cyber-blue" />,
            title: "HACKATHONS",
            description: "An intense technical challenge where teams build creative solutions using AI, web, data, and automation."
        },
        {
            icon: <Globe className="w-8 h-8 text-neon-purple" />,
            title: "TREASURE HUNT",
            description: "Immersive escape room room & puzzle based challenge."
        },
        {
            icon: <Users className="w-8 h-8 text-cyber-blue" />,
            title: "Esport",
            description: "Survival of the fittest. Drop into the battleground, loot, and outlast your opponents in this intense Battle Royale."
        }
    ];



    return (
        <section className="relative min-h-screen py-20 px-4 md:px-8 bg-void-black overflow-hidden flex flex-col justify-center items-center font-sans">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-neon-purple/5 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-void-black to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-void-black to-transparent z-10"></div>

            {/* Abstract Background Shapes */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyber-blue/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Header */}
            <motion.div
                className="text-center mb-16 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.p
                    className="text-cyber-blue/80 tracking-[0.5em] text-sm mb-4 uppercase font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Discover
                </motion.p>
                <h2 className="text-5xl md:text-7xl font-orbitron font-bold text-white tracking-wider mb-6 flex justify-center items-center gap-4 flex-wrap">
                    <span className="text-shadow-glow">ABOUT THE</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-cyber-blue">INNOVISION</span>
                </h2>
                <motion.p
                    className="text-gray-400 max-w-2xl mx-auto text-center leading-relaxed text-sm md:text-base px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Step through the portal into a world where technology defies
                    reality. Innovison brings together the brightest minds to
                    explore the unknown.
                </motion.p>

            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full relative z-10 mb-20 px-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="group relative p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.15,
                            ease: "easeOut"
                        }}
                    >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className={`mb-4 p-3 rounded-lg w-fit transition-colors bg-white/5 group-hover:bg-white/10`}>
                            {card.icon}
                        </div>
                        <h3 className="text-xl font-orbitron font-bold text-white mb-3 tracking-wide">{card.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {card.description}
                        </p>

                        {/* Corner Decor */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-neon-purple transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyber-blue transition-colors"></div>
                    </motion.div>
                ))}
            </div>



        </section>
    );
};

export default About;
