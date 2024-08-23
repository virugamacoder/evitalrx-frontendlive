import React from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

function UnProtected({ children }) {
  const cookies = new Cookies();
  let token = cookies.get("token");

  if (token) {
    return <Navigate to="/"></Navigate>;
  }
  return <>{children}</>;
}

export default UnProtected;
