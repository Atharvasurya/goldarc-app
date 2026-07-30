import React from 'react';
import { motion } from 'framer-motion';

const GoldarcWorld = () => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const categories = [
    {
      id: 'wedding',
      title: 'Wedding',
      image: `${baseUrl}artifacts/wedding_collection_1769858372956.png`,
      className: 'aspect-[4/5] md:aspect-auto md:h-[450px]',
    },
    {
      id: 'diamond',
      title: 'Diamond',
      image: `${baseUrl}artifacts/diamond_collection_1769858389585.png`,
      className: 'aspect-[4/5] md:aspect-auto md:h-[550px]',
    },
    {
      id: 'gold',
      title: 'Gold',
      image: `${baseUrl}artifacts/gold_collection_1769858409625.png`,
      className: 'aspect-[4/5] md:aspect-auto md:h-[500px] -mt-10 md:-mt-24',
    },
    {
      id: 'dailywear',
      title: 'Dailywear',
      image: `${baseUrl}artifacts/daily_collection_1769858426956.png`,
      className: 'aspect-[4/5] md:aspect-auto md:h-[400px] -mt-10 md:-mt-24',
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            Goldarc World
          </h2>
          <p className="text-xl text-gray-500 font-light italic">
            A companion for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left Column */}
          <div className="flex flex-col gap-6 md:gap-10">
            {/* Wedding */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl"
            >
              <img
                src={categories[0].image}
                alt={categories[0].title}
                className={`w-full object-cover ${categories[0].className}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#721c24]/80 via-[#721c24]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-3xl font-serif text-white font-bold drop-shadow-md">
                  {categories[0].title}
                </h3>
              </div>
            </motion.div>

            {/* Gold */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl"
            >
              <img
                src={categories[2].image}
                alt={categories[2].title}
                className={`w-full object-cover ${categories[2].className}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#721c24]/80 via-[#721c24]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-3xl font-serif text-white font-bold drop-shadow-md">
                  {categories[2].title}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 md:gap-10">
            {/* Diamond */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl"
            >
              <img
                src={categories[1].image}
                alt={categories[1].title}
                className={`w-full object-cover ${categories[1].className}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#721c24]/80 via-[#721c24]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-3xl font-serif text-white font-bold drop-shadow-md">
                  {categories[1].title}
                </h3>
              </div>
            </motion.div>

            {/* Dailywear */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl"
            >
              <img
                src={categories[3].image}
                alt={categories[3].title}
                className={`w-full object-cover ${categories[3].className}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#721c24]/80 via-[#721c24]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-3xl font-serif text-white font-bold drop-shadow-md">
                  {categories[3].title}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldarcWorld;
