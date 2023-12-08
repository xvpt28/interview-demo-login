import React, { useEffect, useState } from "react";
import { getUsers, login } from "../api/user";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { showMessage } from "../utils/tools";
import { User } from "../types/user";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (location.state) {
      showMessage(location.state.message, location.state.type);
      location.state = null;
    }
  }, [location]);

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await login(data);

    if (resp.data) {
      // Save token to local storage
      if (resp.token && resp.token.length > 0) {
        localStorage.setItem("token", resp.token);
      }
      // 跳转页面
      navigate("/notes", {
        state: { message: "Login Successfully", type: "success" },
      });
      setIsLoading(false);
    } else {
      showMessage(resp.message, "error");
      setIsLoading(false);
    }
  };

  return (
    <SnackbarProvider maxSnack={1}>
      <div className="h-screen flex justify-center items-center ">
        <div className="w-[300px]">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label className="form-control w-full max-w-xs my-3">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                type="text"
                placeholder="Input your username"
                className="input input-bordered w-full max-w-xs input-md"
                value={data.username}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, username: e.target.value };
                  })
                }
              />
            </label>

            <label className="form-control w-full max-w-xs my-3">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Input your password"
                className="input input-bordered w-full max-w-xs input-md"
                value={data.password}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
            </label>

            <button
              type="submit"
              className={`btn ${isLoading || "btn-neutral"} w-full btn-md my-3`}
              disabled={isLoading}
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              Login
            </button>
          </form>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default Login;
