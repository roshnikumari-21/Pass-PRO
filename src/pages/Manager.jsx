
import React, { useRef, useState, useEffect } from "react";  
import { ToastContainer, toast } from "react-toastify";  
import { v4 as uuidv4 } from "uuid";  

const Manager = () => {  
  const ref = useRef();  
  const [form, setForm] = useState({ site: "", username: "", password: "" });  
  const [showPassword, setShowPassword] = useState(false);  
  const [passwordArray, setPasswordArray] = useState([]);  

  // Fetch passwords from MongoDB  
  const getPasswords = async () => {  
    try {  
      const response = await fetch("http://localhost:3000/api/passwords");  
      const passwords = await response.json();  
      console.log("Fetched passwords:", passwords);  
      setPasswordArray(passwords);  
    } catch (error) {  
      console.error("Error fetching passwords:", error);  
    }  
  };  

  useEffect(() => {  
    getPasswords();  
  }, []);  

  const notify = (message) => toast(message);  

  const copyText = (text) => {  
    navigator.clipboard.writeText(text);  
    notify("Password copied to clipboard");  
  };  

  const togglePasswordVisibility = () => {  
    setShowPassword(!showPassword);  
    ref.current.type = showPassword ? "password" : "text";  
  };  

  // Save Password to MongoDB  
  const savePassword = async () => {  
    if (!form.site || !form.username || !form.password) {  
      notify("Please fill all the fields");  
      return;  
    }  

    const response = await fetch("http://localhost:3000/api/passwords", {  
      method: "POST",  
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify(form),  
    });  
    
    const data = await response.json();  
    if (response.ok) {  
      setPasswordArray([...passwordArray, { ...form, _id: data.data._id }]);  
      setForm({ site: "", username: "", password: "" }); // Clear the form after saving  
      notify("Password saved successfully");  
    } else {  
      notify("Failed to save password");  
    }  
  };  

  // Delete Password from MongoDB  
  const deletePassword = async (_id) => {  
    if (!window.confirm("Are you sure you want to delete this password?")) {  
      return;  
    }  

    try {  
      const response = await fetch(`http://localhost:3000/api/passwords/${_id}`, {  
        method: "DELETE",  
      });  

      if (response.ok) {  
        setPasswordArray(passwordArray.filter((item) => item._id !== _id));  
        notify("Password deleted successfully");  
      } else {  
        const errorData = await response.json();  
        console.error("Delete error:", errorData);  
        notify("Failed to delete password");  
      }  
    } catch (error) {  
      console.error("Error deleting password:", error);  
    }  
  };  

  const editPassword = (id) => {  
    const selected = passwordArray.find((item) => item._id === id); // Use _id here  
    setForm(selected);  
    setPasswordArray(passwordArray.filter((item) => item._id !== id)); // Use _id for filtering  
    notify("Edit your password and click Save");  
  };  

  const handleChange = (e) => {  
    setForm({ ...form, [e.target.name]: e.target.value });  
  };  

  return (  
    <>  
      <div className="min-h-screen flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: "url('/bg2.jpg')" }}>  
        <ToastContainer />  

        <div className="btn flex justify-center mt-12 text-purple-500 text-3xl font-bold">  
          #<span className="text-white">Pass</span>PRO  
        </div>  
        <div className="flex justify-center text-white mb-4">Your own Password Manager</div>  

        <div className="container mx-auto">  
          <div className="text-white flex flex-col gap-3 p-4">  
            <input value={form.site} onChange={handleChange} className="border rounded-xl px-2 py-1 border-gray-950 text-black" type="text" name="site" placeholder="Enter website URL" />  
            <div className="flex">  
              <input value={form.username} onChange={handleChange} className="border w-2/3 rounded-xl mr-12 px-2 py-1 border-gray-950 text-black" type="text" name="username" placeholder="Enter Username" />  
              <input ref={ref} value={form.password} onChange={handleChange} className="border w-1/3 rounded-xl px-2 py-1 border-gray-950 text-black" type="password" name="password" placeholder="Enter Password" />  
              <span className="material-symbols-outlined mx-2 cursor-pointer text-black my-1" onClick={togglePasswordVisibility}>  
                {showPassword ? "visibility_off" : "visibility"}  
              </span>  
            </div>  
          </div>  
        </div>  

        <div className="flex justify-center items-center">  
          <button onClick={savePassword} className="bg-purple-900 px-4 py-2 text-white rounded-3xl border border-black w-fit">  
            Save  
          </button>  
        </div>  

        <div className="passwords my-4 md:my-10 md:mx-20">  
          <h2 className="text-xl font-bold mb-5">Your passwords</h2>  
          {passwordArray.length === 0 && <div>No passwords to show</div>}  
          {passwordArray.length !== 0 && (  
            <table className="table-auto w-full rounded-md overflow-hidden">  
              <thead className="text-white bg-purple-900">  
                <tr>  
                  <th className="py-2">Site</th>  
                  <th className="py-2">Username</th>  
                  <th className="py-2">Password</th>  
                  <th className="py-2">Action</th>  
                </tr>  
              </thead>  
              <tbody className="text-black bg-purple-200">  
                {passwordArray.map((item) => (  
                  <tr key={item._id}> {/* Use _id here as key */}  
                    <td className="text-center py-2">  
                      <a href={item.site} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">  
                        {item.site}  
                      </a>  
                    </td>  
                    <td className="text-center py-2">{item.username}</td>  
                    <td className="text-center py-2">  
                      <span>{"*".repeat(item.password.length)}</span>  
                      <span className="material-symbols-outlined cursor-pointer hover:text-blue-600" onClick={() => copyText(item.password)}>  
                        content_copy  
                      </span>  
                    </td>  
                    <td className="text-center py-2">  
                      <span className="material-symbols-outlined cursor-pointer hover:text-blue-600" onClick={() => editPassword(item._id)}> {/* Use _id for edit */}  
                        edit  
                      </span>  
                      <span className="material-symbols-outlined cursor-pointer hover:text-blue-600" onClick={() => deletePassword(item._id)}> {/* Use _id for delete */}  
                        delete  
                      </span>  
                    </td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
          )}  
        </div>  
      </div>  
    </>  
  );  
};  

export default Manager;