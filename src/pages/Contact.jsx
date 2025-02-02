import React, { useRef, useState } from 'react';  
import emailjs from '@emailjs/browser';  
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {  

   const sent = () => toast("Email Sent Successfully");
  const form = useRef();  
  const [status, setStatus] = useState('');  

  const sendEmail = (e) => {  
    e.preventDefault();  

    emailjs  
      .sendForm('service_ybzl8np', 'template_c0rg5qg', form.current, 'KM73fUo8Z0gEih3GK')  
      .then(  
        () => {  
          // setStatus('SUCCESS! Your message has been sent.');  
           sent()
          form.current.reset(); // Reset the form after successful submission  
        },  
        (error) => {  
          setStatus(`FAILED... ${error.text}`);  
        }  
      );  
  };  

  return (  
    <div  
      className="min-h-screen bg-cover bg-center flex flex-col justify-between"  
      style={{ backgroundImage: "url('/bg2.jpg')" }}  
    >  
      <div className="flex flex-col items-center justify-center flex-grow text-gray-800 p-6">  
        <div className="max-w-3xl bg-white bg-opacity-70 shadow-md rounded-lg p-8">  
          <h1 className="text-4xl font-bold text-purple-600 mb-4 text-center">Contact Us</h1>  
          <p className="text-lg leading-relaxed mb-6 text-center">  
            We’d love to hear from you! Please fill out the form below, and we’ll get back to you as soon as possible.  
          </p>  

          {/* Form Section */}  
          <form ref={form} onSubmit={sendEmail}>  
            <div className="mb-4">  
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">  
                Name  
              </label>  
              <input  
                type="text"  
                name="user_name"  
                placeholder="Your Name"  
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                required  
              />  
            </div>  
            <div className="mb-4">  
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">  
                Email  
              </label>  
              <input  
                type="email"  
                name="user_email"  
                placeholder="Your Email"  
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                required  
              />  
            </div>  
            <div className="mb-4">  
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">  
                Message  
              </label>  
              <textarea  
                name="message"  
                rows="4"  
                placeholder="Your Message"  
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                required  
              />  
            </div>  
            <div className="flex justify-center">  
              <button  
                type="submit"  
                className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-purple-700 transition"  
              >  
                Send Message  
              </button>  
            </div>  
          </form>  

          {/* Status Message */}  
          {status && (  
            <div className={`mt-4 text-center ${status.includes('SUCCESS') ? 'text-green-600' : 'text-red-600'}`}>  
              {status}  
            </div>  
          )}  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Contact;