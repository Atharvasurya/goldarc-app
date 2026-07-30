import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as initialProducts } from '../data/products';
import apiService from '../services/apiService';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        try {
            let data = await apiService.getProducts();

            // Auto-Seed if database is empty
            if (data.length === 0 && initialProducts.length > 0) {
                console.log('[ProductContext] Database empty, seeding initial products...');
                await apiService.seedProducts(initialProducts);
                data = await apiService.getProducts();
            }

            const normalizedData = data.map(p => ({
                ...p,
                id: p._id || p.id || p.productId || generateId()
            }));
            setProducts(normalizedData);
            setIsLoading(false);
        } catch (err) {
            console.error('[ProductContext] Fetch error:', err);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        const interval = setInterval(fetchProducts, 10000); // 10s polling for products (less frequent than orders)
        return () => clearInterval(interval);
    }, [fetchProducts]);

    const addProduct = async (productData) => {
        try {
            const newProduct = await apiService.createProduct(productData);
            const normalized = { ...newProduct, id: newProduct._id };
            setProducts(prev => [...prev, normalized]);
            toast.success('Product added successfully!');
            return normalized;
        } catch (err) {
            toast.error('Failed to add product');
            throw err;
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            const updated = await apiService.updateProduct(id, productData);
            const normalized = { ...updated, id: updated._id };
            setProducts(prev => prev.map(p => p.id === id ? normalized : p));
            toast.success('Product updated successfully!');
            return normalized;
        } catch (err) {
            toast.error('Failed to update product');
            throw err;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await apiService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success('Product deleted successfully');
        } catch (err) {
            toast.error('Failed to delete product');
            throw err;
        }
    };

    const updateStock = async (productId, quantityToSubtract) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const newStock = Math.max(0, product.stock - quantityToSubtract);
        await updateProduct(productId, {
            stock: newStock,
            availability: newStock === 0 ? 'Out of Stock' : newStock < 5 ? 'Limited' : 'In Stock'
        });
    };

    const getProductById = (id) => {
        return products.find(p => p.id === id);
    };

    const value = {
        products,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        getProductById,
        refreshProducts: fetchProducts
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
