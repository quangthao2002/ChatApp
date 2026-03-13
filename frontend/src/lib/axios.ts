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
    if (!originalRequest) return Promise.reject(error);

    const url =
      typeof originalRequest.url === "string" ? originalRequest.url : "";
    const isAuthEndpoint =
      url.includes("/auth/signin") ||
      url.includes("/auth/signup") ||
      url.includes("/auth/refreshtoken");

    // không refresh cho chính các endpoint auth
    if (isAuthEndpoint) return Promise.reject(error);

    originalRequest._retryCount = originalRequest._retryCount || 0;
    // access token hết hạn lần đầu tiên và tối đa 4 lần refresh
    if (error.response?.status === 401 && originalRequest._retryCount <= 4) {
      originalRequest._retryCount += 1;
      try {
        const res = await api.post("/auth/refreshtoken", {
          withCredentials: true,
        });
        const newAccesstoken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccesstoken);
        // gán access token mới vào req header
        originalRequest.headers.Authorization = `Bearer ${newAccesstoken}`;

        return api(originalRequest);
      } catch (error) {
        // refreshToken hết hạn / không hợp lệ => đăng xuất về trang đăng nhập
        useAuthStore.getState().clearState();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
