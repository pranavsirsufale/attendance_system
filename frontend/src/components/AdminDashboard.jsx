import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './AdminDashboard.css';
import LogOutButton from "./utilities/LogOutButton";
import ProfileIcon from "./ProfileIcon";

// ── card data grouped by section ─────────────────────────────────────────────
const SECTIONS = [
  {
    label: "📋 Management",
    cards: [
      { to: "/admin/teachers", cls: "teachers-card", icon: "👩‍🏫", title: "Teachers", desc: "Add, edit and remove teacher accounts." },
      { to: "/admin/students", cls: "students-card", icon: "🎓", title: "Students", desc: "View, edit and delete student records." },
      { to: "/admin/programs", cls: "programs-card", icon: "🏛️", title: "Programs", desc: "Create and update academic programs." },
      { to: "/admin/subjects", cls: "subjects-card", icon: "📚", title: "Subjects", desc: "Assign and organise course subjects." },
      { to: "/admin/sessions", cls: "sessions-card", icon: "🗓️", title: "Sessions", desc: "Create and edit attendance sessions." },
      {to: "/admin/timetable-display", cls: "timetable-display-card", icon: "📅",  title: "Semester Timetable",  desc: "View semester-wise timetable by Program, Year and Section."
    },
    ],
  },
  {
    label: "📊 Attendance",
    cards: [
      { to: "/admin/attendance-stats", cls: "stats-card", icon: "📈", title: "Attendance Stats", desc: "View Teacher-wise comprehensive attendance analytics." },
      { to: "/admin/student-attendance", cls: "student-attendance-card", icon: "✅", title: "Mark Attendance", desc: "Mark or update attendance on behalf of teachers." },
      { to: "/admin/archival-attendance", cls: "archival-attendance-card", icon: "🗂️", title: "Archival Attendance", desc: "Create and view historical attendance snapshots." },
      { to: "/admin/database-backup", cls: "database-backup", icon: "💾", title: "Database Backup", desc: "Download (law_college) full database backup with all records." },
      { to: "/admin/student-profile", cls: "student-profiles-card", icon: "🪪", title: "Student Profiles", desc: "View Semester-wise and individual student details and reports." },
    ],
  },
  {
    label: "🎒 Student Operations",
    cards: [
      { to: "/admin/add-builk-student", cls: "add-bulk-students-card", icon: "➕", title: "Add Bulk Students", desc: "Enroll multiple students at once." },
      { to: "/admin/remove-builk-student", cls: "remove-bulk-students-card", icon: "➖", title: "Remove Students", desc: "Mass remove student records." },
      { to: "/admin/pass-students", cls: "promote-students-card", icon: "⬆️", title: "Promote Students", desc: "Advance students to the next semester." },
    ],
  },
  // {
  //   label: "⚙️ System",
  //   cards: [
  //     { to: "/admin/database-backup", cls: "database-backup", icon: "💾", title: "Database Backup", desc: "Download full database backup with all records." },
  //   ],
  // },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3 } }),
};

function AdminDashboard({ notifyUser }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      notifyUser('Please log in first 🚨', 'error');
      navigate("/");
      return;
    }
    axios.get("/api/teacher-info/", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!res.data.is_admin) {
          notifyUser('Not authorised 🚫', 'error');
          navigate("/calendar");
        } else {
          setIsAdmin(true);
        }
      })
      .catch(() => {
        setError("Failed to verify admin status");
        notifyUser('Failed to verify admin status ⚠️', 'error');
        navigate("/");
      });
  }, [navigate, notifyUser]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    notifyUser('Logged out successfully 🔐', 'warning');
    navigate("/");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-red-600 font-semibold text-lg px-6 py-3 bg-red-100 rounded-lg shadow">{error}</p>
      </div>
    );
  }

  let cardIndex = 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">

      {/* ── Top bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <h1 onClick={() => navigate('/admin')} className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/calendar')}
            className="px-4 py-2 text-sm font-semibold border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
            📅 Calendar
          </button>
          <button onClick={() => navigate('/all-sessions')}
            className="px-4 py-2 text-sm font-semibold border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
            🗒️ All Sessions
          </button>
          <ProfileIcon notifyUser={notifyUser} />
        </div>
      </motion.header>

      {/* ── Sections ── */}
      {isAdmin && (
        <main className="px-6 py-8 max-w-screen-xl mx-auto space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.label}>
              <motion.h2
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                className="text-lg font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 border-b-2 border-gray-200 dark:border-gray-700 pb-2"
              >
                {section.label}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                {section.cards.map((card) => {
                  const ci = cardIndex++;
                  return (
                    <Link key={card.to} to={card.to} className="w-full flex justify-center">
                      <motion.div
                        custom={ci}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`styled-card ${card.cls}`}
                      >
                        <span className="card__icon">{card.icon}</span>
                        <span className="card__title">{card.title}</span>
                        <p className="card__content">{card.desc}</p>
                        <div className="card__form">
                          <button type="button" className="card__button">Open</button>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default AdminDashboard;

