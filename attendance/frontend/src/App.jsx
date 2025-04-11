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
import LandingPage from './components/pages/LandingPage';
import { Switch } from '@headlessui/react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLanding, setIsLanding] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
    <div
      className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-100'}
      
    >
      {isLanding ? (
        <div className="flex flex-col items-center bg-gray-900 justify-center h-screen text-center">
          <h1 onClick={() => setIsLanding((prev) => !prev)}
          className="text-4xl font-bold text-purple-700 mb-4 animate-bounce">
            Manikchand Pahade Law College, Aurangabad
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-lg"
          >
          
          </motion.p>
        </div>
      ) : (
        <Router>
          <div className="min-h-screen transition-all duration-300 ease-in-out">
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
              <div className="flex items-center gap-4">
                <Switch
                  checked={darkMode}
                  onChange={setDarkMode}
                  className={`${
                    darkMode ? 'bg-purple-700' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable dark mode</span>
                  <span
                    className={`${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <ProfileIcon />
              </div>
            </nav>

            <AnimatePresence mode="wait">
              <Routes>
                <Route path='/' element={<Login />} />
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
      )}
    </div>
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
import LandingPage from './components/pages/LandingPage';


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLanding,setIsLanding] = useState(true)

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

  
      <div  onClick={()=>setIsLanding((prev)=>!prev)}>
        
        {
          isLanding ?
          <h1
          
          >
        Manikchand Pahade Law college

        </h1> :<Router>
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
           
              <Route path='/' element = {<Login /> } />
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
        }
      </div>


    );
  

  
}

export default App;

*/




