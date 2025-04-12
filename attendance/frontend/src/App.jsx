

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
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 animate-pulse flex items-center gap-2"
        >
          <FaChalkboardTeacher className="text-3xl" />
          Loading Attendance System...
        </motion.div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800'}>
      <AnimatePresence mode="wait">
        {isLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-center px-4"
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => setIsLanding(false)}
              className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4 cursor-pointer"
            >
              Manikchand Pahade Law College
            </motion.h1>
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md"
            >
              Aurangabad's Premier Institution for Legal Education
            </motion.p>
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => setIsLanding(false)}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 text-white py-2 px-6 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
            >
              Enter Attendance System
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Router>
              <div className="min-h-screen transition-all duration-300 ease-in-out">
                <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 p-4 shadow-lg flex justify-between items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-xl font-extrabold flex items-center gap-2"
                  >
                    <FaChalkboardTeacher className="text-white text-2xl" />
                    Attendance System
                  </motion.div>

                  <div className="flex items-center gap-4">
                    {/* <Switch
                      checked={darkMode}
                      onChange={setDarkMode}
                      className={`${
                        darkMode ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                      } relative inline-flex h-6 w-11 items-center rounded-full shadow-sm transition-colors duration-200`}
                    >
                      <span className="sr-only">Enable dark mode</span>
                      <span
                        className={`${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-200 transition-transform duration-200`}
                      />
                    </Switch> */}



                    <ProfileIcon />
                  </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;



/*
! first previous by removing this you can uno reverse it 

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

*/


/*

! the second preiouv
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




