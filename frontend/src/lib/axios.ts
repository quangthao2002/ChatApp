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

export default api;
