import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { Package, CheckCircle, XCircle, Clock, Filter, MapPin, Truck, RefreshCw } from 'lucide-react';
import { formatCurrency, formatDateTime, formatOrderStatus, getOrderStatusColor } from '../../utils/helpers';
import { CREDENTIALS } from '../../data/credentials';
import Modal from '../../components/Modal';
import BillModal from '../../components/BillModal';
import toast from 'react-hot-toast';

const HeadOfficeOrders = () => {
    const { orders, updateOrderStatus, getPendingOrders, syncOrders } = useOrders();
    const { products } = useProducts();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [billOrder, setBillOrder] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        syncOrders();
        setTimeout(() => setIsSyncing(false), 500);
    };
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showBillModal, setShowBillModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const getBranchLocation = (branchId) => {
        const branch = CREDENTIALS.branches.find(b => b.id === branchId);
        return branch ? branch.location : 'Unknown Location';
    };

    const getStockRemaining = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? product.stock : 0;
    };

    // Filter orders based on status
    const filteredOrders = filterStatus === 'all'
        ? orders
        : filterStatus === 'pending'
            ? getPendingOrders()
            : orders.filter(order => order.status === filterStatus);

    const handleApprove = () => {
        if (selectedOrder) {
            updateOrderStatus(selectedOrder.id, 'approved', 'Order accepted by Head Office');
            toast.success('Order accepted successfully');
            setShowApproveModal(false);
            setSelectedOrder(null);
        }
    };

    const handleReject = () => {
        if (selectedOrder && rejectReason) {
            updateOrderStatus(selectedOrder.id, 'rejected', `Rejected: ${rejectReason}`);
            toast.success('Order rejected');
            setShowRejectModal(false);
            setSelectedOrder(null);
            setRejectReason('');
        } else {
            toast.error('Please provide a rejection reason');
        }
    };

    const handleDispatch = (orderId) => {
        updateOrderStatus(orderId, 'dispatched', 'Order sent from warehouse');
        toast.success('Order marked as sent');
    };

    const handleOutForDelivery = (orderId) => {
        updateOrderStatus(orderId, 'out_for_delivery', 'Order is out for delivery with our delivery partner');
        toast.success('Order is now out for delivery');
    };

    const handleDeliver = (orderId) => {
        updateOrderStatus(orderId, 'delivered', 'Order delivered successfully');
        toast.success('Order marked as delivered');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="text-yellow-500" size={20} />;
            case 'approved':
            case 'processing':
                return <Package className="text-blue-500" size={20} />;
            case 'dispatched':
                return <Truck className="text-purple-500" size={20} />;
            case 'out_for_delivery':
                return <MapPin className="text-orange-500" size={20} />;
            case 'delivered':
                return <CheckCircle className="text-green-500" size={20} />;
            case 'rejected':
            case 'cancelled':
                return <XCircle className="text-red-500" size={20} />;
            default:
                return <Package className="text-gray-500" size={20} />;
        }
    };

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Order Management</h1>
                        <p className="text-lg text-gray-600">{filteredOrders.length} orders</p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className={`flex items-center px-4 py-2 rounded-lg border transition-all h-[42px] ${isSyncing ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 shadow-sm'
                                }`}
                        >
                            <RefreshCw size={18} className={`mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                            {isSyncing ? 'Syncing...' : 'Refresh'}
                        </button>

                        <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm h-[42px]">
                            <Filter size={20} className="text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="bg-transparent border-none text-gray-700 text-sm focus:ring-0 cursor-pointer outline-none"
                            >
                                <option value="all">All Orders</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="processing">Processing</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="out_for_delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="rejected">Rejected</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length > 0 ? (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            {getStatusIcon(order.status)}
                                            <div>
                                                <p className="text-sm text-gray-600">Order ID</p>
                                                <p className="font-semibold text-gray-900">#{order.id.slice(0, 12)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Branch & Location</p>
                                            <p className="font-semibold text-gray-900">{order.branchName}</p>
                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <MapPin size={12} className="mr-1" />
                                                {getBranchLocation(order.branchId)}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Order Time</p>
                                            <p className="font-semibold text-gray-900">
                                                {formatDateTime(order.createdAt).split(',')[1]}
                                                <span className="text-xs font-normal text-gray-500 ml-1">
                                                    ({formatDateTime(order.createdAt).split(',')[0]})
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Total Amount</p>
                                            <p className="font-semibold text-gold-600">{formatCurrency(order.total)}</p>
                                        </div>
                                        <div>
                                            <span className={`badge ${getOrderStatusColor(order.status)}`}>
                                                {formatOrderStatus(order.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="px-6 py-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Items ({order.items.length})</h3>
                                    <div className="space-y-2">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                    <p className="text-xs font-medium text-blue-600 mb-1">
                                                        Warehouse Stock: {getStockRemaining(item.id)} remaining
                                                    </p>
                                                    <p className="font-semibold text-gray-900">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Actions */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Last Updated</p>
                                            <p className="text-sm font-medium text-gray-900">{formatDateTime(order.updatedAt)}</p>
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => {
                                                    setBillOrder(order);
                                                    setShowBillModal(true);
                                                }}
                                                className="btn-outline text-sm"
                                            >
                                                View Bill
                                            </button>
                                            {order.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setShowApproveModal(true);
                                                        }}
                                                        className="btn-primary text-sm shadow-sm"
                                                    >
                                                        <CheckCircle size={16} className="mr-1" />
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setShowRejectModal(true);
                                                        }}
                                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
                                                    >
                                                        <XCircle size={16} className="mr-1" />
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 'approved' && (
                                                <button
                                                    onClick={() => handleDispatch(order.id)}
                                                    className="btn-primary text-sm"
                                                >
                                                    Send Now
                                                </button>
                                            )}
                                            {order.status === 'dispatched' && (
                                                <button
                                                    onClick={() => handleOutForDelivery(order.id)}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                                                >
                                                    Out for Delivery
                                                </button>
                                            )}
                                            {order.status === 'out_for_delivery' && (
                                                <button
                                                    onClick={() => handleDeliver(order.id)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                >
                                                    Mark as Delivered
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Package className="mx-auto text-gray-400 mb-4" size={64} />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No orders found</h3>
                        <p className="text-gray-500">No orders match the selected filter</p>
                    </div>
                )}
            </div>

            {/* Bill Modal */}
            <BillModal
                isOpen={showBillModal}
                onClose={() => {
                    setShowBillModal(false);
                    setBillOrder(null);
                }}
                order={billOrder}
            />

            {/* Approve Modal */}
            <Modal
                isOpen={showApproveModal}
                onClose={() => setShowApproveModal(false)}
                title="Accept Order"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to accept this order from <strong>{selectedOrder?.branchName}</strong>?
                    </p>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>Order ID:</strong> #{selectedOrder?.id.slice(0, 12)}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Total Amount:</strong> {formatCurrency(selectedOrder?.total || 0)}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Items:</strong> {selectedOrder?.items.length} products
                        </p>
                    </div>
                    <div className="flex space-x-3 pt-4">
                        <button onClick={() => setShowApproveModal(false)} className="btn-outline flex-1">
                            Cancel
                        </button>
                        <button onClick={handleApprove} className="btn-primary flex-1">
                            Confirm Acceptance
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Reject Modal */}
            <Modal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                title="Reject Order"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Please provide a reason for rejecting this order from <strong>{selectedOrder?.branchName}</strong>:
                    </p>
                    <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>Order ID:</strong> #{selectedOrder?.id.slice(0, 12)}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Total Amount:</strong> {formatCurrency(selectedOrder?.total || 0)}
                        </p>
                    </div>
                    <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter rejection reason..."
                        className="input-field resize-none"
                        rows={4}
                        required
                    />
                    <div className="flex space-x-3 pt-4">
                        <button onClick={() => setShowRejectModal(false)} className="btn-outline flex-1">
                            Cancel
                        </button>
                        <button
                            onClick={handleReject}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Confirm Rejection
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HeadOfficeOrders;
