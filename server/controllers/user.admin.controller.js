import UserModel from '../models/user.model.js';

// Get all users with pagination and filtering
export const getAllUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      role = '', 
      status = '',
      verify_email = ''
    } = req.query;

    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      filter.role = role;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (verify_email !== '') {
      filter.verify_email = verify_email === 'true';
    }

    // Get users with pagination
    const users = await UserModel.find(filter)
      .select('-password -refresh_token')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalUsers = await UserModel.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      message: "Users retrieved successfully",
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalUsers,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// Get user statistics
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const verifiedUsers = await UserModel.countDocuments({ verify_email: true });
    const adminUsers = await UserModel.countDocuments({ role: 'ADMIN' });
    const activeUsers = await UserModel.countDocuments({ status: 'Active' });
    const inactiveUsers = await UserModel.countDocuments({ status: 'Inactive' });
    const suspendedUsers = await UserModel.countDocuments({ status: 'Suspended' });
    
    // Get recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = await UserModel.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      message: "User statistics retrieved successfully",
      success: true,
      data: {
        totalUsers,
        verifiedUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
        adminUsers,
        activeUsers,
        inactiveUsers,
        suspendedUsers,
        recentRegistrations
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// Update user status
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive', 'Suspended'].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be Active, Inactive, or Suspended",
        error: true,
        success: false
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('-password -refresh_token');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.json({
      message: "User status updated successfully",
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['ADMIN', 'USER'].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Must be ADMIN or USER",
        error: true,
        success: false
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password -refresh_token');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.json({
      message: "User role updated successfully",
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// Update user email verification status
export const updateEmailVerification = async (req, res) => {
  try {
    const { userId } = req.params;
    const { verify_email } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { verify_email },
      { new: true }
    ).select('-password -refresh_token');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.json({
      message: "Email verification status updated successfully",
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.json({
      message: "User deleted successfully",
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

// Get single user details
export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId)
      .select('-password -refresh_token');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.json({
      message: "User details retrieved successfully",
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};


