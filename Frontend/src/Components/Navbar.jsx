


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { handleError, handleSuccess } from "../pages/utils";
import { ToastContainer } from "react-toastify";


const Navbar = () => {
  
  const [myuser, setMyuser] = useState(null);
  const navigate = useNavigate();
  

  

  useEffect(() => {
      const user = sessionStorage.getItem("MyUser");
      if (user && !myuser) setMyuser(true);
    }, [myuser]);

 
  const handleLogout = () => {
    sessionStorage.removeItem("MyUser");
    sessionStorage.removeItem("token");
    handleSuccess("User logged out");
    setMyuser(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-950 text-black p-4 flex justify-between items-center shadow-lg">
        <div className="logo text-xl font-bold text-purple-400">
          #<span className="text-white">Pass</span>PRO
        </div>

        <ul className="flex text-white">
          <li className="mx-2 hover:bg-gray-900">
            <Link to={myuser ? "/manager" : "/"}>Home</Link>
          </li>
          <li className="mx-2 hover:bg-gray-900">
            <Link to="/about">About</Link>
          </li>
          <li className="mx-2 hover:bg-gray-900">
            <Link to="/features">Features</Link>
          </li>
          <li className="mx-2 hover:bg-gray-900">
            <Link to="/contact">Contact</Link>
          </li>

          {myuser ? (
            <li>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 mx-1 rounded text-sm"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </li>
          ) : (
            <li className="mx-2 hover:bg-gray-900 rounded px-2">
              <button
                onClick={()=>navigate('/login')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm rounded"
              >
                Log In
              </button>
            </li>
          )}
        </ul>
        <ToastContainer/>
      </nav>
    </>
  );
};

export default Navbar;
