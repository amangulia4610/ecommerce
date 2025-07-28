# 20 Degrees Ecommerce Platform - Technical Documentation

## 📋 Project Overview

**20 Degrees** is a full-stack ecommerce web application built for health & wellness products. The platform features a modern React frontend with a robust Express.js backend, deployed on Vercel with MongoDB Atlas for data persistence.

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐    MongoDB    ┌─────────────────┐
│                 │ ──────────────→ │                 │ ──────────── │                 │
│   React Client  │                 │  Express.js API │               │  MongoDB Atlas  │
│   (Frontend)    │ ←────────────── │   (Backend)     │ ←──────────── │   (Database)    │
└─────────────────┘    JSON/API     └─────────────────┘               └─────────────────┘
```

## 🚀 Deployment Strategy

### Frontend Deployment (Vercel)
- **Platform**: Vercel
- **Framework**: Vite + React
- **Build Tool**: Vite
- **URL**: https://20deg.vercel.app

### Backend Deployment (Vercel)
- **Platform**: Vercel Serverless Functions
- **Framework**: Express.js
- **Runtime**: Node.js
- **URL**: https://20deg-backend.vercel.app

## 📁 Project Structure

```
ecommerce/
├── client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   │   ├── 20-degrees-logo.png
│   │   ├── apple-watch.png
│   │   └── ...other images
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ...
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   └── useCart.js
│   │   ├── store/                   # Redux store configuration
│   │   │   ├── store.js
│   │   │   ├── userSlice.js
│   │   │   └── cartSlice.js
│   │   ├── utils/                   # Utility functions
│   │   │   └── Axios.js
│   │   ├── common/                  # Common configurations
│   │   │   └── SummaryApi.jsx       # API endpoints configuration
│   │   └── route/                   # React Router configuration
│   │       └── index.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json                  # Frontend deployment config
├── server/                          # Backend Express Application
│   ├── config/                      # Configuration files
│   │   ├── connectDB.js             # MongoDB connection
│   │   └── sendemail.js             # Email service
│   ├── controllers/                 # Business logic
│   │   ├── user.controller.js
│   │   ├── product.controller.js
│   │   ├── category.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   └── address.controller.js
│   ├── middleware/                  # Express middleware
│   │   ├── auth.js                  # JWT authentication
│   │   ├── adminAuth.js             # Admin authorization
│   │   └── multer.js                # File upload handling
│   ├── models/                      # MongoDB data models
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── category.model.js
│   │   ├── cartProduct.model.js
│   │   ├── order.model.js
│   │   └── address.model.js
│   ├── route/                       # API routes
│   │   ├── user.route.js
│   │   ├── product.route.js
│   │   ├── category.route.js
│   │   ├── cart.route.js
│   │   ├── order.route.js
│   │   └── address.route.js
│   ├── utils/                       # Utility functions
│   │   ├── generatedAccessToken.js
│   │   ├── generatedRefreshToken.js
│   │   ├── uploadImageCloudinary.js
│   │   └── ...
│   ├── index.js                     # Main server file
│   ├── api.js                       # Vercel serverless entry point
│   ├── package.json
│   └── vercel.json                  # Backend deployment config
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router DOM 7.7.0
- **HTTP Client**: Axios 1.11.0
- **UI Notifications**: React Hot Toast 2.5.2
- **Icons**: React Icons 5.5.0

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.16.4
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **File Upload**: Multer 2.0.2
- **Image Storage**: Cloudinary 2.7.0
- **Email Service**: Resend 4.7.0
- **Security**: Helmet 8.1.0, CORS 2.8.5
- **Logging**: Morgan 1.10.1

### Database
- **Primary Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Collections**: users, products, categories, cartProducts, orders, addresses

### Deployment & DevOps
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Vercel Serverless Functions
- **Database Hosting**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Email Service**: Resend
- **Version Control**: Git + GitHub

## 🔗 API Endpoints

