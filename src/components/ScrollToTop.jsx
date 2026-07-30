import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto 300px
  const toggleVisibility = () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    if (scrolled > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-6 z-40 p-3 bg-white text-gold-600 rounded-full shadow-xl border border-gold-300/60 hover:bg-gold-50 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp size={22} className="text-gold-600" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
