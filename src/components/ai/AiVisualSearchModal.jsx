import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Search, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/helpers';

const AiVisualSearchModal = ({ isOpen, onClose, onSelectProduct }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [matchedProducts, setMatchedProducts] = useState([]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
            analyzeImage();
        }
    };

    const analyzeImage = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            // AI Vision search logic simulation
            const matches = PRODUCTS.sort(() => 0.5 - Math.random()).slice(0, 4);
            setMatchedProducts(matches);
            setIsAnalyzing(false);
        }, 1500);
    };

    const handleReset = () => {
        setSelectedImage(null);
        setMatchedProducts([]);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gold-200"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-white p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                <Camera size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold leading-tight">AI Snap & Find Visual Search</h2>
                                <p className="text-xs text-gold-100 font-light">Upload any design photo to find matching GoldArc items</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {!selectedImage ? (
                            <div className="border-2 border-dashed border-gold-300 rounded-3xl p-8 text-center bg-gold-50/30 hover:bg-gold-50/70 transition-all cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                                <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <Upload size={30} />
                                </div>
                                <h3 className="font-serif font-bold text-gray-900 text-base mb-1">Upload Jewellery Photo</h3>
                                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
                                    Drag & drop or click to upload Pinterest/Instagram design photo
                                </p>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-500 text-white rounded-full text-xs font-bold shadow-md">
                                    <Sparkles size={14} /> Run AI Vision Search
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Uploaded image preview */}
                                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                                    <img src={selectedImage} alt="Uploaded" className="w-20 h-20 object-cover rounded-xl border border-gold-200" />
                                    <div className="flex-1">
                                        <span className="text-xs font-bold text-gold-600 flex items-center gap-1">
                                            <Sparkles size={14} /> AI Vision Analysis
                                        </span>
                                        <p className="text-xs text-gray-700 mt-1">Analyzing pattern, metal purity, and gemstone layout...</p>
                                    </div>
                                    <button onClick={handleReset} className="text-xs text-gray-500 underline hover:text-gray-900">
                                        Change
                                    </button>
                                </div>

                                {/* Results Grid */}
                                {isAnalyzing ? (
                                    <div className="py-12 text-center space-y-3">
                                        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
                                        <p className="text-sm font-medium text-gray-700">Scanning GoldArc catalogue for visual matches...</p>
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Top AI Visual Matches ({matchedProducts.length})</h4>
                                        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                                            {matchedProducts.map((prod) => (
                                                <div
                                                    key={prod.id}
                                                    onClick={() => { onSelectProduct && onSelectProduct(prod); onClose(); }}
                                                    className="flex items-center gap-3 p-2 bg-ivory-50 border border-gold-200 rounded-xl hover:border-gold-500 cursor-pointer transition-all"
                                                >
                                                    <img src={prod.image} alt={prod.name} className="w-14 h-14 object-cover rounded-lg" />
                                                    <div>
                                                        <h5 className="text-xs font-bold text-gray-900 line-clamp-1">{prod.name}</h5>
                                                        <p className="text-xs text-gold-600 font-bold">{formatCurrency(prod.price)}</p>
                                                        <span className="text-[10px] text-gray-400">{prod.purity}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AiVisualSearchModal;
