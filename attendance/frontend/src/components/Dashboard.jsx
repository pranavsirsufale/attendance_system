import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">AMS Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => navigate('/calendar')}
                className="w-full text-left py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Calendar
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => navigate('/stats')}
                className="w-full text-left py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Stats
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => navigate('/timetable/add')}
                className="w-full text-left py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Add Timetable
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 bg-red-600 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;