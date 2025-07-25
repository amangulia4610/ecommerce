import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
  try {
    // Check if access token exists
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return null; // Return null if no token
    }

    const response = await Axios({
        ...SummaryApi.userDetails,
    });

    if (response.data.success) {
      return response.data.data; // Return user details
    } else {
      console.warn('Failed to fetch user details:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    
    // Check if it's an auth error (401)
    if (error.response?.status === 401) {
      // Token might be expired, let the interceptor handle it
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    
    return null; // Return null instead of throwing
  }
}

export default fetchUserDetails;