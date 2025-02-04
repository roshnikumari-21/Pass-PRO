import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <>
      <nav className="bg-gray-950 text-black p-4 flex justify-between items-center shadow-lg ">
        <div className="logo text-xl font-bold text-purple-400">
          #<span className="text-white">Pass</span>PRO
        </div>

        <ul className="flex text-white">
         
          {isAuthenticated ? (
            
               <li className="mx-2 hover:bg-gray-900">
            <Link to="/manager">Home</Link>
          
            </li>
          ) : (
            <li className="mx-2 hover:bg-gray-900">
            <Link to="/">Home</Link>
            </li>
          
          )}

          <li className="mx-2 hover:bg-gray-900">
            <Link to="/about">About</Link>{" "}
          </li>
          <li className="mx-2 hover:bg-gray-900">
            <Link to="/features">Features</Link>
          </li>
          <li className="mx-2 hover:bg-gray-900">
            <Link to="/contact">Contact</Link>
          </li>


          {isAuthenticated ? (
            <li>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 mx-1 rounded text-sm"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            </li>
          ) : (
            <li className="mx-2 hover:bg-gray-900 rounded px-2">
              <button
                onClick={async () => {
                  try {
                    await loginWithRedirect();
                  } catch (error) {
                    console.error("Login error:", error);
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm rounded"
              >
                Log In
              </button>
            </li>
          )}


        </ul>
      </nav>
    </>
  );
};

export default Navbar;


