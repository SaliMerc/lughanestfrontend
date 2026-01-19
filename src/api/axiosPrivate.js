import axios from 'axios';
import useAuthStore from '../stores/authStore';

// Create an axios instance for authenticated requests
const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_DEVELOPMENT_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor: attach access token from memory
axiosPrivate.interceptors.request.use((config) => {
  try {
    const token = useAuthStore.getState().getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (e) {
    return config;
  }
});

// Response interceptor: on 401, try refresh once, then logout
axiosPrivate.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config || {};
    if (!originalRequest) return Promise.reject(error);
    const status = error.response?.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const success = await useAuthStore.getState().refreshToken();
        if (success) {
          const token = useAuthStore.getState().getAccessToken();
          if (token) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosPrivate(originalRequest);
        }
      } catch (e) {}
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export function getAxiosPrivate() {
  return axiosPrivate;
}

export default axiosPrivate;
