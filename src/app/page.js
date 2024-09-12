"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthContext';


export default function Login() {
  const { saveToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Mock API call
    const res = await fetch('https://yourappbe.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
    const data = await res.json();

    // Handle the data from the response
    console.log('Login successful:', data);
    if (res.ok) {
      if (data.token) {
        
        // Save the token after successful login
        saveToken(data.token);
      }
      router.push('/dashboard'); // Redirect to dashboard on success
    } else {
      alert('Please check your credentials')
    }
   
  };

  return (
    
    <div className="h-screen flex flex-col justify-center items-center bg-dark">
    
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
        <div className="relative">
        <div className="custom-text">Login</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
            required
          />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="image-button"
        >
        
        </button>
        <p className="text-center">
          No account? <a href="/register" className="text-accent">Register here</a>
        </p>
      </form>
    </div>
  );
}
