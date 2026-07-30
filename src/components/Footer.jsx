import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xl">G</span>
                            </div>
                            <span className="text-2xl font-serif font-bold text-gold-400">GoldArc</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Crafting timeless elegance since 1990. Your trusted partner in luxury jewellery.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm hover:text-gold-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/collection" className="text-sm hover:text-gold-400 transition-colors">
                                    Collection
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm hover:text-gold-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm hover:text-gold-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Franchise */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">For Franchise</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/franchise/login" className="text-sm hover:text-gold-400 transition-colors">
                                    Franchise Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/login" className="text-sm hover:text-gold-400 transition-colors">
                                    Admin Login
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gold-400 transition-colors">
                                    Become a Partner
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gold-400 transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                                <MapPin size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                                <span className="text-sm">123 Jewellery Street, Mumbai, India</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone size={18} className="text-gold-400 flex-shrink-0" />
                                <span className="text-sm">+91 1234567890</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail size={18} className="text-gold-400 flex-shrink-0" />
                                <span className="text-sm">info@goldarc.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} GoldArc. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
