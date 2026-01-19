import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import useAuthStore from '../stores/authStore';

// Create an axios instance used for authenticated requests.
const axiosPrivate: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env.VITE_DEVELOPMENT_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Extend request config to hold retry flag
interface InternalRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Request interceptor: attach access token when present (memory-only)
axiosPrivate.interceptors.request.use((config) => {
  try {
    const token = useAuthStore.getState().getAccessToken();
    if (token) {
      // Do not log tokens. Just attach the header.
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (e) {
    return config;
  }
});

// Response interceptor: if 401, try a single refresh then retry once.
axiosPrivate.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config?: InternalRequestConfig }) => {
    const originalRequest = error.config as InternalRequestConfig | undefined;
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const success = await useAuthStore.getState().refreshToken();
        if (success) {
          const token = useAuthStore.getState().getAccessToken();
          if (token) {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          // Retry the original request
          return axiosPrivate(originalRequest);
        }
      } catch (e) {
        // fallthrough to logout
      }
      // If refresh failed, ensure logout
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export function getAxiosPrivate(): AxiosInstance {
  return axiosPrivate;
}

export default axiosPrivate;
