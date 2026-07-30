import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { TrendingUp, Package, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const HeadOfficeBranches = () => {
    const { orders } = useOrders();

    // Calculate branch statistics
    const branchStats = orders.reduce((acc, order) => {
        const branchName = order.branchName || 'Unknown';
        if (!acc[branchName]) {
            acc[branchName] = {
                totalOrders: 0,
                totalRevenue: 0,
                pendingOrders: 0,
                deliveredOrders: 0,
            };
        }
        acc[branchName].totalOrders++;
        acc[branchName].totalRevenue += order.total;
        if (order.status === 'pending') acc[branchName].pendingOrders++;
        if (order.status === 'delivered') acc[branchName].deliveredOrders++;
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Branch Performance</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(branchStats).map(([branchName, stats]) => (
                        <div key={branchName} className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">{branchName}</h2>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <Package className="mx-auto text-blue-600 mb-2" size={24} />
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                                    <p className="text-sm text-gray-600">Total Orders</p>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                    <TrendingUp className="mx-auto text-yellow-600 mb-2" size={24} />
                                    <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                                    <p className="text-sm text-gray-600">Pending</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <Package className="mx-auto text-green-600 mb-2" size={24} />
                                    <p className="text-2xl font-bold text-gray-900">{stats.deliveredOrders}</p>
                                    <p className="text-sm text-gray-600">Delivered</p>
                                </div>
                            </div>

                            <div className="p-4 bg-gold-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="text-gold-600" size={20} />
                                        <span className="text-sm font-medium text-gray-700">Total Revenue</span>
                                    </div>
                                    <span className="text-xl font-bold text-gold-600">
                                        {formatCurrency(stats.totalRevenue)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeadOfficeBranches;
