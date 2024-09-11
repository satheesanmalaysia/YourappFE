"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '../AuthContext';





export default function Profile() {
  const { token } = useAuth();
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    displayName: 'Test',
    gender: 'Test',
    birthday: 'test',
    horoscope: 'Test',
    zodiac: 'Test',
    height: '175 cm',
    weight: '69 kg'
  });
  useEffect(() => {
   
    // Fetch profile from the API
    console.log("fetchProfile");
    async function fetchProfile() {
  
      const res = await fetch('https://yourappbe.onrender.com/api/getProfile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProfile(data);
      setFormData(data.profile);
    }
    fetchProfile();


  }, []);

  if (!profile) {
    return <p>Loading...</p>;
  }
  // State for form data
 
  const addImage = ()=>{
alert('Add image under construction');
  }
  // Toggle edit mode
  const toggleEdit = () => {
    async function updateProfile() {
      const res = await fetch('https://yourappbe.onrender.com/api/updateProfile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',  // Set content type to JSON
          Authorization: `Bearer ${token}`,    // Attach token in the authorization header
        },
        body: JSON.stringify(formData),        // Send formData directly (no additional wrapping)
      });

    if(res.ok){
    const data = await res.json();
    console.log(data);
    setProfile(data);
    setFormData(data.profile);
    }
    setIsEditing(!isEditing);
  };
  updateProfile();
}


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4">
        <div className="flex-1 text-center">@{profile.username}</div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-700">
          {isEditing ? (
            <div className="flex justify-center items-center w-full h-full">
              <button  onClick={addImage}className="bg-gray-800 p-2 rounded-lg">Add image</button>
            </div>
          ) : (
            <img 
              
              className="object-cover w-full h-full image-background " 
            />
          )}
        </div>
        <div className="mt-4">
          {isEditing ? (
            <input
              type="text"
              name="displayName"
              value={profile.email}
              onChange={handleChange}
              className="bg-gray-800 w-full p-2 rounded-lg"
            />
          ) : (
            <p>@{profile.email}</p>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-800 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center">
          <h3>About</h3>
          {isEditing ? (
            <button onClick={toggleEdit}>Save & Update</button>
          ) : (
            <button onClick={toggleEdit}>Edit</button>
          )}
        </div>

        {isEditing ? (
          <div className="mt-4 space-y-4">
            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-gray-800 w-full p-2 rounded-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label>Birthday</label>
              <input
                type="text"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="bg-gray-800 w-full p-2 rounded-lg"
              />
            </div>

            <div>
              <label>Horoscope</label>
              <input
                type="text"
                name="horoscope"
                value={formData.horoscope}
                onChange={handleChange}
                className="bg-gray-800 w-full p-2 rounded-lg"
              />
            </div>

            <div>
              <label>Zodiac</label>
              <input
                type="text"
                name="zodiac"
                value={formData.zodiac}
                onChange={handleChange}
                className="bg-gray-800 w-full p-2 rounded-lg"
              />
            </div>

            <div>
              <label>Height</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="bg-gray-800 w-full p-2 rounded-lg"
              />
            </div>

            <div>
              <label>Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="bg-gray-800 w-full p-2 rounded-lg"
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <p>Gender: {formData.gender}</p>
            <p>Birthday: {formData.birthday}</p>
            <p>Horoscope: {formData.horoscope}</p>
            <p>Zodiac: {formData.zodiac}</p>
            <p>Height: {formData.height}</p>
            <p>Weight: {formData.weight}</p>
          </div>
        )}
      </div>

      {/* Interest Section */}
      <div className="bg-gray-800 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center">
          <h3>Interest</h3>
          <button onClick={()=>{ router.push('/interest'); }}>Edit</button>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className="flex flex-wrap gap-2">
          {formData.interests.map((interest, index) => (
            <div key={index} className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
              <span>{interest}</span>
             
            </div>
          ))}
        </div>
      </div>
        <p>Add in your interest to find a better match.</p>
      </div>
    </div>
  );
}
