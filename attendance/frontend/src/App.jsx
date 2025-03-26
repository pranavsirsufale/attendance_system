import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Calendar from './components/Calendar';
import AttendanceForm from './components/AttendanceForm';
import TimetableForm from './components/TimetableForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/attendance/:sessionId" element={<AttendanceForm />} />
        <Route path="/timetable/add" element={<TimetableForm />} />
      </Routes>
    </Router>
  );
}

export default App;