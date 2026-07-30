import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, FileText, CheckCircle, X, RefreshCw } from 'lucide-react';

const AiBulkCataloguer = ({ isOpen, onClose }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedItems, setExtractedItems] = useState([]);

    const handleUpload = (e) => {
        if (e.target.files.length > 0) {
            setIsProcessing(true);
            setTimeout(() => {
                setExtractedItems([
                    { sku: 'GLD-AI-099', name: 'Royal Heritage Temple Necklace', category: 'Gold', purity: '22K', weight: '34.2g', making: '12%', status: 'Parsed & Tagged' },
                    { sku: 'DIA-AI-100', name: 'Floral Solitaire Diamond Earrings', category: 'Diamond', purity: '18K + VVS', weight: '8.4g', making: '15%', status: 'Parsed & Tagged' },
                    { sku: 'SLV-AI-101', name: 'Antique Oxidized Silver Choker', category: 'Silver', purity: '925 Silver', weight: '52.0g', making: '8%', status: 'Parsed & Tagged' },
                ]);
                setIsProcessing(false);
            }, 1600);
        }
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
                                <Sparkles size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold leading-tight">AI Automated Bulk Cataloguer</h2>
                                <p className="text-xs text-gold-100 font-light">Auto-extract purity, weight & descriptions from supplier photos</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        {extractedItems.length === 0 ? (
                            <div className="border-2 border-dashed border-gold-300 rounded-3xl p-8 text-center bg-gold-50/30 hover:bg-gold-50/70 transition-all relative">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                                <div className="w-14 h-14 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Upload size={28} />
                                </div>
                                <h3 className="font-serif font-bold text-gray-900 text-base mb-1">Upload Supplier Batch Files</h3>
                                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
                                    Drop supplier invoices, CSVs, or batch jewellery photos for AI extraction
                                </p>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-500 text-white rounded-full text-xs font-bold shadow-md">
                                    {isProcessing ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                    <span>{isProcessing ? 'AI Extracting Metadata...' : 'Run Auto-Tagging Engine'}</span>
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Extracted Metadata ({extractedItems.length} Products)</h4>
                                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                        <CheckCircle size={14} /> Ready to Push to Catalogue
                                    </span>
                                </div>

                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {extractedItems.map((item) => (
                                        <div key={item.sku} className="bg-ivory-50 border border-gold-200 p-3 rounded-xl flex items-center justify-between text-xs">
                                            <div>
                                                <div className="font-bold text-gray-900">{item.name}</div>
                                                <div className="text-gray-500">{item.sku} • {item.category} • {item.purity}</div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-gold-700">{item.weight}</span>
                                                <div className="text-[10px] text-green-600 font-medium">{item.status}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={onClose} className="w-full btn-primary py-3 text-sm font-bold shadow-md">
                                    Commit Batch to Live Inventory
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AiBulkCataloguer;
