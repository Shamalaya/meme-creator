import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext();
  return myUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
