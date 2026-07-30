import React, { useRef } from 'react';
import { Printer, Download, X, Crown } from 'lucide-react';
import { formatCurrency, formatDateTime, getOrderStatusColor, formatOrderStatus } from '../utils/helpers';
import Modal from './Modal';

const BillModal = ({ isOpen, onClose, order }) => {
    const printRef = useRef();

    if (!order) return null;

    const handlePrint = () => {
        window.print();
    };

    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Electronic Bill" maxWidth="max-w-3xl">
            <div className="flex justify-end space-x-3 mb-4 no-print">
                <button
                    onClick={handlePrint}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <Printer size={18} className="mr-2" />
                    Print / PDF
                </button>
                <button
                    onClick={onClose}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <X size={18} className="mr-2" />
                    Close
                </button>
            </div>

            <div ref={printRef} className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm font-sans text-gray-800">
                {/* Invoice Header */}
                <div className="flex justify-between items-start border-b-2 border-gold-500 pb-6 mb-6">
                    <div>
                        <div className="flex items-center text-gold-600 mb-2">
                            <Crown size={32} className="mr-2 fill-current" />
                            <span className="text-3xl font-serif font-bold tracking-tight">GOLDARC</span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">House of Premium Jewellery</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">INVOICE</h2>
                        <p className="text-sm text-gray-600">ID: <span className="font-mono font-bold text-gray-900">{order.id.slice(0, 12).toUpperCase()}</span></p>
                        <p className="text-sm text-gray-600">Date: {formatDateTime(order.createdAt)}</p>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="grid grid-cols-2 gap-12 mb-8">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">From:</h3>
                        <p className="font-bold text-gray-900">GoldArc Head Office</p>
                        <p className="text-sm text-gray-600">Jewellery Park, SEZ Zone</p>
                        <p className="text-sm text-gray-600">Mumbai, Maharashtra - 400001</p>
                        <p className="text-sm text-gray-600 font-medium mt-1">GSTIN: 27AAGCG1234F1Z5</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">To:</h3>
                        <p className="font-bold text-gray-900">{order.branchName}</p>
                        <p className="text-sm text-gray-600">Authorized Franchise Branch</p>
                        <p className="text-sm text-gray-600 font-medium tracking-wide uppercase">Branch ID: {order.branchId}</p>
                        <p className="text-sm text-gray-600 mt-1 uppercase font-bold tracking-tighter">
                            Status: <span className={`${getOrderStatusColor(order.status).replace('badge-', 'text-')}`}>
                                {formatOrderStatus(order.status)}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full mb-8 border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                            <th className="text-center py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">SKU</th>
                            <th className="text-center py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Rate</th>
                            <th className="text-center py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Qty</th>
                            <th className="text-right py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 last:border-0">
                                <td className="py-4">
                                    <p className="font-bold text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                                </td>
                                <td className="py-4 text-center font-mono text-sm text-gray-600 uppercase">{item.sku}</td>
                                <td className="py-4 text-center text-sm">{formatCurrency(item.price)}</td>
                                <td className="py-4 text-center text-sm font-bold">{item.quantity}</td>
                                <td className="py-4 text-right font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end border-t-2 border-gray-100 pt-6">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-gray-900 font-medium">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">GST (18%):</span>
                            <span className="text-gray-900 font-medium">{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between text-xl border-t border-gray-200 pt-3">
                            <span className="font-serif font-bold text-gray-900">Total:</span>
                            <span className="font-serif font-bold text-gold-600">{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">Thank you for your business</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                        This is a computer generated document and does not require a physical signature.
                        In case of any discrepancies, please contact Head Office within 24 hours.
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    body * { visibility: hidden; }
                    .no-print { display: none !important; }
                    #modal-root, [role="dialog"], [role="dialog"] * { visibility: hidden; }
                    [ref="printRef"], [ref="printRef"] * { visibility: visible; }
                    .bg-white { background: white !important; }
                    .p-8 { padding: 0 !important; }
                    .border { border: none !important; }
                    .shadow-sm { box-shadow: none !important; }
                    
                    /* Show ONLY the invoice content */
                    div[ref="printRef"] {
                        visibility: visible !important;
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                    }
                }
            ` }} />
        </Modal>
    );
};

export default BillModal;
