import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceForm({ session, onClose }) {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('access_token');
      try {
        // Fetch session details to get section
        const sessionResponse = await axios.get(`http://localhost:8000/api/sessions/${session.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sectionId = sessionResponse.data.timetable.section.split(' - ')[1]; // Extract section ID if needed

        // Fetch students in the section (assuming section is a string; adjust if ID-based)
        const studentsResponse = await axios.get('http://localhost:8000/api/students/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sectionStudents = studentsResponse.data.filter(
          (student) => student.section === sessionResponse.data.timetable.section
        );

        setStudents(sectionStudents);
        // Initialize attendance data with default "Absent"
        const initialAttendance = {};
        sectionStudents.forEach((student) => {
          initialAttendance[student.id] = 'Absent';
        });
        setAttendanceData(initialAttendance);
      } catch (err) {
        setError('Failed to load students');
        console.error(err);
      }
    };

    fetchStudents();
  }, [session]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const payload = Object.keys(attendanceData).map((studentId) => ({
      student_id: parseInt(studentId),
      status: attendanceData[studentId],
    }));

    try {
      const response = await axios.post(
        `http://localhost:8000/api/mark-attendance/${session.id}/`,
        { attendance: payload },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message);
      setError('');
      setTimeout(onClose, 2000); // Close form after 2 seconds
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to mark attendance');
      setSuccess('');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      zIndex: 1000, maxWidth: '600px', width: '100%'
    }}>
      <h3>Mark Attendance for {session.title}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Roll Number</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.roll_number}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.first_name} {student.last_name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <select
                    value={attendanceData[student.id] || 'Absent'}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    style={{ padding: '4px' }}
                  >
                    <option value="Absent">Absent</option>
                    <option value="Present">Present</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 16px', marginRight: '10px' }}>
            Cancel
          </button>
          <button type="submit" style={{ padding: '8px 16px' }}>Save Attendance</button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceForm;