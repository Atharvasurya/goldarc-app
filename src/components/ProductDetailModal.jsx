import React from 'react';
import { ShoppingCart, X, Info } from 'lucide-react';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { USER_ROLES } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
    const { user } = useAuth();
    const { addToCart, isInCart } = useCart();

    if (!product) return null;

    const canSeePrices = user?.role === USER_ROLES.FRANCHISE_BRANCH ||
        user?.role === USER_ROLES.ADMIN;

    const canAddToCart = user?.role === USER_ROLES.FRANCHISE_BRANCH;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={product.name} size="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <div className="mb-4">
                        <span className="px-3 py-1 bg-ivory-100 text-gold-800 text-xs font-bold rounded-full uppercase tracking-widest border border-gold-200">
                            {product.category}
                        </span>
                        <h3 className="text-3xl font-serif font-bold text-gray-900 mt-2">{product.name}</h3>
                        <p className="text-sm text-gray-500 font-mono mt-1">SKU: {product.sku}</p>
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-6">
                        <p>{product.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {canSeePrices ? (
                            <>
                                <div className="flex items-center justify-between p-4 bg-ivory-50 rounded-xl border border-gold-100">
                                    <span className="text-gray-600 font-medium">Price</span>
                                    <span className="text-2xl font-bold text-gold-600">{formatCurrency(product.price)}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-bold">Weight</p>
                                        <p className="text-lg font-semibold text-gray-900">{product.weight}g</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-bold">Purity</p>
                                        <p className="text-lg font-semibold text-gray-900">{product.purity}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                                <Info className="text-blue-500 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-blue-800">Exclusive Pricing</p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Please login as a Franchise or Admin to view wholesale pricing and product specifications.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {canAddToCart && (
                        <div className="mt-auto">
                            <button
                                onClick={() => {
                                    addToCart(product);
                                    onClose();
                                }}
                                disabled={isInCart(product.id)}
                                className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 ${isInCart(product.id)
                                    ? 'bg-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-gold-600 hover:bg-gold-700 text-white'
                                    }`}
                            >
                                <ShoppingCart size={20} />
                                <span className="font-bold text-lg">
                                    {isInCart(product.id) ? 'Already in Cart' : 'Add to Purchase Order'}
                                </span>
                            </button>
                        </div>
                    )}

                    {!user && (
                        <div className="mt-auto border-t border-gray-100 pt-6">
                            <p className="text-center text-gray-500 text-sm italic">
                                Interested in this piece? <br /> Contact our representative for more details.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailModal;
