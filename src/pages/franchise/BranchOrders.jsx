import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Package, Clock, CheckCircle, XCircle, Truck, MapPin } from 'lucide-react';
import { formatCurrency, formatDateTime, formatOrderStatus, getOrderStatusColor } from '../../utils/helpers';
import { CANCELLATION_REASONS } from '../../utils/constants';
import Modal from '../../components/Modal';
import BillModal from '../../components/BillModal';
import toast from 'react-hot-toast';

const BranchOrders = () => {
    const { user } = useAuth();
    const { getOrdersByBranch, cancelOrder, syncOrders } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [billOrder, setBillOrder] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showBillModal, setShowBillModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    const orders = user ? getOrdersByBranch(user.id) : [];

    const handleSync = () => {
        setIsSyncing(true);
        syncOrders();
        setTimeout(() => {
            setIsSyncing(false);
            toast.success('Orders updated');
        }, 500);
    };

    const handleCancelOrder = () => {
        const reason = cancelReason === 'Other' ? otherReason : cancelReason;
        if (!reason) {
            toast.error('Please select or enter a cancellation reason');
            return;
        }

        cancelOrder(selectedOrder.id, reason);
        toast.success('Order cancelled successfully');
        setShowCancelModal(false);
        setSelectedOrder(null);
        setCancelReason('');
        setOtherReason('');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="text-yellow-500" size={24} />;
            case 'approved':
            case 'processing':
                return <Package className="text-blue-500" size={24} />;
            case 'dispatched':
            case 'out_for_delivery':
                return <Truck className="text-purple-500" size={24} />;
            case 'delivered':
                return <CheckCircle className="text-green-500" size={24} />;
            case 'cancelled':
            case 'rejected':
                return <XCircle className="text-red-500" size={24} />;
            default:
                return <Package className="text-gray-500" size={24} />;
        }
    };

    const StatusTimeline = ({ currentStatus }) => {
        const statuses = [
            { id: 'pending', label: 'Ordered', icon: Clock },
            { id: 'approved', label: 'Accepted', icon: CheckCircle },
            { id: 'dispatched', label: 'In Transit', icon: Truck },
            { id: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
            { id: 'delivered', label: 'Delivered', icon: Package },
        ];

        const getStatusIndex = (status) => {
            if (status === 'processing') return 1;
            const index = statuses.findIndex(s => s.id === status);
            return index;
        };

        const currentIndex = getStatusIndex(currentStatus);
        const isCancelled = currentStatus === 'cancelled' || currentStatus === 'rejected';

        if (isCancelled) {
            return (
                <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                    <XCircle size={20} className="mr-2" />
                    <span className="font-medium">Order {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}</span>
                </div>
            );
        }

        return (
            <div className="relative flex justify-between w-full max-w-2xl mx-auto mt-8 mb-4">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-gold-500 -translate-y-1/2 transition-all duration-500"
                    style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
                />

                {statuses.map((status, index) => {
                    const Icon = status.icon;
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={status.id} className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCurrent ? 'bg-gold-500 border-gold-600 text-white shadow-lg scale-110' :
                                isActive ? 'bg-white border-gold-500 text-gold-600' : 'bg-white border-gray-300 text-gray-400'
                                }`}>
                                <Icon size={20} />
                            </div>
                            <span className={`absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap mt-2 ${isActive ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                {status.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-ivory-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">My Orders</h1>
                        <p className="text-lg text-gray-600">{orders.length} total orders</p>
                    </div>
                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className={`flex items-center px-4 py-2 rounded-lg border transition-all ${isSyncing ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 shadow-sm'
                            }`}
                    >
                        <Clock size={18} className={`mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                        {isSyncing ? 'Syncing...' : 'Refresh Status'}
                    </button>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                                {/* Order Header */}
                                <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center space-x-6">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                                <p className="font-mono font-bold text-gray-900">#{order.id.slice(0, 12).toUpperCase()}</p>
                                            </div>
                                            <div className="h-10 w-px bg-gray-200" />
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Placed On</p>
                                                <p className="font-bold text-gray-900">{formatDateTime(order.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                                                <p className="text-xl font-serif font-bold text-gold-600">{formatCurrency(order.total)}</p>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight shadow-sm ${getOrderStatusColor(order.status)}`}>
                                                {formatOrderStatus(order.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items & Timeline */}
                                <div className="p-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Items List */}
                                        <div>
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ordered Items</h3>
                                            <div className="space-y-4">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex items-center p-4 bg- ivory-50/30 rounded-xl border border-gray-50">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                        />
                                                        <div className="ml-4 flex-1">
                                                            <p className="font-bold text-gray-900">{item.name}</p>
                                                            <p className="text-sm text-gray-500">Qty: <span className="font-bold text-gray-700">{item.quantity}</span></p>
                                                        </div>
                                                        <p className="font-bold text-gray-900 ml-4">
                                                            {formatCurrency(item.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {order.remarks && (
                                                <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Head Office Note:</p>
                                                    <p className="text-sm text-blue-800 italic">"{order.remarks}"</p>

                                                    {(order.status === 'dispatched' || order.status === 'out_for_delivery') && (
                                                        <div className="mt-3 pt-3 border-t border-blue-100 flex items-center justify-between">
                                                            <div>
                                                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Partner</p>
                                                                <p className="text-xs font-bold text-blue-900">GoldArc Logistics</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Tracking ID</p>
                                                                <p className="text-xs font-mono font-bold text-blue-900 uppercase">GA-{order.id.slice(-6)}IN</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Timeline */}
                                        <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-12 pt-8 lg:pt-0">
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Delivery Progress</h3>
                                            <StatusTimeline currentStatus={order.status} />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                                    <p className="text-[10px] text-gray-400 italic">Last Activity: {formatDateTime(order.updatedAt)}</p>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setBillOrder(order);
                                                setShowBillModal(true);
                                            }}
                                            className="px-6 py-2 bg-white text-gray-700 font-bold text-xs uppercase tracking-widest rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            Electronic Bill
                                        </button>
                                        {order.status === 'pending' && (
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowCancelModal(true);
                                                }}
                                                className="px-6 py-2 bg-white text-red-600 font-bold text-xs uppercase tracking-widest rounded-lg border border-red-100 hover:bg-red-50 transition-colors"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Package className="mx-auto text-gray-400 mb-4" size={64} />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">Start shopping to place your first order</p>
                        <a href="/franchise/catalogue" className="btn-primary">
                            Browse Catalogue
                        </a>
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

            {/* Cancel Order Modal */}
            <Modal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                title="Cancel Order"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">Please select a reason for cancellation:</p>

                    <div className="space-y-2">
                        {CANCELLATION_REASONS.map((reason) => (
                            <label key={reason} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="cancelReason"
                                    value={reason}
                                    checked={cancelReason === reason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    className="text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-gray-700">{reason}</span>
                            </label>
                        ))}
                    </div>

                    {cancelReason === 'Other' && (
                        <textarea
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            placeholder="Please specify your reason..."
                            className="input-field resize-none"
                            rows={3}
                        />
                    )}

                    <div className="flex space-x-3 pt-4">
                        <button onClick={() => setShowCancelModal(false)} className="btn-outline flex-1">
                            Go Back
                        </button>
                        <button onClick={handleCancelOrder} className="btn-primary flex-1">
                            Confirm Cancellation
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BranchOrders;
