// Vercel-compatible API handler
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB().catch(console.error);

// Middleware
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'API is working!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: 'API server is running',
        timestamp: new Date().toISOString()
    });
});

// Import and use real routes
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import userAdminRouter from './route/user.admin.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';

// Use routes
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/admin/user', userAdminRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

export default app;
