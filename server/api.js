// Vercel-compatible API handler
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

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

// Simple category test endpoint
app.get('/api/category/get-categories', (req, res) => {
    res.json({
        success: true,
        message: 'Categories endpoint working',
        data: [
            { _id: '1', name: 'Test Category', image: '' }
        ]
    });
});

// Simple product test endpoint
app.get('/api/product/get-products', (req, res) => {
    res.json({
        success: true,
        message: 'Products endpoint working',
        data: [
            { _id: '1', name: 'Test Product', price: 100, image: [] }
        ]
    });
});

export default app;
