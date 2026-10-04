import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Copyright } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img 
                                src="/finallogo.png" 
                                alt="GoldArc Logo" 
                                className="w-10 h-10 object-contain drop-shadow" 
                            />
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
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Highlighted Copyright Notice */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gold-950/70 border border-gold-500/40 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300 hover:border-gold-400">
                        <Copyright size={17} className="text-gold-400 shrink-0 animate-pulse" />
                        <span className="text-xs sm:text-sm font-medium tracking-wide">
                            All rights reserved to <span className="text-white font-semibold underline decoration-gold-400/50 underline-offset-2">Atharva Ravindra Suryawanshi</span> copyrighted content
                        </span>
                    </div>
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
