import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    writeBatch,
    serverTimestamp,
    setDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { PRODUCTS } from '../data/products';
import { BANNERS } from '../data/banners';

// Collection names
const COLLECTIONS = {
    PRODUCTS: 'products',
    ORDERS: 'orders',
    USERS: 'users',
    NOTIFICATIONS: 'notifications',
    BRANCH_STOCK: 'branchStock',
    JOB_CARDS: 'jobCards',
    BANNERS: 'banners'
};

const apiService = {
    // --- Orders ---
    getOrders: async () => {
        try {
            const q = query(collection(db, COLLECTIONS.ORDERS), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (err) {
            console.warn('Firestore getOrders fallback to empty array:', err);
            return [];
        }
    },

    createOrder: async (orderData) => {
        try {
            const newOrder = {
                ...orderData,
                createdAt: orderData.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), newOrder);

            // Create notification for Admin
            try {
                await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
                    userId: 'admin',
                    title: 'New Order Received',
                    message: `New order #${(newOrder.orderId || docRef.id).slice(-6)} from ${newOrder.branchName || 'Branch'}`,
                    type: 'new_order',
                    link: '/admin/orders',
                    isRead: false,
                    createdAt: new Date().toISOString()
                });
            } catch (e) {
                console.warn('Failed to send admin notification:', e);
            }

            return { id: docRef.id, ...newOrder };
        } catch (err) {
            console.error('Error creating order:', err);
            throw err;
        }
    },

    updateOrder: async (orderId, status, remarks) => {
        try {
            const q = query(collection(db, COLLECTIONS.ORDERS), where('orderId', '==', orderId), limit(1));
            const snapshot = await getDocs(q);

            let docRef;
            let orderData = {};

            if (!snapshot.empty) {
                const targetDoc = snapshot.docs[0];
                docRef = doc(db, COLLECTIONS.ORDERS, targetDoc.id);
                orderData = targetDoc.data();
            } else {
                // Try document ID directly
                docRef = doc(db, COLLECTIONS.ORDERS, orderId);
            }

            const updates = {
                status,
                remarks,
                updatedAt: new Date().toISOString()
            };

            await updateDoc(docRef, updates);

            // Notify Branch
            if (orderData.branchId) {
                try {
                    await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
                        userId: orderData.branchId,
                        title: 'Order Status Updated',
                        message: `Your order #${(orderData.orderId || orderId).slice(-6)} is now ${status.replace(/_/g, ' ')}`,
                        type: 'order_update',
                        link: '/franchise/orders',
                        isRead: false,
                        createdAt: new Date().toISOString()
                    });
                } catch (e) {
                    console.warn('Failed to send branch notification:', e);
                }
            }

            return { id: docRef.id, ...orderData, ...updates };
        } catch (err) {
            console.error('Error updating order:', err);
            throw err;
        }
    },

    // --- Products ---
    getProducts: async () => {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.PRODUCTS));
            const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            if (products.length === 0) {
                return PRODUCTS;
            }
            return products;
        } catch (err) {
            console.warn('Firestore getProducts fallback to mock products:', err);
            return PRODUCTS;
        }
    },

    createProduct: async (productData) => {
        try {
            const newProd = {
                ...productData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), newProd);
            return { id: docRef.id, ...newProd };
        } catch (err) {
            console.error('Error creating product:', err);
            throw err;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            let docRef = doc(db, COLLECTIONS.PRODUCTS, id);
            // Search by SKU if docRef doesn't exist
            const q = query(collection(db, COLLECTIONS.PRODUCTS), where('sku', '==', id), limit(1));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                docRef = doc(db, COLLECTIONS.PRODUCTS, snapshot.docs[0].id);
            }

            const updates = {
                ...productData,
                updatedAt: new Date().toISOString()
            };
            await updateDoc(docRef, updates);
            return { id: docRef.id, ...updates };
        } catch (err) {
            console.error('Error updating product:', err);
            throw err;
        }
    },

    deleteProduct: async (id) => {
        try {
            let docRef = doc(db, COLLECTIONS.PRODUCTS, id);
            const q = query(collection(db, COLLECTIONS.PRODUCTS), where('sku', '==', id), limit(1));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                docRef = doc(db, COLLECTIONS.PRODUCTS, snapshot.docs[0].id);
            }
            await deleteDoc(docRef);
            return true;
        } catch (err) {
            console.error('Error deleting product:', err);
            throw err;
        }
    },

    bulkUploadProducts: async (products) => {
        try {
            const batch = writeBatch(db);
            products.forEach(p => {
                const docRef = doc(collection(db, COLLECTIONS.PRODUCTS));
                batch.set(docRef, {
                    ...p,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            });
            await batch.commit();
            return { message: 'Products uploaded successfully', count: products.length };
        } catch (err) {
            console.error('Error bulk uploading products:', err);
            throw err;
        }
    },

    seedProducts: async (products) => {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.PRODUCTS));
            const batch = writeBatch(db);
            snapshot.docs.forEach(d => batch.delete(d.ref));
            products.forEach(p => {
                const docRef = doc(collection(db, COLLECTIONS.PRODUCTS));
                batch.set(docRef, {
                    ...p,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            });
            await batch.commit();
            return { message: 'Products seeded successfully' };
        } catch (err) {
            console.error('Error seeding products:', err);
            throw err;
        }
    },

    // --- Notifications ---
    getNotifications: async (userId) => {
        try {
            const q = query(
                collection(db, COLLECTIONS.NOTIFICATIONS),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc'),
                limit(50)
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (err) {
            // Fallback query without orderBy if index is missing
            try {
                const q2 = query(
                    collection(db, COLLECTIONS.NOTIFICATIONS),
                    where('userId', '==', userId),
                    limit(50)
                );
                const snapshot = await getDocs(q2);
                return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            } catch (e) {
                console.warn('Firestore getNotifications fallback:', e);
                return [];
            }
        }
    },

    markNotificationsRead: async (userId) => {
        try {
            const q = query(
                collection(db, COLLECTIONS.NOTIFICATIONS),
                where('userId', '==', userId),
                where('isRead', '==', false)
            );
            const snapshot = await getDocs(q);
            const batch = writeBatch(db);
            snapshot.docs.forEach(d => {
                batch.update(d.ref, { isRead: true });
            });
            await batch.commit();
            return { message: 'All notifications marked as read' };
        } catch (err) {
            console.error('Error marking notifications read:', err);
            return { message: 'Failed to mark read' };
        }
    },

    markSingleNotificationRead: async (id) => {
        try {
            const docRef = doc(db, COLLECTIONS.NOTIFICATIONS, id);
            await updateDoc(docRef, { isRead: true });
            return { id, isRead: true };
        } catch (err) {
            console.error('Error marking single notification read:', err);
            return { id, isRead: true };
        }
    },

    // --- Job Cards ---
    getJobCards: async () => {
        try {
            const q = query(collection(db, COLLECTIONS.JOB_CARDS), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (err) {
            console.warn('Firestore getJobCards fallback:', err);
            return [];
        }
    },

    createJobCard: async (data) => {
        try {
            const newJob = {
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, COLLECTIONS.JOB_CARDS), newJob);
            return { id: docRef.id, ...newJob };
        } catch (err) {
            console.error('Error creating job card:', err);
            throw err;
        }
    },

    updateJobCard: async (id, data) => {
        try {
            const docRef = doc(db, COLLECTIONS.JOB_CARDS, id);
            const updates = { ...data, updatedAt: new Date().toISOString() };
            await updateDoc(docRef, updates);
            return { id, ...updates };
        } catch (err) {
            console.error('Error updating job card:', err);
            throw err;
        }
    },

    deleteJobCard: async (id) => {
        try {
            await deleteDoc(doc(db, COLLECTIONS.JOB_CARDS, id));
            return true;
        } catch (err) {
            console.error('Error deleting job card:', err);
            throw err;
        }
    },

    // --- Banners ---
    getBanners: async () => {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.BANNERS));
            const banners = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            if (banners.length === 0) {
                return BANNERS;
            }
            return banners;
        } catch (err) {
            console.warn('Firestore getBanners fallback:', err);
            return BANNERS;
        }
    },

    createBanner: async (data) => {
        try {
            const newBanner = { ...data, createdAt: new Date().toISOString() };
            const docRef = await addDoc(collection(db, COLLECTIONS.BANNERS), newBanner);
            return { id: docRef.id, ...newBanner };
        } catch (err) {
            console.error('Error creating banner:', err);
            throw err;
        }
    },

    updateBanner: async (id, data) => {
        try {
            const docRef = doc(db, COLLECTIONS.BANNERS, id);
            await updateDoc(docRef, data);
            return { id, ...data };
        } catch (err) {
            console.error('Error updating banner:', err);
            throw err;
        }
    },

    deleteBanner: async (id) => {
        try {
            await deleteDoc(doc(db, COLLECTIONS.BANNERS, id));
            return true;
        } catch (err) {
            console.error('Error deleting banner:', err);
            throw err;
        }
    },

    // --- Users ---
    getUsers: async () => {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
            return snapshot.docs.map(d => {
                const data = d.data();
                delete data.password;
                return { id: d.id, ...data };
            });
        } catch (err) {
            console.warn('Firestore getUsers fallback:', err);
            return [];
        }
    },

    createUser: async (data) => {
        try {
            const user = { ...data, createdAt: new Date().toISOString() };
            const docRef = await addDoc(collection(db, COLLECTIONS.USERS), user);
            const userRes = { ...user, id: docRef.id };
            delete userRes.password;
            return userRes;
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    },

    updateUser: async (id, data) => {
        try {
            const docRef = doc(db, COLLECTIONS.USERS, id);
            await updateDoc(docRef, data);
            const userRes = { ...data, id };
            delete userRes.password;
            return userRes;
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    },

    deleteUser: async (id) => {
        try {
            await deleteDoc(doc(db, COLLECTIONS.USERS, id));
            return true;
        } catch (err) {
            console.error('Error deleting user:', err);
            throw err;
        }
    },

    seedUsers: async (users) => {
        try {
            const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
            const batch = writeBatch(db);
            snapshot.docs.forEach(d => batch.delete(d.ref));
            users.forEach(u => {
                const docRef = doc(collection(db, COLLECTIONS.USERS));
                batch.set(docRef, { ...u, createdAt: new Date().toISOString() });
            });
            await batch.commit();
            return { message: 'Users seeded successfully' };
        } catch (err) {
            console.error('Error seeding users:', err);
            throw err;
        }
    },

    // --- Branch Stock ---
    getBranchStock: async (branchId) => {
        try {
            let q = collection(db, COLLECTIONS.BRANCH_STOCK);
            if (branchId) {
                q = query(collection(db, COLLECTIONS.BRANCH_STOCK), where('branchId', '==', branchId));
            }
            const snapshot = await getDocs(q);
            return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (err) {
            console.warn('Firestore getBranchStock fallback:', err);
            return [];
        }
    },

    updateBranchStock: async (id, data) => {
        try {
            const docRef = doc(db, COLLECTIONS.BRANCH_STOCK, id);
            await updateDoc(docRef, data);
            return { id, ...data };
        } catch (err) {
            console.error('Error updating branch stock:', err);
            throw err;
        }
    },

    // --- Logistics ---
    getLogisticsPartners: async () => {
        return [
            { id: 'l1', name: 'Blue Dart', type: 'Premium', contact: '+91 1860 233 1234', website: 'https://www.bluedart.com' },
            { id: 'l2', name: 'Sequel Logistics', type: 'Specialized (Jewellery)', contact: '+91 80 4900 1234', website: 'https://www.sequel-global.com' },
            { id: 'l3', name: 'BVC Logistics', type: 'Secure Transport', contact: '+91 22 7100 1234', website: 'https://www.bvclogistics.com' }
        ];
    }
};

export default apiService;
