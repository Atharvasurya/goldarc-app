import React, { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { Bell, Check, Clock, Package, Info, Trash2 } from 'lucide-react';
import { formatDateTime } from '../utils/helpers';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'new_order':
        return <Package className="text-blue-500" size={24} />;
      case 'order_update':
        return <Clock className="text-gold-600" size={24} />;
      default:
        return <Info className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gold-100 rounded-full">
              <Bell className="text-gold-600" size={28} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-semibold text-gold-600 hover:text-gold-700 flex items-center space-x-2 bg-gold-50 px-4 py-2 rounded-lg border border-gold-100 transition-all"
            >
              <Check size={16} />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`group relative bg-white p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md ${notification.isRead ? 'border-gray-100 opacity-80' : 'border-gold-200 bg-gold-50/10'
                  }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-xl ${notification.isRead ? 'bg-gray-100' : 'bg-gold-50'
                    }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-bold text-lg ${notification.isRead ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 font-medium">
                        {formatDateTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1 leading-relaxed">{notification.message}</p>

                    <div className="mt-4 flex items-center space-x-4">
                      {notification.link && (
                        <Link
                          to={notification.link}
                          className="text-sm font-bold text-gold-600 hover:text-gold-700 hover:underline"
                        >
                          View Details →
                        </Link>
                      )}
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {!notification.isRead && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-gold-500 rounded-full"></div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-gray-300" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications yet</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                We'll notify you when there's an update on your orders or stock requests.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
