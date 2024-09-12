"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    if(password!=confirmPassword){
      alert('Password should match')
      return;
    } else {
      if (password.length < 8) {
        alert('Password must be at least 8 characters long and at least one digit.');
        return;
      }
      if (!/[0-9]/.test(password)) {
        alert('Password must be at least 8 characters long and at least one digit.');
        return;
      }
    }
    e.preventDefault();
    // Mock API call
    const res = await fetch('https://yourappbe.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      const res = await fetch('https://yourappbe.onrender.com/api/createProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${data.token}`, },
        
        body: JSON.stringify({ email, username }),
      });
      if (res.ok) {
      router.push('/'); // Redirect to login page on success
    }}
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-dark">
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-6">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
            required
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
            required
          />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
            required
          />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-accent text-white font-bold py-3 rounded-lg"
        >
          Register
        </button>
        <p className="text-center">
          Have an account? <a href="/" className="text-accent">Login here</a>
        </p>
      </form>
    </div>
  );
}
