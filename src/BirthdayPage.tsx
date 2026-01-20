import React, { useEffect, useRef } from 'react';
import './BirthdayPage.css';

const BirthdayPage = ({ name }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        // Attempt to play audio on mount
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.log("Autoplay blocked. Waiting for user interaction.");
                });
            }
        };

        playAudio();

        // Fallback: Play audio the first time the user clicks anywhere on the page
        window.addEventListener('click', playAudio, { once: true });

        return () => window.removeEventListener('click', playAudio);
    }, []);

    const renderElements = (count, className) => {
        return [...Array(count)].map((_, i) => (
            <div key={`${className}-${i + 1}`} className={`${className} ${className}-${i + 1}`}></div>
        ));
    };

    return (
        <div className="bw-container">
            <audio
                ref={audioRef}
                src="/audio/birthdaybgm.mp3"
                loop
                preload="auto"
                controls
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 100,
                    opacity: 0.8
                }}
            />
            {/* Hidden Audio Element */}


            {renderElements(12, 'bw-star')}
            {renderElements(8, 'bw-rocket-bomb')}

            <div className="bw-content">
                <h2 className="bw-greeting-emoji">🎉🎂🥳</h2>
                <h2 className="bw-title">Many more happy returns of the day, {name}!</h2>
                <p className="bw-message">Wishing you a day filled with joy, laughter, and wonderful surprises!</p>

            </div>

        </div>
    );
};

export default BirthdayPage;
