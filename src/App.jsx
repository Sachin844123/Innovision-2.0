import React, { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="relative w-full overflow-hidden bg-void-black text-white selection:bg-neon-purple selection:text-white">
          <Hero />
          <Events />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

export default App;
