import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./HappyBirthday.css";

// Dynamically import images
const importAllImages = (r) => {
  return r.keys().map((item) => ({
    type: "image",
    src: `/hbdImages/${item.replace("./", "")}`,
  }));
};

const images = importAllImages(
  require.context("../../public/hbdImages", false, /\.(jpg|jpeg|png)$/)
);
const getRandomSize = () => {
  const screenWidth = window.innerWidth;
  if(screenWidth<=480){
    return Math.random() * 20 + 20;
  } else if(screenWidth<=768){
    return Math.random() * 30 +20;
  } else{
    return Math.random() * 50 + 50; // Random size for balloons
  }
}
const getRandomImageSize = () => {
  const screenWidth = window.innerWidth;
  if(screenWidth<=480){
    return Math.random() * 80 + 40;
  } else if(screenWidth<=768){
    return Math.random() * 120 +40;
  } else{
    return Math.random() * 200 + 150; // Random size for images
  }
}
const getRandomOpacity = () => Math.random() * 0.6 + 0.4; // Random opacity between 0.6 and 1
const getRandomImage = () => images[(Math.floor(Math.random() * 29) + 1)%images.length].src

const HappyBirthday = () => {
  const [balloons, setBalloons] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Add balloons
    const endTime = Date.now() + 5000; // Run the effect for 5 seconds
    const balloonInterval = setInterval(() => {
      if (Date.now() > endTime) {
        clearInterval(balloonInterval); // Stop after 5 seconds
        return;
      }

      const newBalloon = {
        id: Date.now() + Math.random(),
        top: Math.random() * window.innerHeight + "px",
        left: Math.random() * window.innerWidth + "px",
        size: getRandomSize(),
      };

      setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
    }, 300);

    // Add fading images
    const imageInterval = setInterval(() => {
      const newImage = {
        id: Date.now() + Math.random(),
        src: getRandomImage(), // Replace with actual image paths
        top: Math.random() * window.innerHeight + "px",
        left: Math.random() * window.innerWidth + "px",
        size: getRandomImageSize(),
        opacity: getRandomOpacity(),
      };

      setImages((prevImages) => [...prevImages, newImage]);
    }, 800); // Add a new image every 800ms

    return () => {
      clearInterval(balloonInterval);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <div className="happy-birthday-container">
      <audio src={`/audio/music.mp3`} autoPlay loop />

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
            height: `${balloon.size * 1.5}px`,
          }}
          animate={{ opacity: [1, 0.5], y: Math.random() * 800 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      ))}

      {/* Fading Images */}
      {images.map((image) => (
        <motion.img
          key={image.id}
          src={image.src}
          className="fading-image"
          style={{
            top: image.top,
            left: image.left,
            width: `${image.size}px`,
            height: `${image.size}px`,
            opacity: image.opacity,
          }}
          animate={{ opacity: [image.opacity, 0] }}
          transition={{ duration: 5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

export default HappyBirthday;
