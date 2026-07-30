import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const BranchWishlist = () => {
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart`);
    };

    const handleRemove = (productId) => {
        removeFromWishlist(productId);
        toast.success('Removed from wishlist');
    };

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-lg text-gray-600">{wishlistItems.length} items saved</p>
                    </div>
                    {wishlistItems.length > 0 && (
                        <button onClick={clearWishlist} className="btn-outline">
                            Clear Wishlist
                        </button>
                    )}
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <div key={product.id} className="card">
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                                    <p className="text-xl font-bold text-gold-600 mb-4">{formatCurrency(product.price)}</p>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex-1 btn-primary text-sm flex items-center justify-center space-x-1"
                                        >
                                            <ShoppingCart size={16} />
                                            <span>Add to Cart</span>
                                        </button>
                                        <button
                                            onClick={() => handleRemove(product.id)}
                                            className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Heart className="mx-auto text-gray-400 mb-4" size={64} />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-500 mb-6">Start adding products you love!</p>
                        <a href="/franchise/catalogue" className="btn-primary">
                            Browse Catalogue
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BranchWishlist;
