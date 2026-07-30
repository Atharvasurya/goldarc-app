const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    weight: { type: Number },
    purity: { type: String },
    makingCharges: { type: Number },
    availability: { type: String, default: 'In Stock' },
    stock: { type: Number, default: 0 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
