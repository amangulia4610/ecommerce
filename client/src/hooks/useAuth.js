import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setUserDetails, clearUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';
import logout from '../utils/logout';

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const isLoggedIn = user._id && user._id.trim() !== '';
  
  const refreshUserDetails = useCallback(async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData) {
        dispatch(setUserDetails(userData));
        return userData;
      } else {
        dispatch(clearUserDetails());
        return null;
      }
    } catch (error) {
      console.error('Failed to refresh user details:', error);
      dispatch(clearUserDetails());
      return null;
    }
  }, [dispatch]);

  const logoutUser = useCallback(async () => {
    await logout(dispatch);
  }, [dispatch]);

  const updateUser = useCallback((userData) => {
    dispatch(setUserDetails(userData));
  }, [dispatch]);

  const clearUser = useCallback(() => {
    dispatch(clearUserDetails());
  }, [dispatch]);

  return {
    user,
    isLoggedIn,
    refreshUserDetails,
    logout: logoutUser,
    updateUser,
    clearUser
  };
};

export default useAuth;
