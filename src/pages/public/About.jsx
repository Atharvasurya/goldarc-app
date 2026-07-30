import React from 'react';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-ivory-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">About GoldArc</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Crafting timeless elegance and building lasting relationships since 1990
                    </p>
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Our Story</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-4">
                            Founded in 1990, GoldArc has been at the forefront of fine jewellery manufacturing and retail
                            in India. What started as a small workshop in Mumbai has grown into a nationwide network of
                            franchise partners, each committed to delivering exceptional quality and service.
                        </p>
                        <p className="mb-4">
                            Our journey has been defined by our unwavering commitment to craftsmanship, authenticity, and
                            customer satisfaction. Every piece of jewellery that bears the GoldArc name is a testament to
                            our master artisans' skill and dedication.
                        </p>
                        <p>
                            Today, we proudly serve customers across India through our franchise network, offering a
                            curated collection of gold, diamond, silver, platinum, and gemstone jewellery that combines
                            traditional artistry with contemporary design.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                            <Award className="text-gold-600" size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">30+</h3>
                        <p className="text-gray-600">Years of Excellence</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                            <Users className="text-gold-600" size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
                        <p className="text-gray-600">Franchise Partners</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                            <Globe className="text-gold-600" size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
                        <p className="text-gray-600">Cities Covered</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                            <TrendingUp className="text-gold-600" size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">100K+</h3>
                        <p className="text-gray-600">Happy Customers</p>
                    </div>
                </div>

                {/* Values */}
                <div className="bg-gradient-to-r from-gold-500 to-gold-700 rounded-xl shadow-lg p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                            <p className="opacity-90">
                                We never compromise on quality. Every piece is crafted with precision and certified for
                                authenticity.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Customer Trust</h3>
                            <p className="opacity-90">
                                Building lasting relationships through transparency, honesty, and exceptional service.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                            <p className="opacity-90">
                                Blending traditional craftsmanship with modern design to create timeless pieces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
