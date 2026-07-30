# GoldArc - Jewellery Franchise Management System

A professional, production-ready web application for managing jewellery franchise operations built with React, Vite, and Tailwind CSS.

## 🌟 Features

### Public Portal
- **Product Catalogue**: Browse 50 jewellery products across 5 categories (Gold, Diamond, Silver, Platinum, Gemstone)
- **Promotional Carousel**: Auto-sliding banners showcasing collections
- **Responsive Design**: Mobile-first, fully responsive UI
- **Search & Filter**: Advanced product filtering by category and availability

### Franchise Branch Portal (4 Branches)
- **Dashboard**: Overview of orders, cart value, and quick actions
- **Product Catalogue**: View products with prices and detailed information
- **Wishlist**: Save favorite products for later
- **Shopping Cart**: Add products, manage quantities, place orders
- **Order Tracking**: Amazon-like order tracking with status updates
- **Order Cancellation**: Cancel orders with predefined or custom reasons

### Franchise Owner (HQ) Portal
- **Analytics Dashboard**: Revenue charts, order trends, branch performance
- **Inventory Management**: Approve/reject branch inventory requests
- **Order Management**: Update order status, set delivery dates
- **Transaction History**: Complete transaction logs
- **Job Cards**: Create and manage job cards for orders

### Admin Panel
- **Full System Control**: Manage products, users, orders, and banners
- **Product Management**: CRUD operations for all products
- **User Management**: Manage franchise users and credentials
- **Analytics**: Comprehensive charts and reports
- **Bulk Upload**: Excel-based bulk product upload (placeholder)

## 🔐 Authentication

### Pre-configured Credentials

**Admin:**
- Username: `admin`
- Password: `admin123`

**Franchise Owner (HQ):**
- Username: `owner`
- Password: `owner123`

**Franchise Branches:**
1. **Mumbai Branch**
   - Username: `mumbai`
   - Password: `mumbai123`

2. **Delhi Branch**
   - Username: `delhi`
   - Password: `delhi123`

3. **Bangalore Branch**
   - Username: `bangalore`
   - Password: `bangalore123`

4. **Chennai Branch**
   - Username: `chennai`
   - Password: `chennai123`

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
goldarc/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Carousel.jsx
│   │   ├── Modal.jsx
│   │   └── SkeletonLoader.jsx
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── OrderContext.jsx
│   ├── data/               # Mock data
│   │   ├── products.js     # 50 jewellery products
│   │   ├── credentials.js  # User credentials
│   │   └── banners.js      # Promotional banners
│   ├── pages/              # Page components
│   │   ├── public/         # Public pages
│   │   ├── auth/           # Authentication pages
│   │   ├── franchise/      # Branch portal pages
│   │   ├── owner/          # Owner portal pages
│   │   └── admin/          # Admin panel pages
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

## 🎨 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Excel Processing**: XLSX (for bulk upload)

## 🎯 Key Features

### Role-Based Access Control
- Public users: View-only access (no prices)
- Franchise branches: Full shopping experience
- Franchise owner: Inventory and order management
- Admin: Complete system control

### Data Persistence
- LocalStorage for cart, wishlist, and orders
- Session persistence for authentication

### UI/UX Excellence
- Luxury jewellery theme (Gold/Black/Ivory palette)
- Smooth animations and transitions
- Skeleton loaders for better UX
- Toast notifications for user feedback
- Modal confirmations for critical actions
- Fully responsive (mobile, tablet, desktop)

## 🔄 Future Enhancements

- Backend integration with MongoDB
- Real-time notifications
- Payment gateway integration
- Advanced analytics and reporting
- Email notifications
- PDF invoice generation
- Image upload for products
- Multi-language support

## 📝 License

This project is created for demonstration purposes.

## 👥 Support

For support or questions, contact: info@goldarc.com

---

**Built with ❤️ by the GoldArc Team**
