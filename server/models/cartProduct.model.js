import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    }
}, {
    timestamps: true
});

const CartProductModel = mongoose.model("CartProduct", cartProductSchema);

export default CartProductModel;
