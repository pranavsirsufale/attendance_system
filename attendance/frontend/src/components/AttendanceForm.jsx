import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AttendanceForm() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');

  useEffect(() => {
    const fetchSessionAndStudents = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const sessionResponse = await axios.get(`http://localhost:8000/api/sessions/${sessionId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessionTitle(`${sessionResponse.data.timetable.subject.name} (${sessionResponse.data.status})`);

        const studentsResponse = await axios.get('http://localhost:8000/api/students/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sectionStudents = studentsResponse.data.filter(
          (student) => student.section === sessionResponse.data.timetable.section
        );

        setStudents(sectionStudents);
        const initialAttendance = {};
        sectionStudents.forEach((student) => {
          initialAttendance[student.id] = 'Absent';
        });
        setAttendanceData(initialAttendance);
      } catch (err) {
        setError('Failed to load session or students');
        console.error(err);
      }
    };

    fetchSessionAndStudents();
  }, [sessionId]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
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
        `http://localhost:8000/api/mark-attendance/${sessionId}/`,
        { attendance: payload },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/calendar'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to mark attendance');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Mark Attendance for {sessionTitle}</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Roll Number</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 px-4 py-2">{student.roll_number}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.first_name} {student.last_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={attendanceData[student.id] || 'Absent'}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="Absent">Absent</option>
                    <option value="Present">Present</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/calendar')}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-4 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Attendance
          </button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceForm;
