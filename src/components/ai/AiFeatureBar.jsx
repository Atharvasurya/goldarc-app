import React, { useState } from 'react';
import { Sparkles, Camera, TrendingUp, Cpu, Upload, Hammer, Truck, MessageCircle } from 'lucide-react';
import AiStylistModal from './AiStylistModal';
import AiVisualSearchModal from './AiVisualSearchModal';
import AiMetalRateCalculator from './AiMetalRateCalculator';
import AiSmartRestockPredictor from './AiSmartRestockPredictor';
import AiBulkCataloguer from './AiBulkCataloguer';
import AiArtisanAllocator from './AiArtisanAllocator';
import AiLogisticsSelector from './AiLogisticsSelector';

const AiFeatureBar = () => {
    const [activeModal, setActiveModal] = useState(null);

    const features = [
        { id: 'stylist', title: 'AI Stylist & Gift Finder', icon: Sparkles, color: 'bg-gold-500 text-white' },
        { id: 'snap', title: 'AI Snap & Find', icon: Camera, color: 'bg-amber-600 text-white' },
        { id: 'rate', title: 'AI Live Rate Estimator', icon: TrendingUp, color: 'bg-yellow-600 text-white' },
        { id: 'restock', title: 'AI Demand Predictor', icon: Cpu, color: 'bg-purple-600 text-white' },
        { id: 'bulk', title: 'AI Bulk Cataloguer', icon: Upload, color: 'bg-indigo-600 text-white' },
        { id: 'artisan', title: 'AI Workshop Allocator', icon: Hammer, color: 'bg-emerald-600 text-white' },
        { id: 'logistics', title: 'AI Smart Logistics', icon: Truck, color: 'bg-blue-600 text-white' },
    ];

    return (
        <>
            <section className="py-6 bg-gradient-to-r from-gold-900 via-gray-900 to-gold-900 text-white shadow-xl border-y border-gold-400/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-gold-300 animate-spin" style={{ animationDuration: '6s' }} />
                            <h3 className="font-serif font-bold text-sm sm:text-base text-gold-200 tracking-wide uppercase">
                                GoldArc AI Suite
                            </h3>
                        </div>
                        <span className="text-[11px] text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                            8 Realtime AI Engines Active
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                        {features.map((feat) => {
                            const IconComponent = feat.icon;
                            return (
                                <button
                                    key={feat.id}
                                    onClick={() => setActiveModal(feat.id)}
                                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white/10 hover:bg-gold-500/30 border border-gold-300/30 text-gold-100 hover:text-white transition-all shadow-sm hover:scale-105"
                                >
                                    <IconComponent size={15} className="text-gold-300" />
                                    <span>{feat.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Modals */}
            <AiStylistModal isOpen={activeModal === 'stylist'} onClose={() => setActiveModal(null)} />
            <AiVisualSearchModal isOpen={activeModal === 'snap'} onClose={() => setActiveModal(null)} />
            <AiMetalRateCalculator isOpen={activeModal === 'rate'} onClose={() => setActiveModal(null)} />
            <AiSmartRestockPredictor isOpen={activeModal === 'restock'} onClose={() => setActiveModal(null)} />
            <AiBulkCataloguer isOpen={activeModal === 'bulk'} onClose={() => setActiveModal(null)} />
            <AiArtisanAllocator isOpen={activeModal === 'artisan'} onClose={() => setActiveModal(null)} />
            <AiLogisticsSelector isOpen={activeModal === 'logistics'} onClose={() => setActiveModal(null)} />
        </>
    );
};

export default AiFeatureBar;
