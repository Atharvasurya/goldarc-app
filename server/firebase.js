const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get Firestore instance
const db = admin.firestore();

// Export for use in other files
module.exports = {
  db,
  admin,
  FieldValue: admin.firestore.FieldValue,
  Timestamp: admin.firestore.Timestamp
};
