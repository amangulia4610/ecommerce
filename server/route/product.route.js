import { Router } from 'express';
import {
  addProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
  toggleProductPublishController,
} from '../controllers/product.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const productRouter = Router();

// Admin routes
productRouter.post('/add-product', auth, upload.array('images', 10), addProductController);
productRouter.get('/get-products', getProductsController);
productRouter.get('/get-product/:id', getProductController);
productRouter.put('/update-product/:id', auth, upload.array('images', 10), updateProductController);
productRouter.delete('/delete-product/:id', auth, deleteProductController);
productRouter.patch('/toggle-publish/:id', auth, toggleProductPublishController);

export default productRouter;
