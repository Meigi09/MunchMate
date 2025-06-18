import useAuth from "@/hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return(
    auth ? 
    <Outlet /> : 
    <Navigate to="/login" state={{ from: location }} replace />
  )

  
  
};

export default RequireAuth;