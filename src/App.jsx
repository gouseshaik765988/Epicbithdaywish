import React, { useState, useEffect, useRef } from 'react';
import BirthdayWaitingPage from './BirthdayWaitingPage';
import BirthdayPage from './BirthdayPage';

function App() {
  const audioRef = useRef(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    birthdateandcurrentdateissame: 'false',
  });

  useEffect(() => {
    const birthdayMonth = 0; // January
    const birthdayDay = 21;

    const interval = setInterval(() => {
      const now = new Date();
      let nextBirthday = new Date(now.getFullYear(), birthdayMonth, birthdayDay, 0, 0, 0);

      if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      const difference = nextBirthday.getTime() - now.getTime();
      const todayIsBirthday = now.getMonth() === birthdayMonth && now.getDate() === birthdayDay;

      if (todayIsBirthday) {
        setCountdown({
          days: 0, hours: 0, minutes: 0, seconds: 0,
          birthdateandcurrentdateissame: 'true'
        });
      } else {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          birthdateandcurrentdateissame: 'false',
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- AUDIO INTEGRATION LOGIC ---
  useEffect(() => {
    // Only attempt to play if it is the birthday
    if (countdown.birthdateandcurrentdateissame === 'true') {

      const playAudio = () => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              // Successfully playing, remove listener
              window.removeEventListener('click', playAudio);
            })
            .catch((err) => console.log("Autoplay blocked, waiting for user click..."));
        }
      };

      // Try playing immediately
      playAudio();

      // Listen for click in case browser blocks the first attempt
      window.addEventListener('click', playAudio);
      return () => window.removeEventListener('click', playAudio);
    } else {
      // If it's NOT the birthday, ensure audio is paused
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [countdown.birthdateandcurrentdateissame]); // Runs whenever birthday status changes

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/birthdaybgm.mp3"
        loop
        preload="auto"
      />

      {countdown.birthdateandcurrentdateissame === 'true' ? (
        <BirthdayPage name="SUHANA" />
      ) : (
        <BirthdayWaitingPage countdown={countdown} name="SUHANA" />
      )}
    </>
  );
}

export default App;
