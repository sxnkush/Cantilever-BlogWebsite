import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (err) {
        if (
          err.response?.status == 401 ||
          err.response?.data.message === "unauthorized"
        ) {
            setIsAuthenticated(false)
            navigate("/login")
        } else console.log("Error in frontend user fetch", err);
      }
    };

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
