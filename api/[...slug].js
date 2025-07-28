// Catch-all API handler for Vercel
import connectDB from '../server/config/connectDB.js';
import app from '../server/index.js';

// Connect to MongoDB
connectDB().catch(console.error);

export default app;
