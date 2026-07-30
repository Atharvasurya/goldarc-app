import React, { useState } from 'react';
import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';
import { BANNERS } from '../../data/banners';
import { PRODUCTS } from '../../data/products';
import { Sparkles, Award, Shield } from 'lucide-react';
import ProductDetailModal from '../../components/ProductDetailModal';
import GoldarcWorld from '../../components/GoldarcWorld';
import Promotions from '../../components/Promotions';
import SectionDivider from '../../components/SectionDivider';
import BackgroundOrnaments from '../../components/BackgroundOrnaments';
import { motion } from 'framer-motion';

const Home = () => {
    const [visibleProducts, setVisibleProducts] = useState(25);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewMore = () => {
        setVisibleProducts(50);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Carousel */}
            <section>
                <Carousel items={BANNERS} />
            </section>

            {/* Features */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="py-16 bg-ivory-100/50 backdrop-blur-sm relative"
            >
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-200/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                                <Sparkles className="text-gold-600" size={32} />
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-2">Exquisite Craftsmanship</h3>
                            <p className="text-gray-600">
                                Each piece is meticulously crafted by master artisans with decades of experience
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                                <Award className="text-gold-600" size={32} />
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-2">Certified Quality</h3>
                            <p className="text-gray-600">
                                All our jewellery comes with proper certification and quality assurance
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                                <Shield className="text-gold-600" size={32} />
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-2">Trusted Since 1990</h3>
                            <p className="text-gray-600">
                                Over three decades of excellence in jewellery manufacturing and retail
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            <SectionDivider />

            {/* Goldarc World Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
            >
                <GoldarcWorld />
            </motion.div>

            <SectionDivider />

            {/* Product Catalogue */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="py-16 relative overflow-hidden"
            >
                <BackgroundOrnaments />

                {/* Decorative background shape */}
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-100/20 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                            Our Exquisite Collection
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover timeless elegance with our curated selection of fine jewellery
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRODUCTS.slice(0, visibleProducts).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={handleProductClick}
                            />
                        ))}
                    </div>

                    {visibleProducts < PRODUCTS.length && (
                        <div className="text-center mt-12">
                            <button onClick={handleViewMore} className="btn-primary">
                                View More ({PRODUCTS.length - visibleProducts} more items)
                            </button>
                        </div>
                    )}
                </div>
            </motion.section>

            <SectionDivider />

            {/* Promotions Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <Promotions />
            </motion.div>

            <SectionDivider />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-serif font-bold mb-4">
                        Become a GoldArc Franchise Partner
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join our network of successful franchise partners and grow your business with us
                    </p>
                    <a href="/contact" className="inline-block bg-white text-gold-600 px-8 py-3 rounded-lg font-semibold hover:bg-ivory-50 transition-colors">
                        Get in Touch
                    </a>
                </div>
            </section>

            <ProductDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Home;
