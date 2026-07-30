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
  const isFirstLoad = useRef(true);

  // Real-time Firestore listener
  useEffect(() => {
    isFirstLoad.current = true;
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
      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));

      // Only trigger toast popups for newly added notifications AFTER initial page load
      if (!isFirstLoad.current) {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const n = {
              id: change.doc.id,
              ...change.doc.data(),
              createdAt: change.doc.data().createdAt?.toDate?.() || new Date()
            };
            toast((t) => (
              <div className="flex items-center justify-between gap-3 w-full pr-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔔</span>
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">{n.title}</h5>
                    <p className="text-xs text-gray-600 line-clamp-2">{n.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center font-bold text-xs"
                  aria-label="Close notification"
                >
                  ✕
                </button>
              </div>
            ), {
              duration: 5000,
              style: {
                minWidth: '280px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }
            });
          }
        });
      }

      isFirstLoad.current = false;
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.isRead).length);
    }, (error) => {
      console.error('Notification listener error:', error);
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
