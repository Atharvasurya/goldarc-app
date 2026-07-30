import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, RefreshCw, X, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/helpers';

const AiSmartRestockPredictor = ({ isOpen, onClose }) => {
    const [selectedBranch, setSelectedBranch] = useState('Branch #101 - Mumbai Central');

    // Simulated AI restock predictions based on sales analytics
    const predictions = [
        { sku: 'GLD-BNG-002', name: 'Traditional Gold Bangles', category: 'Gold', currentStock: 2, recommended: 15, urgency: 'HIGH', velocity: '+45% vs last month' },
        { sku: 'DIA-RNG-017', name: 'Diamond Solitaire Ring', category: 'Diamond', currentStock: 1, recommended: 8, urgency: 'CRITICAL', velocity: '+80% wedding season' },
        { sku: 'GLD-NKL-001', name: 'Elegant Gold Necklace', category: 'Gold', currentStock: 3, recommended: 12, urgency: 'MEDIUM', velocity: '+25% standard demand' },
        { sku: 'SLV-BNG-032', name: 'Silver Bangles Set', category: 'Silver', currentStock: 5, recommended: 20, urgency: 'LOW', velocity: '+15% festive demand' },
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
                                <TrendingUp size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold leading-tight">AI Smart Restock & Demand Predictor</h2>
                                <p className="text-xs text-gold-100 font-light">Predictive inventory replenishment for franchise branches</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="input-field text-xs max-w-xs"
                            >
                                <option value="Branch #101 - Mumbai Central">Branch #101 - Mumbai Central</option>
                                <option value="Branch #102 - Bangalore South">Branch #102 - Bangalore South</option>
                                <option value="Branch #103 - Delhi Metro">Branch #103 - Delhi Metro</option>
                            </select>
                            <span className="text-xs font-bold text-gold-600 flex items-center gap-1 bg-gold-50 px-3 py-1.5 rounded-full border border-gold-200">
                                <Sparkles size={14} /> AI Forecast Model Active
                            </span>
                        </div>

                        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                            {predictions.map((pred) => (
                                <div key={pred.sku} className="bg-ivory-50 border border-gold-200/70 p-4 rounded-2xl flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${pred.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' :
                                                    pred.urgency === 'HIGH' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                                        'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                }`}>
                                                {pred.urgency} RISK
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">{pred.sku}</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900">{pred.name}</h4>
                                        <p className="text-xs text-gray-500">Sales velocity: <span className="font-semibold text-gray-800">{pred.velocity}</span></p>
                                    </div>

                                    <div className="text-right space-y-1">
                                        <div className="text-xs text-gray-500">
                                            Current: <span className="font-bold text-red-600">{pred.currentStock} units</span>
                                        </div>
                                        <div className="text-xs font-bold text-gold-700">
                                            Suggested Restock: +{pred.recommended} units
                                        </div>
                                        <button className="px-3 py-1 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm">
                                            Auto-Order Stock
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={onClose} className="w-full btn-secondary py-3 text-sm font-bold">
                            Close Predictor
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AiSmartRestockPredictor;
