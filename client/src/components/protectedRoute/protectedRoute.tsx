import { UserAuth, UserType } from "@/context/AuthContext";
import { FC, ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
type Props = {
  children: ReactElement;
};
const ProtectedRoute: FC<Props> = ({ children }) => {
  const { authState } = useContext(UserAuth) as UserType;

  if (!authState.isLoggedIn) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
