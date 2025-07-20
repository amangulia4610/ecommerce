import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Sub category name is required"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "Sub category image is required"]
    },
    categoryId: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Category ID is required"]
    }]
}, {
    timestamps: true
});

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

export default SubCategoryModel;
