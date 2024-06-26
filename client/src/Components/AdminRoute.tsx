import { jwtDecode } from "jwt-decode";
import getToken from "../utils/getToken";
import UserData from "../types/userData";
import { Navigate } from "react-router-dom";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export default function AdminRoute({ children }: IProps) {
  const token = getToken();
  if (token) {
    const decodedToken: UserData = jwtDecode<UserData>(token);
    if (decodedToken.role === "admin") {
      return <>{children}</>;
    }
  }
  return <Navigate to={"/not-found"} />;
}
