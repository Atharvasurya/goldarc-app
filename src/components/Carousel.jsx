import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = ({ items, autoPlay = true, interval = 6000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!autoPlay || isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, items.length, isPaused]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div
            className="relative w-full h-[450px] md:h-[600px] lg:h-[700px] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Ken Burns Effect Image */}
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.1 }}
                        transition={{ duration: interval / 1000 + 2, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={items[currentIndex].image}
                            alt={items[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div className="max-w-2xl">
                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight"
                                >
                                    {items[currentIndex].title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="text-xl md:text-2xl text-ivory-100 mb-8 font-light italic opacity-90"
                                >
                                    {items[currentIndex].subtitle}
                                </motion.p>
                                {items[currentIndex].cta && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                    >
                                        <a
                                            href={items[currentIndex].link}
                                            className="inline-block bg-gold-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-500 hover:scale-105 transition-all shadow-xl"
                                        >
                                            {items[currentIndex].cta}
                                        </a>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-10 pointer-events-none">
                <button
                    onClick={goToPrevious}
                    className="p-3 bg-black/20 hover:bg-gold-600/60 backdrop-blur-md rounded-full transition-all duration-300 pointer-events-auto group shadow-lg"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={30} className="text-white group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={goToNext}
                    className="p-3 bg-black/20 hover:bg-gold-600/60 backdrop-blur-md rounded-full transition-all duration-300 pointer-events-auto group shadow-lg"
                    aria-label="Next slide"
                >
                    <ChevronRight size={30} className="text-white group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Pagination Indicators - Progress Bars */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="group relative flex flex-col items-center py-2"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className={`h-[3px] rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-gold-500 w-12' : 'bg-white/40 w-8 group-hover:bg-white/70'
                            }`} />
                        {index === currentIndex && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute -bottom-1 w-1 h-1 bg-gold-500 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
