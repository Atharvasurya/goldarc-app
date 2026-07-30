import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiService = {
    // Orders
    getOrders: async () => {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    },
    createOrder: async (orderData) => {
        const response = await axios.post(`${API_URL}/orders`, orderData);
        return response.data;
    },
    updateOrder: async (orderId, status, remarks) => {
        const response = await axios.patch(`${API_URL}/orders/${orderId}`, { status, remarks });
        return response.data;
    },

    // Products
    getProducts: async () => {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    },
    createProduct: async (productData) => {
        const response = await axios.post(`${API_URL}/products`, productData);
        return response.data;
    },
    updateProduct: async (id, productData) => {
        const response = await axios.patch(`${API_URL}/products/${id}`, productData);
        return response.data;
    },
    deleteProduct: async (id) => {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        return response.data;
    },
    bulkUploadProducts: async (products) => {
        const response = await axios.post(`${API_URL}/products/bulk`, products);
        return response.data;
    },
    seedProducts: async (products) => {
        const response = await axios.post(`${API_URL}/products/seed`, products);
        return response.data;
    },

    // Notifications
    getNotifications: async (userId) => {
        const response = await axios.get(`${API_URL}/notifications/${userId}`);
        return response.data;
    },
    markNotificationsRead: async (userId) => {
        const response = await axios.put(`${API_URL}/notifications/${userId}/read-all`);
        return response.data;
    },
    markSingleNotificationRead: async (id) => {
        const response = await axios.put(`${API_URL}/notifications/${id}/read`);
        return response.data;
    },

    // Job Cards
    getJobCards: async () => {
        const response = await axios.get(`${API_URL}/job-cards`);
        return response.data;
    },
    createJobCard: async (data) => {
        const response = await axios.post(`${API_URL}/job-cards`, data);
        return response.data;
    },
    updateJobCard: async (id, data) => {
        const response = await axios.patch(`${API_URL}/job-cards/${id}`, data);
        return response.data;
    },
    deleteJobCard: async (id) => {
        const response = await axios.delete(`${API_URL}/job-cards/${id}`);
        return response.data;
    },

    // Banners
    getBanners: async () => {
        const response = await axios.get(`${API_URL}/banners`);
        return response.data;
    },
    createBanner: async (data) => {
        const response = await axios.post(`${API_URL}/banners`, data);
        return response.data;
    },
    updateBanner: async (id, data) => {
        const response = await axios.patch(`${API_URL}/banners/${id}`, data);
        return response.data;
    },
    deleteBanner: async (id) => {
        const response = await axios.delete(`${API_URL}/banners/${id}`);
        return response.data;
    },

    // Users
    getUsers: async () => {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    },
    createUser: async (data) => {
        const response = await axios.post(`${API_URL}/users`, data);
        return response.data;
    },
    updateUser: async (id, data) => {
        const response = await axios.patch(`${API_URL}/users/${id}`, data);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data;
    },
    seedUsers: async (users) => {
        const response = await axios.post(`${API_URL}/users/seed`, users);
        return response.data;
    },

    // Branch Stock
    getBranchStock: async (branchId) => {
        const url = branchId ? `${API_URL}/branch-stock?branchId=${branchId}` : `${API_URL}/branch-stock`;
        const response = await axios.get(url);
        return response.data;
    },
    updateBranchStock: async (id, data) => {
        const response = await axios.patch(`${API_URL}/branch-stock/${id}`, data);
        return response.data;
    },

    // Logistics
    getLogisticsPartners: async () => {
        const response = await axios.get(`${API_URL}/logistics-partners`);
        return response.data;
    },


};

export default apiService;
