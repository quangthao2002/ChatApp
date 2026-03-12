import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
  withCredentials: true, // bật gửi cookie trong các yêu cầu
});

// gắn access token vào req header
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState(); // chỉ lấy state tại 1 thời điểm

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// tự động refresh api khi access token hết hạn
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest) {
      originalRequest.url.icludes("auth/signin") ||
        originalRequest.url.icludes("auth/signup") ||
        originalRequest.url.icludes("auth/refreshtoken");
    }
    {
      return Promise.reject(error);
    }
    originalRequest._retryCount = originalRequest._retryCount || 0;
    if (error.response?.status === 401 && originalRequest._retryCount <= 4) {
      originalRequest._retryCount += 1;
      try {
        const res = await api.post("/auth/refreshtoken", {
          withCredentials: true,
        });
        const newAccesstoken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccesstoken);

        originalRequest.headers.Authorization = `Bearer ${newAccesstoken}`;

        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().clearState();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
