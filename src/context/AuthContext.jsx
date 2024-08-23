import React, { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = cookies.get("user");
    const token = cookies.get("token");

    if (user && token) {    
      setUser(user);
      setToken(token);
    }
  }, []);

  const login = (userData, userToken) => {
    cookies.set("token", userToken);
    cookies.set("user", userData);
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    cookies.remove("token");
    cookies.remove("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
