import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {
  getAllUsers,
  getUserStats,
  updateUserStatus,
  updateUserRole,
  updateEmailVerification,
  deleteUser,
  getUserDetails
} from '../controllers/user.admin.controller.js';

const userAdminRouter = express.Router();

// Get all users with filtering and pagination
userAdminRouter.get('/all-users', adminAuth, getAllUsers);

// Get user statistics
userAdminRouter.get('/stats', adminAuth, getUserStats);

// Get single user details
userAdminRouter.get('/:userId', adminAuth, getUserDetails);

// Update user status
userAdminRouter.put('/:userId/status', adminAuth, updateUserStatus);

// Update user role
userAdminRouter.put('/:userId/role', adminAuth, updateUserRole);

// Update email verification status
userAdminRouter.put('/:userId/verify-email', adminAuth, updateEmailVerification);

// Delete user
userAdminRouter.delete('/:userId', adminAuth, deleteUser);

export default userAdminRouter;
