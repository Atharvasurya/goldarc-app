import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CREDENTIALS } from '../../data/credentials';
import toast from 'react-hot-toast';

const FranchiseLogin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [showCredentials, setShowCredentials] = useState(false);
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

            // Navigate based on role
            if (result.user.role === 'franchise_owner') {
                navigate('/owner/dashboard');
            } else {
                navigate('/franchise/dashboard');
            }
        } else {
            toast.error('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gold-900 via-gold-800 to-gold-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                        <Building2 className="text-gold-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Franchise Login</h2>
                    <p className="text-gold-200">Sign in to access your franchise portal</p>
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

                    {/* Demo Credentials Toggle */}
                    <div className="mt-6">
                        <button
                            onClick={() => setShowCredentials(!showCredentials)}
                            className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                        >
                            {showCredentials ? 'Hide' : 'Show'} Demo Credentials
                        </button>

                        {showCredentials && (
                            <div className="mt-4 space-y-4">
                                {/* Owner Credentials */}
                                <div className="p-4 bg-gold-50 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Franchise Owner (HQ):</p>
                                    <p className="text-xs text-gray-600">
                                        <strong>Username:</strong> {CREDENTIALS.franchiseOwner.username}<br />
                                        <strong>Password:</strong> {CREDENTIALS.franchiseOwner.password}
                                    </p>
                                </div>

                                {/* Branch Credentials */}
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Branch Logins:</p>
                                    <div className="space-y-2">
                                        {CREDENTIALS.branches.map((branch) => (
                                            <div key={branch.id} className="text-xs text-gray-600">
                                                <strong>{branch.name}:</strong> {branch.username} / {branch.password}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-6">
                    <a href="/" className="text-gold-200 hover:text-white text-sm transition-colors">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FranchiseLogin;
