import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    orderId: {
        type: String,
        required: [true, "Order ID is required"],
        unique: true
    },
    product_details: {
        type: String,
        required: [true, "Product details are required"]
    },
    payment_id: {
        type: String,
        required: [true, "Payment ID is required"]
    },
    payment_status: {
        type: String,
        enum: ["pending", "completed", "failed", "cancelled", "refunded"],
        default: "pending"
    },
    delivery_address: {
        type: Object,
        required: [true, "Delivery address is required"]
    },
    delivery_status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    subTotalAmt: {
        type: Number,
        required: [true, "Subtotal amount is required"],
        min: [0, "Subtotal amount cannot be negative"]
    },
    totalAmt: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [0, "Total amount cannot be negative"]
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
