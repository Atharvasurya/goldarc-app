import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { PRODUCTS } from '../../data/products';
import { Package, Users, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
    const { orders } = useOrders();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    const categoryData = [
        { name: 'Gold', value: 15, color: '#d6ab4b' },
        { name: 'Diamond', value: 15, color: '#60a5fa' },
        { name: 'Silver', value: 10, color: '#94a3b8' },
        { name: 'Platinum', value: 5, color: '#a78bfa' },
        { name: 'Gemstone', value: 5, color: '#34d399' },
    ];

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Package className="text-blue-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{PRODUCTS.length}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Products</h3>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Users className="text-green-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">5</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-yellow-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{orders.length}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="text-gold-600" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">₹{(totalRevenue / 100000).toFixed(1)}L</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Product Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Monthly Revenue</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[
                                { month: 'Jan', revenue: 450000 },
                                { month: 'Feb', revenue: 520000 },
                                { month: 'Mar', revenue: 610000 },
                                { month: 'Apr', revenue: 580000 },
                                { month: 'May', revenue: 700000 },
                                { month: 'Jun', revenue: 650000 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#d6ab4b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <Link to="/admin/stock" className="card hover:shadow-xl transition-shadow p-6 bg-white border-b-4 border-gold-500 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Stock Management</h3>
                        <p className="text-gray-600 mb-4 text-sm">Monitor global inventory across all branches</p>
                        <span className="text-gold-600 font-medium text-sm">Review Stock →</span>
                    </Link>

                    <Link to="/admin/logistics" className="card hover:shadow-xl transition-shadow p-6 bg-white border-b-4 border-green-500 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Logistics Portal</h3>
                        <p className="text-gray-600 mb-4 text-sm">View shipping partners and contact info</p>
                        <span className="text-gold-600 font-medium text-sm">Manage Logistics →</span>
                    </Link>

                    <Link to="/admin/orders" className="card hover:shadow-xl transition-shadow p-6 bg-white border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Management</h3>
                        <p className="text-gray-600 mb-4 text-sm">Process, approve, and track all branch orders</p>
                        <span className="text-gold-600 font-medium text-sm">Manage Orders →</span>
                    </Link>

                    <Link to="/admin/inventory-requests" className="card hover:shadow-xl transition-shadow p-6 bg-white border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Inventory Requests</h3>
                        <p className="text-gray-600 mb-4 text-sm">Approve or reject stock requests from branches</p>
                        <span className="text-gold-600 font-medium text-sm">Review Requests →</span>
                    </Link>

                    <Link to="/admin/users" className="card hover:shadow-xl transition-shadow p-6 bg-white border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
                        <p className="text-gray-600 mb-4 text-sm">Manage franchise users and credentials</p>
                        <span className="text-gold-600 font-medium text-sm">Manage Users →</span>
                    </Link>

                    <Link to="/admin/branches" className="card hover:shadow-xl transition-shadow p-6 bg-white border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Branch Management</h3>
                        <p className="text-gray-600 mb-4 text-sm">Manage branch details and performance</p>
                        <span className="text-gold-600 font-medium text-sm">View Branches →</span>
                    </Link>

                    <Link to="/admin/job-cards" className="card hover:shadow-xl transition-shadow p-6 bg-white border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Cards</h3>
                        <p className="text-gray-600 mb-4 text-sm">Handle custom orders and repairs</p>
                        <span className="text-gold-600 font-medium text-sm">Manage Jobs →</span>
                    </Link>

                    <Link to="/admin/transactions" className="card hover:shadow-xl transition-shadow p-6 bg-white border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Transactions</h3>
                        <p className="text-gray-600 mb-4 text-sm">View all financial transaction logs</p>
                        <span className="text-gold-600 font-medium text-sm">View History →</span>
                    </Link>

                    <Link to="/admin/bulk-upload" className="card hover:shadow-xl transition-shadow p-6 bg-white border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Bulk Upload</h3>
                        <p className="text-gray-600 mb-4 text-sm">Upload products via Excel spreadsheet</p>
                        <span className="text-gold-600 font-medium text-sm">Upload Excel →</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
