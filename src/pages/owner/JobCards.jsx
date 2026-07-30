import React, { useState } from 'react';
import { useJobCards } from '../../context/JobCardContext';
import { Plus, Edit2, Trash2, X, Phone, User, Clock, CheckCircle, Package } from 'lucide-react';
import { formatDateTime } from '../../utils/helpers';

const JobCards = () => {
    const { jobCards, isLoading, addJobCard, updateJobCard, deleteJobCard } = useJobCards();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        productDescription: '',
        serviceType: 'Repair',
        status: 'Received',
        cost: 0,
        expectedDate: ''
    });

    const handleOpenModal = (job = null) => {
        if (job) {
            setEditingJob(job);
            setFormData({
                ...job,
                expectedDate: job.expectedDate ? new Date(job.expectedDate).toISOString().split('T')[0] : ''
            });
        } else {
            setEditingJob(null);
            setFormData({
                customerName: '',
                customerPhone: '',
                productDescription: '',
                serviceType: 'Repair',
                status: 'Received',
                cost: 0,
                expectedDate: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingJob) {
            await updateJobCard(editingJob.id, formData);
        } else {
            await addJobCard(formData);
        }
        handleCloseModal();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Received': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Ready': return 'bg-green-100 text-green-800';
            case 'Delivered': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading Job Cards...</div>;

    return (
        <div className="min-h-screen bg-ivory-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900">Job Cards</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-bold transition-all"
                    >
                        <Plus size={20} /> New Job Card
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobCards.map((job) => (
                        <div key={job.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <User size={16} className="text-gold-600" /> {job.customerName}
                                    </h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Phone size={14} /> {job.customerPhone}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(job.status)}`}>
                                    {job.status}
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{job.productDescription}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                                <div>
                                    <p className="text-gray-500">Service Type</p>
                                    <p className="font-bold text-gray-900">{job.serviceType}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Estimated Cost</p>
                                    <p className="font-bold text-gold-600">₹{job.cost.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Expected Date</p>
                                    <p className="font-bold text-gray-900">{job.expectedDate ? new Date(job.expectedDate).toLocaleDateString() : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Last Updated</p>
                                    <p className="font-bold text-gray-900">{formatDateTime(job.updatedAt)}</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 border-t pt-4">
                                <button onClick={() => handleOpenModal(job)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => deleteJobCard(job.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="bg-gold-600 p-4 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingJob ? 'Edit Job Card' : 'New Job Card'}</h2>
                            <button onClick={handleCloseModal}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700">Customer Name</label>
                                    <input type="text" required className="w-full border rounded-lg p-2" value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Phone</label>
                                    <input type="text" required className="w-full border rounded-lg p-2" value={formData.customerPhone} onChange={e => setFormData({ ...formData, customerPhone: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Cost (₹)</label>
                                    <input type="number" required className="w-full border rounded-lg p-2" value={formData.cost} onChange={e => setFormData({ ...formData, cost: Number(e.target.value) })} />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700">Product Description</label>
                                    <textarea required className="w-full border rounded-lg p-2" rows="3" value={formData.productDescription} onChange={e => setFormData({ ...formData, productDescription: e.target.value })}></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Service Type</label>
                                    <select className="w-full border rounded-lg p-2" value={formData.serviceType} onChange={e => setFormData({ ...formData, serviceType: e.target.value })}>
                                        <option>Repair</option>
                                        <option>Custom Design</option>
                                        <option>Polishing</option>
                                        <option>Sizing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Status</label>
                                    <select className="w-full border rounded-lg p-2" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                        <option>Received</option>
                                        <option>In Progress</option>
                                        <option>Ready</option>
                                        <option>Delivered</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700">Expected Date</label>
                                    <input type="date" className="w-full border rounded-lg p-2" value={formData.expectedDate} onChange={e => setFormData({ ...formData, expectedDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 border rounded-lg font-bold">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-gold-600 text-white rounded-lg font-bold">Save Job Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobCards;
