import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency, formatDateTime } from '../../utils/helpers';

const TransactionHistory = () => {
    const { orders } = useOrders();

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Transaction History</h1>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.branchName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDateTime(order.createdAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{formatCurrency(order.total)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
