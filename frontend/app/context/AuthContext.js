"use client";

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // fetching user from strapi
  const fetchUser = async (token) => {
    try {
      const result = await fetch(
        "http://127.0.0.1:1337/api/users/me?populate=role",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!result.ok) throw new Error("Invalid token");

      const userData = await result.json();
      setUser(userData);
      console.log("user", userData);
    } catch (err) {
      console.error("Auth error:", err.message);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // calling the fetchUser function
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // register
  const signIn = async (username, email, password) => {
    const res = await fetch("http://127.0.0.1:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.jwt);
      setUser(data.user);
      return { success: true, data };
    } else {
      return {
        success: false,
        message: data?.error?.message || "Registration failed",
      };
    }
  };

  // login
  const logIn = async (identifier, password) => {
    const res = await fetch("http://127.0.0.1:1337/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.jwt);
      setUser(data.user);
      return { success: true };
    } else {
      return {
        success: false,
        message: data?.error?.message || "Login failed",
      };
    }
  };

  // logout
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logOut, logIn, signIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
