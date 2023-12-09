// packages imports
import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

// modules imports
import { showMessage } from "../utils/tools";
import useBoolean from "../hooks/use-Boolean";
import { AppDispatch } from "../redux/store";
import { loginUser } from "../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const location = useLocation();

  const loading = useBoolean(false);

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
    loading.setTrue();

    // todo: should have some validation here before sending request

    const resp = await dispatch(loginUser(data));

    if ((resp.payload as any).data) {
      // Save token to local storage
      if (
        (resp.payload as any).token &&
        (resp.payload as any).token.length > 0
      ) {
        localStorage.setItem("token", (resp.payload as any).token);
      }
      // Navigate to notes page
      navigate("/notes", {
        state: { message: "Login Successfully", type: "success" },
      });
      loading.setFalse();
    } else {
      showMessage(resp.payload as any, "error");
      loading.setFalse();
    }
  };

  //--------------------------------------------------------------
  // Handle views
  //--------------------------------------------------------------
  const renderForm = (
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
          className={`btn ${loading.value || "btn-neutral"} w-full btn-md my-3`}
          disabled={loading.value}
        >
          {loading.value && <span className="loading loading-spinner"></span>}
          Login
        </button>
      </form>
    </div>
  );

  return (
    <SnackbarProvider maxSnack={1}>
      <div className="h-screen flex justify-center items-center ">
        {renderForm}
      </div>
    </SnackbarProvider>
  );
};

export default Login;
