import { create } from "zustand";

import toast, { Toast } from "react-hot-toast";
import { email } from "zod";

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  signUp: async (username, password, email, firstname, lastname) => {
    try {
      set({ loading: true });

      // goi api

      toast.success("Đăng ký thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thất bại");
    } finally {
      set({ loading: false });
    }
  },
}));
