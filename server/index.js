import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import userAdminRouter from './route/user.admin.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL || true
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = process.env.PORT || 8080 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT,
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    })
})

// Health check endpoint
app.get("/api/health",(request,response)=>{
    response.json({
        status: "healthy",
        message: "API server is running",
        timestamp: new Date().toISOString()
    })
})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/admin/user',userAdminRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)
// Connect to MongoDB
connectDB().then(() => {
app.listen(PORT,()=>{
    console.log("Server is running on port " + PORT)
})
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error)
    process.exit(1) // Exit the process with failure
})
export default app