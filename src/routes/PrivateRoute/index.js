import { AUTH } from "constants/props";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { data } = useAuthSelector(AUTH.login);

  if (!data.data.token) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
