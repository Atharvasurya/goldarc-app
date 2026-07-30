import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';
import { Upload, FileCode, CheckCircle, AlertCircle } from 'lucide-react';

const BulkUpload = () => {
    const { refreshProducts } = useProducts();
    const [jsonInput, setJsonInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleBulkUpload = async () => {
        if (!jsonInput.trim()) {
            toast.error('Please paste product JSON data');
            return;
        }

        try {
            setIsUploading(true);
            const products = JSON.parse(jsonInput);

            if (!Array.isArray(products)) {
                throw new Error('Input must be an array of products');
            }

            await apiService.bulkUploadProducts(products);
            toast.success(`${products.length} products uploaded successfully!`);
            setJsonInput('');
            refreshProducts();
        } catch (err) {
            toast.error('Invalid JSON format or upload failed: ' + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Bulk Upload Products</h1>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
                    <div className="flex items-center gap-4 mb-6 text-gold-600">
                        <FileCode size={32} />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">JSON Upload</h2>
                            <p className="text-sm text-gray-600">Paste an array of product objects to import them in bulk</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="bg-gray-900 rounded-lg p-4 mb-4">
                            <p className="text-xs text-blue-400 mb-2">// Format Example:</p>
                            <code className="text-xs text-gray-300 block leading-relaxed">
                                [
                                {`{ "sku": "GLD-001", "name": "Classic Gold Ring", "category": "Gold", "price": 45000, "stock": 10 }`}
                                ]
                            </code>
                        </div>

                        <textarea
                            className="w-full h-64 border border-gray-300 rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-gold-500 outline-none"
                            placeholder='[ { "sku": "...", "name": "...", ... } ]'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        onClick={handleBulkUpload}
                        disabled={isUploading}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isUploading ? 'bg-gray-400' : 'bg-gold-600 hover:bg-gold-700 active:scale-95'}`}
                    >
                        {isUploading ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <Upload size={20} />
                                Start Bulk Import
                            </>
                        )}
                    </button>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3">
                        <AlertCircle className="text-blue-600 shrink-0" size={20} />
                        <p className="text-xs text-blue-800 leading-relaxed">
                            <strong>Note:</strong> Bulk upload will not overwrite existing products if the SKU is the same (depending on backend logic), but here it will simply insert new records. Ensure your data follows the model schema (SKU, name, category, price, stock, weight, purity, description, image).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkUpload;
