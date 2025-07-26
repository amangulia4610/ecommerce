import jwt from "jsonwebtoken";
import UserModel from '../models/user.model.js';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ 
                message: "Access token not found", 
                error: true, 
                success: false 
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS);
        
        if (!decode) {
            return res.status(403).json({ 
                message: "Invalid access token", 
                error: true, 
                success: false 
            });
        }

        // Get user details to check role
        const user = await UserModel.findById(decode.id).select('role name email');
        
        if (!user) {
            return res.status(404).json({ 
                message: "User not found", 
                error: true, 
                success: false 
            });
        }

        if (user.role !== 'ADMIN') {
            return res.status(403).json({ 
                message: "Admin access required", 
                error: true, 
                success: false 
            });
        }

        req.userId = decode.id;
        req.user = user;
        next();
        
    } catch (error) {
        console.error("Admin authentication error:", error);
        return res.status(500).json({ 
            message: error.message || "Internal server error", 
            error: true, 
            success: false 
        });
    }
};

export default adminAuth;
