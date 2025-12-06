import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedLogin({ children }) {
  const user = useSelector((state) => state.login);

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedLogin;
