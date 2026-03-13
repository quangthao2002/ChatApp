import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, loading, refreshToken } = useAuthStore();
  const [starting, setStarting] = useState(true);
  console.log("accessToken", accessToken);
  const init = async () => {
    if (!accessToken) {
      await refreshToken();
    }
    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (starting || loading) {
    return (
      <div className="flex justify-center items-center">Đang tải trang ...</div>
    );
  }
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
