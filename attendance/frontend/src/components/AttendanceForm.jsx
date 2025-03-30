import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AttendanceForm({ onClose }) {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      return;
    }

    const fetchSessionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/mark-attendance/${sessionId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSession(response.data.session);
        setStudents(response.data.students);
        setAttendance(
          response.data.students.reduce((acc, student) => ({
            ...acc,
            [student.id]: 'Present'
          }), {})
        );
        setError('');
      } catch (err) {
        console.error('Failed to fetch session data:', err);
        setError(err.response?.data?.error || 'Failed to load session data');
      }
    };
    fetchSessionData();
  }, [sessionId]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      return;
    }

    const payload = {
      attendance: Object.entries(attendance).map(([studentId, status]) => ({
        student_id: studentId,
        status,
      })),
    };
    console.log('Submitting attendance:', JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        `http://localhost:8000/api/mark-attendance/${sessionId}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Response:', response.data);
      setSuccess('Attendance marked successfully');
      setError('');
      setTimeout(onClose, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to mark attendance');
      setSuccess('');
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Mark Attendance for {session?.timetable.day_of_week || ''} - {session?.date || ''}
      </h3>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {session ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-gray-800">
            <p>Section: {session.timetable.section.name}</p>
            <p>Subject: {session.timetable.subject.name}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">Students</h4>
            {students.map((student) => (
              <div key={student.id} className="flex items-center space-x-4 mb-2">
                <span className="w-1/2 text-gray-800">
                  {student.first_name} {student.last_name} ({student.roll_number})
                </span>
                <select
                  value={attendance[student.id] || 'Present'}
                  onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                  className="w-1/4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Save Attendance
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-600">Loading session data...</p>
      )}
    </div>
  );
}

export default AttendanceForm;