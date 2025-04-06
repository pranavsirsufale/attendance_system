//                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//                       █    DEVELOPED BY PRANAV SIRSUFALE   █
//                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                     DEVELOPED BY PRANAV SIRSUFALE                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AttendanceForm({ onClose = () => {} }) {
  const { sessionId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in first");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api/mark-attendance/${sessionId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSession(response.data.session);
        setStudents(response.data.students);

        const initialAttendance = {};
        const attendanceData = response.data.attendance || [];
        if (attendanceData.length > 0) {
          attendanceData.forEach((entry) => {
            initialAttendance[entry.student_id] = entry.status;
          });
        } else {
          response.data.students.forEach((student) => {
            initialAttendance[student.id] = "Present";
          });
        }
        setAttendance(initialAttendance);
        setError("");
      } catch (err) {
        console.error("Failed to fetch session data:", err);
        setError(err.response?.data?.error || "Failed to load session data");
      }
    };
    fetchSessionData();
  }, [sessionId]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const attendanceData = Object.entries(attendance).map(
      ([studentId, status]) => ({
        student_id: parseInt(studentId),
        status,
      })
    );

    try {
      await axios.post(
        `http://localhost:8000/api/mark-attendance/${sessionId}/`,
        { attendance: attendanceData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setError("");
      onClose();
    } catch (err) {
      console.error("Failed to mark attendance:", err);
      setError(err.response?.data?.error || "Failed to mark/update attendance");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Mark/Update Attendance for Session {session?.id}
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {session && (
          <div className="mb-4">
            <p className="text-gray-800">
              <strong>Date:</strong> {session.date}
            </p>
            <p className="text-gray-800">
              <strong>Subject:</strong>{" "}
              {session.timetable.subject?.name || "N/A"}
            </p>
            <p className="text-gray-800">
              <strong>Section:</strong>{" "}
              {session.timetable.section?.name || "N/A"}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {students.map((student) => (
            <div key={student.id} className="mb-4 flex items-center space-x-4">
              <span className="text-gray-800">
                {student.first_name} {student.last_name} ({student.roll_number})
              </span>
              <select
                value={attendance[student.id] || "Present"}
                onChange={(e) =>
                  handleAttendanceChange(student.id, e.target.value)
                }
                className="p-2 border rounded-md bg-white text-gray-800"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setError("");
                onClose();
              }}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendanceForm;

//                       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//                       █    DEVELOPED BY PRANAV SIRSUFALE   █
//                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                     DEVELOPED BY PRANAV SIRSUFALE                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
