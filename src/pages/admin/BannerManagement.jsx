import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { Plus, Trash2, X, Image as ImageIcon, Link as LinkIcon, CheckCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const BannerManagement = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: '',
        link: '',
        active: true
    });

    const fetchBanners = async () => {
        try {
            const data = await apiService.getBanners();
            setBanners(data);
            setIsLoading(false);
        } catch (err) {
            console.error('Failed to fetch banners:', err);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService.createBanner(formData);
            toast.success('Banner added successfully');
            setIsModalOpen(false);
            fetchBanners();
            setFormData({ title: '', subtitle: '', image: '', link: '', active: true });
        } catch (err) {
            toast.error('Failed to add banner');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this banner?')) {
            try {
                await apiService.deleteBanner(id);
                toast.success('Banner removed');
                fetchBanners();
            } catch (err) {
                toast.error('Failed to delete');
            }
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading Banners...</div>;

    return (
        <div className="min-h-screen bg-ivory-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900">Banner Management</h1>
                    <button onClick={() => setIsModalOpen(true)} className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-bold transition-all">
                        <Plus size={20} /> Add Hero Banner
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {banners.map((banner) => (
                        <div key={banner._id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group">
                            <div className="relative h-48 sm:h-64">
                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDelete(banner._id)} className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 shadow-xl">
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                                {!banner.active && (
                                    <div className="absolute top-4 left-4 bg-gray-900 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                                        Inactive
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{banner.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{banner.subtitle}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <LinkIcon size={14} /> {banner.link || 'Internal'}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye size={14} /> Publicly Visible
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="bg-gold-600 p-4 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold">Design New Banner</h2>
                            <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Banner Title</label>
                                <input type="text" required className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 outline-none" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Subtitle / Promo Text</label>
                                <input type="text" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 outline-none" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                                <input type="text" required className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 outline-none" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Target Link (Optional)</label>
                                <input type="text" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-gold-500 outline-none" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4 text-gold-600" />
                                <label className="text-sm font-medium text-gray-700">Set as Active</label>
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600">Cancel</button>
                                <button type="submit" className="px-8 py-2 bg-gold-600 text-white rounded-lg font-bold shadow-lg shadow-gold-100 transition-all hover:bg-gold-700">Publish Banner</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerManagement;
