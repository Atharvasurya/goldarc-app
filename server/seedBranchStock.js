const mongoose = require('mongoose');
const BranchStock = require('./models/BranchStock');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const delhiBranchId = 'branch_2';
    const mumbaiBranchId = 'branch_1';

    const initialStock = [
      {
        branchId: delhiBranchId,
        productId: 'GLD-RING-001',
        name: 'Royal Gold Band',
        category: 'Rings',
        quantity: 12,
        lowStockThreshold: 5
      },
      {
        branchId: delhiBranchId,
        productId: 'GLD-NECK-002',
        name: 'Traditional Choker',
        category: 'Necklaces',
        quantity: 3,
        lowStockThreshold: 5
      },
      {
        branchId: delhiBranchId,
        productId: 'DIA-EAR-003',
        name: 'Sparkle Studs',
        category: 'Earrings',
        quantity: 8,
        lowStockThreshold: 3
      },
      {
        branchId: mumbaiBranchId,
        productId: 'GLD-RING-001',
        name: 'Royal Gold Band',
        category: 'Rings',
        quantity: 2,
        lowStockThreshold: 5
      }
    ];

    console.log('Seeding stock...');
    for (const item of initialStock) {
      await BranchStock.findOneAndUpdate(
        { branchId: item.branchId, productId: item.productId },
        item,
        { upsert: true, new: true }
      );
    }

    console.log('Stock seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();
