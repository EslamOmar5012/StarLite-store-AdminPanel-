import { useSelector } from "react-redux";

function ProtectedAuth({ children }) {
  const user = useSelector((store) => store.login.user);
  if (!user) return <Navigate to="/" replace />;
  else return <Navigate to="/" replace />;
}

export default ProtectedAuth;
