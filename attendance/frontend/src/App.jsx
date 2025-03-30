import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Calendar from './components/Calendar';
import AttendanceForm from './components/AttendanceForm';
import TimetableForm from './components/TimetableForm';
import AttendanceStats from './components/AttendanceStats';
import ProfileIcon from './components/ProfileIcon';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">Attendance System</h1>
          <ProfileIcon />
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/attendance/:sessionId" element={<AttendanceForm onClose={() => window.history.back()} />} />
          <Route path="/timetable" element={<TimetableForm onClose={() => window.history.back()} />} />
          <Route path="/attendance-stats" element={<AttendanceStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;