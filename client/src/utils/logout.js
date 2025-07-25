import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';
import { clearUserDetails } from '../store/userSlice';

const logout = async (dispatch) => {
  try {
    // Call logout API
    await Axios({
      url: SummaryApi.logout.url,
      method: SummaryApi.logout.method,
    });
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    // Clear localStorage regardless of API success/failure
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Clear Redux store
    dispatch(clearUserDetails());
    
    // Redirect to login page
    window.location.href = '/login';
  }
};

export default logout;
