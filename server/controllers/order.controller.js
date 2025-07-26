import OrderModel from "../models/order.model.js";

// Get all orders with pagination and filters
export async function getOrdersController(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      userId,
      payment_status,
      startDate,
      endDate,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};

    if (userId) filter.userId = userId;
    if (payment_status) filter.payment_status = payment_status;
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
    const { payment_status, paymentId, invoice_receipt } = req.body;

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
