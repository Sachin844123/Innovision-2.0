import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [needsInteraction, setNeedsInteraction] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Set volume to 70%
        audio.volume = 0.7;

        // Handle audio end event for mobile devices
        const handleEnded = () => {
            console.log('Audio ended, restarting...');
            audio.currentTime = 0;
            audio.play().catch(err => console.error('Replay failed:', err));
        };

        audio.addEventListener('ended', handleEnded);

        // Try to autoplay (browsers may block this)
        const playAudio = async () => {
            try {
                await audio.play();
                console.log('Background music started playing');
                setNeedsInteraction(false);
            } catch (error) {
                console.log('Autoplay blocked:', error.message);
                setNeedsInteraction(true);
            }
        };

        playAudio();

        // Add click handler to start music if autoplay was blocked
        const handleInteraction = () => {
            if (audio.paused) {
                audio.play().then(() => {
                    console.log('Music started after user interaction');
                    setNeedsInteraction(false);
                }).catch(err => console.error('Play failed:', err));
            }
        };

        document.addEventListener('click', handleInteraction, { once: true });

        return () => {
            if (audio) {
                audio.pause();
                audio.removeEventListener('ended', handleEnded);
            }
            document.removeEventListener('click', handleInteraction);
        };
    }, []);

    return (
        <audio
            ref={audioRef}
            loop
            preload="auto"
            playsInline
        >
            <source src="/background-music.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default BackgroundMusic;
