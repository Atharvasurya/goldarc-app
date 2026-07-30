import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../data/products';
import { PRODUCT_CATEGORIES } from '../../utils/constants';
import { Search, Filter } from 'lucide-react';
import ProductDetailModal from '../../components/ProductDetailModal';

const Collection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedAvailability, setSelectedAvailability] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesAvailability = selectedAvailability === 'All' || product.availability === selectedAvailability;

        return matchesSearch && matchesCategory && matchesAvailability;
    });

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Our Collection</h1>
                    <p className="text-lg text-gray-600">Browse our complete range of exquisite jewellery</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input-field"
                            >
                                <option value="All">All Categories</option>
                                {Object.values(PRODUCT_CATEGORIES).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Availability Filter */}
                        <div>
                            <select
                                value={selectedAvailability}
                                onChange={(e) => setSelectedAvailability(e.target.value)}
                                className="input-field"
                            >
                                <option value="All">All Availability</option>
                                <option value="In Stock">In Stock</option>
                                <option value="Limited">Limited</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
                        <span className="font-semibold">{PRODUCTS.length}</span> products
                    </p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={handleProductClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Filter className="mx-auto text-gray-400 mb-4" size={48} />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>

            <ProductDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Collection;
