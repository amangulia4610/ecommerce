import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addToCartController,
  getCartItemsController,
  updateCartQuantityController,
  removeFromCartController,
  clearCartController
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add-to-cart", auth, addToCartController);
cartRouter.get("/get-cart-items", auth, getCartItemsController);
cartRouter.put("/update-quantity", auth, updateCartQuantityController);
cartRouter.delete("/remove-from-cart/:cartItemId", auth, removeFromCartController);
cartRouter.delete("/clear-cart", auth, clearCartController);

export default cartRouter;
