import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Gallery.css";

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaSizes, setMediaSizes] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);

  // Dynamically import images
  const importAllImages = (r) => {
    return r.keys().map((item) => ({
      type: "image",
      src: `/images/${item.replace("./", "")}`,
    }));
  };

  // Dynamically import videos
  const importAllVideos = (r) => {
    return r.keys().map((item) => ({
      type: "video",
      src: `/videos/${item.replace("./", "")}`,
    }));
  };

  // Function to shuffle the media items
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const images = importAllImages(
      require.context(`${process.env.PUBLIC_URL}/images`, false, /\.(jpg|jpeg|png)$/)
    );
    const videos = importAllVideos(
      require.context(`${process.env.PUBLIC_URL}/videos`, false, /\.(mp4|webm)$/)
    );

    const allMedia = shuffleArray([...images, ...videos]);

    const newSizes = allMedia.map(() => ({
      gridColumn: `span ${Math.floor(Math.random() * 2) + 1}`,
      gridRow: `span ${Math.floor(Math.random() * 2) + 1}`,
    }));

    setMediaItems(allMedia);
    setMediaSizes(newSizes);
  }, []);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="gallery-container">
      <h2>Some Memories🥹!!</h2>

      <motion.div
        className="gallery-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {mediaItems.map((media, index) => (
          <motion.div
            key={index}
            className="gallery-item"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMediaClick(media)}
            style={mediaSizes[index]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {media.type === "image" ? (
              <img src={media.src} alt={`Gallery Item ${index}`} />
            ) : (
              <video
                src={media.src}
                className="gallery-video"
                muted
                loop
                autoPlay
                onMouseOver={(e) => e.currentTarget.play()}
                onMouseOut={(e) => e.currentTarget.pause()}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for Media Preview */}
      {selectedMedia && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          {selectedMedia.type === "image" ? (
            <motion.img src={selectedMedia.src} alt="Selected Media" />
          ) : (
            <motion.video
              src={selectedMedia.src}
              controls
              autoPlay
              className="modal-video"
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
