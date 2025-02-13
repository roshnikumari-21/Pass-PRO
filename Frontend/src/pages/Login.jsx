import React, { useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      return handleError("All fields are required");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await axios.post(url, login);

      const { success, jwtToken, name, error, mssg } = response?.data || {};

      if (success) {
        handleSuccess(mssg || "Login successful");
        sessionStorage.setItem("token", jwtToken);
        sessionStorage.setItem("MyUser", name);
        navigate("/manager");
      } else {
        handleError(error || "Invalid credentials");
        setLogin((prev) => ({ ...prev, password: "" }));
      }
    } catch (error) {
      handleError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-400 text-sm mt-2">
            Don't have an account?{" "}
            <span
              className="text-purple-400 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
      {/* Move ToastContainer to App.js */}
    </div>
  );
};

export default Login;
