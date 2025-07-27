import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { setCartItems, setCartLoading, addCartItem, updateCartItem, removeCartItem, clearCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  const fetchCartItems = async () => {
    if (!user._id) return;

    try {
      dispatch(setCartLoading(true));
      const response = await Axios({
        ...SummaryApi.getCartItems
      });

      if (response.data.success) {
        dispatch(setCartItems(response.data.data));
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user._id) {
      toast.error('Please login to add items to cart');
      return false;
    }

    try {
      const response = await Axios({
        ...SummaryApi.addToCart,
        data: { productId, quantity }
      });

      if (response.data.success) {
        toast.success('Product added to cart!');
        // Refresh cart items to get updated data
        fetchCartItems();
        return true;
      } else {
        toast.error(response.data.message || 'Failed to add to cart');
        return false;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      return false;
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartQuantity,
        data: { cartItemId, quantity }
      });

      if (response.data.success) {
        dispatch(updateCartItem({ cartItemId, quantity }));
        toast.success('Cart updated successfully!');
        return true;
      } else {
        toast.error(response.data.message || 'Failed to update cart');
        return false;
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(error.response?.data?.message || 'Failed to update cart');
      return false;
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await Axios({
        ...SummaryApi.removeFromCart,
        url: `${SummaryApi.removeFromCart.url}/${cartItemId}`
      });

      if (response.data.success) {
        dispatch(removeCartItem(cartItemId));
        return true;
      } else {
        toast.error(response.data.message || 'Failed to remove item');
        return false;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error(error.response?.data?.message || 'Failed to remove item');
      return false;
    }
  };

  const clearCartItems = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.clearCart
      });

      if (response.data.success) {
        dispatch(clearCart());
        return true;
      } else {
        toast.error(response.data.message || 'Failed to clear cart');
        return false;
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error(error.response?.data?.message || 'Failed to clear cart');
      return false;
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchCartItems();
    }
  }, [user._id]);

  return {
    ...cart,
    fetchCartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCartItems
  };
};
