import React from 'react';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../data/products';

const BranchCatalogue = () => {
    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Product Catalogue</h1>
                    <p className="text-lg text-gray-600">Browse and order from our complete collection</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BranchCatalogue;
