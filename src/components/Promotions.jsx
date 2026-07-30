import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Promotions = () => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Gift Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] bg-[#FDF2F2] rounded-[40px] overflow-hidden group shadow-lg"
          >
            {/* Ribbons */}
            <div className="absolute top-0 bottom-0 left-[60px] w-12 bg-[#8B1D1D] shadow-inner" />
            <div className="absolute left-0 right-0 bottom-24 h-12 bg-[#8B1D1D] shadow-inner" />

            {/* Bow (Abstract CSS) */}
            <div className="absolute left-[64px] bottom-[94px] w-16 h-16 pointer-events-none">
              <div className="absolute inset-0 bg-[#8B1D1D] rounded-full transform -rotate-45" />
              <div className="absolute inset-0 bg-[#8B1D1D] rounded-full transform rotate-45" />
            </div>

            {/* Content */}
            <div className="absolute top-1/2 left-32 -translate-y-1/2 flex flex-col items-start gap-4">
              <h2 className="text-5xl font-serif font-bold text-[#8B1D1D]">
                #GiftOfChoice
              </h2>
              <p className="text-xl text-gray-700 max-w-[300px] font-medium leading-tight">
                Breathtaking gifts for your loved one's
              </p>
              <p className="text-sm tracking-widest text-[#8B1D1D] font-bold">
                STARTING AT ₹10,000
              </p>
              <motion.button
                whileHover={{ gap: '1rem' }}
                className="mt-4 flex items-center gap-2 bg-white text-[#8B1D1D] px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-50 transition-all"
              >
                Explore Now <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>

          {/* Exchange Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] bg-[#FFFBF0] border-2 border-[#EAD0A8] flex flex-col items-center justify-center text-center p-12 gap-8 shadow-lg rounded-[40px] overflow-hidden"
          >
            {/* Decorative Corner Ornaments (Optional but premium) */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold-200 rounded-tr-[40px] m-4 opacity-50" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-gold-200 rounded-bl-[40px] m-4 opacity-50" />
            <div className="w-32 h-32 p-4 bg-white rounded-2xl shadow-sm">
              <img
                src={`${baseUrl}artifacts/goldarc_exchange_icon.png`}
                alt="Goldarc Exchange"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
                Exchange your Old Gold <br />
                <span className="text-gold-600">for 100% Value!</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Unlock full value for your old gold today with our <span className="font-bold">Exchange Program !</span>
              </p>
            </div>

            <motion.button
              whileHover={{ gap: '1rem' }}
              className="flex items-center gap-2 border-2 border-gold-600 text-gold-700 px-10 py-3 rounded-full font-bold hover:bg-gold-50 transition-all"
            >
              Know more <ChevronRight size={20} />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Promotions;
