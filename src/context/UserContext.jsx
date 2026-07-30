import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';
import { CREDENTIALS } from '../data/credentials';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within UserProvider');
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      let data = await apiService.getUsers();

      // Seed if empty
      if (data.length === 0) {
        const initialUsers = [
          CREDENTIALS.admin,
          CREDENTIALS.franchiseOwner,
          CREDENTIALS.headOffice,
          ...CREDENTIALS.branches
        ];
        await apiService.seedUsers(initialUsers);
        data = await apiService.getUsers();
      }

      setUsers(data.map(u => ({ ...u, id: u._id || u.id || u.userId })));
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (userData) => {
    try {
      const newUser = await apiService.createUser(userData);
      const normalized = { ...newUser, id: newUser._id };
      setUsers(prev => [...prev, normalized]);
      toast.success('User created successfully');
      return normalized;
    } catch (err) {
      toast.error('Failed to create user');
      throw err;
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const updated = await apiService.updateUser(id, userData);
      const normalized = { ...updated, id: updated._id };
      setUsers(prev => prev.map(u => u.id === id ? normalized : u));
      toast.success('User updated successfully');
      return normalized;
    } catch (err) {
      toast.error('Failed to update user');
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await apiService.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('User deleted');
    } catch (err) {
      toast.error('Failed to delete user');
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ users, isLoading, addUser, updateUser, deleteUser, refreshUsers: fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
