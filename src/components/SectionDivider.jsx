import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = () => {
  return (
    <div className="flex items-center justify-center py-12 opacity-60">
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold-400" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="mx-4 text-gold-500"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
          <circle cx="12" cy="12" r="3" fill="white" />
        </svg>
      </motion.div>
      <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold-400" />
    </div>
  );
};

export default SectionDivider;
