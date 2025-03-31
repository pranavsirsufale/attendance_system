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
        setProfile(response.data);
        setError('');
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile');
        navigate('/');
      }
    };
    fetchProfile();

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