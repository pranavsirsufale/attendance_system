
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaUserTag, FaClock } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import LogOutButton from './utilities/LogOutButton';

function ProfileIcon({notifyUser}) {
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
        console.log(response.data.token_expiry)
        console.log(token_expiry)
        const data = { ...response.data, last_login, token_expiry };
        setProfile(data);

        setError('');
      } catch (err) {
        console.error('Failed to load profile:', err);
        notifyUser('Failed to load profile:'+ err , 'error');

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
    notifyUser('logged out successfully 🔐' , 'warning')
  };

  return (
    <div className="relative">
      <motion.button
        // whileHover={{ scale: 1.05, rotate: 2 }}
        // whileTap={{ scale: 0.95 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 text-white px-4 py-2 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <FaUserCircle className="text-2xl" />
        <span className="font-medium">Profile</span>
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 bg-black/70 backdrop-blur-lg   shadow-2xl border border-indigo-100 dark:border-gray-700 p-6 text-gray-800 dark:text-gray-200 z-50"
          >
            {error ? (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-red-500 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-center font-medium"
              >
                {error}
              </motion.p>
            ) : profile ? (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <FaUserTag className="text-indigo-500 dark:text-indigo-400 text-xl" />
                  <p>
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300">Name:</span>{' '}
                    {profile.name}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <FaUserTag className="text-pink-500 dark:text-pink-400 text-xl" />
                  <p>
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300">Role:</span>{' '}
                    {profile.is_admin ? 'Admin' : 'Teacher'}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <MdAccessTime className="text-green-500 dark:text-green-400 text-xl" />
                  <p>
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300">Last Login:</span>{' '}
                    {profile.last_login || 'N/A'}
                  </p>
                </motion.div>


                {/* <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <FaClock className="text-orange-500 dark:text-orange-400 text-xl" />
                  <p>
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300">Token Expiry:</span>{' '}
                    {profile.token_expiry || 'N/A'}
                  </p>
                </motion.div> */}


                <LogOutButton
                  // whileHover={{ scale: 1.05, rotate: 2 }}
                  // whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}>
                    Logout
                  </LogOutButton>
{/*
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white px-4 py-2  hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 shadow-md hover:shadow-xl transition-all duration-300 mt-4"
                >
                  <FaSignOutAlt />


                  <span>Logout</span>


                </motion.button> */}




              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center text-gray-500 dark:text-gray-400 font-medium"
              >
                Loading...
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileIcon;

