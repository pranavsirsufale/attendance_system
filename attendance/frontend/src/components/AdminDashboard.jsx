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