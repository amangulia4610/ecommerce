# E-commerce Admin Dashboard

## Overview
A comprehensive admin dashboard for managing an e-commerce platform with full CRUD operations for categories, subcategories, products, and orders.

## Features Implemented

### 🏗️ Backend Infrastructure
- **Category Management**: Complete CRUD operations with image upload
- **SubCategory Management**: CRUD operations with category relationships
- **Product Management**: Advanced product management with multiple images, pricing, inventory
- **Order Management**: Order tracking, status updates, analytics
- **Authentication**: Admin role-based access control

### 🎨 Frontend Admin Interface
- **Admin Dashboard**: Overview with statistics and quick actions
- **Category Management**: Add, edit, delete categories with image uploads
- **SubCategory Management**: Manage subcategories with category relationships
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Form Validations**: Client-side and server-side validation
- **Image Handling**: Cloudinary integration for image uploads

## API Endpoints

### Categories
- `POST /api/category/add-category` - Add new category
- `GET /api/category/get-categories` - Get all categories
- `GET /api/category/get-category/:id` - Get single category
- `PUT /api/category/update-category/:id` - Update category
- `DELETE /api/category/delete-category/:id` - Delete category

### SubCategories
- `POST /api/subcategory/add-subcategory` - Add new subcategory
- `GET /api/subcategory/get-subcategories` - Get all subcategories
- `GET /api/subcategory/get-subcategories-by-category/:categoryId` - Get by category
- `GET /api/subcategory/get-subcategory/:id` - Get single subcategory
- `PUT /api/subcategory/update-subcategory/:id` - Update subcategory
- `DELETE /api/subcategory/delete-subcategory/:id` - Delete subcategory

### Products
- `POST /api/product/add-product` - Add new product
- `GET /api/product/get-products` - Get all products (with pagination & filters)
- `GET /api/product/get-product/:id` - Get single product
- `PUT /api/product/update-product/:id` - Update product
- `DELETE /api/product/delete-product/:id` - Delete product
- `PATCH /api/product/toggle-publish/:id` - Toggle publish status

### Orders
- `GET /api/order/get-orders` - Get all orders (with pagination & filters)
- `GET /api/order/get-order/:id` - Get single order
- `PUT /api/order/update-order-status/:id` - Update order status
- `DELETE /api/order/delete-order/:id` - Delete order
- `GET /api/order/order-stats` - Get order statistics

## Database Models

### Category Model
```javascript
{
  name: String (required, unique),
  image: String (required),
  timestamps: true
}
```

### SubCategory Model
```javascript
{
  name: String (required),
  image: String (optional),
  category: [ObjectId] (references Category),
  timestamps: true
}
```

### Product Model
```javascript
{
  name: String,
  image: [String] (array of image URLs),
  category: [ObjectId] (references Category),
  subCategory: [ObjectId] (references SubCategory),
  unit: String,
  stock: Number,
  price: Number (required),
  discount: Number,
  description: String,
  more_details: Object,
  publish: Boolean (default: true),
  timestamps: true
}
```

### Order Model
```javascript
{
  userId: ObjectId (references User),
  orderId: String (required, unique),
  productId: ObjectId (references Product),
  product_details: Object,
  paymentId: String,
  payment_status: String,
  delivery_address: ObjectId (references Address),
  subTotalAmt: Number,
  totalAmt: Number,
  invoice_receipt: String,
  timestamps: true
}
```

## Admin Access

### Role-Based Access
- Only users with `role: 'ADMIN'` can access admin routes
- Admin dashboard is accessible at `/admin`
- Admin menu appears in user dropdown for admin users

### Admin Routes
- `/admin` - Main dashboard with statistics
- `/admin/categories` - Category management
- `/admin/subcategories` - SubCategory management
- `/admin/products` - Product management (to be implemented)
- `/admin/orders` - Order management (to be implemented)

## Features

### ✅ Implemented
1. **Category Management**
   - Add categories with name and image
   - Edit category details
   - Delete categories
   - View all categories in grid layout
   - Search functionality
   - Image upload with validation

2. **SubCategory Management**
   - Add subcategories with multiple category relationships
   - Edit subcategory details
   - Delete subcategories
   - View all subcategories with category tags
   - Search functionality
   - Optional image upload

3. **Admin Dashboard**
   - Statistics overview (orders, revenue, products, categories)
   - Quick action buttons
   - Admin role validation
   - Responsive design

### 🚧 To Be Implemented
1. **Product Management Page**
   - Advanced product form with multiple images
   - Inventory management
   - Bulk operations
   - Product variants

2. **Order Management Page**
   - Order list with filters
   - Order status updates
   - Order details view
   - Analytics charts

3. **User Management**
   - View all users
   - User role management
   - User activity tracking

4. **Analytics Dashboard**
   - Sales charts
   - Performance metrics
   - Revenue trends

## Validations

### Client-Side Validations
- Required field validation
- Image file type and size validation
- Form data validation before submission

### Server-Side Validations
- Unique name validation for categories and subcategories
- Required field validation
- File upload validation
- Authentication and authorization checks

## Security Features
- JWT authentication for admin routes
- File upload security with type and size restrictions
- Input sanitization
- Role-based access control

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Cloudinary account for image uploads

### Environment Variables
```env
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Application
1. Start the server: `npm start` (in server directory)
2. Start the client: `npm run dev` (in client directory)
3. Access admin dashboard at: `http://localhost:5173/admin`

### Admin User Setup
To access admin features, ensure your user account has `role: 'ADMIN'` in the database.

## Technology Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Redux Toolkit, React Router
- **Styling**: Tailwind CSS
- **Image Upload**: Cloudinary
- **Authentication**: JWT tokens
- **Validation**: Custom validation middleware

## Next Steps
1. Complete product management interface
2. Implement order management system
3. Add advanced analytics and reporting
4. Implement bulk operations
5. Add export/import functionality
