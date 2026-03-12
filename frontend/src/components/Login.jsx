import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ── inline SVG icons (no extra deps) ─────────────────────────────────────────
const EyeIcon = ({ off }) =>
  off ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

const Spinner = () => (
  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

function Login({ setIsAdmin, notifyUser }) {
  const [username,    setUsername]    = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1 — get tokens
      const tokenRes = await axios.post('/api/token/', { username, password });
      const { access, refresh } = tokenRes.data;

      // 2 — fetch role
      const infoRes = await axios.get('/api/teacher-info/', {
        headers: { Authorization: `Bearer ${access}` },
      });

      // 3 — persist & redirect
      localStorage.setItem('access_token',  access);
      localStorage.setItem('refresh_token', refresh);
      setIsAdmin(infoRes.data.is_admin);

      notifyUser('Logged in successfully.', 'success');
      navigate(infoRes.data.is_admin ? '/admin' : '/calendar');

    } catch (err) {
      const msg = err.response?.status === 401
        ? 'Invalid username or password.'
        : 'Unable to connect. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: 'url("bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="relative min-h-screen flex items-center justify-center p-4"
    >
      {/* frosted card */}
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm bg-black/25 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* top accent bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="px-8 py-9 text-center">

          {/* logo */}
          <motion.img
            src="logo.jpeg"
            alt="College Logo"
            className="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-lg border-2 border-white/30 object-cover"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}
          />

          <h1 className="text-lg font-extrabold text-white leading-snug">
            Manikchand Pahade Law College
          </h1>
          <p className="text-indigo-200 text-xs mt-1 mb-7 tracking-wide uppercase">
            Attendance Portal
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left" noValidate>

            {/* username */}
            <div>
              <label className="block text-xs font-semibold text-indigo-200 mb-1.5 uppercase tracking-wide">
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50"
              />
            </div>

            {/* password */}
            <div>
              <label className="block text-xs font-semibold text-indigo-200 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition"
                >
                  <EyeIcon off={showPass} />
                </button>
              </div>
            </div>

            {/* error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-2.5 text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading  ? { scale: 0.97 } : {}}
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-500
                         text-white shadow-lg hover:shadow-indigo-400/40 hover:shadow-xl transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            >
              {loading ? <><Spinner /> Signing in…</> : 'Sign In'}
            </motion.button>
          </form>
        </div>

        {/* footer */}
        <div className="px-8 py-4 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">© 2025 MPLC Attendance System</p>
          <p className="text-white/25 text-xs mt-0.5">Developed by Pran</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
