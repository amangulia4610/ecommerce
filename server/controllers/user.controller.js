import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../config/sendemail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Enter Name, Email, Password" });
        }

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // Create new user
        const payload = {
            name,
            email,
            password: hashpassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
        
        const verifyEmail = await sendEmail(
            email,
            "Verify your email",
            verifyEmailTemplate(name, verifyEmailUrl)
        );
        
        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: save,
        });
    
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error in registering user" });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;

        // Find user by ID
        const user = await UserModel.findOne( {_id : code});
        if (!user) {
            return res.status(404).json({ message: "User not found" ,error: true    , success: false    });
        }

        // Update user's email verification status
        const updatedUser = await UserModel.updateOne(
            {_id: code},
            { verify_email: true }
        )
        return res.status(200).json({
            message: "Email verified successfully",
            success: true,
            data: user,
        });
    
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ message: "Internal server error in verifying email controller", error: true ,success: false });
    }
}

//login controller
export async function loginController(req, res) {
    try{
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Enter Email and Password" });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not registered" , error: true ,success: false });
        }
        // Check if user status is active
        if (user.status !== "Active") {
            return res.status(403).json({ message: "User is not active. Contact Admin", error: true ,success: false });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" , error: true ,success: false });
        }

        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite:"None",
        };
        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(200).json({
            message: "Login successful",
            success: true,
            error: false,
            data: {
            accessToken,
            refreshToken
            },
        });

    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error in login controller" , error: true ,success: false });
    }

}

//logout controller

export async function logoutController(req, res) {
    try {

        const userId = req.userId; // Get user ID from the middleware
        // Clear cookies
            const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite:"None",
        };
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        // Update user's refresh token in the database
        const updateRefreshTokenUser = await UserModel.updateOne(
            { _id: userId },
            { refresh_token: "" } // Clear the refresh token
        );
        return res.status(200).json({
            message: "Logout successful",
            success: true,
            error: false,
        });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error in logout controller", error: true, success: false });
    }
}