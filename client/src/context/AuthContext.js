// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// ✅ Correct context name
export const AuthContext = createContext();

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);

// ✅ Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("ecomuser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUser = async () => {
      const response = await axios.get("http://localhost:5100/auth/getusers");
  
      if (response.status === 200) {
        setUserData(response?.data?.data);
        console.log(response?.data?.data);
      } else {
        setMsg(response.data?.message || "No User Found");
      }
    };

  const register = async (formData) => {
    if (!formData.name || !formData.email || !formData.password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5100/auth/register`,
        formData
      );
      if (response.status === 201) {
        setMsg(response.data.message);

        Swal.fire({
          title: "Login Now!",
          text: `Hi, ${response?.data?.data?.name}, ${response?.data?.message}`,
          icon: "success",
        });

        navigate("/account/login");
        setMsg("");
      } else {
        setMsg("Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMsg("Server error");
      setMsg("");
    }
  };

  const login = async (formData) => {
    if (!formData.email || !formData.password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5100/auth/login`,
        formData
      );

      if (response.status === 200) {
        setUser(response?.data?.user);
        console.log(user);

        localStorage.setItem("ecomuser", JSON.stringify(response?.data?.user));

        setMsg(response?.data?.message);

        Swal.fire({
          title: `Hi, ${response.data.user.name}`,
          text: response.data.message,
          icon: "success",
        });

        setTimeout(() => {
          setMsg("");
          navigate("/products");
        }, 2000);
      } else {
        Swal.fire({
          title: `"Login failed"`,
          icon: "error",
          "Redirected to": navigate("/account/login"),
        });
        setMsg("Login failed");
      }
    } catch (error) {
      console.error(error);
      setMsg("Server error");
    }
  };

  const logout = () => {
    localStorage.removeItem("ecomuser");
    setUser(null);

    Swal.fire({
      title: `You've Logout Out Successfully`,
      icon: "info",
      "Redirected to": navigate("/account/login"),
    });
  };

  return (
    <AuthContext.Provider
      value={{ register, user, setUser, login, msg, setMsg, logout, getUser, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
