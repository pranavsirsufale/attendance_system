
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function AttendanceStats({notifyUser}) {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customRange, setCustomRange] = useState(false);
  const [error, setError] = useState('');
  const [responseStartDate, setResponseStartDate] = useState('');
  const [responseEndDate, setResponseEndDate] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in first');
        notifyUser('Please log in first' ,'warning')
        return;
      }

      let url = `http://localhost:8000/api/teacher-attendance-stats/?period=${period}`;
      if (customRange && startDate && endDate) {
        url += `&start_date=${startDate}&end_date=${endDate}`;
      }

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats);
        console.log(response)
        setResponseStartDate(response.data.start_date);
        setResponseEndDate(response.data.end_date);
        if(response.status >= 200 && response.status <= 300){
          notifyUser(`${response.data.stats.length} records found for the duration ${response.data.start_date} - ${response.data.end_date} successfully ✅ ` ,'info')
        }
        setError('');
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.response?.data?.error || 'Failed to load attendance stats');
      }
    };
    fetchStats();
  }, [period, startDate, endDate, customRange]);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6"
      >
        Attendance Statistics
      </motion.h2>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300 p-3 rounded-lg mb-6 shadow-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex space-x-4 items-center"
        >
          <label className="text-indigo-700 dark:text-indigo-300 font-medium">View by:</label>
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
              setCustomRange(false);
            }}
            
            className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="semester">Semester</option>
            <option value="custom">Custom Range</option>
          </motion.select>
        </motion.div>
        <AnimatePresence>
          {period === 'custom' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
            >
              <div className="flex items-center space-x-4">
                <label className="text-indigo-700 dark:text-indigo-300 font-medium">Start Date:</label>
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setCustomRange(true);
                  }}
                  className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-indigo-700 dark:text-indigo-300 font-medium">End Date:</label>
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setCustomRange(true);
                  }}
                  className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-gray-800 dark:text-gray-200 font-medium mb-6"
      >
        Period: {responseStartDate} to {responseEndDate}
      </motion.p>
      <AnimatePresence>
        {stats.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-x-auto"
          >
            <motion.table
              className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden"
            >
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
                  <th className="p-3 text-left text-white font-semibold">Student Name</th>
                  <th className="p-3 text-left text-white font-semibold">Roll Number</th>
                  <th className="p-3 text-left text-white font-semibold">Total Sessions</th>
                  <th className="p-3 text-left text-white font-semibold">Present</th>
                  <th className="p-3 text-left text-white font-semibold">Absent</th>
                  <th className="p-3 text-left text-white font-semibold">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <motion.tr
                    key={stat.student_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-indigo-100 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.name}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.roll_number}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.total_sessions}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.present}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.absent}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.attendance_percentage}%</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 dark:text-gray-400 font-medium"
          >
            No attendance stats available for this period.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AttendanceStats;


/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceStats() {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customRange, setCustomRange] = useState(false);
  const [error, setError] = useState('');
  const [responseStartDate, setResponseStartDate] = useState('');
  const [responseEndDate, setResponseEndDate] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in first');
        return;
      }

      let url = `http://localhost:8000/api/teacher-attendance-stats/?period=${period}`;
      if (customRange && startDate && endDate) {
        url += `&start_date=${startDate}&end_date=${endDate}`;
      }

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats);
        setResponseStartDate(response.data.start_date);
        setResponseEndDate(response.data.end_date);
        setError('');
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.response?.data?.error || 'Failed to load attendance stats');
      }
    };
    fetchStats();
  }, [period, startDate, endDate, customRange]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Statistics</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4 flex flex-col space-y-4">
        <div className="flex space-x-4">
          <label className="mr-2 text-gray-800">View by:</label>
          <select
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
              setCustomRange(false); // Reset custom range when changing period
            }}
            className="p-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="semester">Semester</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        {period === 'custom' && (
          <div className="flex space-x-4">
            <div>
              <label className="mr-2 text-gray-800">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCustomRange(true);
                }}
                className="p-2 border rounded-md text-gray-800"
              />
            </div>
            <div>
              <label className="mr-2 text-gray-800">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCustomRange(true);
                }}
                className="p-2 border rounded-md text-gray-800"
              />
            </div>
          </div>
        )}
      </div>
      <p className="text-gray-800 mb-4">Period: {responseStartDate} to {responseEndDate}</p>
      {stats.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 text-left">Student Name</th>
                <th className="p-2 text-left">Roll Number</th>
                <th className="p-2 text-left">Total Sessions</th>
                <th className="p-2 text-left">Present</th>
                <th className="p-2 text-left">Absent</th>
                <th className="p-2 text-left">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.student_id} className="border-t">
                  <td className="p-2 text-gray-800">{stat.name}</td>
                  <td className="p-2 text-gray-800">{stat.roll_number}</td>
                  <td className="p-2 text-gray-800">{stat.total_sessions}</td>
                  <td className="p-2 text-gray-800">{stat.present}</td>
                  <td className="p-2 text-gray-800">{stat.absent}</td>
                  <td className="p-2 text-gray-800">{stat.attendance_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No attendance stats available for this period.</p>
      )}
    </div>
  );
}

export default AttendanceStats;

*/




