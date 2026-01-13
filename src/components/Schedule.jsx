import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const scheduleData = {
    day1: [
        {
            time: "9:00 AM",
            title: "Orbital Hackathon",
            venue: "Main Auditorium",
            category: "Technical",
            color: "from-green-500 to-emerald-600"
        },
        {
            time: "10:00 AM",
            title: "Free Fire Max: Battle Royale",
            venue: "Gaming Lab A",
            category: "E-Sports",
            color: "from-orange-500 to-red-600"
        },
        {
            time: "1:00 PM",
            title: "Nebula UI/UX",
            venue: "Design Studio",
            category: "Technical",
            color: "from-purple-500 to-pink-600"
        },
        {
            time: "3:00 PM",
            title: "Tech-Quiz Event Horizon",
            venue: "Seminar Hall",
            category: "Fun",
            color: "from-orange-500 to-red-500"
        }
    ],
    day2: [
        {
            time: "10:00 AM",
            title: "Cyber-Security CTF",
            venue: "Cyber Lab",
            category: "Technical",
            color: "from-indigo-500 to-violet-600"
        },
        {
            time: "11:00 AM",
            title: "Rocket League: Star Drift",
            venue: "Gaming Lab B",
            category: "E-Sports",
            color: "from-blue-500 to-cyan-500"
        },
        {
            time: "2:00 PM",
            title: "Blind Type",
            venue: "Lab 3",
            category: "Technical",
            color: "from-yellow-500 to-amber-600"
        },
        {
            time: "4:00 PM",
            title: "Robo-Sumo: Anti-G",
            venue: "Open Arena",
            category: "Fun",
            color: "from-slate-500 to-gray-600"
        }
    ]
};

const Schedule = () => {
    const [activeDay, setActiveDay] = useState('day1');
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

    const currentSchedule = scheduleData[activeDay];

    return (
        <motion.section
            id="schedule"
            ref={sectionRef}
            className="relative py-20 px-4 md:px-10 min-h-screen bg-void-black overflow-hidden"
            style={{ opacity, scale }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-void-black via-neon-purple/5 to-void-black pointer-events-none"></div>
            <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto relative z-10 max-w-6xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-cyber-blue tracking-[0.5em] text-sm mb-4 uppercase font-medium">Timeline</p>
                    <h2 className="text-5xl md:text-7xl font-orbitron font-bold text-white tracking-wider mb-6">
                        EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-cyber-blue">SCHEDULE</span>
                    </h2>
                </motion.div>

                {/* Day Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveDay('day1')}
                        className={`px-8 py-3 font-orbitron font-bold tracking-wider rounded-lg transition-all duration-300 ${activeDay === 'day1'
                                ? 'bg-gradient-to-r from-neon-purple to-cyber-blue text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-neon-purple/50'
                            }`}
                    >
                        DAY 1
                    </button>
                    <button
                        onClick={() => setActiveDay('day2')}
                        className={`px-8 py-3 font-orbitron font-bold tracking-wider rounded-lg transition-all duration-300 ${activeDay === 'day2'
                                ? 'bg-gradient-to-r from-neon-purple to-cyber-blue text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-neon-purple/50'
                            }`}
                    >
                        DAY 2
                    </button>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-purple via-cyber-blue to-neon-purple"></div>

                    {/* Events */}
                    <div className="space-y-8">
                        {currentSchedule.map((event, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } flex-row`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-neon-purple to-cyber-blue rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>

                                {/* Event Card */}
                                <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-12 pl-16 md:pl-0' : 'md:pl-12 pl-16 md:pr-0'}`}>
                                    <div className="group relative p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-neon-purple/50 transition-all duration-300 overflow-hidden">
                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative z-10">
                                            {/* Category Badge */}
                                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${event.color} text-white mb-3`}>
                                                {event.category}
                                            </span>

                                            {/* Title */}
                                            <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-neon-purple transition-colors">
                                                {event.title}
                                            </h3>

                                            {/* Details */}
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center text-gray-400">
                                                    <Clock size={14} className="mr-2 text-cyber-blue" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <MapPin size={14} className="mr-2 text-neon-purple" />
                                                    <span>{event.venue}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Corner Decor */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-neon-purple transition-colors"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyber-blue transition-colors"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Schedule;
