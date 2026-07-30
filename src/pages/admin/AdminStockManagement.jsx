import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, Search, Filter, Warehouse, TrendingUp, RefreshCw, Phone, Globe } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';

const AdminStockManagement = () => {
  const [allStock, setAllStock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchAllStock = async () => {
    try {
      const data = await apiService.getBranchStock();
      setAllStock(data);
    } catch (err) {
      console.error('Failed to fetch global stock:', err);
      toast.error('Failed to load global stock data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStock();
  }, []);

  const categories = ['All', ...new Set(allStock.map(item => item.category))];

  const filteredStock = allStock.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branchId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    const isLowStock = item.quantity <= item.lowStockThreshold;
    const matchesStatus = filterStatus === 'All' ||
      (filterStatus === 'Low Stock' && isLowStock) ||
      (filterStatus === 'Healthy' && !isLowStock);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const lowStockTotal = allStock.filter(item => item.quantity <= item.lowStockThreshold).length;

  return (
    <div className="min-h-screen bg-ivory-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Global Stock Management</h1>
            <p className="text-lg text-gray-600">Inventory oversight across all Goldarc branches</p>
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-b-4 border-gold-500">
            <div className="flex items-center justify-between mb-2">
              <Warehouse className="text-gold-500" size={24} />
              <span className="text-3xl font-bold text-gray-900">{allStock.length}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Global SKUs</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-b-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <span className="text-3xl font-bold text-red-600">{lowStockTotal}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Low Stock Alerts</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-b-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-blue-500" size={24} />
              <span className="text-3xl font-bold text-gray-900">{allStock.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Global Units</h3>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-1 md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, SKU, or branch..."
                className="input-field pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="input-field w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <select
                className="input-field w-full"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Low Stock">Low Stock Only</option>
                <option value="Healthy">Healthy Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Branch</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Remaining</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold-500 border-t-transparent mx-auto mb-2" />
                      Loading Global Inventory...
                    </td>
                  </tr>
                ) : filteredStock.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-full tracking-wider">
                        {item.branchId}
                      </span>
                    </td>
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
                          Restock High Priority
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold uppercase rounded-full">
                          Healthy
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gold-600 hover:bg-gold-50 rounded-lg transition-colors border border-gold-100">
                        <AlertTriangle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {!isLoading && filteredStock.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <Package className="mx-auto text-gray-300 mb-4" size={48} />
                      <p className="text-gray-500 font-medium">No matching inventory records found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStockManagement;
