import axios from "axios";
import { baseUrl } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
// sending access token in headers for every request
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// extend life span of access token wit refresh token
Axios.interceptors.response.use(
  (response) => {
    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response;
  },
  async (error) => {    
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          // Try to refresh the access token
          const refreshResponse = await axios.post(
            `${baseUrl}/api/user/refresh-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              },
              withCredentials: true
            }
          );
          
          if (refreshResponse.data.success && refreshResponse.data.data?.accessToken) {
            // Store the new access token
            localStorage.setItem('accessToken', refreshResponse.data.data.accessToken);
            
            // If a new refresh token is provided, update it too
            if (refreshResponse.data.data?.refreshToken) {
              localStorage.setItem('refreshToken', refreshResponse.data.data.refreshToken);
            }
            
            // Retry the original request with the new access token
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`;
            
            return Axios(originalRequest);
          } else {
            // Refresh failed, clear tokens and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        } catch (refreshError) {
          // Refresh request failed, clear tokens and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        // No refresh token available, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export default Axios;