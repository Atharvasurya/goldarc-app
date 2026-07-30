import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Package, AlertTriangle, History, Download, RefreshCw, ShoppingCart, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import apiService from '../../services/apiService';
import BillModal from '../../components/BillModal';
import toast from 'react-hot-toast';

const BranchStock = () => {
  const { user } = useAuth();
  const { getOrdersByBranch } = useOrders();
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [billOrder, setBillOrder] = useState(null);
  const [showBillModal, setShowBillModal] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');

  const orders = user ? getOrdersByBranch(user.id) : [];

  const fetchStock = async () => {
    if (!user) return;
    try {
      const data = await apiService.getBranchStock(user.id);
      setStock(data || []);
    } catch (err) {
      console.error('Failed to fetch stock:', err);
      toast.error('Failed to load stock data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, [user]);

  const lowStockItems = stock.filter(item => item.quantity <= item.lowStockThreshold);

  const InventoryView = () => (
    <div className="space-y-6">
      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl animate-pulse">
          <div className="flex items-center">
            <AlertTriangle className="text-red-600 mr-3" size={24} />
            <div>
              <h3 className="text-red-800 font-bold">Low Stock Warning!</h3>
              <p className="text-red-700 text-sm">{lowStockItems.length} items are running low on stock. Please restock soon.</p>
            </div>
          </div>
        </div>
      )}

      {/* Stock Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Remaining</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {stock.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500 font-mono">SKU: {item.productId}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-lg font-bold ${item.quantity <= item.lowStockThreshold ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {item.quantity <= item.lowStockThreshold ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-bold uppercase rounded-full">
                      Restock Now
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold uppercase rounded-full">
                      Healthy
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="/franchise/catalogue"
                    className="inline-flex items-center px-4 py-2 bg-gold-500 text-white text-xs font-bold rounded-lg hover:bg-gold-600 transition-colors"
                  >
                    <RefreshCw size={14} className="mr-2" />
                    Order Stock
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stock.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-medium">No stock items found for this branch.</p>
          </div>
        )}
      </div>
    </div>
  );

  const BillsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-serif font-bold text-xl text-gray-900">Billing History</h3>
          <p className="text-sm text-gray-500">Access and download all previous order invoices</p>
        </div>
        <div className="divide-y divide-gray-50">
          {orders.map((order) => (
            <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <History size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Order #{order.id.slice(0, 12).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="font-serif font-bold text-gold-600">{formatCurrency(order.total)}</p>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.items.length} Items</span>
                </div>
                <button
                  onClick={() => {
                    setBillOrder(order);
                    setShowBillModal(true);
                  }}
                  className="p-3 text-gold-600 hover:bg-gold-50 rounded-xl transition-colors border border-gold-100"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="text-center py-12">
              <History className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-medium">No previous orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ivory-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Stock Details</h1>
            <p className="text-lg text-gray-600">Inventory management and billing history for {user?.name}</p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-b-4 border-gold-500">
            <div className="flex items-center justify-between mb-2">
              <Package className="text-gold-500" size={24} />
              <span className="text-3xl font-bold text-gray-900">{stock.length}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total SKUs</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-b-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <span className="text-3xl font-bold text-red-600">{lowStockItems.length}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Low Stock Items</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-b-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="text-blue-500" size={24} />
              <span className="text-3xl font-bold text-gray-900">{stock.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Units</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${activeTab === 'inventory' ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
          >
            Stock Inventory
          </button>
          <button
            onClick={() => setActiveTab('bills')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${activeTab === 'bills' ? 'bg-gold-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
          >
            Order Bills
          </button>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent" />
          </div>
        ) : (
          activeTab === 'inventory' ? <InventoryView /> : <BillsView />
        )}
      </div>

      <BillModal
        isOpen={showBillModal}
        onClose={() => {
          setShowBillModal(false);
          setBillOrder(null);
        }}
        order={billOrder}
      />
    </div>
  );
};

export default BranchStock;
