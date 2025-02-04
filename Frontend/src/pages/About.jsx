


import React from 'react';  

function About() {  
  return (  
    <>  
      <div  
        className="min-h-screen flex flex-col justify-between bg-cover bg-center"  
        style={{ backgroundImage: "url('/bg2.jpg')" }}  
      >  
        <div className="flex flex-col items-center justify-center flex-grow  text-gray-800 p-6 ">  
          <div className="max-w-4xl bg-white bg-opacity-60 shadow-md rounded-lg p-8">  
            <h1 className="text-4xl font-bold text-purple-600 mb-4 text-center">About Us</h1>  
            <p className="text-lg leading-relaxed mb-6 text-center">  
              Welcome to <span className="font-semibold">PassPRO</span>, your trusted password manager designed to simplify and protect your digital life.   
              We are on a mission to provide a safe, user-friendly, and powerful platform for managing all your online credentials effortlessly.  
            </p>  
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Why Choose Us?</h2>  
            <ul className="list-disc list-inside text-lg mb-6">  
              <li>🔒 <span className="font-semibold">Top-notch Security:</span> End-to-end encryption to safeguard your passwords.</li>  
              <li>🌐 <span className="font-semibold">Cross-Platform:</span> Seamlessly manage passwords on all your devices.</li>  
              <li>🤝 <span className="font-semibold">User-Friendly:</span> Intuitive design for hassle-free management.</li>  
              <li>✨ <span className="font-semibold">Advanced Features:</span> Password generator, auto-fill, and secure sharing.</li>  
            </ul>  
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Vision</h2>  
            <p className="text-lg leading-relaxed mb-6">  
              At <span className="font-semibold">PassPRO</span>, we believe in empowering individuals and businesses with tools to protect their digital identities.   
              Our vision is a world where everyone can navigate the digital landscape with confidence and security.  
            </p>  
            <div className="flex justify-center mt-6">  
              <button className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-purple-700 transition">  
                Learn More  
              </button>  
            </div>  
          </div>  
        </div>  
      </div>  
    </>  
  );  
}  

export default About;