### Authentication & User Management
```
POST   /api/user/register              # User registration
POST   /api/user/verify-email          # Email verification
POST   /api/user/login                 # User login
GET    /api/user/logout                # User logout
GET    /api/user/user-details           # Get user profile
PUT    /api/user/update-user            # Update user profile
PUT    /api/user/upload-avatar          # Upload profile picture
POST   /api/user/refresh-token          # Refresh JWT token
PUT    /api/user/forgot-password        # Password reset request
PUT    /api/user/verify-forgot-password-otp  # Verify reset OTP
PUT    /api/user/reset-password         # Reset password
```

### Product Management
```
GET    /api/product/get-products        # Get products (with filters)
GET    /api/product/get-product/:id     # Get single product
POST   /api/product/add-product         # Add new product (Admin)
PUT    /api/product/update-product/:id  # Update product (Admin)
DELETE /api/product/delete-product/:id  # Delete product (Admin)
PATCH  /api/product/toggle-publish/:id  # Toggle product visibility
```

### Category Management
```
GET    /api/category/get-categories     # Get all categories
GET    /api/category/get-category/:id   # Get single category
POST   /api/category/add-category       # Add category (Admin)
PUT    /api/category/update-category/:id # Update category (Admin)
DELETE /api/category/delete-category/:id # Delete category (Admin)
```

### Shopping Cart
```
GET    /api/cart/get-cart              # Get user cart
POST   /api/cart/add-to-cart           # Add item to cart
PUT    /api/cart/update-cart-quantity  # Update item quantity
DELETE /api/cart/remove-from-cart     # Remove item from cart
DELETE /api/cart/clear-cart           # Clear entire cart
```

### Order Management
```
POST   /api/order/create-order         # Create new order
GET    /api/order/user-orders          # Get user's orders
GET    /api/order/user-order/:id       # Get specific user order
GET    /api/order/get-orders           # Get all orders (Admin)
GET    /api/order/get-order/:id        # Get specific order (Admin)
PUT    /api/order/update-order-status/:id # Update order status
DELETE /api/order/delete-order/:id     # Delete order (Admin)
GET    /api/order/order-stats          # Get order statistics
```

### Address Management
```
GET    /api/address/get-addresses      # Get user addresses
GET    /api/address/get-address/:id    # Get specific address
POST   /api/address/create-address     # Add new address
PUT    /api/address/update-address/:id # Update address
DELETE /api/address/delete-address/:id # Delete address
```

### Admin User Management
```
GET    /api/admin/user/all-users       # Get all users
GET    /api/admin/user/stats           # Get user statistics
GET    /api/admin/user/:userId         # Get user details
PUT    /api/admin/user/:userId/status  # Update user status
PUT    /api/admin/user/:userId/role    # Update user role
PUT    /api/admin/user/:userId/verify-email # Verify user email
DELETE /api/admin/user/:userId         # Delete user
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  avatar: String,
  mobile: Number,
  refresh_token: String,
  verify_email: Boolean (default: false),
  last_login_date: Date,
  status: String (enum: ["Active", "Inactive", "Suspended"]),
  address_details: [ObjectId],
  shopping_cart: [ObjectId],
  orderHistory: [ObjectId],
  role: String (enum: ["ADMIN", "USER"])
}
```

### Product Model
```javascript
{
  name: String (required),
  image: [String],
  category: [ObjectId] (ref: 'category'),
  subCategory: [ObjectId] (ref: 'subCategory'),
  unit: String,
  stock: Number (default: 0),
  price: Number (required),
  discount: Number (default: 0),
  description: String,
  more_details: Object,
  publish: Boolean (default: true)
}
```

### Category Model
```javascript
{
  name: String (required),
  image: String
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: 'user'),
  orderId: String (unique),
  items: [{
    productId: ObjectId (ref: 'product'),
    product_details: Object,
    paymentId: String,
    payment_status: String,
    delivery_status: String,
    subTotalAmt: Number,
    totalAmt: Number
  }],
  totalQty: Number,
  totalAmount: Number,
  address_details: Object,
  invoice_receipt: String
}
```

