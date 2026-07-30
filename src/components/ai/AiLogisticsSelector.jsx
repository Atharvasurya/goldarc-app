import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const AiLogisticsSelector = ({ isOpen, onClose }) => {
    const [shipmentValuation, setShipmentValuation] = useState(250000);
    const [pincode, setPincode] = useState('400002');

    const partners = [
        { name: 'Sequel Logistics', type: 'Specialized Armored Transport', rating: '99.9% High-Value SLA', transit: '24-36 Hours', insurance: 'Full Transit Cover up to ₹50L', cost: 1850, recommended: true },
        { name: 'BVC Logistics', type: 'Vault-to-Vault Secure Courier', rating: '99.4% Security SLA', transit: '48 Hours', insurance: 'Insured Cover up to ₹25L', cost: 1420, recommended: false },
        { name: 'Blue Dart Armored', type: 'Express Secure Cargo', rating: '98.8% Speed SLA', transit: '24 Hours', insurance: 'Standard Cover up to ₹5L', cost: 950, recommended: false }
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
                                <Truck size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold leading-tight">AI Smart Logistics Partner Selector</h2>
                                <p className="text-xs text-gold-100 font-light">Automated insured courier selection based on valuation & SLA</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Declared Shipment Valuation</label>
                                <input
                                    type="number"
                                    value={shipmentValuation}
                                    onChange={(e) => setShipmentValuation(Number(e.target.value))}
                                    className="input-field text-xs font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Destination Pincode</label>
                                <input
                                    type="text"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    className="input-field text-xs font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">AI Courier Evaluation</h4>
                            {partners.map((partner, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-2xl border transition-all ${partner.recommended
                                            ? 'bg-gradient-to-r from-gold-50/80 to-white border-gold-400 shadow-md ring-1 ring-gold-400'
                                            : 'bg-ivory-50 border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-gray-900 text-sm">{partner.name}</h5>
                                            {partner.recommended && (
                                                <span className="px-2 py-0.5 bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                    <Sparkles size={10} /> AI Top Recommendation
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-gold-700">{formatCurrency(partner.cost)}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">{partner.type} • {partner.rating}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                                        <span className="flex items-center gap-1 text-green-700 font-medium">
                                            <ShieldCheck size={14} /> {partner.insurance}
                                        </span>
                                        <button className="px-3 py-1 bg-gold-600 hover:bg-gold-700 text-white rounded-lg text-xs font-bold shadow-xs">
                                            Dispatch via {partner.name.split(' ')[0]}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={onClose} className="w-full btn-secondary py-3 text-sm font-bold">
                            Close Selector
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AiLogisticsSelector;
