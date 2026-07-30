import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(credentials.username, credentials.password);

        if (result.success) {
            toast.success(`Welcome back, ${result.user.name}!`);
            navigate('/admin/dashboard');
        } else {
            toast.error('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full mb-4">
                        <span className="text-white font-bold text-2xl">G</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Admin Login</h2>
                    <p className="text-gray-400">Sign in to access the admin dashboard</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                    className="input-field pl-10"
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    className="input-field pl-10"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full">
                            Sign In
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gold-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
                        <p className="text-xs text-gray-600">
                            <strong>Username:</strong> admin<br />
                            <strong>Password:</strong> admin123
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-6">
                    <a href="/" className="text-gold-400 hover:text-gold-300 text-sm transition-colors">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
