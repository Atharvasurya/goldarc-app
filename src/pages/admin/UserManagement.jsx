import React, { useState } from 'react';
import { useUsers } from '../../context/UserContext';
import { Plus, Edit2, Trash2, X, Shield, Mail, User as UserIcon } from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';

const UserManagement = () => {
    const { users, isLoading, addUser, updateUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        role: USER_ROLES.FRANCHISE_BRANCH,
        location: '',
        branchCode: ''
    });

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({ ...user, password: '' }); // Don't show password
        } else {
            setEditingUser(null);
            setFormData({
                username: '',
                password: '',
                name: '',
                email: '',
                role: USER_ROLES.FRANCHISE_BRANCH,
                location: '',
                branchCode: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await updateUser(editingUser.id, formData);
        } else {
            await addUser(formData);
        }
        setIsModalOpen(false);
    };

    if (isLoading) return <div className="p-8 text-center">Loading Users...</div>;

    return (
        <div className="min-h-screen bg-ivory-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif font-bold text-gray-900">User Management</h1>
                    <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
                        <Plus size={20} /> Add User
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Branch Info</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-ivory-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
                                                <UserIcon size={20} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">@{user.username} | {user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {user.branchCode ? (
                                            <div>
                                                <p className="font-semibold">{user.branchCode}</p>
                                                <p className="text-xs">{user.location}</p>
                                            </div>
                                        ) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleOpenModal(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                                <Edit2 size={18} />
                                            </button>
                                            {user.username !== 'admin' && (
                                                <button onClick={() => deleteUser(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="bg-gold-600 p-4 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingUser ? 'Edit User' : 'New User'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Full Name</label>
                                <input type="text" required className="w-full border rounded-lg p-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Username</label>
                                <input type="text" required className="w-full border rounded-lg p-2" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                            </div>
                            {!editingUser && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700">Password</label>
                                    <input type="password" required className="w-full border rounded-lg p-2" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Email</label>
                                <input type="email" required className="w-full border rounded-lg p-2" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Role</label>
                                <select className="w-full border rounded-lg p-2" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                                    {Object.values(USER_ROLES).map(role => (
                                        <option key={role} value={role}>{role.replace(/_/g, ' ').toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                            {formData.role === USER_ROLES.FRANCHISE_BRANCH && (
                                <>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Branch Code</label>
                                        <input type="text" required className="w-full border rounded-lg p-2" value={formData.branchCode} onChange={e => setFormData({ ...formData, branchCode: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Location</label>
                                        <input type="text" required className="w-full border rounded-lg p-2" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg font-bold">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-gold-600 text-white rounded-lg font-bold shadow-lg">Save User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
