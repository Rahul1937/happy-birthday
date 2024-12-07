import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./HappyBirthday.css";

const getRandomSize = () => Math.random() * 100 + 50; // Random balloon size

const HappyBirthday = () => {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const endTime = Date.now() + 5000; // Run the effect for 5 seconds
    const interval = setInterval(() => {
      if (Date.now() > endTime) {
        clearInterval(interval); // Stop after 5 seconds
        return;
      }

      const newBalloon = {
        id: Date.now() + Math.random(),
        top: Math.random() * window.innerHeight + "px",
        left: Math.random() * window.innerWidth + "px",
        size: getRandomSize(),
      };

      setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
    }, 200); // Generate a new balloon every 100ms
  }, []);

  return (
    <div className="happy-birthday-container">

      <audio src="/audio/music.mp3" autoPlay loop />

      {/* Animated Birthday Cake Video */}
      <motion.video
        src="/cakeAnimation/cakeAnimation.mp4"
        className="birthday-cake-video"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Floating Balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="balloon"
          style={{
            top: balloon.top,
            left: balloon.left,
            width: `${balloon.size}px`,
            height: `${balloon.size*1.5}px`,
          }}
          animate={{ opacity: [1, 0.5], y: Math.random() * 800 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

export default HappyBirthday;
