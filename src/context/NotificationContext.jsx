import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, onSnapshot, updateDoc, doc, writeBatch } from 'firebase/firestore';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Real-time Firestore listener
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    const userId = user.role === 'admin' ? 'admin' : user.id;

    // Create query for user's notifications
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lastSeenId = localStorage.getItem(`goldarc_last_notif_${userId}`);

      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));

      // Find truly new notifications
      if (lastSeenId && newNotifications.length > 0) {
        const newItems = newNotifications.filter(n => n.id > lastSeenId);
        newItems.forEach(n => {
          toast.success(`${n.title}: ${n.message}`, {
            duration: 4000,
            icon: '🔔'
          });
        });
      }

      // Update the baseline if we have data
      if (newNotifications.length > 0) {
        localStorage.setItem(`goldarc_last_notif_${userId}`, newNotifications[0].id);
      }

      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.isRead).length);
    }, (error) => {
      console.error('Notification listener error:', error);
      // Fallback to API polling if Firestore listener fails
      console.log('Falling back to API polling...');
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]);

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      const userId = user.role === 'admin' ? 'admin' : user.id;

      // Update all unread notifications in Firestore
      const batch = writeBatch(db);
      notifications.filter(n => !n.isRead).forEach(notification => {
        const notifRef = doc(db, 'notifications', notification.id);
        batch.update(notifRef, { isRead: true });
      });
      await batch.commit();

      // Local state will be updated automatically by the listener
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      toast.error('Failed to mark as read');
    }
  };

  const markAsRead = async (id) => {
    try {
      const notifRef = doc(db, 'notifications', id);
      await updateDoc(notifRef, { isRead: true });

      // Local state will be updated automatically by the listener
    } catch (err) {
      console.error('Failed to mark as read:', err);
      toast.error('Failed to update notification');
    }
  };

  const value = {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
    refresh: () => { } // No longer needed with real-time updates
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
