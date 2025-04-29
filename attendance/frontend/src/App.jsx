

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
import Footer from './components/pages/Footer'
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
import { Bounce, toast , ToastContainer } from 'react-toastify';
import Lottie from 'react-lottie-player' //! for lottie animation
import Particles from 'react-tsparticles'
import {loadFull} from 'tsparticles' //! particles engine
// Sample Lottie animation (law-themed scales of justice)
// import lawAnimationData from "https://lottie.host/9c9f6f1d-3b3e-4b7e-9e1a-3f3d6b8e7f2a/justice-scales.json"; 


// Placeholder: Replace with actual Lottie URL


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLanding, setIsLanding] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notification,setNotification] = useState('')


  const notifyUser = (msg , type ) => {

    const toastConfigOptions = {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      }

      switch(type){
        case 'success':
          const notifySuccess = (msg) => toast.success(msg , toastConfigOptions)
          notifySuccess(msg)
        break;
        case 'warning':
          const warnUser = (msg) => toast.warning(msg ,toastConfigOptions)
          warnUser(msg)
          break;
        case 'error':
          const notifyError = (msg) => toast.error(msg ,toastConfigOptions )
          notifyError(msg)
          break;
        case 'default':
            const notify = (msg) => toast(msg , toastConfigOptions)
            notify(msg)
        case "info":
          const informUser = (msg) => toast.info(msg , toastConfigOptions)
          informUser(msg)

      }


    

/*
    if ( type === 'success'){
      const notifySuccess = (msg) => toast.success(msg , toastConfigOptions)
      notifySuccess(msg)
    }
    if ( type === 'warning'){
      const warnUser = (msg) => toast.warning(msg ,toastConfigOptions)
      warnUser(msg)
    }
    if ( type === 'error'){
      const notifyError = (msg) => toast.error(msg ,toastConfigOptions )
      notifyError(msg)
    }
    if ( type === 'default'){
      const notify = (msg) => toast(msg , toastConfigOptions)
      notify(msg)

    }
    if (type === 'info') {
      const informUser = (msg) => toast.info(msg , toastConfigOptions)
      informUser(msg)
    }


      */
   
  } 


  const particlesInit = async ( main ) => {
    await loadFull(main)
  }


// Animation variants for staggered effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };


  const childVariants = {
    hidden : { opacity : 0 , y : 20 },
    visible : { opacity : 1 , y : 0}, 
  }
  
  // const notify = (msg) => toast.success(msg)

  console.log(notification)

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



/*

<motion.div
      key="landing"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 text-center px-4 overflow-hidden"
    >
      // Animated Particle Background 
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#ffffff", "#a78bfa", "#f472b6"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      // ⚖️ Animated 3D Cartoon Logo 
      <motion.div
        variants={childVariants}
        onHoverStart={() => setIsLogoHovered(true)}
        onHoverEnd={() => setIsLogoHovered(false)}
        animate={{ rotateY: isLogoHovered ? 360 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative w-32 h-32 mb-6 drop-shadow-2xl cursor-pointer"
        title="Manikchand Pahade Law College Logo"
      >
        <Lottie
          loop
          animationData={lawAnimationData}
          play
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

      //{/* 🎓 College Name 
      <motion.h1
        variants={childVariants}
        onClick={() => setIsLanding(false)}
        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-300 dark:to-purple-300 mb-4 cursor-pointer hover:underline"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Manikchand Pahade Law College
      </motion.h1>

      //{/* 📍 Description 
      <motion.p
        variants={childVariants}
        className="text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        Aurangabad's Premier Institution for Legal Education – Building Future
        Legal Minds with Excellence and Integrity.
      </motion.p>

      //{/* ⚡ Interactive Entry Button 
      <motion.button
        variants={childVariants}
        onClick={() => setIsLanding(false)}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
          backgroundImage:
            "linear-gradient(to right, #7c3aed, #db2777)",
        }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white py-3 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Enter Attendance System
      </motion.button>
    </motion.div>

    */


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



                    <ProfileIcon notifyUser={notifyUser} />
                  </div>
                </nav>

                <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>

                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Login notifyUser={notifyUser}  />} />
                    <Route path="/calendar" element={<Calendar admin={isAdmin} notifyUser={notifyUser} />} />
                    <Route path="/attendance/:sessionId" element={<AttendanceForm notifyUser={notifyUser} onClose={() => window.history.back()} />} />
                    <Route path="/timetable" element={<TimetableForm notifyUser={notifyUser} onClose={() => window.history.back()} />} />
                    <Route path="/attendance-stats" element={<AttendanceStats notifyUser={notifyUser} />} />
                    {isAdmin && (
                      <>
                        <Route path="/admin" element={<AdminDashboard notifyUser={notifyUser} />} />
                        <Route path="/admin/teachers" element={<TeacherCRUD resource="teachers" notifyUser={notifyUser} />} />
                        <Route path="/admin/students" element={<StudentCRUD notifyUser={notifyUser}  resource="students" />} />
                        <Route path="/admin/programs" element={<ProgramCRUD  notifyUser={notifyUser} resource="programs" />} />
                        <Route path="/admin/subjects" element={<SubjectCRUD notifyUser={notifyUser} resource="subjects" />} />
                        <Route path="/admin/timetables" element={<TimetableCRUD notifyUser={notifyUser} resource="timetables" />} />
                        <Route path="/admin/sessions" element={<SessionCRUD notifyUser={notifyUser} resource="sessions" />} />
                        <Route path="/admin/attendance-stats" element={<AdminAttendanceStats notifyUser={notifyUser} />} />
                      </>
                    )}
                  </Routes>
                </AnimatePresence>
              </div>
            </Router>


            <Footer/>
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




