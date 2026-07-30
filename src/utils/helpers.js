// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

// Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
};

// Format date with time
export const formatDateTime = (date) => {
    if (!date) return 'N/A';
    try {
        return new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};

// Generate unique ID
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate total price
export const calculateTotal = (items) => {
    return items.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);
};

// Get availability badge color
export const getAvailabilityColor = (status) => {
    switch (status) {
        case 'In Stock':
            return 'badge-success';
        case 'Limited':
            return 'badge-warning';
        case 'Out of Stock':
            return 'badge-danger';
        default:
            return 'badge-info';
    }
};

// Get order status color
export const getOrderStatusColor = (status) => {
    switch (status) {
        case 'delivered':
            return 'badge-success';
        case 'approved':
        case 'processing':
        case 'dispatched':
        case 'out_for_delivery':
            return 'badge-info';
        case 'pending':
            return 'badge-warning';
        case 'cancelled':
        case 'rejected':
            return 'badge-danger';
        default:
            return 'badge-info';
    }
};

// Format order status for display
export const formatOrderStatus = (status) => {
    if (!status) return 'Unknown';
    return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Validate email
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};
