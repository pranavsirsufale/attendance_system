// src/components/Stats.js
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stats() {
  const [rollNumber, setRollNumber] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/attendance-stats/${rollNumber}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch stats');
      setStats(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Stats</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Roll Number (e.g., G240001)"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchStats}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Fetch Stats
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {stats && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold">{stats.student.roll_number} - {stats.student.first_name} {stats.student.last_name}</h3>
          <p>Total Sessions: {stats.total_sessions}</p>
          <p>Present: {stats.present}</p>
          <p>Absent: {stats.absent}</p>
          <p>Percentage: {stats.percentage}%</p>
          <p>Consolidated: {stats.consolidated}</p>
          <h4 className="mt-4 font-medium">Monthly Breakdown</h4>
          <ul>
            {stats.monthly_stats.map((month) => (
              <li key={month.month}>Month {month.month}: {month.present} Present, {month.absent} Absent</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Stats;

*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Stats() {
  const [rollNumber, setRollNumber] = useState('');
  const [stats, setStats] = useState(null);
  const [hourlyStats, setHourlyStats] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchStats = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in to view stats');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/attendance-stats/${rollNumber}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch stats or student not found');
      setStats(null);
    }
  };

  const fetchHourlyStats = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const sessionsResponse = await axios.get('http://localhost:8000/api/calendar/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const hourlyPromises = sessionsResponse.data.map((session) =>
        axios.get(`http://localhost:8000/api/hourly-stats/${session.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      const hourlyResponses = await Promise.all(hourlyPromises);
      setHourlyStats(hourlyResponses.map((res) => res.data));
    } catch (err) {
      setError('Failed to fetch hourly stats');
    }
  };

  useEffect(() => {
    fetchHourlyStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Stats</h2>
      <button
        onClick={() => navigate('/calendar')}
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
      >
        Back to Calendar
      </button>

      {/* Consolidated Report */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Consolidated Report</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter Roll Number (e.g., G240001)"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchStats}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Fetch Stats
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {stats && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h4 className="text-lg font-semibold">
              {stats.student.roll_number} - {stats.student.first_name} {stats.student.last_name}
            </h4>
            <p>Total Sessions: {stats.total_sessions}</p>
            <p>Present: {stats.present}</p>
            <p>Absent: {stats.absent}</p>
            <p>Percentage: {stats.percentage.toFixed(2)}%</p>
            <p>Consolidated: {stats.consolidated}</p>
            <h5 className="mt-4 font-medium">Monthly Breakdown</h5>
            <ul className="list-disc pl-5">
              {stats.monthly_stats.map((month) => (
                <li key={month.month}>
                  Month {month.month}: {month.present} Present, {month.absent} Absent
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hourly/Class Report */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Class/Hour-wise Report</h3>
        {hourlyStats.length > 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Present</th>
                  <th className="border p-2">Absent</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {hourlyStats.map((stat) => (
                  <tr key={stat.session.id}>
                    <td className="border p-2">{stat.session.date}</td>
                    <td className="border p-2">{stat.session.timetable.subject.name}</td>
                    <td className="border p-2">{stat.session.timetable.start_time}</td>
                    <td className="border p-2">{stat.present}</td>
                    <td className="border p-2">{stat.absent}</td>
                    <td className="border p-2">{stat.total_students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hourly stats available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Stats;