//                      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//                       █    DEVELOPED BY MAGAR ROHAN  █
//                       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                     DEVELOPED BY MAGAR ROHAN                              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function AttendanceForm({ notifyUser, onClose = () => {} }) {
  const { sessionId } = useParams();
  const [students, setStudents] = useState([]);
  // State now holds boolean values: true for Present, false for Absent
  const [attendance, setAttendance] = useState({});
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please log in first");
        setLoading(false);
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
          // Convert "Present"/"Absent" strings to booleans
          attendanceData.forEach((entry) => {
            initialAttendance[entry.student_id] = entry.status === "Present";
          });
        } else {
          // Default all students to false (Absent)
          response.data.students.forEach((student) => {
            initialAttendance[student.id] = false;
          });
        }
        setAttendance(initialAttendance);
        setError("");
      } catch (err) {
        console.error("Failed to fetch session data:", err);
        setError(err.response?.data?.error || "Failed to load session data");
      } finally {
        setLoading(false);
      }
    };
    fetchSessionData();
  }, [sessionId]);

  // Handle checkbox state change (true/false)
  const handleAttendanceChange = (studentId, isChecked) => {
    setAttendance((prev) => ({ ...prev, [studentId]: isChecked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    // Convert boolean state back to "Present"/"Absent" strings for the API
    const attendanceData = Object.entries(attendance).map(
      ([studentId, isPresent]) => ({
        student_id: parseInt(studentId),
        status: isPresent ? "Present" : "Absent",
      })
    );

    try {
      const response = await axios.post(
        `http://localhost:8000/api/mark-attendance/${sessionId}/`,
        { attendance: attendanceData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        notifyUser(response.data.message, "success");
      }
      setError("");
      onClose();
    } catch (err) {
      notifyUser(err.response?.data?.error || "Failed to mark/update", "error");
      console.error("Failed to mark attendance:", err);
      setError(err.response?.data?.error || "Failed to mark/update attendance");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => {
            setError("");
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">
          Mark/Update Attendance
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V8H4z"></path>
            </svg>
          </div>
        ) : (
          <>
            {session && (
              <div className="mb-6 flex flex-col md:flex-row md:space-x-8 text-gray-800">
                <div>
                  <strong>Date:</strong> {session.date}
                </div>
                <div>
                  <strong>Subject:</strong> {session.timetable.subject?.name || "N/A"}
                </div>
                <div>
                  <strong>Section:</strong> {session.timetable.section?.name || "N/A"}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="sticky top-0 bg-blue-100 z-10">
                    <tr>
                      <th className="border px-4 py-2 text-left">Student ID</th>
                      <th className="border px-4 py-2 text-left">Roll Number</th>
                      <th className="border px-4 py-2 text-left">Name</th>
                      <th className="border px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr
                        key={student.id}
                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="border px-4 py-2">{student.id}</td>
                        <td className="border px-4 py-2">{student.roll_number}</td>
                        <td className="border px-4 py-2">
                          {student.first_name} {student.last_name}
                        </td>
                        <td className="border px-4 py-2">
                          <label htmlFor={`attendance-${student.id}`} className="flex items-center cursor-pointer">
                            <div className="relative">
                              <input
                                type="checkbox"
                                id={`attendance-${student.id}`}
                                className="sr-only" // Hide default checkbox
                                checked={attendance[student.id] || false}
                                onChange={(e) =>
                                  handleAttendanceChange(student.id, e.target.checked)
                                }
                              />
                              <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"></div>
                            </div>
                            <div className="ml-3 font-medium text-gray-700">
                              {attendance[student.id] ? "Present" : "Absent"}
                            </div>
                          </label>
                          {/* Add this CSS to your project's main CSS file or a style tag for the toggle effect */}
                          <style>{`
                            input:checked ~ .dot {
                              transform: translateX(100%);
                            }
                            input:checked ~ .block {
                              background-color: #34D399; /* green-400 */
                            }
                          `}</style>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    onClose();
                  }}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AttendanceForm;