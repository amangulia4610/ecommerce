import { Router } from 'express';
import {
  getOrdersController,
  getOrderController,
  updateOrderStatusController,
  deleteOrderController,
  getOrderStatsController,
} from '../controllers/order.controller.js';
import auth from '../middleware/auth.js';

const orderRouter = Router();

// Admin routes
orderRouter.get('/get-orders', auth, getOrdersController);
orderRouter.get('/get-order/:id', auth, getOrderController);
orderRouter.put('/update-order-status/:id', auth, updateOrderStatusController);
orderRouter.delete('/delete-order/:id', auth, deleteOrderController);
orderRouter.get('/order-stats', auth, getOrderStatsController);

export default orderRouter;
