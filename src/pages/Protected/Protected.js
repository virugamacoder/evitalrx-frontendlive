import React from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const cookies = new Cookies();
  let token = cookies.get("token");

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

export default Protected;
