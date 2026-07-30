const mongoose = require('mongoose');

const branchStockSchema = new mongoose.Schema({
  branchId: { type: String, required: true },
  productId: { type: String, required: true }, // SKU
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  lastRestockedAt: { type: Date },
}, {
  timestamps: true
});

branchStockSchema.index({ branchId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('BranchStock', branchStockSchema);
