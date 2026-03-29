import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAppContext();

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
