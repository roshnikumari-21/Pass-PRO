import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaLock, FaUser, FaEye, FaEyeSlash,FaTrash, FaClipboard, } from "react-icons/fa";


// API URL
const API_URL = `${import.meta.env.VITE_API_URL}/api/passwords` || "http://localhost:3000/api/passwords";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    getPasswords();
  }, []);

  const notify = (msg, type = "success") => toast[type](msg);

  const getPasswords = async () => {
    try {
      const response = await axios.get(API_URL);
      setPasswordArray(response.data.data || []);
    } catch (error) {
      console.error("Error fetching passwords:", error);
      setPasswordArray([]);
      notify("Failed to load passwords. Check your connection.", "error");
    }
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      notify("Please fill all fields", "error");
      return;
    }

    try {
      const response = await axios.post(API_URL, form);
      setPasswordArray([...passwordArray, response.data.data]);
      setForm({ site: "", username: "", password: "" });
      notify("Password saved successfully");
    } catch (error) {
      console.error("Error saving password:", error);
      notify("Failed to save password", "error");
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPasswordArray(passwordArray.filter((item) => item._id !== id));
      notify("Password deleted successfully");
    } catch (error) {
      console.error("Error deleting password:", error);
      notify("Failed to delete password", "error");
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notify("Copied to clipboard");
  };

  const toggleRowPassword = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };




  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-between overflow-hidden"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Translucent White Background */}
        <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold text-center mb-4">Password Manager</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Website"
              value={form.site}
              onChange={(e) => setForm({ ...form, site: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={savePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>

          {passwordArray.length === 0 ? (
            <div className="text-center mt-6 text-gray-500">
              <span className="text-4xl"><FaLock/></span>
              <p>No saved passwords yet. Add one now!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full mt-6 border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-purple-700">
                    <th className="border p-2">Website</th>
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Password</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item) => (
                    <tr key={item._id} className="text-center">
                      <td className="border p-2 hover:text-blue-600" > <a href={item.site} target="_blank">
                        {item.site}
                      </a></td>
                      <td className="border p-2">{item.username}</td>
                      <td className="border p-2">
                        {visiblePasswords[item._id] ? item.password : "●●●●●●●"}
                        <button onClick={() => toggleRowPassword(item._id)} className="ml-2">
                          {visiblePasswords[item._id] ? <FaEye/> :<FaEyeSlash/>}
                        </button>
                        <button onClick={() => copyText(item.password)} className="ml-2  hover:text-blue-600">
                          <FaClipboard/>
                        </button>
                      </td>
                      <td className="border p-2">
                        <button onClick={() => deletePassword(item._id)} className=" hover:text-blue-600">
                          <FaTrash/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Manager;
