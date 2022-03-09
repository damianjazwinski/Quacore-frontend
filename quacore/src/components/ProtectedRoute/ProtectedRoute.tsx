import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.quacore.auth);
  if (auth) return children;
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
