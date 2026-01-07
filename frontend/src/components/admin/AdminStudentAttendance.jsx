import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../utilities/Button';

function AdminStudentAttendance({ notifyUser }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      notifyUser('Please log in first', 'error');
      navigate('/');
      return;
    }
    try {
      const res = await axios.get('http://localhost:8000/api/teachers/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data || []);
    } catch (err) {
      console.error(err);
      notifyUser('Failed to load teachers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherSelect = (teacher) => {
    // Navigate directly to calendar filtered by this teacher
    setSelectedTeacher(teacher);
    const qp = new URLSearchParams();
    if (teacher && teacher.id) qp.set('teacher', teacher.id);
    navigate(`/calendar?${qp.toString()}`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4 text-indigo-800"
      >
        Student Attendance (Admin)
      </motion.h2>

      <div className="w-full">
        <h3 className="sr-only">Teachers</h3>
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teachers.map((t) => (
              <motion.button
                key={t.id}
                onClick={() => handleTeacherSelect(t)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-44 bg-white rounded-2xl shadow-lg p-6 text-left flex flex-col justify-between transition-colors ${selectedTeacher?.id === t.id ? 'ring-4 ring-indigo-200' : 'hover:shadow-xl'}`}
              >
                <div>
                  <div className="text-xl font-semibold text-indigo-800">{t.first_name} {t.last_name}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.email || ''}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Click to open calendar</div>
                  <div className="text-xs text-gray-400">ID: {t.id}</div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminStudentAttendance;
