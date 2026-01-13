import React, { useState } from 'react';
import SmoothScroll from './SmoothScroll';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Events from './Events';
import Schedule from './Schedule';
import Footer from './Footer';
import Preloader from './Preloader';
import BackgroundMusic from './BackgroundMusic';

const LandingPage = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <BackgroundMusic />
            <SmoothScroll>
                <CustomCursor />
                <Navbar />
                <main className="relative w-full overflow-hidden bg-void-black text-white selection:bg-neon-purple selection:text-white">
                    <Hero />
                    <About />
                    <Events />
                    <Schedule />
                    <Footer />
                </main>
            </SmoothScroll>
        </>
    );
};

export default LandingPage;
