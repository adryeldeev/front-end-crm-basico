import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const PrivateRoutes = () => {
  const { token, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
