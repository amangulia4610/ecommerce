import { Router } from 'express';
import {
  addCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.controller.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const categoryRouter = Router();

// Admin only routes
categoryRouter.post('/add-category', adminAuth, upload.single('image'), addCategoryController);
categoryRouter.get('/get-categories', getCategoriesController);
categoryRouter.get('/get-category/:id', getCategoryController);
categoryRouter.put('/update-category/:id', adminAuth, upload.single('image'), updateCategoryController);
categoryRouter.delete('/delete-category/:id', adminAuth, deleteCategoryController);

export default categoryRouter;
