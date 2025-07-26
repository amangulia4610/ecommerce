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
import orderRouter from './route/order.route.js'
import userAdminRouter from './route/user.admin.route.js'

const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/order',orderRouter)
app.use('/api/admin/user',userAdminRouter)
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