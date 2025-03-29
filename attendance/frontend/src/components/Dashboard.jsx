import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';
import Stats from './Stats';
import Timetable from './TimetableForm';
import AttendanceForm from './AttendanceForm';
import TimetableForm from './TimetableForm';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'calendar':
        return <Calendar />; // Replace with your actual Calendar component
      case 'stats':
        return <Stats />; // Replace with your actual Stats component
      case 'timetable':
        return <Timetable />; // Replace with your actual TimetableForm component
      case 'attendanceform':
        return <AttendanceForm />; // Replace with your actual AttendanceForm component
      default:
        return <Outlet />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-blue-900 text-white flex flex-col p-6">
          <h2 className="text-3xl font-bold mb-8 text-center">AMS Dashboard</h2>
          <nav className="flex-1">
            <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveComponent('calendar')}
              className="w-full text-left py-3 px-4 bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-200"
            >
              Calendar
            </button>
          </li> 
          <li>
            <button
              onClick={() => setActiveComponent('timetable')}
              className="w-full text-left py-3 px-4 bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-200"
            >
              Add Timetable
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('stats')}
              className="w-full text-left py-3 px-4 bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-200"
            >
              Stats
            </button>
          </li>
         
          <li>
            <button
              onClick={() => setActiveComponent('attendanceform')}
              className="w-full text-left py-3 px-4 bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-200"
            >
              Attendance
            </button>
          </li>
            </ul>
          </nav>
          <div className="mt-8">
            <button
          onClick={handleLogout}
          className="w-full text-left py-3 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
            >
          Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
      <div className="flex-1 p-8 bg-white shadow-inner overflow-auto w-full">
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default Dashboard;