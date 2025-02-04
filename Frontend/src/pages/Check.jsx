import React, { useState } from 'react';

const Check = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const evaluateStrength = (pwd) => {
    if (pwd.length < 6) return 'Weak';
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 6) return 'Strong';
    return 'Medium';
  };

  const handleInputChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(evaluateStrength(pwd));
  };

  return (
    <div className="p-10 bg-white bg-opacity-50 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Password Strength Checker</h2>
      <input
        // type="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        className="w-full p-2 border rounded mb-2"
      />
      <p>
        Strength: <span className={`font-bold ${strength === 'Strong' ? 'text-green-500' : strength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{strength}</span>
      </p>
    </div>
  );
};

export default Check;
