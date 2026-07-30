import React from 'react';
import { motion } from 'framer-motion';

const BackgroundOrnaments = () => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const bgMotif = `${baseUrl}artifacts/goldarc_bg_motif_clean.png`;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Top Left Motif */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-20 -left-20 w-96 h-96 opacity-[0.05]"
      >
        <img
          src={bgMotif}
          alt=""
          className="w-full h-full object-contain invert mix-blend-multiply"
        />
      </motion.div>

      {/* Middle Right Motif */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] opacity-[0.06]"
      >
        <img
          src={bgMotif}
          alt=""
          className="w-full h-full object-contain invert mix-blend-multiply"
        />
      </motion.div>

      {/* Bottom Left Motif */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-20 -left-24 w-80 h-80 opacity-[0.05]"
      >
        <img
          src={bgMotif}
          alt=""
          className="w-full h-full object-contain invert mix-blend-multiply"
        />
      </motion.div>

      {/* Atmosphere Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-200/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gold-100/10 rounded-full blur-[150px]" />
    </div>
  );
};

export default BackgroundOrnaments;
