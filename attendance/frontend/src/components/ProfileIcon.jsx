import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaUserTag, FaClock } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';

function ProfileIcon() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Not logged in');
        navigate('/');
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/teacher-info/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const last_login = convertToIndianFormat(response.data.last_login);
        const token_expiry = convertToIndianFormat(response.data.token_expiry);
        const data = { ...response.data, last_login, token_expiry };
        setProfile(data);
        setError('');
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile');
        navigate('/');
      }
    };

    fetchProfile();

    function convertToIndianFormat(isoString) {
      const date = new Date(isoString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedHours = hours.toString().padStart(2, '0');
      return `${formattedHours}:${minutes} ${ampm}`;
    }

    const checkTokenExpiry = setInterval(() => {
      const token = localStorage.getItem('access_token');
      if (token && profile?.token_expiry) {
        const expiry = new Date(profile.token_expiry);
        const now = new Date();
        if (now >= expiry) {
          localStorage.removeItem('access_token');
          setProfile(null);
          setError('Session expired');
          navigate('/');
        }
      }
    }, 1000);

    return () => clearInterval(checkTokenExpiry);
  }, [navigate, profile?.token_expiry]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setProfile(null);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <div className="relative ">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <FaUserCircle className="text-2xl" />
        Profile
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-purple-200 p-5 animate-fadeIn text-gray-800 z-50">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : profile ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaUserTag className="text-indigo-500" />
                <p><strong>Name:</strong> {profile.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaUserTag className="text-pink-500" />
                <p><strong>Role:</strong> {profile.is_admin ? 'Admin' : 'Teacher'}</p>
              </div>
              <div className="flex items-center gap-2">
                <MdAccessTime className="text-green-500" />
                <p><strong>Last Login:</strong> {profile.last_login || 'N/A'}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-orange-500" />
                <p><strong>Token Expiry:</strong> {profile.token_expiry || 'N/A'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition duration-200 w-full justify-center mt-3"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;









/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileIcon() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();




  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Not logged in');
        navigate('/');
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/teacher-info/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const last_login = convertToIndianFormat(response.data.last_login)
        const token_expiry = convertToIndianFormat(response.data.token_expiry)

        const data = {...response.data , last_login : last_login , token_expiry : token_expiry}
        setProfile(data);
        setError('');
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile');
        navigate('/');
      }
    };
    fetchProfile();




    function convertToIndianFormat(isoString) {
      // Parse the ISO string to a Date object
      const date = new Date(isoString);
      
      // Format the date in DD/MM/YYYY format
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      // Format time in 12-hour format with AM/PM
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // If hours is 0, make it 12
      const formattedHours = hours.toString().padStart(2, '0');
      
      // Create the formatted string
      //return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${ampm}`;

      return `${formattedHours}:${minutes} ${ampm}`
    }




    const checkTokenExpiry = setInterval(() => {
      const token = localStorage.getItem('access_token');
      if (token && profile?.token_expiry) {
        const expiry = new Date(profile.token_expiry);
        const now = new Date();
        if (now >= expiry) {
          localStorage.removeItem('access_token');
          setProfile(null);
          setError('Session expired');
          navigate('/');
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(checkTokenExpiry); // Cleanup on unmount
  }, [navigate, profile?.token_expiry]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setProfile(null);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
      >
        Profile
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-gray-800">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : profile ? (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Role:</strong> {profile.is_admin ? 'Admin' : 'Teacher'}</p>
              <p><strong>Last Login:</strong> {profile.last_login || 'N/A'}</p>
              <p><strong>Token Expiry:</strong> {profile.token_expiry || 'N/A'}</p>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;



*/



