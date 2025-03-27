import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import AttendanceForm from './components/AttendanceForm';
import TimetableForm from './components/TimetableForm';
import Stats from './components/Stats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/attendance/:sessionId" element={<AttendanceForm />} />
        <Route path="/timetable/add" element={<TimetableForm />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;