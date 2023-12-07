import React, { useEffect, useState } from "react";
import { getUsers } from "../api/user";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await getUsers();
    })();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
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
            />
          </label>

          <label className="form-control w-full max-w-xs my-3">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              placeholder="Input your password"
              className="input input-bordered w-full max-w-xs input-md"
            />
          </label>

          <button
            type="submit"
            className={`btn ${isLoading || "btn-neutral"} w-full btn-md my-3`}
          >
            {isLoading && <span className="loading loading-spinner"></span>}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
