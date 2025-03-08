import React from 'react';
import { motion } from 'framer-motion';

const CircleAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[800px] h-[800px] border-2 border-green-200/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border-2 border-green-200/40 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 border-2 border-green-200/50 rounded-full" />
      </motion.div>
    </div>
  );
};

export default CircleAnimation;