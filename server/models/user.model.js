import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String,
        default: "",
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
    },
    refresh_token: {
        type: String,
        default: "",
    },
    verify_email: {
        type: Boolean,
        default: false,
    },
    last_login_date: {
        type: Date,
        default: "",

    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active",
    },
    address_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CartProduct",
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null,
    },
    forgot_password_expiry: {
        type: Date,
        default: "",
    },
    role : {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },

},{
    timestamps: true,
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel;