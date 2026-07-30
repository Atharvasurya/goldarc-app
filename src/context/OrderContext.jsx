import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ORDER_STATUS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        try {
            const data = await apiService.getOrders();
            // Map orderId from backend to id for frontend compatibility
            const normalizedData = data.map(o => ({
                ...o,
                id: o.orderId // Ensure frontend "id" maps to backend "orderId"
            }));
            setOrders(normalizedData);
            setIsLoading(false);
        } catch (err) {
            console.error('[OrderContext] Fetch error:', err);
        }
    }, []);

    // Initial Fetch & Polling (5s interval for efficiency)
    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [fetchOrders]);

    const createOrder = async (orderData) => {
        const orderPayload = {
            orderId: generateId(),
            ...orderData,
            status: ORDER_STATUS.PENDING,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const newOrder = await apiService.createOrder(orderPayload);
            const normalized = { ...newOrder, id: newOrder.orderId };
            setOrders(prev => [normalized, ...prev]);
            toast.success(`Order created! ID: ${normalized.id.slice(-6)}`);
            return normalized;
        } catch (err) {
            console.error('[OrderContext] Create error:', err);
            const errMsg = err.response?.data?.error || err.message || 'Failed to create order';
            toast.error(errMsg);
            throw err;
        }
    };

    const updateOrderStatus = async (orderId, status, remarks = '') => {
        try {
            const updatedOrder = await apiService.updateOrder(orderId, status, remarks);
            const normalized = { ...updatedOrder, id: updatedOrder.orderId };
            setOrders(prev => prev.map(o => o.id === orderId ? normalized : o));
            toast.success(`Order updated: ${status}`);
        } catch (err) {
            console.error('[OrderContext] Update error:', err);
            toast.error('Failed to update status');
        }
    };

    const cancelOrder = (orderId, reason) => {
        updateOrderStatus(orderId, ORDER_STATUS.CANCELLED, `Cancelled: ${reason}`);
    };

    const getOrderById = (orderId) => orders.find(o => o.id === orderId);
    const getOrdersByBranch = (branchId) => orders.filter(o => o.branchId === branchId);
    const getPendingOrders = () => orders.filter(o => o.status === ORDER_STATUS.PENDING);

    const value = {
        orders,
        isLoading,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        getOrderById,
        getOrdersByBranch,
        getPendingOrders,
        syncOrders: fetchOrders // Keep alias
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
