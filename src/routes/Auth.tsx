// package imports
import React from "react";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// modules imports
import { authUserThunk } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext({});

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  // auth guard & user state in redux
  const authUser = async () => {
    const resp = await dispatch(authUserThunk());
    if ((resp.payload as any).data) {
      return (resp.payload as any).data;
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
