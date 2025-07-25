import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        required: [true, "Address line is required"],
        trim: true,
        default: ""
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
        default: ""
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
        default: ""
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required"],
        trim: true
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
        default: null,
    }
}, {
    timestamps: true
});

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;
