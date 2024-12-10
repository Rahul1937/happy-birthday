// BirthdayWishes.js
import React from "react";
import { motion } from "framer-motion";
import "./Wishes.css";

const importAllImages = (r) => {
  return r.keys().map((item) => ({
    type: "image",
    src: `/wishesImages/${item.replace("./", "")}`,
  }));
};

const images = importAllImages(
  require.context("../../public/wishesImages", false, /\.(jpg|jpeg|png)$/)
);

const Wishes = () => {
  return (
    <div className="birthday-wishes-container">
      {/* Collage Background */}
      <div className="collage-container">
        {images.map((img, index) => (
          <img key={index} src={img.src} alt={`Collage ${index}`} className="collage-image" />
        ))}
      </div>

      {/* Birthday Wishes Content */}
      <motion.h1 className="birthday-title" animate={{ scale: 1.2 }}>
        🎂 Happy Birthday Puchkuuu! 🎈
      </motion.h1>

      <motion.p className="birthday-text">
        Wishing you a day filled with laughter, joy, and all your favorite things!
        You deserve everything wonderful this world has to offer. On this special
        day, may all your dreams come true, and may you have a blast celebrating with
        love, laughter, and cake! 🎂✨
        Ye to chatGTP ka hogya, ab mera bhi sunlo!
        <br/>
        Mela Puchkuuuuu...Mela cutu patutu... Happiest birthday to you!!! Always
        keep smiling and be happy, knowing that I will always be by your side no
        matter what. You can count on me whenever you need anything in your life,
        I will be there without any second thought. You lighten the world around you
        just by being the bestest personality that you are. You are the kindest person
        I have ever met. You bring smile to everyone around you. I am very greatful
        that I have a friend like you in My life!! Thank you soooo much for everything
        you do! Happy Birthday Again mela Puchkaa!!!
      </motion.p>
    </div>
  );
};

export default Wishes;
