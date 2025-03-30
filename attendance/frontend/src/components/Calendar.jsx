import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Calendar() {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in first');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/calendar/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(response.data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
        setError('Failed to load sessions');
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Calendar</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}


     
<div className="mb-4">
  <Link to="/attendance-stats" className="text-blue-600 hover:underline">
    View Attendance Statistics
  </Link>
</div>
      
      {sessions.length > 0 ? (
        
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.id} className="p-4 bg-white rounded-lg shadow">
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Day:</strong> {session.timetable.day_of_week}</p>
              <p><strong>Time:</strong> {session.timetable.start_time}</p>
              <p><strong>Subject:</strong> {session.timetable.subject?.name || 'N/A'}</p>
              <p><strong>Section:</strong> {session.timetable.section?.name || 'N/A'}</p>
              <p><strong>Status:</strong> {session.status}</p>
              {session.status === 'Scheduled' && (
                <a href={`/attendance/${session.id}`} className="text-blue-500 hover:underline">
                  Mark Attendance
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions found.</p>
      )}
    </div>
  );
}

export default Calendar;