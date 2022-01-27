import { useSelector } from "react-redux";
import { RootState } from "../store";
import Login from "../views/Login/Login";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.quacore.auth);
  if (auth) return children;
  else return <Login header="Login"></Login>;
};

export default ProtectedRoute;
