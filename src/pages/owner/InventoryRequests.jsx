import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency, formatDateTime, formatOrderStatus } from '../../utils/helpers';
import toast from 'react-hot-toast';

const InventoryRequests = () => {
    const { getPendingOrders, updateOrderStatus } = useOrders();
    const pendingOrders = getPendingOrders();

    const handleApprove = (orderId) => {
        updateOrderStatus(orderId, 'approved', 'Order approved and processing');
        toast.success('Order approved successfully');
    };

    const handleReject = (orderId) => {
        updateOrderStatus(orderId, 'rejected', 'Order rejected');
        toast.success('Order rejected');
    };

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Inventory Requests</h1>

                {pendingOrders.length > 0 ? (
                    <div className="space-y-4">
                        {pendingOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">{order.branchName}</h3>
                                        <p className="text-sm text-gray-600">{formatDateTime(order.createdAt)}</p>
                                    </div>
                                    <p className="text-xl font-bold text-gold-600">{formatCurrency(order.total)}</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button onClick={() => handleApprove(order.id)} className="btn-primary">
                                        Approve
                                    </button>
                                    <button onClick={() => handleReject(order.id)} className="btn-outline">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-16">No pending requests</p>
                )}
            </div>
        </div>
    );
};

export default InventoryRequests;
