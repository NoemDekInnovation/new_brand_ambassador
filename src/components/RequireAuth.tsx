import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export interface Auth {
  user: string[];
  roles: string[];
}
const RequiredAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useSelector((state: RootState) => state.user);

  console.log(user?.accountId);

  const location = useLocation();

  return [user?.accountId]?.find((role: any) =>
    allowedRoles?.includes(role)
  ) ? (
    <Outlet />
  ) : user ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
