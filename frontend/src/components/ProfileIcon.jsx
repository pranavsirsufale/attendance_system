import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LogOutButton from './utilities/LogOutButton';

/** Format a JS Date (or ISO string) → "DD/MM/YYYY  HH:MM AM/PM" */
function formatDateTime(input) {
  if (!input) return 'N/A';
  const d = input instanceof Date ? input : new Date(input);
  if (isNaN(d)) return 'N/A';
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  let h = d.getHours();
  const min = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = (h % 12 || 12).toString().padStart(2, '0');
  return `${day}/${month}/${year}  ${h}:${min} ${ampm}`;
}

/**
 * Decode a JWT and return its expiry as a JS Date.
 * JWT exp is always UTC Unix seconds — no timezone ambiguity.
 * Returns null if the token is missing or malformed.
 */
function getTokenExpiry(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.exp ? new Date(payload.exp * 1000) : null;
  } catch {
    return null;
  }
}

function ProfileIcon({ notifyUser }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // fetch profile once on mount; decode expiry from JWT (UTC, no server timezone issue)
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { navigate('/'); return; }

    setTokenExpiry(getTokenExpiry(token));

    axios
      .get('/api/teacher-info/', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfile(res.data))
      .catch(() => {
        notifyUser('Failed to load profile', 'error');
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [navigate, notifyUser]);

  // single setTimeout — fires at the exact moment the token expires (no polling drift)
  useEffect(() => {
    if (!tokenExpiry) return;
    const msLeft = tokenExpiry.getTime() - Date.now();
    if (msLeft <= 0) {
      localStorage.removeItem('access_token');
      notifyUser('Session expired. Please log in again.', 'warning');
      navigate('/');
      return;
    }
    const id = setTimeout(() => {
      localStorage.removeItem('access_token');
      notifyUser('Session expired. Please log in again.', 'warning');
      navigate('/');
    }, msLeft);
    return () => clearTimeout(id);
  }, [tokenExpiry, navigate, notifyUser]);

  // close dropdown on outside click
  useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setShowDropdown(false);
    notifyUser('Logged out successfully 🔐', 'warning');
    navigate('/');
  };

  const initials = profile?.name
    ? profile.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const roleBadge = profile?.is_admin
    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
    : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300';

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setShowDropdown(v => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-indigo-300/50 hover:shadow-lg transition-all duration-200"
      >
        <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-xs font-extrabold tracking-tight">
          {loading ? '…' : initials}
        </span>
        <span className="text-sm font-semibold hidden sm:block">
          {loading ? 'Loading…' : (profile?.name?.split(' ')[0] ?? 'Profile')}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-72 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {loading ? (
              <div className="p-6 text-center text-sm text-gray-400">Loading profile…</div>
            ) : profile ? (
              <>
                {/* gradient header */}
                <div className="px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-white text-xl font-extrabold shadow">
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white font-bold text-base truncate">{profile.name}</p>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${roleBadge}`}>
                      {profile.is_admin ? '👑 Admin' : '🎓 Teacher'}
                    </span>
                  </div>
                </div>

                {/* info rows */}
                <div className="px-5 py-3 space-y-2.5 border-b border-gray-100 dark:border-gray-700">
                  <InfoRow icon="🕐" label="Last Login" value={formatDateTime(profile.last_login)} />
                  <InfoRow icon="⏳" label="Session Ends" value={formatDateTime(tokenExpiry)} />
                </div>

                {/* logout */}
                <div className="px-5 py-4 flex justify-end">
                  <LogOutButton onClick={handleLogout}>Logout</LogOutButton>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-sm text-red-500">Failed to load profile.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <span className="mt-0.5 text-base leading-none">{icon}</span>
      <div>
        <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide leading-none mb-0.5">
          {label}
        </p>
        <p className="text-gray-800 dark:text-gray-200 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default ProfileIcon;
