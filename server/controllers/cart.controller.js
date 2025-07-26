import CartProductModel from "../models/cartProduct.model.js";
import ProductModel from "../models/product.model.js";

// Add product to cart
export async function addToCartController(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.userId; // From auth middleware

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock available",
        error: true,
        success: false,
      });
    }

    // Check if item already exists in cart
    const existingCartItem = await CartProductModel.findOne({
      userId,
      productId
    });

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity;
      
      if (product.stock < newQuantity) {
        return res.status(400).json({
          message: "Cannot add more items. Insufficient stock",
          error: true,
          success: false,
        });
      }

      existingCartItem.quantity = newQuantity;
      await existingCartItem.save();
      
      return res.status(200).json({
        message: "Cart updated successfully",
        data: existingCartItem,
        error: false,
        success: true,
      });
    } else {
      // Create new cart item
      const newCartItem = new CartProductModel({
        userId,
        productId,
        quantity
      });

      const savedCartItem = await newCartItem.save();

      return res.status(201).json({
        message: "Product added to cart successfully",
        data: savedCartItem,
        error: false,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error in addToCartController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get cart items
export async function getCartItemsController(req, res) {
  try {
    const userId = req.userId;

    const cartItems = await CartProductModel.find({ userId })
      .populate({
        path: 'productId',
        select: 'name image price discount stock description category',
        populate: {
          path: 'category',
          select: 'name'
        }
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Cart items retrieved successfully",
      data: cartItems,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in getCartItemsController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Update cart item quantity
export async function updateCartQuantityController(req, res) {
  try {
    const { cartItemId, quantity } = req.body;
    const userId = req.userId;

    if (!cartItemId || !quantity || quantity < 1) {
      return res.status(400).json({
        message: "Valid cart item ID and quantity are required",
        error: true,
        success: false,
      });
    }

    const cartItem = await CartProductModel.findOne({
      _id: cartItemId,
      userId
    }).populate('productId');

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        error: true,
        success: false,
      });
    }

    // Check stock availability
    if (cartItem.productId.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock available",
        error: true,
        success: false,
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({
      message: "Cart quantity updated successfully",
      data: cartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateCartQuantityController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Remove item from cart
export async function removeFromCartController(req, res) {
  try {
    const { cartItemId } = req.params;
    const userId = req.userId;

    const cartItem = await CartProductModel.findOneAndDelete({
      _id: cartItemId,
      userId
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item removed from cart successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in removeFromCartController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Clear entire cart
export async function clearCartController(req, res) {
  try {
    const userId = req.userId;

    await CartProductModel.deleteMany({ userId });

    return res.status(200).json({
      message: "Cart cleared successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in clearCartController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}
