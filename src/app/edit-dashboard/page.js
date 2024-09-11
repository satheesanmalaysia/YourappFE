"use client";

import { useState, useEffect } from 'react';

export default function EditDashboard() {
  const [profile, setProfile] = useState({
    displayName: '',
    gender: '',
    birthday: '',
    horoscope: '',
    zodiac: '',
    height: '',
    weight: '',
  });

  useEffect(() => {
    // Fetch existing profile data
    async function fetchProfile() {
      const res = await fetch('/api/profile');
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // Send updated profile to the API
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
  };

  return (
    <div className="min-h-screen bg-dark p-6">
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <label className="block text-gray-500">Display Name</label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-500">Gender</label>
          <input
            type="text"
            value={profile.gender}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-500">Birthday</label>
          <input
            type="date"
            value={profile.birthday}
            onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-accent text-white font-bold py-3 rounded-lg"
        >
          Save & Update
        </button>
      </form>
    </div>
  );
}
