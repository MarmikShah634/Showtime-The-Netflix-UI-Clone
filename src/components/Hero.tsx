import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <div className="relative h-[90vh] bg-black">
      <img
        src="https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      <motion.div
        className="relative z-10 top-1/3 px-10 max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-white text-5xl font-bold mb-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Avengers: Endgame
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          The epic finale of the Infinity Saga. Heroes unite for one last fight
          to save the universe.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:bg-red-700 transition-all"
        >
          Watch Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
