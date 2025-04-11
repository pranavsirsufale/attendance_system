import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SessionCRUD() {
  const [items, setItems] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ timetable: "", date: "", status: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const resource = "sessions";
  const pageSize = 20;

  useEffect(() => {
    fetchTeachers();
    fetchTimetables();
    fetchSemesters(); // Fetch unique semesters
  }, []);

  useEffect(() => {
    fetchItems(); // Fetch sessions when page, teacher, or semester changes
  }, [page, selectedTeacher, selectedSemester]);

  const fetchItems = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please log in first");
      navigate("/");
      return;
    }
    try {
      setLoading(true);
      let url = `http://localhost:8000/api/admin/${resource}/?page=${page}&page_size=${pageSize}`;
      if (selectedTeacher) url += `&teacher_id=${selectedTeacher}`;
      if (selectedSemester) url += `&semester=${selectedSemester}`;
      console.log(`Fetching from: ${url}`);
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Sessions fetched:", response.data);
      setItems(response.data.results || response.data); // Handle paginated or non-paginated response
      setTotalPages(Math.ceil((response.data.count || response.data.length) / pageSize));
      setError("");
    } catch (err) {
      const message = err.response?.status === 404 ? "Resource not found" : err.response?.data?.detail || "Unknown error";
      setError(`Failed to load ${resource}: ${message}`);
      console.error("Fetch error:", err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get("http://localhost:8000/api/admin/teachers/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data);
      console.log("Teachers fetched:", response.data);
    } catch (err) {
      console.error("Teachers fetch error:", err.response?.data || err.message);
    }
  };

  const fetchTimetables = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get("http://localhost:8000/api/admin/timetables/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimetables(response.data);
      console.log("Timetables fetched:", response.data);
    } catch (err) {
      console.error("Timetables fetch error:", err.response?.data || err.message);
    }
  };

  const fetchSemesters = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get("http://localhost:8000/api/admin/subjects/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const uniqueSemesters = [...new Set(response.data.map(subject => subject.semester))].sort();
      setSemesters(uniqueSemesters);
      console.log("Semesters fetched:", uniqueSemesters);
    } catch (err) {
      console.error("Semesters fetch error:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      console.log("Submitting:", formData);
      if (editingId) {
        await axios.put(`http://localhost:8000/api/admin/${resource}/${editingId}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:8000/api/admin/${resource}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ timetable: "", date: "", status: "" });
      setEditingId(null);
      fetchItems();
    } catch (err) {
      setError("Failed to save data: " + JSON.stringify(err.response?.data || "Unknown error"));
      console.error("Submit error:", err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    console.log("Editing session:", item);
    setFormData({
      timetable: item.timetable.id,
      date: item.date,
      status: item.status,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (window.confirm(`Are you sure you want to delete this ${resource.slice(0, -1)}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${resource}/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchItems(); // Refresh after delete
      } catch (err) {
        setError("Failed to delete: " + (err.response?.data?.detail || "Unknown error"));
        console.error("Delete error:", err.response?.data || err.message);
      }
    }
  };

  const fields = ["timetable", "date", "status"];

  const renderFields = () => fields.map((key) => (
    <div key={key} className="mb-2">
      <label className="block text-gray-800 capitalize">{key.replace("_", " ")}:</label>
      {key === "timetable" ? (
        <select
          value={formData[key] || ""}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-2 border rounded-md text-gray-800"
        >
          <option value="">Select Timetable</option>
          {timetables.map((timetable) => (
            <option key={timetable.id} value={timetable.id}>
              {timetable.section.name} - {timetable.subject.name} ({timetable.day_of_week} {timetable.start_time})
            </option>
          ))}
        </select>
      ) : key === "status" ? (
        <select
          value={formData[key] || ""}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-2 border rounded-md text-gray-800"
        >
          <option value="">Select</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ) : (
        <input
          type={key === "date" ? "date" : "text"}
          value={formData[key] || ""}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-2 border rounded-md text-gray-800"
        />
      )}
    </div>
  ));

  const renderTableHeaders = () => fields.map((key) => (
    <th key={key} className="p-2 text-left capitalize">{key.replace("_", " ")}</th>
  ));

  const renderTableRow = (item) => fields.map((key) => (
    <td key={key} className="p-2 text-gray-800">
      {key === "timetable" ? `${item.timetable.section.name} - ${item.timetable.subject.name}` : item[key] || "-"}
    </td>
  ));

  const handleTeacherClick = (teacherId) => {
    setSelectedTeacher(teacherId);
    setPage(1); // Reset to first page
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setPage(1); // Reset to first page
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading && page === 1) return <div className="p-6">Loading {resource}...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Sessions</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Teacher Cards */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Filter by Teacher</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => handleTeacherClick(teacher.id)}
              className={`p-4 bg-white rounded-lg shadow-md cursor-pointer ${selectedTeacher === teacher.id ? "border-2 border-blue-600" : ""}`}
            >
              <p className="text-gray-800 font-medium">{teacher.first_name} {teacher.last_name}</p>
              <p className="text-gray-600 text-sm">{teacher.email}</p>
            </div>
          ))}
          <div
            onClick={() => handleTeacherClick(null)}
            className={`p-4 bg-white rounded-lg shadow-md cursor-pointer ${!selectedTeacher ? "border-2 border-blue-600" : ""}`}
          >
            <p className="text-gray-800 font-medium">All Teachers</p>
          </div>
        </div>
      </div>

      {/* Semester Filter */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Filter by Semester</h3>
        <select
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="w-full md:w-1/4 p-2 border rounded-md text-gray-800"
        >
          <option value="">All Semesters</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              Semester {semester}
            </option>
          ))}
        </select>
      </div>

      {/* CRUD Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        {renderFields()}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setFormData({ timetable: "", date: "", status: "" }); setEditingId(null); }}
            className="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Sessions Table */}
      {loading ? (
        <div className="p-6">Loading more sessions...</div>
      ) : (
        <>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                {renderTableHeaders()}
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t">
                  {renderTableRow(item)}
                  <td className="p-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-800">Page {page} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SessionCRUD;