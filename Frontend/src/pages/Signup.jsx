import React, { useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function Signup() {

    const navigate=useNavigate();

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name,value}=e.target;
    const copysignup= {...signup}
    copysignup[name]=value;
    setSignup(copysignup);
  };


  const handlesignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signup;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/signup`;
      const response = await axios.post(url, { name, email, password });
      const { success, error, mssg } = response.data;

      if (success) {
        handleSuccess(mssg);
        navigate('/login');

      } else {
        handleError(error);
      }
    } catch (error) {
      handleError(error.response?.data?.error || "Signup failed");
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h1>

        <form onSubmit={handlesignup} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-white font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={signup.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={signup.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={signup.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Sign Up
          </button>

          {/* Already have an account? */}
          <p className="text-center text-gray-400 text-sm mt-2">
            Already have an account?{" "}
            <span
              className="text-purple-400 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;