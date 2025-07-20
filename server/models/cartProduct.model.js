import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        default: 1
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    }
}, {
    timestamps: true
});

const CartProductModel = mongoose.model("cartProduct", cartProductSchema);

export default CartProductModel;
