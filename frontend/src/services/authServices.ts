import api from "@/lib/axios";

// sign in function
export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
// sign up function
export const signUp = async (
  username,
  password,
  email,
  firstname,
  lastname,
) => {
  try {
    const response = await api.post("/auth/signup", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
