import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateCredentials } from '../data/credentials';
import { USER_ROLES } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const savedUser = localStorage.getItem('goldarc_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        const validatedUser = validateCredentials(username, password);
        if (validatedUser) {
            setUser(validatedUser);
            localStorage.setItem('goldarc_user', JSON.stringify(validatedUser));
            return { success: true, user: validatedUser };
        }
        return { success: false, error: 'Invalid credentials' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('goldarc_user');
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const isAdmin = () => {
        return user?.role === USER_ROLES.ADMIN;
    };

    const isFranchiseBranch = () => {
        return user?.role === USER_ROLES.FRANCHISE_BRANCH;
    };

    const canManageProducts = () => {
        return user?.role === USER_ROLES.ADMIN;
    };

    const canManageUsers = () => {
        return user?.role === USER_ROLES.ADMIN;
    };

    const canApproveOrders = () => {
        return user?.role === USER_ROLES.ADMIN;
    };

    const canPlaceOrders = () => {
        return user?.role === USER_ROLES.FRANCHISE_BRANCH;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        hasRole,
        isAdmin,
        isFranchiseBranch,
        canManageProducts,
        canManageUsers,
        canApproveOrders,
        canPlaceOrders,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
