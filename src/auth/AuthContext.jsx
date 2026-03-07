import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // 🔹 Restore session on refresh
  useEffect(() => {

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const staffType = localStorage.getItem("staffType");

    if (token && role) {
      setUser({
        role,
        staffType: staffType || null
      });
    }

  }, []);

  const login = async (email, password) => {

    localStorage.clear();

    const res = await api.post("/api/auth/login", {
      email,
      password
    });

    const { accessToken, refreshToken, role, staffType } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);

    if (staffType) {
      localStorage.setItem("staffType", staffType);
    }

    setUser({
      role,
      staffType: staffType || null
    });

    return res.data;
  };

  const logout = () => {

    localStorage.clear();
    setUser(null);

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);