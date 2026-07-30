const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Product = require('./models/Product');
const Order = require('./models/Order');

const DB_FILE = path.join(__dirname, 'database.json');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    if (!fs.existsSync(DB_FILE)) {
      console.log('No database.json found to migrate.');
      process.exit(0);
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

    // Migrate Products
    if (data.products && data.products.length > 0) {
      console.log(`Migrating ${data.products.length} products...`);
      for (const p of data.products) {
        await Product.findOneAndUpdate(
          { sku: p.sku },
          { ...p, id: undefined }, // Remove legacy id if p.sku is unique
          { upsert: true, new: true }
        );
      }
      console.log('Products migrated.');
    }

    // Migrate Orders
    if (data.orders && data.orders.length > 0) {
      console.log(`Migrating ${data.orders.length} orders...`);
      for (const o of data.orders) {
        await Order.findOneAndUpdate(
          { orderId: o.orderId },
          o,
          { upsert: true, new: true }
        );
      }
      console.log('Orders migrated.');
    }

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

migrate();
