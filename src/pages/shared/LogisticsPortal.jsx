import React, { useState, useEffect } from 'react';
import { Truck, Phone, Globe, ExternalLink, Mail, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';

const LogisticsPortal = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await apiService.getLogisticsPartners();
        setPartners(data);
      } catch (err) {
        console.error('Failed to fetch logistics partners:', err);
        toast.error('Failed to load logistics information');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen bg-ivory-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
            <Truck className="text-gold-600" size={32} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Logistics & Partners</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Secure logistics for premium jewellery transport. Connect with our trusted delivery partners and track your shipments.
          </p>
        </div>

        {/* Logistics Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-12 w-12 bg-gray-100 rounded-2xl mb-6" />
                <div className="h-6 w-3/4 bg-gray-100 rounded-lg mb-4" />
                <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
              </div>
            ))
          ) : partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={80} className="text-gold-500" />
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-gold-50 text-gold-600 rounded-2xl group-hover:bg-gold-500 group-hover:text-white transition-colors">
                  <Truck size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                  <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">{partner.type}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600 hover:text-gold-600 transition-colors cursor-pointer">
                  <Phone size={18} className="mr-3 text-gold-500" />
                  <span className="font-medium">{partner.contact}</span>
                </div>
                <div className="flex items-center text-gray-600 hover:text-gold-600 transition-colors cursor-pointer">
                  <Globe size={18} className="mr-3 text-gold-500" />
                  <span className="font-medium">{partner.website.replace('https://www.', '')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-3 bg-gray-50 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Website
                </a>
                <button
                  onClick={() => window.location.href = `tel:${partner.contact.replace(/\s/g, '')}`}
                  className="flex items-center justify-center px-4 py-3 bg-gold-500 text-white rounded-xl font-bold text-sm hover:bg-gold-600 transition-colors shadow-lg shadow-gold-200"
                >
                  <Phone size={16} className="mr-2" />
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tracking Info */}
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Need Immediate Assistance?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                For any logistics-related queries, missing shipments, or damaged parcels, please contact our dedicated logistics coordinator at the Head Office.
              </p>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-ivory-50 rounded-2xl border border-gold-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-gold-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Support</p>
                    <p className="font-bold text-gray-900">logistics@goldarc.com</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-ivory-50 rounded-2xl border border-gold-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-gold-500">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">WhatsApp Express</p>
                    <p className="font-bold text-gray-900">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gold-500 to-gold-700 rounded-3xl p-8 text-white relative z-10 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <ShieldCheck size={32} />
                  <h3 className="text-xl font-bold uppercase tracking-wider">Security First</h3>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 shrink-0" />
                    <span>All shipments are 100% insured until point of delivery.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 shrink-0" />
                    <span>Tamper-evident packaging used for all jewellery orders.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 shrink-0" />
                    <span>OTP-based delivery validation for every branch shipment.</span>
                  </li>
                </ul>
                <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-sm font-medium">Global Coverage</span>
                  </div>
                  <div className="text-sm font-bold bg-white/20 px-4 py-1 rounded-full uppercase tracking-tighter">Verified</div>
                </div>
              </div>

              {/* Decorative background shape */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-200 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsPortal;
