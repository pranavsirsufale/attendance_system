
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function AdminDashboard({notifyUser}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in first");
        navigate("/");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/teacher-info/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(response.data.is_admin);
        if (!response.data.is_admin) {
          setError("You are not authorized to access this page");
          navigate("/calendar");
        }
      } catch (err) {
        setError("Failed to verify admin status");
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    notifyUser('logged out successfully 🔐 ' ,'warning')
    navigate("/");
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-gradient-to-br from-red-50 to-red-100 min-h-screen text-red-600 flex items-center justify-center"
      >
        <motion.p
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-xl font-semibold bg-red-200/50 px-6 py-3 rounded-lg shadow-md"
        >
          {error}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-4"
      >
        <motion.h2
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
        >
          Admin Dashboard
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 via-red-600 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Logout
        </motion.button>
      </motion.div>
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
              Manage Teachers
            </h3>
            <Link
              to="/admin/teachers"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
            >
              View/Edit Teachers
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
              Manage Students
            </h3>
            <Link
              to="/admin/students"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
            >
              View/Edit Students
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
              Manage Programs
            </h3>
            <Link
              to="/admin/programs"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
            >
              View/Edit Programs
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
              Manage Subjects
            </h3>
            <Link
              to="/admin/subjects"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
            >
              View/Edit Subjects
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
              Manage Timetables
            </h3>
            <Link
              to="/admin/timetables"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
            >
              View/Edit Timetables
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
              Manage Sessions
            </h3>
            <Link
              to="/admin/sessions"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
            >
              View/Edit Sessions
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
              View All Stats
            </h3>
            <Link
              to="/admin/attendance-stats"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
            >
              View Attendance Stats
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default AdminDashboard;



/*


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in first");
        navigate("/");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/teacher-info/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(response.data.is_admin);
        if (!response.data.is_admin) {
          setError("You are not authorized to access this page");
          navigate("/calendar");
        }
      } catch (err) {
        setError("Failed to verify admin status");
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-300">
          Admin Dashboard
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white py-2 px-6 rounded-full hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 shadow-md transition-all duration-200"
        >
          Logout
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300 p-3 rounded-lg mb-6 shadow-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {isAdmin && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            { title: "Manage Teachers", link: "/admin/teachers" },
            { title: "Manage Students", link: "/admin/students" },
            { title: "Manage Programs", link: "/admin/programs" },
            { title: "Manage Subjects", link: "/admin/subjects" },
            { title: "Manage Timetables", link: "/admin/timetables" },
            { title: "Manage Sessions", link: "/admin/sessions" },
            { title: "View All Stats", link: "/admin/attendance-stats" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-gray-700"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                {item.title}
              </h3>
              <Link
                to={item.link}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-medium transition-colors duration-200"
              >
                {item.title === "View All Stats" ? "View Attendance Stats" : "View/Edit"}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default AdminDashboard;




===============================

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in first");
        navigate("/");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/teacher-info/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(response.data.is_admin);
        if (!response.data.is_admin) {
          setError("You are not authorized to access this page");
          navigate("/calendar");
        }
      } catch (err) {
        setError("Failed to verify admin status");
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  if (error) {
    return <div className="p-6 bg-gray-100 min-h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Teachers</h3>
            <Link to="/admin/teachers" className="text-blue-600 hover:underline">
              View/Edit Teachers
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Students</h3>
            <Link to="/admin/students" className="text-blue-600 hover:underline">
              View/Edit Students
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Programs</h3>
            <Link to="/admin/programs" className="text-blue-600 hover:underline">
              View/Edit Programs
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Subjects</h3>
            <Link to="/admin/subjects" className="text-blue-600 hover:underline">
              View/Edit Subjects
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Timetables</h3>
            <Link to="/admin/timetables" className="text-blue-600 hover:underline">
              View/Edit Timetables
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Sessions</h3>
            <Link to="/admin/sessions" className="text-blue-600 hover:underline">
              View/Edit Sessions
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">View All Stats</h3>
            <Link to="/admin/attendance-stats" className="text-blue-600 hover:underline">
              View Attendance Stats
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;


*/




