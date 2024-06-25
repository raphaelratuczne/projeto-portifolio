import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

interface IProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { user, loading } = useAuthContext();
  // console.log("user", user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
