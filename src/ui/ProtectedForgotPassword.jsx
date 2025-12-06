import { Children } from "react";
import { useSelector } from "react-redux";

function ProtectedForgotPassword({ children }) {
  const user = useSelector((store) => store.login.user?.username);
  if (!user) return children;
  else return <Navigate to="/forgotpassword" replace={true} />;
}

export default ProtectedForgotPassword;
