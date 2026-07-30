import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const BranchCart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const { createOrder } = useOrders();
    const { updateStock } = useProducts();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        // Check stock for all items
        for (const item of cartItems) {
            if (item.stock < item.quantity) {
                toast.error(`Not enough stock for ${item.name}. Available: ${item.stock}`);
                return;
            }
        }

        try {
            const order = await createOrder({
                branchId: user.id || 'delhi', // Fallback for safety
                branchName: user.name || 'Delhi Branch',
                items: cartItems,
                total: getCartTotal() * 1.18, // Total including tax
            });

            // Deduct stock
            cartItems.forEach(item => {
                updateStock(item.id, item.quantity);
            });

            clearCart();
            // toast.success is already handled inside createOrder in OrderContext
            navigate('/franchise/orders');
        } catch (err) {
            console.error('Order placement failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-lg text-gray-600">{cartItems.length} items in your cart</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.sku}</p>
                                            <p className="text-xl font-bold text-gold-600 mt-2">
                                                {formatCurrency(item.price)}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(getCartTotal())}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (18%)</span>
                                        <span>{formatCurrency(getCartTotal() * 0.18)}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span className="text-gold-600">{formatCurrency(getCartTotal() * 1.18)}</span>
                                    </div>
                                </div>

                                <button onClick={handlePlaceOrder} className="btn-primary w-full mb-3">
                                    Place Order
                                </button>
                                <button onClick={clearCart} className="btn-outline w-full">
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                        <p className="text-gray-500 mb-6">Add products to your cart to place an order</p>
                        <a href="/franchise/catalogue" className="btn-primary">
                            Browse Catalogue
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BranchCart;
