const mongoose = require('mongoose');

const jobCardSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  productDescription: { type: String, required: true },
  serviceType: {
    type: String,
    enum: ['Repair', 'Custom Design', 'Polishing', 'Sizing'],
    default: 'Repair'
  },
  status: {
    type: String,
    enum: ['Received', 'In Progress', 'Ready', 'Delivered'],
    default: 'Received'
  },
  cost: { type: Number, default: 0 },
  expectedDate: { type: Date },
}, {
  timestamps: true
});

module.exports = mongoose.model('JobCard', jobCardSchema);
