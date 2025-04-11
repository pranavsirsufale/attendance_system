
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Calendar from './components/Calendar';
import AttendanceForm from './components/AttendanceForm';
import TimetableForm from './components/TimetableForm';
import AttendanceStats from './components/AttendanceStats';
import AdminDashboard from './components/AdminDashboard';
import AdminCRUD from './components/AdminCRUD';
import AdminAttendanceStats from './components/AdminAttendanceStats';
import ProfileIcon from './components/ProfileIcon';
import TeacherCRUD from './components/admin/TeacherCRUD';
import StudentCRUD from './components/admin/StudentCRUD';
import ProgramCRUD from './components/admin/ProgramCRUD';
import SubjectCRUD from './components/admin/SubjectCRUD';
import TimetableCRUD from './components/admin/TimetableCRUD';
import SessionCRUD from './components/admin/SessionCRUD';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChalkboardTeacher } from 'react-icons/fa';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/teacher-info/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(response.data.is_admin);
      } catch (err) {
        console.error('Failed to verify admin status:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-300">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-blue-800 animate-pulse"
        >
          Loading Attendance System...
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-xl font-extrabold flex items-center gap-2"
          >
            <FaChalkboardTeacher className="text-white text-2xl" />
            Attendance System
          </motion.div>
          <ProfileIcon />
        </nav>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/calendar" element={<Calendar admin={isAdmin} />} />
            <Route path="/attendance/:sessionId" element={<AttendanceForm onClose={() => window.history.back()} />} />
            <Route path="/timetable" element={<TimetableForm onClose={() => window.history.back()} />} />
            <Route path="/attendance-stats" element={<AttendanceStats />} />
            {isAdmin && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/teachers" element={<TeacherCRUD resource="teachers" />} />
                <Route path="/admin/students" element={<StudentCRUD resource="students" />} />
                <Route path="/admin/programs" element={<ProgramCRUD resource="programs" />} />
                <Route path="/admin/subjects" element={<SubjectCRUD resource="subjects" />} />
                <Route path="/admin/timetables" element={<TimetableCRUD resource="timetables" />} />
                <Route path="/admin/sessions" element={<SessionCRUD resource="sessions" />} />
                <Route path="/admin/attendance-stats" element={<AdminAttendanceStats />} />
              </>
            )}
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;











/*


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Calendar from './components/Calendar';
import AttendanceForm from './components/AttendanceForm';
import TimetableForm from './components/TimetableForm';
import AttendanceStats from './components/AttendanceStats';
import AdminDashboard from './components/AdminDashboard';
import AdminCRUD from './components/AdminCRUD'; // We'll create this
import AdminAttendanceStats from './components/AdminAttendanceStats'; // We'll create this
import ProfileIcon from './components/ProfileIcon';
import TeacherCRUD from './components/admin/TeacherCRUD';
import StudentCRUD from './components/admin/StudentCRUD';
import ProgramCRUD from './components/admin/ProgramCRUD';
import SubjectCRUD from './components/admin/SubjectCRUD';
import TimetableCRUD from './components/admin/TimetableCRUD';
import SessionCRUD from './components/admin/SessionCRUD';




function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/teacher-info/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(response.data.is_admin);
      } catch (err) {
        console.error('Failed to verify admin status:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">Attendance System</h1>
          <ProfileIcon />
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calendar" element={<Calendar admin = {isAdmin} />} />
          <Route path="/attendance/:sessionId" element={<AttendanceForm onClose={() => window.history.back()} />} />
          <Route path="/timetable" element={<TimetableForm onClose={() => window.history.back()} />} />
          <Route path="/attendance-stats" element={<AttendanceStats />} />
          {isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/teachers" element={<TeacherCRUD resource="teachers" />} />
              <Route path="/admin/students" element={<StudentCRUD resource="students" />} />
              <Route path="/admin/programs" element={<ProgramCRUD resource="programs" />} />
              <Route path="/admin/subjects" element={<SubjectCRUD resource="subjects" />} />
              <Route path="/admin/timetables" element={<TimetableCRUD resource="timetables" />} />
              <Route path="/admin/sessions" element={<SessionCRUD resource="sessions" />} />
              <Route path="/admin/attendance-stats" element={<AdminAttendanceStats />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;




*/










