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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-semibold mb-2">Teachers (click to open their calendar)</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {teachers.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => handleTeacherSelect(t)}
                    className={`w-full text-left p-3 rounded-md mb-2 ${selectedTeacher?.id === t.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <div className="font-medium">{t.first_name} {t.last_name}</div>
                    <div className="text-sm text-gray-600">{t.email || ''}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-span-1 bg-white p-4 rounded-xl shadow-md flex items-center justify-center">
          <div className="text-gray-600">Click any teacher to open their calendar and mark attendance on their behalf.</div>
        </div>
      </div>
    </div>
  );
}

export default AdminStudentAttendance;
