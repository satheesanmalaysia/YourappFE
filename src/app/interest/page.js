"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '../AuthContext';
export default function EditInterest() {
  const { token } = useAuth();
  const router = useRouter();
  // State to hold the interests
  const [interests, setInterests] = useState(['Music', 'Basketball', 'Fitness', 'Gymming']);
  const [newInterest, setNewInterest] = useState('');

  // Function to remove an interest
  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  // Function to add a new interest
  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  // Function to handle the Save action
  const saveInterests = () => {
    async function updateProfile() {
    const res = await fetch('https://yourappbe.onrender.com/api/updateProfile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',  // Set content type to JSON
        Authorization: `Bearer ${token}`,    // Attach token in the authorization header
      },
      body: JSON.stringify({
        interests: interests  // Only send the interests field
      }),        
    });
  
    const data = await res.json();

    if (res.ok) {
      router.push('/dashboard');
      console.log('Saved Interests:', interests);
      console.log(data)
    } else {
      alert('error')
    }
    // Save interests to API or update state
  
  }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={saveInterests} className="text-lg">&#x2190; Back</button>
        <button onClick={saveInterests} className="text-red-500">Save</button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-yellow-500 mb-2">Tell everyone about yourself</h3>
      <p className="text-2xl mb-4">What interests you?</p>

      {/* Interest Tags */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <div key={index} className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
              <span>{interest}</span>
              <button
                onClick={() => removeInterest(interest)}
                className="ml-2 text-sm text-red-400"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Input to Add New Interests */}
      <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add new interest"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          className="flex-grow bg-gray-900 text-white p-2 rounded-lg"
        />
        <button
          onClick={addInterest}
          className="bg-blue-500 p-2 rounded-lg text-white"
        >
          Add
        </button>
      </div>

      {/* Keyboard UI (Placeholder) */}
      <div className="mt-4">
       
      </div>
    </div>
  );
}
