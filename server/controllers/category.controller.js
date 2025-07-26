import CategoryModel from "../models/category.model.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

// Create new category
export async function addCategoryController(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
        error: true,
        success: false,
      });
    }

    // Check if category already exists
    const existingCategory = await CategoryModel.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
        error: true,
        success: false,
      });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await uploadImageCloudinary(req.file);
      imageUrl = uploadResult.secure_url;
    }

    if (!imageUrl) {
      return res.status(400).json({
        message: "Category image is required",
        error: true,
        success: false,
      });
    }

    const newCategory = new CategoryModel({
      name: name.trim(),
      image: imageUrl,
    });

    const savedCategory = await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      error: false,
      success: true,
      data: savedCategory,
    });
  } catch (error) {
    console.error("Error in addCategoryController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get all categories
export async function getCategoriesController(req, res) {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Categories retrieved successfully",
      error: false,
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error in getCategoriesController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get single category
export async function getCategoryController(req, res) {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category retrieved successfully",
      error: false,
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error in getCategoryController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Update category
export async function updateCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    // Check if new name already exists (excluding current category)
    if (name && name !== category.name) {
      const existingCategory = await CategoryModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: id }
      });

      if (existingCategory) {
        return res.status(400).json({
          message: "Category name already exists",
          error: true,
          success: false,
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name.trim();

    // Handle image update
    if (req.file) {
      const uploadResult = await uploadImageCloudinary(req.file);
      updateData.image = uploadResult.secure_url;
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      message: "Category updated successfully",
      error: false,
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error in updateCategoryController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Delete category
export async function deleteCategoryController(req, res) {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    await CategoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteCategoryController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}
