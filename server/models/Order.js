const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: String, // Frontend legacy ID
  sku: String,
  name: String,
  category: String,
  description: String,
  image: String,
  price: Number,
  weight: Number,
  purity: String,
  makingCharges: Number,
  availability: String,
  stock: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  branchId: { type: String, required: true },
  branchName: { type: String, required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  remarks: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
