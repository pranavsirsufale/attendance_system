import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileIcon() {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in to view profile');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/teacher-info/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeacherInfo(response.data);
        setError('');
        const expiry = response.data.token_expiry * 1000; // Convert to milliseconds
        const updateCountdown = () => {
          const now = Date.now();
          const timeRemaining = expiry - now;
          if (timeRemaining > 0) {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);
            setTimeLeft(`${minutes}m ${seconds}s`);
          } else {
            setTimeLeft('Expired');
            localStorage.removeItem('access_token');
            window.location.href = '/';
          }
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
      } catch (err) {
        console.error('Failed to fetch teacher info:', err);
        setError(err.response?.status === 401 ? 'Session expired, please log in again' : 'Failed to load profile');
      }
    };
    fetchTeacherInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold hover:bg-blue-600 transition"
      >
        {teacherInfo ? teacherInfo.name.charAt(0) : 'T'}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          {error ? (
            <p className="text-red-600 text-sm">{error}</p>
          ) : teacherInfo ? (
            <>
              <p className="text-gray-900 font-semibold">{teacherInfo.name}</p>
              <p className="text-gray-700 text-sm">Last Login: {teacherInfo.last_login || 'N/A'}</p>
              <p className="text-gray-700 text-sm">Token Expiry: {timeLeft || 'Loading...'}</p>
              <button
                onClick={handleLogout}
                className="mt-2 w-full bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-gray-600 text-sm">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;