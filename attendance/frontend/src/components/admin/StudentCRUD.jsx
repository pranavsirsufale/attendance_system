import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentCRUD() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    section: "",
    semester: "",
    roll_number: "", // Optional for update
  });
  const [editingStudentId, setEditingStudentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (selectedProgram) {
      fetchSectionsByProgram(selectedProgram);
    } else {
      resetFormAndLists();
    }
  }, [selectedProgram]);

  useEffect(() => {
    if (selectedSection) {
      fetchSemestersBySection(selectedSection);
    } else {
      setSemesters([]);
      setSelectedSemester("");
      setStudents([]);
      setFormData({ ...formData, semester: "" });
    }
  }, [selectedSection]);

  useEffect(() => {
    if (selectedSection && selectedSemester) {
      fetchStudentsBySectionAndSemester(selectedSection, selectedSemester);
    } else {
      setStudents([]);
    }
  }, [selectedSection, selectedSemester]);

  const resetFormAndLists = () => {
    setSections([]);
    setSemesters([]);
    setSelectedSection("");
    setSelectedSemester("");
    setStudents([]);
    setFormData({ first_name: "", last_name: "", email: "", phone: "", section: "", semester: "", roll_number: "" });
    setEditingStudentId(null);
  };

  const fetchPrograms = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please log in first");
      navigate("/");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/admin/programs/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrograms(response.data);
      console.log("Programs fetched:", response.data);
    } catch (err) {
      setError(`Failed to load programs: ${err.response?.data?.detail || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionsByProgram = async (programId) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`http://localhost:8000/api/admin/sections/?program=${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(response.data);
      console.log(`Sections for program ${programId}:`, response.data);
    } catch (err) {
      setError(`Failed to load sections: ${err.response?.data?.detail || err.message}`);
    }
  };

  const fetchSemestersBySection = async (sectionId) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`http://localhost:8000/api/admin/semesters/?section_id=${sectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSemesters(response.data.semesters);
      console.log(`Semesters for section ${sectionId}:`, response.data.semesters);
    } catch (err) {
      setError(`Failed to load semesters: ${err.response?.data?.detail || err.message}`);
      setSemesters([]);
    }
  };

  const fetchStudentsBySectionAndSemester = async (sectionId, semester) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/students/?section=${sectionId}&semester=${semester}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(response.data);
      console.log(`Students for section ${sectionId}, semester ${semester}:`, response.data);
    } catch (err) {
      setError(`Failed to load students: ${err.response?.data?.detail || err.message}`);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "section") setSelectedSection(value);
    if (name === "semester") setSelectedSemester(value);
  };






 const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("access_token");
  if (!formData.section || !formData.semester || !formData.first_name || !formData.last_name || !formData.email) {
    setError("Please fill all required fields: First Name, Last Name, Email, Section, and Semester");
    return;
  }
  try {
    const payload = { ...formData };
    console.log("Submitting payload:", payload);
    if (editingStudentId) {
      const response = await axios.put(
        `http://localhost:8000/api/admin/students/${editingStudentId}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Student updated:", response.data);
    } else {
      const response = await axios.post("http://localhost:8000/api/admin/students/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Student created with roll_number:", response.data.roll_number);
    }
    resetFormAndLists();
    setFormData({ ...formData, first_name: "", last_name: "", email: "", phone: "", roll_number: "", section: formData.section, semester: formData.semester });
    setEditingStudentId(null);
    fetchStudentsBySectionAndSemester(selectedSection, selectedSemester);
    setError("");
  } catch (err) {
    setError(`Failed to ${editingStudentId ? "update" : "add"} student: ${err.response?.data?.detail || err.message}`);
    console.error("Student operation error:", err.response?.data); // Log full error
  }
};











  const handleEdit = (student) => {
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone: student.phone || "",
      section: student.section.id,
      semester: student.semester,
      roll_number: student.roll_number,
    });
    setSelectedSection(student.section.id);
    setSelectedSemester(student.semester);
    setEditingStudentId(student.id);
  };

  const handleDelete = async (studentId) => {
    const token = localStorage.getItem("access_token");
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/students/${studentId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudentsBySectionAndSemester(selectedSection, selectedSemester);
      setError("");
      console.log(`Student ${studentId} deleted`);
    } catch (err) {
      setError(`Failed to delete student: ${err.response?.data?.detail || err.message}`);
    }
  };

  const filteredStudents = students.filter(student => {
    const query = searchQuery.toLowerCase();
    return (
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(query) ||
      student.roll_number.toLowerCase().includes(query)
    );
  });

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Students</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <h3 className="text-xl font-semibold mb-2">{editingStudentId ? "Edit Student" : "Add New Student"}</h3>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-800">Program:</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-800"
            >
              <option value="">-- Select a Program --</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name} ({program.duration_years} Years)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-800">Section:</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md text-gray-800"
              disabled={!selectedProgram}
            >
              <option value="">-- Select a Section --</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  Year {section.year} - {section.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-800">Semester:</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md text-gray-800"
              disabled={!formData.section}
            >
              <option value="">-- Select a Semester --</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-800">Roll Number (optional):</label>
            <input
              type="text"
              name="roll_number"
              value={formData.roll_number}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md text-gray-800"
              placeholder="Auto-generated if blank"
            />
          </div>
          <div>
            <label className="block text-gray-800">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-md text-gray-800"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {editingStudentId ? "Update Student" : "Add Student"}
        </button>
        {editingStudentId && (
          <button
            type="button"
            onClick={() => resetFormAndLists()}
            className="mt-4 ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      {selectedSemester && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Students</h3>
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or roll number..."
              className="w-full p-2 border rounded-md text-gray-800"
            />
          </div>
          {filteredStudents.length === 0 ? (
            <p>No students found</p>
          ) : (
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 text-left">Roll Number</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Subjects</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="p-2">{student.roll_number}</td>
                    <td className="p-2">{student.first_name} {student.last_name}</td>
                    <td className="p-2">{student.email}</td>
                    <td className="p-2">{student.phone}</td>
                    <td className="p-2">
                      {student.subjects.length > 0 ? student.subjects.map(s => s.name).join(", ") : "None"}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentCRUD;