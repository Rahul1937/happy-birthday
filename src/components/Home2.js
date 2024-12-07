import React, { useEffect, useState } from "react";
import "./Home2.css";

const Home2 = ({isBirthday}) => {
  const [countdown, setCountdown] = useState('');

  // Calculate countdown to next birthday
  useEffect(() => {
    const calculateCountdown = () => {
      const year = new Date().getFullYear();
      const birthday = new Date(`${year}-12-14T00:00:00+05:30`).getTime(); 
      const now = new Date().getTime();
      const timeLeft = birthday - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
    };

    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home2-container">
      {/* Star Box Container */}
      <div className="star-box">
        {/* Generating some animated stars */}
        {Array.from({ length: 30 }).map((_, index) => (
          <span
            key={index}
            className="star"
            style={{
              top: Math.random() * 100 + "vh",
              left: Math.random() * 100 + "vw",
              animationDelay: `${Math.random()}s`,
            }}
          ></span>
        ))}
      </div>
      {isBirthday && (
        <div className="happy-birthday-box">
          <h1 className="happy-birthday-text">Happy Birthday Garima! 🎂</h1>          
        </div>
      )}
      {!isBirthday && (
        <div className="countdown-box">
          <h2 className="countdown-title">Countdown to Birthday</h2>
          <p className="countdown-timer">{countdown}</p>
        </div>
      )}
    </div>
  );
};

export default Home2;
