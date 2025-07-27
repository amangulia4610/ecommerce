import OrderModel from "../models/order.model.js";
import CartProductModel from "../models/cartProduct.model.js";
import ProductModel from "../models/product.model.js";

// Create new order (checkout)
export async function createOrderController(req, res) {
  try {
    const userId = req.userId;
    const { 
      delivery_address,
      payment_method = 'COD',
      items // array of {productId, quantity} if not using cart
    } = req.body;

    if (!delivery_address) {
      return res.status(400).json({
        message: "Delivery address is required",
        error: true,
        success: false,
      });
    }

    let orderItems = [];

    if (items && items.length > 0) {
      // Direct checkout with specific items
      orderItems = items;
    } else {
      // Checkout from cart
      const cartItems = await CartProductModel.find({ userId }).populate('productId');
      
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({
          message: "No items in cart",
          error: true,
          success: false,
        });
      }

      orderItems = cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        product: item.productId
      }));
    }

    const orders = [];

    for (const item of orderItems) {
      const product = item.product || await ProductModel.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({
          message: `Product not found`,
          error: true,
          success: false,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
          error: true,
          success: false,
        });
      }

      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const subTotalAmt = product.price * item.quantity;
      const totalAmt = subTotalAmt; // Can add shipping, tax later

      const order = new OrderModel({
        userId,
        orderId,
        productId: product._id,
        product_details: {
          name: product.name,
          image: product.image,
        },
        delivery_address,
        subTotalAmt,
        totalAmt,
        payment_method,
        quantity: item.quantity,
        payment_status: payment_method === 'COD' ? 'pending' : 'pending',
        delivery_status: 'Placed'
      });

      const savedOrder = await order.save();
      orders.push(savedOrder);

      // Update product stock
      await ProductModel.findByIdAndUpdate(
        product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear cart if checkout from cart
    if (!items || items.length === 0) {
      await CartProductModel.deleteMany({ userId });
    }

    return res.status(201).json({
      message: "Order placed successfully",
      error: false,
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error in createOrderController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get user's orders
export async function getUserOrdersController(req, res) {
  try {
    const userId = req.userId; // From auth middleware
    const {
      page = 1,
      limit = 10,
      payment_status,
      delivery_status,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { userId };

    if (payment_status) filter.payment_status = payment_status;
    if (delivery_status) filter.delivery_status = delivery_status;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const orders = await OrderModel.find(filter)
      .populate('productId', 'name image price')
      .populate('delivery_address')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const totalOrders = await OrderModel.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / parseInt(limit));

    return res.status(200).json({
      message: "Orders retrieved successfully",
      error: false,
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalOrders,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      }
    });
  } catch (error) {
    console.error("Error in getUserOrdersController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get all orders with pagination and filters
export async function getOrdersController(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      userId,
      payment_status,
      delivery_status,
      startDate,
      endDate,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};

    if (userId) filter.userId = userId;
    if (payment_status) filter.payment_status = payment_status;
    if (delivery_status) filter.delivery_status = delivery_status;
    if (search) filter.orderId = { $regex: search, $options: 'i' };
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const orders = await OrderModel.find(filter)
      .populate('userId', 'name email mobile')
      .populate('productId', 'name image price')
      .populate('delivery_address')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const totalOrders = await OrderModel.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / parseInt(limit));

    // Calculate total revenue
    const revenueData = await OrderModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmt" },
          totalSubTotal: { $sum: "$subTotalAmt" },
          orderCount: { $sum: 1 }
        }
      }
    ]);

    return res.status(200).json({
      message: "Orders retrieved successfully",
      error: false,
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalOrders,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
      statistics: revenueData.length > 0 ? revenueData[0] : {
        totalRevenue: 0,
        totalSubTotal: 0,
        orderCount: 0
      }
    });
  } catch (error) {
    console.error("Error in getOrdersController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get single order
export async function getOrderController(req, res) {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id)
      .populate('userId', 'name email mobile avatar')
      .populate('productId', 'name image price description')
      .populate('delivery_address');

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Order retrieved successfully",
      error: false,
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error in getOrderController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Update order status
export async function updateOrderStatusController(req, res) {
  try {
    const { id } = req.params;
    const { payment_status, delivery_status, paymentId, invoice_receipt } = req.body;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    const updateData = {};
    if (payment_status) updateData.payment_status = payment_status;
    if (delivery_status) updateData.delivery_status = delivery_status;
    if (paymentId) updateData.paymentId = paymentId;
    if (invoice_receipt) updateData.invoice_receipt = invoice_receipt;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('userId', 'name email mobile')
     .populate('productId', 'name image price')
     .populate('delivery_address');

    return res.status(200).json({
      message: "Order updated successfully",
      error: false,
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error in updateOrderStatusController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Delete order
export async function deleteOrderController(req, res) {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    await OrderModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Order deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteOrderController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

// Get order statistics
export async function getOrderStatsController(req, res) {
  try {
    const { period = '30' } = req.query; // Default to last 30 days
    
    const daysBack = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    // Total orders and revenue
    const totalStats = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmt" },
          averageOrderValue: { $avg: "$totalAmt" }
        }
      }
    ]);

    // Recent period stats
    const recentStats = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          recentOrders: { $sum: 1 },
          recentRevenue: { $sum: "$totalAmt" }
        }
      }
    ]);

    // Payment status breakdown
    const paymentStatusStats = await OrderModel.aggregate([
      {
        $group: {
          _id: "$payment_status",
          count: { $sum: 1 },
          revenue: { $sum: "$totalAmt" }
        }
      }
    ]);

    // Daily sales for the period
    const dailySales = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          orders: { $sum: 1 },
          revenue: { $sum: "$totalAmt" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      }
    ]);

    return res.status(200).json({
      message: "Order statistics retrieved successfully",
      error: false,
      success: true,
      data: {
        total: totalStats[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 },
        recent: recentStats[0] || { recentOrders: 0, recentRevenue: 0 },
        paymentStatus: paymentStatusStats,
        dailySales,
        period: daysBack
      }
    });
  } catch (error) {
    console.error("Error in getOrderStatsController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}
