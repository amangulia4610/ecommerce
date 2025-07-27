import { Router } from 'express';
import {
  createOrderController,
  getOrdersController,
  getOrderController,
  getUserOrderController,
  updateOrderStatusController,
  deleteOrderController,
  getOrderStatsController,
  getUserOrdersController,
} from '../controllers/order.controller.js';
import auth from '../middleware/auth.js';

const orderRouter = Router();

// User routes
orderRouter.post('/create-order', auth, createOrderController);
orderRouter.get('/user-orders', auth, getUserOrdersController);
orderRouter.get('/user-order/:id', auth, getUserOrderController);

// Admin routes
orderRouter.get('/get-orders', auth, getOrdersController);
orderRouter.get('/get-order/:id', auth, getOrderController);
orderRouter.put('/update-order-status/:id', auth, updateOrderStatusController);
orderRouter.delete('/delete-order/:id', auth, deleteOrderController);
orderRouter.get('/order-stats', auth, getOrderStatsController);

export default orderRouter;
