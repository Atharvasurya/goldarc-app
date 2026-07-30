import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { PRODUCT_CATEGORIES, AVAILABILITY_STATUS } from '../../utils/constants';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const ProductManagement = () => {
    const { products, isLoading, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        category: Object.values(PRODUCT_CATEGORIES)[0],
        price: '',
        stock: '',
        weight: '',
        purity: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
        availability: AVAILABILITY_STATUS.IN_STOCK
    });

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product });
        } else {
            setEditingProduct(null);
            setFormData({
                sku: 'GLD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                name: '',
                category: Object.values(PRODUCT_CATEGORIES)[0],
                price: '',
                stock: '',
                weight: '',
                purity: '',
                description: '',
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
                availability: AVAILABILITY_STATUS.IN_STOCK
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            weight: Number(formData.weight),
            makingCharges: Number(formData.price) * 0.1 // Default 10% making charges
        };

        if (editingProduct) {
            await updateProduct(editingProduct.id, finalData);
        } else {
            await addProduct(finalData);
        }
        handleCloseModal();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Inventory...</div>;
    }

    return (
        <div className="min-h-screen bg-ivory-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900">Product Management</h1>
                        <p className="text-gray-600 mt-2">Manage your luxury inventory and stock levels</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-bold transition-all transform hover:scale-105"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-ivory-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                                                    <img className="h-full w-full object-cover" src={product.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                                    <div className="text-xs text-gray-500">{product.purity}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                            {product.sku}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-ivory-100 text-gold-800 border border-gold-200">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            ₹{product.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-sm font-bold ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                                                {product.stock} units
                                            </div>
                                            <div className="text-[10px] text-gray-400 capitalize">{product.availability}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => handleOpenModal(product)}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleCloseModal}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-blur-sm"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <div className="bg-gold-600 px-6 py-4 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold text-white">
                                    {editingProduct ? 'Edit Product' : 'Add New Luxury Piece'}
                                </h3>
                                <button onClick={handleCloseModal} className="text-white hover:rotate-90 transition-transform">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                                        <input
                                            type="text" required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">SKU (Auto-generated)</label>
                                        <input
                                            type="text" required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 font-mono text-sm"
                                            value={formData.sku}
                                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {Object.values(PRODUCT_CATEGORIES).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                                        <input
                                            type="number" required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                                        <input
                                            type="number" required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Weight (g)</label>
                                        <input
                                            type="number" step="0.01" required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none"
                                            value={formData.weight}
                                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Purity/Details</label>
                                        <input
                                            type="text" placeholder="e.g. 22K, 18K + Diamond"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none"
                                            value={formData.purity}
                                            onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none text-xs"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            />
                                            <div className="h-10 w-10 rounded border border-gray-300 overflow-hidden bg-gray-50">
                                                <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                        <textarea
                                            rows="3"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2 rounded-lg bg-gold-600 text-white hover:bg-gold-700 font-bold shadow-lg shadow-gold-200"
                                    >
                                        {editingProduct ? 'Update Product' : 'Save Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
