import { Outlet, Navigate } from "react-router-dom";
import { useLoginStore } from "@/store/useLoginStore";

export const ProtectedLayout = () => {
  const isLogin = useLoginStore((state) => state.isLogin);

  if(!isLogin) return <Navigate to="/login" replace />;

  return <Outlet />
};