## 🔒 Authentication & Security

### JWT Authentication
- **Access Token**: Short-lived (15 minutes)
- **Refresh Token**: Long-lived (7 days)
- **Storage**: Access token in localStorage, Refresh token in httpOnly cookies

### Security Measures
- Password hashing with bcryptjs
- JWT token-based authentication
- CORS configuration
- Helmet for security headers
- Input validation and sanitization
- Admin role-based authorization
- File upload restrictions

## 🌍 Environment Variables

### Frontend (.env)
```
VITE_BACKEND_URL=https://20deg-backend.vercel.app
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET_KEY=your-jwt-secret-key
FRONTEND_URL=https://20deg.vercel.app
NODE_ENV=production
RESEND_API_KEY=your-resend-api-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## 🚀 Deployment Process

### Frontend Deployment
1. **Framework**: Vite
2. **Root Directory**: `./client`
3. **Build Command**: `vite build`
4. **Output Directory**: `dist`
5. **Environment Variables**: Set in Vercel dashboard

### Backend Deployment
1. **Framework**: Other
2. **Root Directory**: `./server`
3. **Build Command**: (none)
4. **Entry Point**: `api.js` (Vercel serverless function)
5. **Environment Variables**: Set in Vercel dashboard

## 📱 Features

### Customer Features
- User registration and authentication
- Product browsing with filters and search
- Shopping cart management
- Order placement and tracking
- User profile management
- Address management
- Order history
- Responsive design

### Admin Features
- Product management (CRUD operations)
- Category management
- Order management and status updates
- User management
- Dashboard with statistics
- Inventory management

## 🔧 Development Setup

### Prerequisites
```bash
Node.js (v18 or higher)
npm or yarn
MongoDB Atlas account
Cloudinary account (for image storage)
Resend account (for emails)
```

### Local Development
```bash
# Clone the repository
git clone https://github.com/amangulia4610/ecommerce.git
cd ecommerce

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Set up environment variables
# Create .env files in both client and server directories

# Start development servers
# Frontend (in client directory)
npm run dev

# Backend (in server directory)
npm run dev
```

## 📊 Performance Considerations

- **Frontend**: Code splitting with React.lazy and Suspense
- **Backend**: Serverless functions for auto-scaling
- **Database**: Indexed queries for faster data retrieval
- **Images**: Cloudinary for optimized image delivery
- **Caching**: Browser caching for static assets

## 🐛 Common Issues & Solutions

### CORS Issues
- Ensure FRONTEND_URL is set correctly in backend environment
- Check that VITE_BACKEND_URL is set in frontend environment

### Database Connection
- Verify MongoDB URI is correct
- Check network access settings in MongoDB Atlas

### Image Upload
- Confirm Cloudinary credentials are valid
- Check file size and format restrictions

## 📈 Future Enhancements

- Payment gateway integration
- Real-time notifications
- Product reviews and ratings
- Wishlist functionality
- Advanced analytics dashboard
- Mobile app development
- Multi-language support
- SEO optimization

## 👥 Team Roles & Responsibilities

### Frontend Developer
- React component development
- UI/UX implementation
- State management
- API integration

### Backend Developer
- API development
- Database design
- Authentication system
- Business logic implementation

### DevOps Engineer
- Deployment configuration
- Environment management
- Performance monitoring
- Security implementation

## 📞 Support & Contact

For technical issues or questions:
- **Repository**: https://github.com/amangulia4610/ecommerce
- **Frontend URL**: https://20deg.vercel.app
- **Backend URL**: https://20deg-backend.vercel.app

---

**Last Updated**: July 27, 2025
**Version**: 1.0.0
**Maintained by**: Development Team
