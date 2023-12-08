import React from "react";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/user";
import { showMessage } from "../utils/tools";

const AuthContext = createContext({});

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();

  const authUser = async () => {
    const resp = await auth();
    if (resp.data) {
      return resp.data;
    } else {
      navigate("/login", {
        state: { message: "Login expired, please login again.", type: "error" },
      });
      return null;
    }
  };

  const payload = useMemo(() => {
    return authUser();
  }, []);

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
