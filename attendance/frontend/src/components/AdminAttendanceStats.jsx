import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAttendanceStats() {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [section, setSection] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in first');
        return;
      }

      let url = `http://localhost:8000/api/admin-attendance-stats/?period=${period}`;
      if (section) url += `&section=${section}`;
      if (period === 'daily' && date) url += `&date=${date}`;

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats);
        setStartDate(response.data.start_date);
        setEndDate(response.data.end_date);
        setError('');
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.response?.data?.error || 'Failed to load attendance stats');
      }
    };
    fetchStats();
  }, [period, section, date]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Attendance Statistics</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="mr-2 text-gray-800">View by:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="p-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="semester">Semester</option>
          </select>
        </div>
        <div>
          <label className="mr-2 text-gray-800">Section ID:</label>
          <input
            type="number"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="p-2 border rounded-md text-gray-800"
            placeholder="Optional"
          />
        </div>
        {period === 'daily' && (
          <div>
            <label className="mr-2 text-gray-800">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-md text-gray-800"
              required
            />
          </div>
        )}
      </div>
      <p className="text-gray-800 mb-4">Period: {startDate} to {endDate}</p>
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
                <th className="p-2 text-left">Recorded By</th>
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
                  <td className="p-2 text-gray-800">{stat.recorded_by}</td>
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

export default AdminAttendanceStats;