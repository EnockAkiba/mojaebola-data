import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    console.log("CHECK AUTH START");

    try {
      const token = await AsyncStorage.getItem("@token");

      console.log("TOKEN :", token);

      setIsAuth(!!token);
    } catch (error) {
      console.log("AUTH ERROR :", error);
    } finally {
      console.log("SET LOADING FALSE");

      setLoading(false);
    }
  };

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("@token", token);
      setIsAuth(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      setIsAuth(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};