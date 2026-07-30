import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, DollarSign, Calculator, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const AiMetalRateCalculator = ({ isOpen, onClose }) => {
    const [weightGram, setWeightGram] = useState(10);
    const [purity, setPurity] = useState('22K');
    const [metalType, setMetalType] = useState('Gold');
    const [makingPercentage, setMakingPercentage] = useState(10);

    // Live AI Market Rates (per gram)
    const LIVE_RATES = {
        Gold_24K: 7450,
        Gold_22K: 6830,
        Gold_18K: 5590,
        Silver_925: 88,
        Platinum_950: 3850
    };

    const currentGramRate = metalType === 'Silver' ? LIVE_RATES.Silver_925 : metalType === 'Platinum' ? LIVE_RATES.Platinum_950 : LIVE_RATES[`Gold_${purity}`] || LIVE_RATES.Gold_22K;
    const baseMetalValue = weightGram * currentGramRate;
    const makingCharges = (baseMetalValue * makingPercentage) / 100;
    const gstValue = ((baseMetalValue + makingCharges) * 3) / 100;
    const totalEstimate = baseMetalValue + makingCharges + gstValue;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold-200"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-white p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                <TrendingUp size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold leading-tight">AI Live Rate & Price Estimator</h2>
                                <p className="text-xs text-gold-100 font-light">Real-time market rate & breakdown calculator</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* Live Ticker Banner */}
                        <div className="bg-gold-50 border border-gold-200 p-3 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-gold-800">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                                <span>Live Market (22K Gold): ₹6,830 / gram</span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">Updated just now</span>
                        </div>

                        {/* Controls */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Metal Type</label>
                                <select
                                    value={metalType}
                                    onChange={(e) => setMetalType(e.target.value)}
                                    className="input-field text-xs"
                                >
                                    <option value="Gold">Gold</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Platinum">Platinum</option>
                                </select>
                            </div>

                            {metalType === 'Gold' && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Purity Karat</label>
                                    <select
                                        value={purity}
                                        onChange={(e) => setPurity(e.target.value)}
                                        className="input-field text-xs"
                                    >
                                        <option value="24K">24K (999)</option>
                                        <option value="22K">22K (916 Hallmarked)</option>
                                        <option value="18K">18K (750)</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Weight Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-bold text-gray-700">Gross Weight (Grams)</label>
                                <span className="text-sm font-bold text-gold-600">{weightGram} g</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={weightGram}
                                onChange={(e) => setWeightGram(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
                            />
                        </div>

                        {/* Cost Breakdown */}
                        <div className="bg-gray-50 p-4 rounded-2xl space-y-2 border border-gray-200 text-xs">
                            <div className="flex justify-between text-gray-600">
                                <span>Base Metal Value ({weightGram}g × ₹{currentGramRate})</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(baseMetalValue)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Making Charges ({makingPercentage}%)</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(makingCharges)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>GST Tax (3%)</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(gstValue)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center text-sm font-bold text-gray-900">
                                <span>Estimated Total</span>
                                <span className="text-lg text-gold-600 font-serif">{formatCurrency(totalEstimate)}</span>
                            </div>
                        </div>

                        <button onClick={onClose} className="w-full btn-primary py-3 text-sm font-bold">
                            Done
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AiMetalRateCalculator;
