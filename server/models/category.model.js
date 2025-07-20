import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true
    },
    image: {
        type: String,
        required: [true, "Category image is required"]
    }
}, {
    timestamps: true
});

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel;
