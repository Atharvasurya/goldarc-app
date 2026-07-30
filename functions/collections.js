const { db } = require('./firebase');

// Collection references
const collections = {
  products: db.collection('products'),
  orders: db.collection('orders'),
  users: db.collection('users'),
  notifications: db.collection('notifications'),
  branchStock: db.collection('branchStock'),
  jobCards: db.collection('jobCards'),
  banners: db.collection('banners')
};

module.exports = collections;
