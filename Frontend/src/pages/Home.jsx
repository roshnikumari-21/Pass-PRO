import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [myuser, setMyuser] = useState(null);

  // Check session storage for user details
  useEffect(() => {
    const user = sessionStorage.getItem("MyUser");
    if (user && !myuser) setMyuser(true);
  }, [myuser]);

  // Handle logout functionality
  const handleLogout = () => {
    sessionStorage.removeItem("MyUser");
    sessionStorage.removeItem("token");
    alert("User logged out");
    setMyuser(false);
    navigate("/");
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-between bg-cover bg-center"
        style={{ backgroundImage: "url('/bg2.jpg')" }}
      >
        <div className="min-h-screen flex flex-col justify-between">
          {/* Main Content */}
          <div className="flex flex-col items-center justify-center flex-grow py-2">
            <div className="flex justify-center items-center flex-wrap">
              <div className="mt-4 flex flex-col justify-center items-start p-4">
                <h1 className="font-bold text-4xl text-center text-white">
                  <span className="text-pink-800">W</span>elcome to Pass
                  <span className="text-pink-800">PRO</span>!
                </h1>
                <h5 className="text-gray-200 text-center mt-2">
                  Secure Your Digital World – Manage, Protect, and Access All
                  Your Passwords in One Place.
                </h5>
                <div className="bg-gray-100 bg-opacity-50 shadow-lg rounded-lg p-4 mt-8">
                  {myuser ? (
                    <div>
                      <button
                        onClick={() => navigate("/manager")}
                        className="bg-purple-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out"
                      >
                        Manage my Password
                      </button>
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 ml-4 rounded transition duration-200 ease-in-out"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <h2 className="text-white mb-2">
                        New User? Create an Account for Free
                      </h2>
                      <Link to="/login">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm rounded transition duration-200 ease-in-out">
                          Log In
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Features Section */}
            <div className="mt-10 bg-white bg-opacity-40 shadow-lg rounded-lg p-6 w-4/5 mx-auto">
              <h2 className="text-2xl font-bold text-center text-purple-950">
                <u>Features</u>
              </h2>
              <div className="flex flex-wrap justify-around mt-4">
                <div className="max-w-sm flex flex-col items-center p-4">
                  <h3 className="text-xl font-semibold text-purple-600">
                    Password Management
                  </h3>
                  <p className="text-white text-center">
                    Safely store all your passwords and access them anytime,
                    anywhere.
                  </p>
                </div>
                <div className="max-w-sm flex flex-col items-center p-4">
                  <h3 className="text-xl font-semibold text-purple-600">
                    Strong Password Generation
                  </h3>
                  <p className="text-white text-center">
                    Generate strong passwords with just one click, ensuring your
                    security.
                  </p>
                </div>
                <div className="max-w-sm flex flex-col items-center p-4">
                  <h3 className="text-xl font-semibold text-purple-600">
                    Cross-Device Synchronization
                  </h3>
                  <p className="text-white text-center">
                    Access your passwords seamlessly across all your devices.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-10 mb-10 w-full">
              <h2 className="text-2xl font-bold text-center text-purple-700">
                What Our Users Say
              </h2>
              <div className="flex flex-wrap justify-around mt-4">
                <div className="bg-white bg-opacity-40 border rounded shadow p-4 m-2 max-w-xs text-center">
                  <p className="text-white">
                    "PassPRO has completely changed the way I manage my
                    passwords. Excellent service!"
                  </p>
                  <p className="font-semibold mt-2">- Alex Y.</p>
                </div>
                <div className="bg-white bg-opacity-40 border rounded shadow p-4 m-2 max-w-xs text-center">
                  <p className="text-white">
                    "The password generator is super handy and keeps my
                    accounts safe!"
                  </p>
                  <p className="font-semibold mt-2">- Jamie L.</p>
                </div>
                <div className="bg-white bg-opacity-40 border rounded shadow p-4 m-2 max-w-xs text-center">
                  <p className="text-white">
                    "I love how I can access my passwords anytime from any
                    device!"
                  </p>
                  <p className="font-semibold mt-2">- Chris R.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
