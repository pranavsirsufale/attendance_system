
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// function AdminDashboard({notifyUser}) {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAdmin = async () => {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         setError("Please log in first");
//         navigate("/");
//         return;
//       }
//       try {
//         const response = await axios.get("http://localhost:8000/api/teacher-info/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setIsAdmin(response.data.is_admin);
//         if (!response.data.is_admin) {
//           setError("You are not authorized to access this page");
//           navigate("/calendar");
//         }
//       } catch (err) {
//         setError("Failed to verify admin status");
//         navigate("/");
//       }
//     };
//     checkAdmin();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     notifyUser('logged out successfully 🔐 ' ,'warning')
//     navigate("/");
//   };

//   if (error) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="p-6 bg-gradient-to-br from-red-50 to-red-100 min-h-screen text-red-600 flex items-center justify-center"
//       >
//         <motion.p
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           className="text-xl font-semibold bg-red-200/50 px-6 py-3 rounded-lg shadow-md"
//         >
//           {error}
//         </motion.p>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="flex justify-between items-center mb-4"
//       >
//         <motion.h2
//           initial={{ scale: 0.95 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.3 }}
//           className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
//         >
//           Admin Dashboard
//         </motion.h2>
//         <motion.button
//           whilehover={{ scale: 1.05, rotate: 2 }}
//           whiletap={{ scale: 0.95 }}
//           onClick={handleLogout}
//           className="bg-gradient-to-r from-red-500 via-red-600 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//         >
//           Logout
//         </motion.button>
//       </motion.div>
//       {isAdmin && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, staggerChildren: 0.1 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4"
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Manage Teachers
//             </h3>
//             <Link
//               to="/admin/teachers"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View/Edit Teachers
//             </Link>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Manage Students
//             </h3>
//             <Link
//               to="/admin/students"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View/Edit Students
//             </Link>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Manage Programs
//             </h3>
//             <Link
//               to="/admin/programs"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View/Edit Programs
//             </Link>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Manage Subjects
//             </h3>
//             <Link
//               to="/admin/subjects"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View/Edit Subjects
//             </Link>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Manage Timetables
//             </h3>
//             <Link
//               to="/admin/timetables"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View/Edit Timetables
//             </Link>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Manage Sessions
//             </h3>
//             <Link
//               to="/admin/sessions"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View/Edit Sessions
//             </Link>
//           </motion.div>


//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               View All Stats
//             </h3>
//             <Link
//               to="/admin/attendance-stats"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View Attendance Stats
//             </Link>
//           </motion.div>


//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Add Bulk Students
//             </h3>
//             <Link
//               to="/admin/add-builk-student"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               Add Bulk Students
//             </Link>
//           </motion.div>


//          <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Remove Bulk Students
//             </h3>
//             <Link
//               to="/admin/remove-builk-student"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               Remove Bulk Students
//             </Link>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Promote Students to Next class
//             </h3>
//             <Link
//               to="/admin/pass-students"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               Promote students to the next class
//             </Link>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whilehover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
//             className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-100 dark:border-gray-700 transition-all duration-300"
//           >
//             <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
//               Student Profiles
//             </h3>
//             <Link
//               to="/admin/student-profile"
//               className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
//             >
//               View Student Profiles
//             </Link>
//           </motion.div>





//         </motion.div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;




//===============================================




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import './AdminDashboard.css';
import Button from "./utilities/Button";
import LogOutButton from "./utilities/LogOutButton";
// Styling moved to AdminDashboard.css to avoid CSS-in-JSX


