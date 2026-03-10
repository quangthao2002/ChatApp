import api from "@/lib/axios";

export const authService = {
  signUp: async (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
  ) => {
    const res = await api.post(
      "/auth/signup",
      {
        username,
        password,
        email,
        firstname,
        lastname,
      },
      { withCredentials: true }, // bật gửi cookie trong các yêu cầu
    );
    return res.data;
  },

  signIn: async (username: string, password: string) => {
    const res = await api.post(
      "/auth/signin",
      { username, password },
      { withCredentials: true },
    );
    return res.data;
  },
  signOut: async () => {
    const res = await api.post("/auth/signout", {}, { withCredentials: true });
    return res.data;
  },
  fetchMe: async () => {
    const res = await api.get("/user/me", { withCredentials: true });
    return res.data.user;
  },
};
