const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const cors = require('cors');

// Firebase setup
const { db, FieldValue } = require('./firebase');
const collections = require('./collections');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// --- Routes ---

// Notifications API
app.get('/api/notifications/:userId', async (req, res) => {
    try {
        const snapshot = await collections.notifications
            .where('userId', '==', req.params.userId)
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/notifications/:userId/read-all', async (req, res) => {
    try {
        const snapshot = await collections.notifications
            .where('userId', '==', req.params.userId)
            .where('isRead', '==', false)
            .get();

        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.update(doc.ref, { isRead: true });
        });
        await batch.commit();

        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/notifications/:id/read', async (req, res) => {
    try {
        const docRef = collections.notifications.doc(req.params.id);
        await docRef.update({ isRead: true });
        const doc = await docRef.get();
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Orders API
app.get('/api/orders', async (req, res) => {
    try {
        const snapshot = await collections.orders.orderBy('createdAt', 'desc').get();
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = {
            ...req.body,
            createdAt: req.body.createdAt || FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };

        const docRef = await collections.orders.add(newOrder);

        // Create notification for Admin
        await collections.notifications.add({
            userId: 'admin',
            title: 'New Order Received',
            message: `New order #${newOrder.orderId.slice(-6)} from ${newOrder.branchName}`,
            type: 'new_order',
            link: '/admin/orders',
            isRead: false,
            createdAt: FieldValue.serverTimestamp()
        });

        const doc = await docRef.get();
        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch('/api/orders/:id', async (req, res) => {
    try {
        const { status, remarks } = req.body;

        // Find order by orderId field
        const snapshot = await collections.orders.where('orderId', '==', req.params.id).limit(1).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const orderDoc = snapshot.docs[0];
        const orderData = orderDoc.data();

        await orderDoc.ref.update({
            status,
            remarks,
            updatedAt: FieldValue.serverTimestamp()
        });

        // Create notification for the Branch
        await collections.notifications.add({
            userId: orderData.branchId,
            title: 'Order Status Updated',
            message: `Your order #${orderData.orderId.slice(-6)} is now ${status.replace(/_/g, ' ')}`,
            type: 'order_update',
            link: '/franchise/orders',
            isRead: false,
            createdAt: FieldValue.serverTimestamp()
        });

        const updatedDoc = await orderDoc.ref.get();
        res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- Product API Routes ---
app.get('/api/products', async (req, res) => {
    try {
        const snapshot = await collections.products.get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = {
            ...req.body,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };
        const docRef = await collections.products.add(newProduct);
        const doc = await docRef.get();
        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/products/:id', async (req, res) => {
    try {
        // Try to find by SKU first, then by document ID
        let productDoc = null;

        // Search by SKU
        const skuSnapshot = await collections.products.where('sku', '==', req.params.id).limit(1).get();
        if (!skuSnapshot.empty) {
            productDoc = skuSnapshot.docs[0];
        } else {
            // Try by document ID
            const docRef = collections.products.doc(req.params.id);
            const doc = await docRef.get();
            if (doc.exists) {
                productDoc = doc;
            }
        }

        if (!productDoc) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await productDoc.ref.update({
            ...req.body,
            updatedAt: FieldValue.serverTimestamp()
        });

        const updatedDoc = await productDoc.ref.get();
        res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        // Try to find by SKU first, then by document ID
        const skuSnapshot = await collections.products.where('sku', '==', req.params.id).limit(1).get();
        if (!skuSnapshot.empty) {
            await skuSnapshot.docs[0].ref.delete();
        } else {
            await collections.products.doc(req.params.id).delete();
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed Initial Products
app.post('/api/products/seed', async (req, res) => {
    try {
        const initialProducts = req.body;

        // Delete all existing products
        const snapshot = await collections.products.get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Add new products
        const addBatch = db.batch();
        initialProducts.forEach(product => {
            const docRef = collections.products.doc();
            addBatch.set(docRef, {
                ...product,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp()
            });
        });
        await addBatch.commit();

        res.json({ message: 'Products seeded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Bulk Product Upload
app.post('/api/products/bulk', async (req, res) => {
    try {
        const products = req.body;
        const batch = db.batch();

        products.forEach(product => {
            const docRef = collections.products.doc();
            batch.set(docRef, {
                ...product,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp()
            });
        });

        await batch.commit();
        res.status(201).json({ message: 'Products uploaded successfully', count: products.length });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- Job Cards API ---
app.get('/api/job-cards', async (req, res) => {
    try {
        const snapshot = await collections.jobCards.orderBy('createdAt', 'desc').get();
        const jobCards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(jobCards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/job-cards', async (req, res) => {
    try {
        const newJobCard = {
            ...req.body,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };
        const docRef = await collections.jobCards.add(newJobCard);
        const doc = await docRef.get();
        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch('/api/job-cards/:id', async (req, res) => {
    try {
        const docRef = collections.jobCards.doc(req.params.id);
        await docRef.update({
            ...req.body,
            updatedAt: FieldValue.serverTimestamp()
        });
        const doc = await docRef.get();
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/job-cards/:id', async (req, res) => {
    try {
        await collections.jobCards.doc(req.params.id).delete();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Banners API ---
app.get('/api/banners', async (req, res) => {
    try {
        const snapshot = await collections.banners.get();
        const banners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(banners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/banners', async (req, res) => {
    try {
        const banner = {
            ...req.body,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };
        const docRef = await collections.banners.add(banner);
        const doc = await docRef.get();
        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch('/api/banners/:id', async (req, res) => {
    try {
        const docRef = collections.banners.doc(req.params.id);
        await docRef.update({
            ...req.body,
            updatedAt: FieldValue.serverTimestamp()
        });
        const doc = await docRef.get();
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/banners/:id', async (req, res) => {
    try {
        await collections.banners.doc(req.params.id).delete();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Branch Stock API ---
app.get('/api/branch-stock', async (req, res) => {
    try {
        const { branchId } = req.query;
        let query = collections.branchStock;

        if (branchId) {
            query = query.where('branchId', '==', branchId);
        }

        const snapshot = await query.get();
        const stock = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Backward compatibility (keeping the param version)
app.get('/api/branch-stock/:branchId', async (req, res) => {
    try {
        const snapshot = await collections.branchStock
            .where('branchId', '==', req.params.branchId)
            .get();
        const stock = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Logistics API ---
app.get('/api/logistics-partners', async (req, res) => {
    try {
        const partners = [
            { id: 'l1', name: 'Blue Dart', type: 'Premium', contact: '+91 1860 233 1234', website: 'https://www.bluedart.com' },
            { id: 'l2', name: 'Sequel Logistics', type: 'Specialized (Jewellery)', contact: '+91 80 4900 1234', website: 'https://www.sequel-global.com' },
            { id: 'l3', name: 'BVC Logistics', type: 'Secure Transport', contact: '+91 22 7100 1234', website: 'https://www.bvclogistics.com' }
        ];
        res.json(partners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/branch-stock', async (req, res) => {
    try {
        const { branchId, productId, name, category, quantity, lowStockThreshold } = req.body;

        // Find existing stock item
        const snapshot = await collections.branchStock
            .where('branchId', '==', branchId)
            .where('productId', '==', productId)
            .limit(1)
            .get();

        let stockItem;

        if (!snapshot.empty) {
            // Update existing
            const docRef = snapshot.docs[0].ref;
            const currentData = snapshot.docs[0].data();
            await docRef.update({
                name,
                category,
                quantity: (currentData.quantity || 0) + (quantity || 0),
                lowStockThreshold: lowStockThreshold !== undefined ? lowStockThreshold : 5,
                updatedAt: FieldValue.serverTimestamp()
            });
            const doc = await docRef.get();
            stockItem = { id: doc.id, ...doc.data() };
        } else {
            // Create new
            const newStock = {
                branchId,
                productId,
                name,
                category,
                quantity: quantity || 0,
                lowStockThreshold: lowStockThreshold !== undefined ? lowStockThreshold : 5,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp()
            };
            const docRef = await collections.branchStock.add(newStock);
            const doc = await docRef.get();
            stockItem = { id: doc.id, ...doc.data() };
        }

        // Check for Low Stock and notify if threshold reached
        if (stockItem.quantity <= stockItem.lowStockThreshold) {
            // Notify Branch
            await collections.notifications.add({
                userId: branchId,
                title: 'Low Stock Alert',
                message: `${stockItem.name} (${stockItem.productId}) is at ${stockItem.quantity} units. Restock suggested.`,
                type: 'system',
                link: '/franchise/stock',
                isRead: false,
                createdAt: FieldValue.serverTimestamp()
            });
            // Notify Admin
            await collections.notifications.add({
                userId: 'admin',
                title: 'Global Low Stock Alert',
                message: `Branch ${branchId} is running low on ${stockItem.name}. Current: ${stockItem.quantity}`,
                type: 'system',
                link: '/admin/stock',
                isRead: false,
                createdAt: FieldValue.serverTimestamp()
            });
        }

        res.status(201).json(stockItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch('/api/branch-stock/:id', async (req, res) => {
    try {
        const docRef = collections.branchStock.doc(req.params.id);
        await docRef.update({
            ...req.body,
            updatedAt: FieldValue.serverTimestamp()
        });

        const doc = await docRef.get();
        const updated = { id: doc.id, ...doc.data() };

        if (updated && updated.quantity <= updated.lowStockThreshold) {
            // Notify Branch
            await collections.notifications.add({
                userId: updated.branchId,
                title: 'Low Stock Alert',
                message: `${updated.name} (${updated.productId}) is at ${updated.quantity} units.`,
                type: 'system',
                link: '/franchise/stock',
                isRead: false,
                createdAt: FieldValue.serverTimestamp()
            });
            // Notify Admin
            await collections.notifications.add({
                userId: 'admin',
                title: 'Global Low Stock Alert',
                message: `Branch ${updated.branchId} is running low on ${updated.name}.`,
                type: 'system',
                link: '/admin/stock',
                isRead: false,
                createdAt: FieldValue.serverTimestamp()
            });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- Users API ---
app.get('/api/users', async (req, res) => {
    try {
        const snapshot = await collections.users.get();
        const users = snapshot.docs.map(doc => {
            const data = doc.data();
            delete data.password; // Don't send passwords
            return { id: doc.id, ...data };
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const user = {
            ...req.body,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };
        const docRef = await collections.users.add(user);
        const doc = await docRef.get();
        const data = doc.data();
        delete data.password;
        res.status(201).json({ id: doc.id, ...data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch('/api/users/:id', async (req, res) => {
    try {
        const docRef = collections.users.doc(req.params.id);
        await docRef.update({
            ...req.body,
            updatedAt: FieldValue.serverTimestamp()
        });
        const doc = await docRef.get();
        const data = doc.data();
        delete data.password;
        res.json({ id: doc.id, ...data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await collections.users.doc(req.params.id).delete();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed Initial Users
app.post('/api/users/seed', async (req, res) => {
    try {
        const users = req.body;

        // Delete all existing users
        const snapshot = await collections.users.get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Add new users
        const addBatch = db.batch();
        users.forEach(user => {
            const docRef = collections.users.doc();
            addBatch.set(docRef, {
                ...user,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp()
            });
        });
        await addBatch.commit();

        res.json({ message: 'Users seeded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export the Express app as a Firebase Cloud Function
exports.api = onRequest(app);
