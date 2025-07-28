// Catch-all API handler for Vercel serverless functions
import connectDB from '../server/config/connectDB.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

// Import routes
import userRouter from '../server/route/user.route.js';
import categoryRouter from '../server/route/category.route.js';
import productRouter from '../server/route/product.route.js';
import cartRouter from '../server/route/cart.route.js';
import userAdminRouter from '../server/route/user.admin.route.js';
import addressRouter from '../server/route/address.route.js';
import orderRouter from '../server/route/order.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        callback(null, true); // Allow all origins for now
    }
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// Routes
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/admin/user', userAdminRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Health check
app.get('/api', (req, res) => {
    res.json({
        status: "healthy",
        message: "API server is running",
        timestamp: new Date().toISOString()
    });
});

// Connect to MongoDB
connectDB().catch(console.error);

export default async function handler(req, res) {
    return app(req, res);
}
