// Mock API service layer for future backend integration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Products
    async getProducts() {
        // Mock implementation - replace with actual API call
        return { products: [] };
    }

    async getProductById(id) {
        return { product: null };
    }

    async createProduct(productData) {
        return { product: productData };
    }

    async updateProduct(id, productData) {
        return { product: productData };
    }

    async deleteProduct(id) {
        return { success: true };
    }

    // Orders
    async getOrders() {
        return { orders: [] };
    }

    async createOrder(orderData) {
        return { order: orderData };
    }

    async updateOrder(id, orderData) {
        return { order: orderData };
    }

    // Users
    async getUsers() {
        return { users: [] };
    }

    async createUser(userData) {
        return { user: userData };
    }

    async updateUser(id, userData) {
        return { user: userData };
    }

    async deleteUser(id) {
        return { success: true };
    }

    // Banners
    async getBanners() {
        return { banners: [] };
    }

    async createBanner(bannerData) {
        return { banner: bannerData };
    }

    async updateBanner(id, bannerData) {
        return { banner: bannerData };
    }

    async deleteBanner(id) {
        return { success: true };
    }
}

export default new ApiService();
