import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { USER_ROLES } from '../utils/constants';
import { formatCurrency, getAvailabilityColor } from '../utils/helpers';

const ProductCard = ({ product, onClick }) => {
    const { user } = useAuth();
    const { addToCart, isInCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const canSeePrices = user?.role === USER_ROLES.FRANCHISE_BRANCH ||
        user?.role === USER_ROLES.ADMIN;

    const canAddToCart = user?.role === USER_ROLES.FRANCHISE_BRANCH;

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div
            className="card group cursor-pointer"
            onClick={() => onClick && onClick(product)}
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Availability Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`badge ${getAvailabilityColor(product.availability)}`}>
                        {product.availability}
                    </span>
                </div>

                {/* Wishlist Button */}
                {canAddToCart && (
                    <button
                        onClick={handleToggleWishlist}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gold-50 transition-colors"
                        aria-label="Add to wishlist"
                    >
                        <Heart
                            size={18}
                            className={isInWishlist(product.id) ? 'fill-gold-500 text-gold-500' : 'text-gray-600'}
                        />
                    </button>
                )}

                {/* Quick Actions */}
                {canAddToCart && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={handleAddToCart}
                            disabled={isInCart(product.id)}
                            className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${isInCart(product.id)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gold-500 hover:bg-gold-600'
                                } text-white`}
                        >
                            <ShoppingCart size={18} />
                            <span className="font-medium">
                                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                            </span>
                        </button>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                    <div>
                        {canSeePrices ? (
                            <p className="text-xl font-bold text-gold-600">{formatCurrency(product.price)}</p>
                        ) : (
                            <p className="text-sm text-gray-500 italic">Login to view price</p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                        {canSeePrices && (
                            <p className="text-xs text-gray-500">{product.weight}g • {product.purity}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
