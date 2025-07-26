import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { setCartItems, setCartLoading } from '../store/cartSlice';

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

  useEffect(() => {
    if (user._id) {
      fetchCartItems();
    }
  }, [user._id]);

  return {
    ...cart,
    fetchCartItems
  };
};
