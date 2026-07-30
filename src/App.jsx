import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import { JobCardProvider } from './context/JobCardContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';

// Public Pages
import Home from './pages/public/Home';
import Collection from './pages/public/Collection';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import NotificationsPage from './pages/NotificationsPage';

// Auth Pages
import AdminLogin from './pages/auth/AdminLogin';
import FranchiseLogin from './pages/auth/FranchiseLogin';

// Franchise Branch Pages
import BranchDashboard from './pages/franchise/BranchDashboard';
import BranchCatalogue from './pages/franchise/BranchCatalogue';
import BranchWishlist from './pages/franchise/BranchWishlist';
import BranchCart from './pages/franchise/BranchCart';
import BranchOrders from './pages/franchise/BranchOrders';
import BranchStock from './pages/franchise/BranchStock';
import AdminStockManagement from './pages/admin/AdminStockManagement';
import LogisticsPortal from './pages/shared/LogisticsPortal';

// Franchise Owner Pages
// Franchise Owner Pages
import InventoryRequests from './pages/owner/InventoryRequests';
import JobCards from './pages/owner/JobCards';
import TransactionHistory from './pages/owner/TransactionHistory';
import StockMovement from './pages/owner/StockMovement';
import BillingHistory from './pages/owner/BillingHistory';

// Head Office Pages
// Head Office Pages
import HeadOfficeOrders from './pages/headoffice/HeadOfficeOrders';
import HeadOfficeBranches from './pages/headoffice/HeadOfficeBranches';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import BulkUpload from './pages/admin/BulkUpload';
import UserManagement from './pages/admin/UserManagement';
import BannerManagement from './pages/admin/BannerManagement';

import { USER_ROLES } from './utils/constants';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <JobCardProvider>
                <NotificationProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                          <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/collection" element={<Collection />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/notifications" element={<NotificationsPage />} />

                            {/* Auth Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/franchise/login" element={<FranchiseLogin />} />

                            {/* Franchise Branch Routes */}
                            <Route
                              path="/franchise/dashboard"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.FRANCHISE_BRANCH}>
                                  <BranchDashboard />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/franchise/catalogue"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.FRANCHISE_BRANCH}>
                                  <BranchCatalogue />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/franchise/wishlist"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.FRANCHISE_BRANCH}>
                                  <BranchWishlist />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/franchise/cart"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.FRANCHISE_BRANCH}>
                                  <BranchCart />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/franchise/orders"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.FRANCHISE_BRANCH}>
                                  <BranchOrders />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/franchise/stock"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.FRANCHISE_BRANCH}>
                                  <BranchStock />
                                </ProtectedRoute>
                              }
                            />

                            {/* Unified Admin Routes (Replacing HeadOffice and Owner) */}
                            <Route
                              path="/admin/dashboard"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <AdminDashboard />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/inventory-requests"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <InventoryRequests />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/stock"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <AdminStockManagement />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/logistics"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <LogisticsPortal />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/job-cards"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <JobCards />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/transactions"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <TransactionHistory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/stock-movement"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <StockMovement />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/billing"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <BillingHistory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/orders"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <HeadOfficeOrders />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/branches"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <HeadOfficeBranches />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/products"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <ProductManagement />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/bulk-upload"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <BulkUpload />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/users"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <UserManagement />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/admin/banners"
                              element={
                                <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                                  <BannerManagement />
                                </ProtectedRoute>
                              }
                            />
                          </Routes>
                        </main>
                        <Footer />

                        <ScrollToTop />
                        <Chatbot />
                      </div>
                      <Toaster
                        position="top-right"
                        toastOptions={{
                          duration: 3000,
                          style: {
                            background: '#fff',
                            color: '#333',
                          },
                          success: {
                            iconTheme: {
                              primary: '#d6ab4b',
                              secondary: '#fff',
                            },
                          },
                        }}
                      />
                    </WishlistProvider>
                  </CartProvider>
                </NotificationProvider>
              </JobCardProvider>
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
