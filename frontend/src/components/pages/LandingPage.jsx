import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Attendance System</h1>
      <p className="mb-8">Login to access your dashboard.</p>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default LandingPage;
