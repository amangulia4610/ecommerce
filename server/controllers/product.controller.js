import ProductModel from "../models/product.model.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

// Create new product
export async function addProductController(req, res) {
  try {
    const {
      name,
      category,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish
    } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        message: "Product name is required",
        error: true,
        success: false,
      });
    }

    if (!category || category.length === 0) {
      return res.status(400).json({
        message: "At least one category is required",
        error: true,
        success: false,
      });
    }

    if (!price || price <= 0) {
      return res.status(400).json({
        message: "Valid price is required",
        error: true,
        success: false,
      });
    }

    // Handle multiple image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadImageCloudinary(file);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    if (imageUrls.length === 0) {
      return res.status(400).json({
        message: "At least one product image is required",
        error: true,
        success: false,
      });
    }

    const newProduct = new ProductModel({
      name: name.trim(),
      image: imageUrls,
      category: Array.isArray(category) ? category : [category],
      unit: unit || "",
      stock: stock ? parseInt(stock) : 0,
      price: parseFloat(price),
      discount: discount ? parseFloat(discount) : 0,
      description: description || "",
      more_details: more_details ? JSON.parse(more_details) : {},
      publish: publish !== undefined ? publish === 'true' : true,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      error: false,
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error in addProductController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get all products with pagination and filters
export async function getProductsController(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      minPrice,
      maxPrice,
      publish,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};

    if (category) filter.category = { $in: [category] };
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (publish !== undefined) filter.publish = publish === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await ProductModel.find(filter)
      .populate('category', 'name image')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    return res.status(200).json({
      message: "Products retrieved successfully",
      error: false,
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Error in getProductsController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get single product
export async function getProductController(req, res) {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id)
      .populate('category', 'name image');

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product retrieved successfully",
      error: false,
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error in getProductController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Update product
export async function updateProductController(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish,
      removeImages
    } = req.body;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (category) updateData.category = Array.isArray(category) ? category : [category];
    if (unit !== undefined) updateData.unit = unit;
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (price !== undefined) updateData.price = parseFloat(price);
    if (discount !== undefined) updateData.discount = parseFloat(discount);
    if (description !== undefined) updateData.description = description;
    if (more_details !== undefined) updateData.more_details = JSON.parse(more_details);
    if (publish !== undefined) updateData.publish = publish === 'true';

    // Handle image updates
    let currentImages = [...product.image];

    // Remove specified images
    if (removeImages) {
      const imagesToRemove = Array.isArray(removeImages) ? removeImages : [removeImages];
      currentImages = currentImages.filter(img => !imagesToRemove.includes(img));
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadImageCloudinary(file);
        currentImages.push(uploadResult.secure_url);
      }
    }

    if (currentImages.length > 0) {
      updateData.image = currentImages;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('category', 'name image');

    return res.status(200).json({
      message: "Product updated successfully",
      error: false,
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProductController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Delete product
export async function deleteProductController(req, res) {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    await ProductModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteProductController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Toggle product publish status
export async function toggleProductPublishController(req, res) {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { publish: !product.publish },
      { new: true }
    ).populate('category', 'name image');

    return res.status(200).json({
      message: `Product ${updatedProduct.publish ? 'published' : 'unpublished'} successfully`,
      error: false,
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in toggleProductPublishController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}
