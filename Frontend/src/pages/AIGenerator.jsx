// src/PasswordGenerator.js  
import React, { useState } from 'react';  

const AIGenerator = () => {  
    const [weakPassword, setWeakPassword] = useState('');  
    const [strongPassword, setStrongPassword] = useState('');  

    const generateStrongPassword = (password) => {  
        
        const specialChars = "!@#$%^&*()_-+=<>?";  
        if (password.length < 8) {  
            password += '1234'; // Add numbers  
        }  
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length)); // Add a special character  
        password = password.split('').sort(() => Math.random() - 0.5).join(''); // Shuffle the password  
        return password;  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        const strongPass = generateStrongPassword(weakPassword);  
        setStrongPassword(strongPass);  
    };  

    return (  
      <div className='bg-white mt-20 rounded bg-opacity-45 mb-20'>
        <div className='px-6 py-6 '>  
            <h1 className='text-xl mb-2 font-bold'>Password Generator</h1>  
            <form onSubmit={handleSubmit}>  
                <div>  
                    {/* <label htmlFor="weakPassword " className=''>Enter Weak Password:</label>   */}
                    <input  
                    className='className="w-full p-2 border rounded mb-2'
                        type="text"  
                        id="weakPassword"  
                        placeholder='Enter your Name'
                        value={weakPassword}  
                        onChange={(e) => setWeakPassword(e.target.value)}  
                    />  
                </div>  
                <button className=' bg-purple-700 text-white rounded-full px-2 py-1 my-2 hover:bg-purple-900 ' type="submit">Generate</button>  
            </form>  
            {strongPassword && (  
                <div>  
                    <h2 className='bg-white rounded px-2 py-2'>Strong Password: {strongPassword}</h2>  
                </div>  
            )}  
        </div>
        </div>  
    );  
};  

export default AIGenerator;