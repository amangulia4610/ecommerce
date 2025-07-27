import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product",
        required : true
    },
    product_details : {
        name : String,
        image : Array,
        price : Number
    },
    quantity : {
        type : Number,
        required : true,
        min : 1
    },
    price : {
        type : Number,
        required : true
    },
    subTotal : {
        type : Number,
        required : true
    }
});

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    },
    orderId : {
        type : String,
        required : [true, "Provide orderId"],
        unique : true
    },
    items : [orderItemSchema], // Array of order items
    paymentId : {
        type : String,
        default : ""
    },
    payment_status : {
        type : String,
        default : "pending"
    },
    delivery_status : {
        type : String,
        enum : ['Placed', 'In Transit', 'Delivered'],
        default : 'Placed'
    },
    payment_method : {
        type : String,
        enum : ['COD', 'Online'],
        default : 'COD'
    },
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : 'address'
    },
    subTotalAmt : {
        type : Number,
        default : 0
    },
    totalAmt : {
        type : Number,
        default : 0
    },
    invoice_receipt : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

const OrderModel = mongoose.model('order',orderSchema)

export default OrderModel