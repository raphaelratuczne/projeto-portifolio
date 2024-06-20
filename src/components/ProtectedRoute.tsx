// import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

interface IProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { user } = useAuthContext();
  console.log("user", user);
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  return children;
};

export default ProtectedRoute;
