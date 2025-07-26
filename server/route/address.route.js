import { Router } from 'express';
import {
  getUserAddressesController,
  getAddressController,
  createAddressController,
  updateAddressController,
  deleteAddressController,
} from '../controllers/address.controller.js';
import auth from '../middleware/auth.js';

const addressRouter = Router();

// User address routes
addressRouter.get('/get-addresses', auth, getUserAddressesController);
addressRouter.get('/get-address/:id', auth, getAddressController);
addressRouter.post('/create-address', auth, createAddressController);
addressRouter.put('/update-address/:id', auth, updateAddressController);
addressRouter.delete('/delete-address/:id', auth, deleteAddressController);

export default addressRouter;
