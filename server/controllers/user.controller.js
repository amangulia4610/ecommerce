import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../config/sendemail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generatedOTP from "../utils/generatedOTP.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";

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

        // Try to send verification email, but don't fail registration if email fails
        try {
            const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
            
            const verifyEmail = await sendEmail(
                email,
                "Verify your email",
                verifyEmailTemplate(name, verifyEmailUrl)
            );
            
            return res.status(201).json({
                message: "User registered successfully. Verification email sent.",
                error: false,
                success: true,
                data: save,
            });
        } catch (emailError) {
            console.error("Error sending verification email:", emailError);
            
            // Return success even if email fails
            return res.status(201).json({
                message: "User registered successfully. However, verification email could not be sent. Please contact support.",
                error: false,
                success: true,
                data: save,
                emailError: "Verification email failed to send"
            });
        }
    
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

        const accessToken = await generatedAccessToken(user._id)
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

//upload user avatar controller
export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId; // Get user ID from the middleware
        const image = req.file; // using multer for file uploads - 'req.file' for single file

        if (!image) {
            return res.status(400).json({ message: "No file uploaded", error: true, success: false });
        }
        
        console.log("File received:", image); // Debug log
        const upload = await uploadImageCloudinary(image)
        
        // Update user's avatar in the database
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { avatar: upload.url }, // Assuming 'avatar' is the field in your user model
        );

        return res.status(200).json({
            message: "Avatar uploaded successfully",
            success: true,
            error: false,
            data: {
                avatar: upload.url,
                user: updatedUser
            },
        });
    } catch (error) {
        console.error("Error uploading avatar:", error);
        res.status(500).json({ message: "Internal server error in upload avatar controller", error: true, success: false });
    }
}

//Update user Details

export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId; // Get user ID from the middleware
        const { name, email, mobile, password } = req.body;


        // Update user details in the database
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { ...(name && {name: name}),
                ...(email && {email: email}),
                ...(mobile && {mobile: mobile}),
                ...(password && {password: await bcrypt.hash(password, 10)}) // Hash password if provided
                },
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            message: "User details updated successfully",
            success: true,
            error: false,
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: error.message || "Internal server error in updating user details", error: true, success: false });
    }
}

//forgot password controller - not login
export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({ message: "Enter Email" });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email", error: true, success: false });
        }

        const otp = generatedOTP();
        const expiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

        // Update user's forgot password fields
        const update = await UserModel.updateOne(
            { _id: user._id },
            { forgot_password_otp: otp, forgot_password_expiry: new Date(expiry).toISOString() } // Ensure expiry is in ISO format
        );


        // Send OTP to user's email
        await sendEmail(
            email,
            "Forgot Password OTP from 20 Deg Ecommerce", 
            forgotPasswordTemplate(user.name, otp) // Pass name and otp as separate parameters
        );

        return res.status(200).json({
            message: "OTP sent to your email",
            success: true,
            error: false,
        });
    } catch (error) {
        console.error("Error in forgot password controller:", error);
        res.status(500).json({ message: error.message || "Internal server error in forgot password controller", error: true, success: false });
    }
}

//verify forgot password OTP controller
export async function verifyForgotPasswordOTP(req, res) {
    try {
        const { email, otp } = req.body;

        // Validate input
        if (!email || !otp) {
            return res.status(400).json({ message: "Enter Email and OTP" });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email", error: true, success: false });
        }

        // Check if OTP matches and is not expired
        if (user.forgot_password_otp !== otp || new Date(user.forgot_password_expiry) < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP", error: true, success: false });
        }

        return res.status(200).json({
            message: "OTP verified successfully",
            success: true,
            error: false,
            data: user,
        });
    } catch (error) {
        console.error("Error verifying forgot password OTP:", error);
        res.status(500).json({ message: error.message || "Internal server error in verifying forgot password OTP", error: true, success: false });
    }
}

//Reset password controller
export async function resetPassword(req, res) {
    try {
        const { email, newPassword,confirmPassword } = req.body;

        // Validate input
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "Enter Email and New Password or Confirm Password" });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email", error: true, success: false });
        }
        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match", error: true, success: false });
        }
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password and clear OTP fields
        const updatedUser = await UserModel.updateOne(
            { _id: user._id },
            { password: hashPassword, forgot_password_otp: null, forgot_password_expiry: "" } // Clear OTP fields
        );

        return res.status(200).json({
            message: "Password reset successfully",
            success: true,
            error: false,
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: error.message || "Internal server error in resetting password", error: true, success: false });
    }
}

//refresh token controller
export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; // [ Bearer token]
        
        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            });
        }

        let verifyToken;
        try {
            verifyToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY_REFRESH);
        } catch (err) {
            return res.status(401).json({
                message: "Token is expired or invalid",
                error: true,
                success: false
            });
        }

        const userId = verifyToken?.id; // Changed from _id to id

        // Validate user exists and refresh token matches
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Validate refresh token matches the one stored in database
        if (user.refresh_token !== refreshToken) {
            return res.status(401).json({
                message: "Invalid refresh token",
                error: true,
                success: false
            });
        }

        const newAccessToken = await generatedAccessToken(userId); 
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie('accessToken', newAccessToken, cookiesOption);

        return res.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        return res.status(500).json({ 
            message: error.message || "Internal server error in refreshing access token", 
            error: true, 
            success: false 
        });
    }
}