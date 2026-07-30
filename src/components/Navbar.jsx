import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, LogOut, User, Bell, Package, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotifications } from '../context/NotificationContext';
import { USER_ROLES } from '../utils/constants';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const { getCartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { unreadCount } = useNotifications();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getDashboardLink = () => {
        if (!user) return '/';
        switch (user.role) {
            case USER_ROLES.ADMIN:
                return '/admin/dashboard';
            case USER_ROLES.FRANCHISE_BRANCH:
                return '/franchise/dashboard';
            default:
                return '/';
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">G</span>
                        </div>
                        <span className="text-2xl font-serif font-bold text-gradient">GoldArc</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                            Home
                        </Link>
                        <Link to="/collection" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                            Collection
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-gold-600 transition-colors font-medium">
                            Contact
                        </Link>
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-gold-500 to-gold-700 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm animate-pulse">
                            ✨ AI Powered
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 text-gray-700 hover:text-gold-600 transition-colors"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        {/* Notifications */}
                        {isAuthenticated() && (
                            <Link
                                to="/notifications"
                                className="p-2 text-gray-700 hover:text-gold-600 transition-colors relative"
                                aria-label="Notifications"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Wishlist - Only for franchise users */}
                        {user?.role === USER_ROLES.FRANCHISE_BRANCH && (
                            <Link
                                to="/franchise/wishlist"
                                className="p-2 text-gray-700 hover:text-gold-600 transition-colors relative"
                                aria-label="Wishlist"
                            >
                                <Heart size={20} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Cart - Only for franchise users */}
                        {user?.role === USER_ROLES.FRANCHISE_BRANCH && (
                            <Link
                                to="/franchise/cart"
                                className="p-2 text-gray-700 hover:text-gold-600 transition-colors relative"
                                aria-label="Cart"
                            >
                                <ShoppingCart size={20} />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {getCartCount()}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* User Menu */}
                        {isAuthenticated() ? (
                            <div className="flex items-center space-x-2">
                                {user?.role === USER_ROLES.FRANCHISE_BRANCH ? (
                                    <>
                                        <Link
                                            to="/franchise/stock"
                                            className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gold-600 transition-colors font-medium border-r border-gray-100 mr-2"
                                        >
                                            <Package size={18} />
                                            <span>Stock</span>
                                        </Link>
                                        <Link
                                            to="/franchise/logistics"
                                            className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gold-600 transition-colors font-medium mr-2"
                                        >
                                            <Truck size={18} />
                                            <span>Logistics</span>
                                        </Link>
                                    </>
                                ) : user?.role === USER_ROLES.ADMIN ? (
                                    <>
                                        <Link
                                            to="/admin/stock"
                                            className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gold-600 transition-colors font-medium border-r border-gray-100 mr-2"
                                        >
                                            <Package size={18} />
                                            <span>Global Stock</span>
                                        </Link>
                                        <Link
                                            to="/admin/logistics"
                                            className="hidden lg:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gold-600 transition-colors font-medium mr-2"
                                        >
                                            <Truck size={18} />
                                            <span>Logistics</span>
                                        </Link>
                                    </>
                                ) : null}
                                <Link
                                    to={getDashboardLink()}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
                                >
                                    <User size={18} />
                                    <span className="font-medium">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                                    aria-label="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/admin/login" className="btn-primary text-sm">
                                    Admin Portal
                                </Link>
                                <Link to="/franchise/login" className="btn-outline text-sm">
                                    Franchise Login
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700"
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Search Bar */}
                {searchOpen && (
                    <div className="py-4 animate-slide-up">
                        <input
                            type="text"
                            placeholder="Search jewellery..."
                            className="input-field"
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            to="/"
                            className="block text-gray-700 hover:text-gold-600 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/collection"
                            className="block text-gray-700 hover:text-gold-600 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Collection
                        </Link>
                        <Link
                            to="/about"
                            className="block text-gray-700 hover:text-gold-600 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="block text-gray-700 hover:text-gold-600 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        {isAuthenticated() ? (
                            <>
                                <Link
                                    to={getDashboardLink()}
                                    className="block btn-primary text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/notifications"
                                    className="block btn-outline text-center relative"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Notifications
                                    {unreadCount > 0 && (
                                        <span className="ml-2 bg-red-500 text-white text-[10px] rounded-full px-2 py-0.5 inline-block">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Link>
                                <button onClick={handleLogout} className="w-full btn-secondary text-center">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/admin/login"
                                    className="block btn-outline text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Admin Login
                                </Link>
                                <Link
                                    to="/franchise/login"
                                    className="block btn-primary text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Franchise Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
