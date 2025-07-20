import { send } from "process";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { error } from "console";

async function registerUserController(req, res) {
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
        const payload = new UserModel({
            name,
            email,
            password : hashpassword, // Ensure to hash the password before saving in production
        });

        const newUser = new UserModel(payload)
        const save = await newUser.save();

        const verifyEmailUrl =`${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify your email",
            html: verifyEmailTemplate({name, 
                url : verifyEmailUrl
            }
            ),
        })
        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: save,
        });
    
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}