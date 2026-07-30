import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart, Gift, ShoppingBag, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';

const AiStylistModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [occasion, setOccasion] = useState('Wedding');
    const [budget, setBudget] = useState(100000);
    const [metal, setMetal] = useState('Gold');
    const [isGenerating, setIsGenerating] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const { addToCart, isInCart } = useCart();

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            // Filter products matching metal & budget criteria
            let filtered = PRODUCTS.filter(p => {
                const matchesMetal = metal === 'Any' || p.category.toLowerCase().includes(metal.toLowerCase()) || p.purity.toLowerCase().includes(metal.toLowerCase());
                const matchesBudget = p.price <= budget * 1.2;
                return matchesMetal && matchesBudget;
            });

            if (filtered.length < 3) {
                filtered = PRODUCTS.slice(0, 4);
            } else {
                filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
            }

            setRecommendations(filtered);
            setIsGenerating(false);
            setStep(2);
        }, 1200);
    };

    const handleReset = () => {
        setStep(1);
        setRecommendations([]);
    };

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
                                <Sparkles size={22} className="text-white animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold leading-tight">AI Personal Stylist & Gift Recommender</h2>
                                <p className="text-xs text-gold-100 font-light">Curated matching jewellery sets powered by AI</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Step 1: Preference Wizard */}
                    {step === 1 && (
                        <div className="p-6 md:p-8 space-y-6">
                            {/* Occasion */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">1. Select Occasion</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {['Wedding', 'Anniversary', 'Dailywear', 'Festive'].map((occ) => (
                                        <button
                                            key={occ}
                                            onClick={() => setOccasion(occ)}
                                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${occasion === occ
                                                    ? 'bg-gold-500 text-white border-gold-600 shadow-md scale-105'
                                                    : 'bg-ivory-50 text-gray-700 border-gray-200 hover:border-gold-300'
                                                }`}
                                        >
                                            {occ}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preferred Metal */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">2. Preferred Metal / Style</label>
                                <div className="grid grid-cols-4 gap-3">
                                    {['Gold', 'Diamond', 'Silver', 'Platinum'].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMetal(m)}
                                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${metal === m
                                                    ? 'bg-gold-600 text-white border-gold-700 shadow-md'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gold-300'
                                                }`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget Range Slider */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-gray-700">3. Budget Target</label>
                                    <span className="text-lg font-bold text-gold-600 font-serif">{formatCurrency(budget)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="20000"
                                    max="500000"
                                    step="10000"
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>₹20,000</span>
                                    <span>₹5,00,000</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base font-bold shadow-lg hover:shadow-gold-500/25"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        <span>AI Stylist is Curating Your Set...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        <span>Generate Styled Set</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Step 2: AI Curated Matching Set Results */}
                    {step === 2 && (
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div>
                                    <h3 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2">
                                        Your AI Curated Set <CheckCircle2 size={18} className="text-green-500" />
                                    </h3>
                                    <p className="text-xs text-gray-500">Perfectly matched for {occasion} • {metal} Collection</p>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="text-xs font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 bg-gold-50 px-3 py-1.5 rounded-full"
                                >
                                    <RefreshCw size={14} /> Re-style
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {recommendations.map((item) => (
                                    <div key={item.id} className="bg-ivory-50 border border-gold-200/60 rounded-2xl p-3 flex flex-col justify-between hover:shadow-md transition-all">
                                        <div>
                                            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                                            <span className="text-[10px] text-gold-600 font-bold uppercase tracking-wider">{item.category}</span>
                                            <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs font-bold text-gold-700 mt-1">{formatCurrency(item.price)}</p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(item)}
                                            disabled={isInCart(item.id)}
                                            className={`mt-3 w-full py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 ${isInCart(item.id) ? 'bg-gray-300 text-gray-600' : 'bg-gold-500 text-white hover:bg-gold-600'
                                                }`}
                                        >
                                            <ShoppingBag size={14} />
                                            <span>{isInCart(item.id) ? 'In Cart' : 'Add to Set'}</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gold-50 border border-gold-200 p-4 rounded-2xl flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-gold-800 uppercase font-bold tracking-wider">Total Set Estimate</span>
                                    <p className="text-xl font-serif font-bold text-gold-700">
                                        {formatCurrency(recommendations.reduce((sum, item) => sum + item.price, 0))}
                                    </p>
                                </div>
                                <button onClick={onClose} className="btn-secondary text-sm font-semibold">
                                    Done & View Cart
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AiStylistModal;
