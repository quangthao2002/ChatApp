import { create } from "zustand";

import toast from "react-hot-toast";
import type { AuthState } from "@/types/store";
import { authService } from "@/services/authServices";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
  setAccessToken: (accessToken) => {
    set({ accessToken });
  },
  clearState: () => set({ accessToken: null, user: null }),

  signUp: async (username, password, email, firstname, lastname) => {
    try {
      set({ loading: true });
      // goi api
      const res = await authService.signUp(
        username,
        password,
        email,
        firstname,
        lastname,
      );
      toast.success(res.message);
      return res;
    } catch (error: any) {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });
      // goi api
      const { accessToken } = await authService.signIn(username, password);
      get().setAccessToken(accessToken);

      await get().fetchMe();
      toast.success("Đăng nhập thành công ");
    } catch (error) {
      console.log(error);
      toast.error(`Đăng nhập thất bại`);
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      // goi api
      await authService.signOut();
      toast.success("Đăng xuat thanh cong");
    } catch (error) {
      console.log(error);
      toast.error(`Đăng xuat that bai`);
    } finally {
      set({ loading: false });
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();
      set({ user });
    } catch (error) {
      console.log(error);
      toast.error("Lỗi lấy dữ liệu người dùng");
      set({ user: null, accessToken: null });
    } finally {
      set({ loading: false });
    }
  },
  refreshToken: async () => {
    try {
      const { user, fetchMe } = get();
      set({ loading: true });
      const accessToken = await authService.refreshToken();
      get().setAccessToken(accessToken);
      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.log(error);
      toast.error("Phiên đăng nhập hết hạn vui lòng đăng nhập lại");
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },
  testAuthToken: async () => {
    try {
      const res = await authService.testAuthToken();
      toast.success("Kiểm tra token thành công");
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Lỗi kiểm tra token");
    }
  },
}));