function AdminDashboard({ notifyUser }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in first");
        notifyUser('Please log in first 🚨', 'error');
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
          notifyUser('You are not authorized to access this page 🚫', 'error');
          navigate("/calendar");
        }
      } catch (err) {
        setError("Failed to verify admin status");
        notifyUser('Failed to verify admin status ⚠️', 'error');
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate, notifyUser]);


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    notifyUser('Logged out successfully 🔐 ', 'warning');
    navigate("/");
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-gradient-to-br from-red-50 to-red-100 min-h-screen text-red-600 flex items-center justify-center"
      >
        <motion.p
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-xl font-semibold bg-red-200/50 px-6 py-3 rounded-lg shadow-md"
        >
          {error}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-4"
      >
        <motion.h2
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
        >
          Admin Dashboard
        </motion.h2>




        <Button
        whilehover={{scale : 1.05, rotate:2}}
        whiletap={{scale: 0.95}}
        onClick={()=>navigate('/calendar')}>
          Calendar
        </Button>


        <Button
        onClick={()=> navigate("/all-sessions")}>
          All Sessions
        </Button>


        <LogOutButton
          whilehover={{ scale: 1.05, rotate: 2 }}
          whiletap={{ scale: 0.95 }}
          onClick={handleLogout}>
            Logout
          </LogOutButton>


        {/* <motion.button
          whilehover={{ scale: 1.05, rotate: 2 }}
          whiletap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 via-red-600 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Logout
        </motion.button> */}


      </motion.div>
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 place-items-center"
        >
          {/* Card for Manage Teachers */}
          <Link to="/admin/teachers" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }} /* Subtle scale for this style */
              whileTap={{ scale: 0.98 }}
              className="styled-card teachers-card" /* Add specific class for hover text */
            >
              <span className="card__title">Manage Teachers</span>
              <p className="card__content">
                Add, Edit, and Remove Teacher Accounts. Oversee teacher profiles.
              </p>
              <form className="card__form">
                <button className="card__button">View Teachers</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Manage Students */}
          <Link to="/admin/students" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card students-card"
            >
              <span className="card__title">Manage Students</span>
              <p className="card__content">
                View, Edit, and Delete Student Records. Manage student profiles.
              </p>
              <form className="card__form">
                <button className="card__button">View Students</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Manage Programs */}
          <Link to="/admin/programs" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card programs-card"
            >
              <span className="card__title">Manage Programs</span>
              <p className="card__content">
                Create and Update Study Programs. Define academic structures.
              </p>
              <form className="card__form">
                <button className="card__button">View Programs</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Manage Subjects */}
          <Link to="/admin/subjects" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card subjects-card"
            >
              <span className="card__title">Manage Subjects</span>
              <p className="card__content">
                Assign and Overview Course Subjects. Organize curriculum.
              </p>
              <form className="card__form">
                <button className="card__button">View Subjects</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Manage Timetables */}
          {/* <Link to="/admin/timetables" className="w-full flex justify-center">
            <StyledCard
              whilehover={{ scale: 1.02 }}
              whiletap={{ scale: 0.98 }}
              className="timetables-card"
            >
              <span className="card__title">Manage Timetables</span>
              <p className="card__content">
                Set and Adjust Class Schedules. Optimize academic planning.
              </p>
              <form className="card__form">
                <button className="card__button">View Timetables</button>
              </form>
            </StyledCard>
          </Link> */}

          {/* Card for Manage Sessions */}
          <Link to="/admin/sessions" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card sessions-card"
            >
              <span className="card__title">Manage Sessions</span>
              <p className="card__content">
                Create and Edit Attendance Sessions. Track class occurrences.
              </p>
              <form className="card__form">
                <button className="card__button">View Sessions</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for View All Stats */}
          <Link to="/admin/attendance-stats" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card stats-card"
            >
              <span className="card__title">View All Stats</span>
              <p className="card__content">
                Access Comprehensive Attendance Data. Analyze overall trends.
              </p>
              <form className="card__form">
                <button className="card__button">View Stats</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Add Bulk Students */}
          <Link to="/admin/add-builk-student" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card add-bulk-students-card"
            >
              <span className="card__title">Add Bulk Students</span>
              <p className="card__content">
                Efficiently enroll multiple students at once. Streamline onboarding.
              </p>
              <form className="card__form">
                <button className="card__button">Add Bulk Students</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Remove Bulk Students */}
          <Link to="/admin/remove-builk-student" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card remove-bulk-students-card"
            >
              <span className="card__title">Remove Bulk Students</span>
              <p className="card__content">
                Perform mass deletion of student records. Manage student exits.
              </p>
              <form className="card__form">
                <button className="card__button">Remove Bulk Students</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Promote Students to Next Class */}
          <Link to="/admin/pass-students" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card promote-students-card"
            >
              <span className="card__title">Promote Students</span>
              <p className="card__content">
                Advance students to the next class or semester.
              </p>
              <form className="card__form">
                <button className="card__button">Promote Students</button>
              </form>
            </motion.div>
          </Link>



          {/* Card for Student Profiles */}
          <Link to="/admin/student-profile" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card student-profiles-card"
            >
              <span className="card__title">Student Profiles</span>
              <p className="card__content">
                View individual student details and their reports.
              </p>
              <form className="card__form">
                <button className="card__button">View Profiles</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for backup of database */}
          <Link to="/admin/database-backup" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card database-backup"
            >
              <span className="card__title">Get Database Backup</span>
              <p className="card__content">
                Get the all database backup along with all records and tables.
              </p>
              <form className="card__form">
                <button className="card__button">retreive backup</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Archival Attendance */}
          <Link to="/admin/archival-attendance" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card archival-attendance-card"
            >
              <span className="card__title">Archival Attendance</span>
              <p className="card__content">
                Create and view permanent historical attendance snapshots preserved independently.
              </p>
              <form className="card__form">
                <button className="card__button">Manage Archives</button>
              </form>
            </motion.div>
          </Link>

          {/* Card for Student Attendance (Admin marking on behalf of teachers) */}
          <Link to="/admin/student-attendance" className="w-full flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="styled-card student-attendance-card"
            >
              <span className="card__title">Student Attendance</span>
              <p className="card__content">
                Mark or update student attendance on behalf of teachers.
              </p>
              <form className="card__form">
                <button className="card__button">Student Attendance</button>
              </form>
            </motion.div>
          </Link>

        </motion.div>
      )}
    </div>
  );
}

export default AdminDashboard;

