import React, { useState, useRef, useEffect } from 'react';
import { Tilt } from 'react-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
    {
        id: 1,
        title: "Valorant: Zero Gravity",
        category: "E-Sports",
        description: "Defy physics in this high-stakes tactical shooter tournament. 5v5 combat where precision meets strategy.",
        date: "Day 1 - 10:00 AM",
        venue: "Gaming Lab A",
        teamSize: "5 Members",
        prize: "₹10,000",
        image: "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?q=80&w=1000&auto=format&fit=crop",
        color: "from-red-500 to-rose-600"
    },
    {
        id: 2,
        title: "Rocket League: Star Drift",
        category: "E-Sports",
        description: "Soccer meets driving in a zero-g arena. Master the aerials and claim victory among the stars.",
        date: "Day 2 - 11:00 AM",
        venue: "Gaming Lab B",
        teamSize: "3 Members",
        prize: "₹5,000",
        image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1000&auto=format&fit=crop",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        title: "Orbital Hackathon",
        category: "Technical",
        description: "24-hour coding marathon. Build solutions that solve real-world problems using futuristic tech stacks.",
        date: "Day 1 - 9:00 AM",
        venue: "Main Auditorium",
        teamSize: "2-4 Members",
        prize: "₹20,000",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1000&auto=format&fit=crop",
        color: "from-green-500 to-emerald-600"
    },
    {
        id: 4,
        title: "Quantum Code",
        category: "Technical",
        description: "Competitive coding challenge. Solve algorithmic puzzles faster than the speed of light.",
        date: "Day 2 - 2:00 PM",
        venue: "Lab 3",
        teamSize: "Individual",
        prize: "₹3,000",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        color: "from-yellow-500 to-amber-600"
    },
    {
        id: 5,
        title: "Nebula UI/UX",
        category: "Technical",
        description: "Design the interfaces of tomorrow. Create user experiences that are out of this world.",
        date: "Day 1 - 1:00 PM",
        venue: "Design Studio",
        teamSize: "Individual",
        prize: "₹4,000",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
        color: "from-purple-500 to-pink-600"
    },
    {
        id: 6,
        title: "Cyber-Security CTF",
        category: "Technical",
        description: "Capture The Flag. Hack your way through security layers and find the hidden flags.",
        date: "Day 2 - 10:00 AM",
        venue: "Cyber Lab",
        teamSize: "2 Members",
        prize: "₹6,000",
        image: "https://images.unsplash.com/photo-1563206767-5b1d97289374?q=80&w=1000&auto=format&fit=crop",
        color: "from-indigo-500 to-violet-600"
    },
    {
        id: 7,
        title: "Tech-Quiz Event Horizon",
        category: "Fun",
        description: "Test your knowledge of the tech universe. From silicon chips to supernovas.",
        date: "Day 1 - 3:00 PM",
        venue: "Seminar Hall",
        teamSize: "2 Members",
        prize: "₹2,000",
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000&auto=format&fit=crop",
        color: "from-orange-500 to-red-500"
    },
    {
        id: 8,
        title: "Robo-Sumo: Anti-G",
        category: "Fun",
        description: "Battle of the bots. Push your opponent out of the ring in this high-torque showdown.",
        date: "Day 2 - 4:00 PM",
        venue: "Open Arena",
        teamSize: "3-5 Members",
        prize: "₹8,000",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
        color: "from-slate-500 to-gray-600"
    }
];

const EventCard = ({ event, onClick }) => {
    return (
        <Tilt className="h-full" options={{ max: 25, scale: 1.05, speed: 400 }}>
            <div
                className="relative h-full glass-panel rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-neon-purple/50 transition-all duration-300"
                onClick={() => onClick(event)}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="relative z-20 p-6">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${event.color} text-white mb-3`}>
                        {event.category}
                    </span>
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {event.description}
                    </p>
                    <div className="flex items-center text-cyber-blue text-sm font-medium">
                        <span>View Details</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-30"
                >
                    <X size={20} />
                </button>

                <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent z-10" />
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 p-8 z-20">
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${event.color} text-white mb-3`}>
                            {event.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">{event.title}</h2>
                    </div>
                </div>

                <div className="p-8 pt-0">
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        {event.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1 flex items-center"><Calendar size={14} className="mr-1" /> Date</span>
                            <span className="text-white font-medium">{event.date}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1 flex items-center"><MapPin size={14} className="mr-1" /> Venue</span>
                            <span className="text-white font-medium">{event.venue}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1 flex items-center"><Users size={14} className="mr-1" /> Team Size</span>
                            <span className="text-white font-medium">{event.teamSize}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1 flex items-center"><Trophy size={14} className="mr-1" /> Prize</span>
                            <span className="text-white font-medium text-neon-purple">{event.prize}</span>
                        </div>
                    </div>

                    <a
                        href="https://forms.google.com/example"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 bg-gradient-to-r from-neon-purple to-cyber-blue text-white text-center font-bold font-orbitron tracking-wider rounded-xl hover:opacity-90 transition-opacity"
                    >
                        REGISTER NOW
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".event-card", {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="events" className="relative py-20 px-4 md:px-10 min-h-screen bg-void-black" ref={containerRef}>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-cyber-blue tracking-[0.3em] text-sm font-bold mb-2 uppercase">Explore The Unknown</h2>
                    <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white neon-text">
                        EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-cyber-blue">HORIZON</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {eventsData.map((event) => (
                        <div key={event.id} className="event-card h-full">
                            <EventCard event={event} onClick={setSelectedEvent} />
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Events;
