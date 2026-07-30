import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { Package, ShoppingCart, Heart, TrendingUp, AlertTriangle, List } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import apiService from '../../services/apiService';

const BranchDashboard = () => {
    const { user } = useAuth();
    const { getOrdersByBranch, getPendingOrders } = useOrders();
    const { getCartTotal, getCartCount } = useCart();
    const [stock, setStock] = useState([]);
    const [isStockLoading, setIsStockLoading] = useState(true);

    const branchOrders = user ? getOrdersByBranch(user.id) : [];
    const pendingOrders = getPendingOrders().filter(order => order.branchId === user?.id);

    useEffect(() => {
        const fetchStock = async () => {
            if (!user) return;
            try {
                const response = await fetch(`http://localhost:5000/api/branch-stock/${user.id}`);
                const data = await response.json();
                setStock(data);
            } catch (err) {
                console.error('Failed to fetch stock:', err);
            } finally {
                setIsStockLoading(false);
            }
        };
        fetchStock();
    }, [user]);

    const lowStockItems = stock.filter(item => item.quantity <= item.lowStockThreshold);

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                        Welcome, {user?.name}
                    </h1>
                    <p className="text-lg text-gray-600">{user?.location}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Package className="text-blue-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{branchOrders.length}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-yellow-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{pendingOrders.length}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Pending Orders</h3>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="text-gold-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{getCartCount()}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Items in Cart</h3>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Heart className="text-green-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{formatCurrency(getCartTotal())}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Cart Value</h3>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Link to="/franchise/catalogue" className="card hover:shadow-xl transition-shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Catalogue</h3>
                        <p className="text-gray-600 mb-4">View and order from our complete product range</p>
                        <span className="text-gold-600 font-medium">View Products →</span>
                    </Link>

                    <Link to="/franchise/cart" className="card hover:shadow-xl transition-shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">My Cart</h3>
                        <p className="text-gray-600 mb-4">Review and place your stock orders</p>
                        <span className="text-gold-600 font-medium">Go to Cart →</span>
                    </Link>

                    <Link to="/franchise/orders" className="card hover:shadow-xl transition-shadow p-6 border-b-4 border-purple-500">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Orders</h3>
                        <p className="text-gray-600 mb-4">Monitor your order status and history</p>
                        <span className="text-gold-600 font-medium">View Orders →</span>
                    </Link>

                    <Link to="/franchise/stock" className="card hover:shadow-xl transition-shadow p-6 border-b-4 border-blue-500">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Stock Details</h3>
                        <p className="text-gray-600 mb-4">Manage inventory and view billing history</p>
                        <span className="text-gold-600 font-medium">Manage Stock →</span>
                    </Link>


                </div>

                {/* Low Stock Alerts Banner */}
                {lowStockItems.length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-8 animate-pulse shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <AlertTriangle className="text-red-600 mr-3" size={24} />
                                <div>
                                    <h3 className="text-red-800 font-bold">Low Stock Warning!</h3>
                                    <p className="text-red-700 text-sm">{lowStockItems.length} items are running low. Please review and restock.</p>
                                </div>
                            </div>
                            <Link to="/franchise/stock" className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors">
                                Review Stock
                            </Link>
                        </div>
                    </div>
                )}

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Recent Orders</h2>
                    {branchOrders.length > 0 ? (
                        <div className="space-y-4">
                            {branchOrders.slice(0, 5).map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                                        <span className={`badge ${order.status === 'delivered' ? 'badge-success' : 'badge-info'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No orders yet. Start browsing our catalogue!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BranchDashboard;
