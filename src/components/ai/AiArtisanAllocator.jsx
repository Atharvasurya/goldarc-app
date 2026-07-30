import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Hammer, Sparkles, CheckCircle2, X, Clock } from 'lucide-react';

const AiArtisanAllocator = ({ isOpen, onClose }) => {
    const [selectedOrder, setSelectedOrder] = useState('JC-8821 (Custom Diamond Ring Resizing)');

    const artisans = [
        { name: 'Master Ramesh Sharma', skill: 'Solitaire Setting & Diamond Pronging', score: '98% Quality Rating', wastageEst: '0.12g (Minimal)', eta: '24 Hours', recommended: true },
        { name: 'Master Artisan Suresh Kar', skill: 'Traditional Filigree & 22K Gold Casting', score: '95% Quality Rating', wastageEst: '0.25g', eta: '36 Hours', recommended: false },
        { name: 'Master Vikram Sonar', skill: 'Kundankari & Precious Gem Inlay', score: '92% Quality Rating', wastageEst: '0.30g', eta: '48 Hours', recommended: false },
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold-200"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-white p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                <Hammer size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold leading-tight">AI Job Card & Artisan Allocator</h2>
                                <p className="text-xs text-gold-100 font-light">Optimize workshop craft allocation & minimize gold wastage</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        <div className="bg-gold-50 border border-gold-200 p-3 rounded-2xl flex items-center justify-between text-xs">
                            <div className="font-bold text-gold-900">Active Job Card: {selectedOrder}</div>
                            <span className="text-[10px] bg-gold-200 text-gold-800 px-2 py-0.5 rounded-md font-bold">Complexity: HIGH</span>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">AI Recommended Artisans</h4>
                            {artisans.map((artisan, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-2xl border transition-all ${artisan.recommended
                                            ? 'bg-gradient-to-r from-gold-50/80 to-white border-gold-400 shadow-md ring-1 ring-gold-400'
                                            : 'bg-ivory-50 border-gray-200 opacity-80'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-gray-900 text-sm">{artisan.name}</h5>
                                            {artisan.recommended && (
                                                <span className="px-2 py-0.5 bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                    <Sparkles size={10} /> Top Match
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-green-700">{artisan.score}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">Specialty: {artisan.skill}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                                        <span>Est. Wastage: <strong className="text-gray-800">{artisan.wastageEst}</strong></span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> SLA: <strong className="text-gray-800">{artisan.eta}</strong></span>
                                        <button className="px-3 py-1 bg-gold-600 hover:bg-gold-700 text-white rounded-lg text-xs font-bold shadow-xs">
                                            Assign Job Card
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={onClose} className="w-full btn-secondary py-3 text-sm font-bold">
                            Close Allocator
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AiArtisanAllocator;
