/* eslint-disable no-unused-vars */
import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Redirect to the backend endpoint that starts the Google OAuth process
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1>Login</h1>
      <div className="">
        <button
          onClick={handleLogin}
          className="p-2 bg-blue-950 border-1 rounded-lg flex m-8
          hover:bg-slate-950
          "
        >
          Login with
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeGj-vD7Se4BulJfLUzLe5YqhQ9gftr1J3w&s"
            alt=""
            width={30}
            className="mx-4"
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
