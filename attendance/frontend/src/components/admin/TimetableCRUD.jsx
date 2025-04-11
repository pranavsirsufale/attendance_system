






/*

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TimetableCRUD() {
  const [items, setItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    section: "",
    teacher: "",
    semester: "",
    daily_schedules: [{ day_of_week: "", subject: "", start_time: "" }],
    semester_start_date: "",
    semester_end_date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const resource = "timetables";

  const timeSlots = ["08:30:00", "09:30:00", "10:30:00", "12:00:00", "13:00:00"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    fetchItems();
    fetchSections();
    fetchTeachers();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please log in first");
      navigate("/");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/admin/${resource}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
      setError("");
    } catch (err) {
      const message = err.response?.status === 404 ? "Resource not found" : err.response?.data?.detail || "Unknown error";
      setError(`Failed to load ${resource}: ${message}`);
      if (err.response?.status === 401 || err.response?.status === 403) navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get("http://localhost:8000/api/admin/sections/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(response.data);
    } catch (err) {
      console.error("Sections fetch error:", err.response?.data || err.message);
    }
  };

  const fetchTeachers = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get("http://localhost:8000/api/admin/teachers/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data);
    } catch (err) {
      console.error("Teachers fetch error:", err.response?.data || err.message);
    }
  };




  const fetchSemesters = async (sectionId) => {
    const token = localStorage.getItem("access_token");
    try {
      console.log(`Fetching semesters for section_id=${sectionId}`);
      const response = await axios.get(`http://localhost:8000/api/semesters-for-section/?section_id=${sectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSemesters(response.data.semesters || []);
      console.log("Semesters fetched:", response.data.semesters);
    } catch (err) {
      setError(`Failed to fetch semesters: ${err.response?.status === 404 ? "Endpoint not found" : err.response?.data?.error || "Unknown error"}`);
      setSemesters([]);
      console.error("Semesters fetch error:", err.response?.data || err.message);
    }
  };




  const fetchSubjects = async (semester) => {
    const token = localStorage.getItem("access_token");
    try {
      console.log(`Fetching subjects for semester=${semester}`);
      const response = await axios.get(`http://localhost:8000/api/admin/subjects/?semester=${semester}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data);
      console.log("Subjects fetched:", response.data);
    } catch (err) {
      setError("Failed to fetch subjects: " + (err.response?.data?.error || "Unknown error"));
      console.error("Subjects fetch error:", err.response?.data || err.message);
    }
  };

  const fetchDefaultDates = async (sectionId) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`http://localhost:8000/api/admin/timetables/?section_id=${sectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const timetables = response.data;
      if (timetables.length > 0) {
        const latest = timetables.sort((a, b) => new Date(b.semester_start_date) - new Date(a.semester_start_date))[0];
        console.log("Using latest timetable dates:", latest.semester_start_date, latest.semester_end_date);
        return {
          semester_start_date: latest.semester_start_date,
          semester_end_date: latest.semester_end_date,
        };
      }
      const defaultStart = new Date().toISOString().split("T")[0];
      const defaultEnd = new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split("T")[0];
      console.log("No prior timetables, using defaults:", defaultStart, defaultEnd);
      return { semester_start_date: defaultStart, semester_end_date: defaultEnd };
    } catch (err) {
      console.error("Default dates fetch error:", err.response?.data || err.message);
      const defaultStart = new Date().toISOString().split("T")[0];
      const defaultEnd = new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split("T")[0];
      return { semester_start_date: defaultStart, semester_end_date: defaultEnd };
    }
  };

  const handleSectionChange = async (e) => {
    const sectionId = e.target.value;
    const defaultDates = await fetchDefaultDates(sectionId);
    setFormData({
      ...formData,
      section: sectionId,
      semester: "",
      daily_schedules: [{ day_of_week: "", subject: "", start_time: "" }],
      semester_start_date: defaultDates.semester_start_date,
      semester_end_date: defaultDates.semester_end_date,
    });
    setSubjects([]);
    if (sectionId) fetchSemesters(sectionId);
  };

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setFormData({
      ...formData,
      semester,
      daily_schedules: [{ day_of_week: "", subject: "", start_time: "" }],
    });
    if (semester) fetchSubjects(semester);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...formData.daily_schedules];
    updatedSchedules[index][field] = value;
    setFormData({ ...formData, daily_schedules: updatedSchedules });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      daily_schedules: [...formData.daily_schedules, { day_of_week: "", subject: "", start_time: "" }],
    });
  };

  const removeSchedule = (index) => {
    const updatedSchedules = formData.daily_schedules.filter((_, i) => i !== index);
    setFormData({ ...formData, daily_schedules: updatedSchedules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const payload = {
        section: formData.section,
        teacher: formData.teacher,
        semester: parseInt(formData.semester),
        daily_schedules: formData.daily_schedules,
        semester_start_date: formData.semester_start_date,
        semester_end_date: formData.semester_end_date,
      };
      console.log("Submitting payload:", payload);
      if (editingId) {
        await axios.put(`http://localhost:8000/api/admin/${resource}/${editingId}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:8000/api/admin/${resource}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      resetForm();
      fetchItems();
    } catch (err) {
      setError("Failed to save timetable: " + JSON.stringify(err.response?.data || "Unknown error"));
      console.error("Submit error:", err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    fetchSemesters(item.section.id);
    fetchSubjects(item.subject.semester);
    setFormData({
      section: item.section.id,
      teacher: item.teacher.id,
      semester: item.subject.semester.toString(),
      daily_schedules: [{
        day_of_week: item.day_of_week,
        subject: item.subject.id,
        start_time: item.start_time,
      }],
      semester_start_date: item.semester_start_date,
      semester_end_date: item.semester_end_date,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (window.confirm("Are you sure you want to delete this timetable?")) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${resource}/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchItems();
      } catch (err) {
        setError("Failed to delete: " + (err.response?.data?.detail || "Unknown error"));
        console.error("Delete error:", err.response?.data || err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      section: "",
      teacher: "",
      semester: "",
      daily_schedules: [{ day_of_week: "", subject: "", start_time: "" }],
      semester_start_date: "",
      semester_end_date: "",
    });
    setEditingId(null);
    setSemesters([]);
    setSubjects([]);
  };

  if (loading) return <div className="p-6">Loading {resource}...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Timetables</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="mb-2">
          <label className="block text-gray-800">Section:</label>
          <select
            value={formData.section}
            onChange={handleSectionChange}
            className="w-full p-2 border rounded-md text-gray-800"
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name} - Year {section.year} ({section.program.name})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-gray-800">Semester:</label>
          <select
            value={formData.semester}
            onChange={handleSemesterChange}
            className="w-full p-2 border rounded-md text-gray-800"
            disabled={!formData.section}
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                Semester {semester}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-gray-800">Teacher:</label>
          <select
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            className="w-full p-2 border rounded-md text-gray-800"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-gray-800">Daily Schedules:</label>
          {formData.daily_schedules.map((schedule, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <select
                value={schedule.day_of_week}
                onChange={(e) => handleScheduleChange(index, "day_of_week", e.target.value)}
                className="w-1/3 p-2 border rounded-md text-gray-800"
              >
                <option value="">Day</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={schedule.subject}
                onChange={(e) => handleScheduleChange(index, "subject", e.target.value)}
                className="w-1/3 p-2 border rounded-md text-gray-800"
                disabled={!formData.semester}
              >
                <option value="">Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
              <select
                value={schedule.start_time}
                onChange={(e) => handleScheduleChange(index, "start_time", e.target.value)}
                className="w-1/3 p-2 border rounded-md text-gray-800"
              >
                <option value="">Time Slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSchedule(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSchedule}
            className="text-blue-600 hover:underline"
          >
            Add Schedule
          </button>
        </div>

        <div className="mb-2">
          <label className="block text-gray-800">Semester Start Date:</label>
          <input
            type="date"
            value={formData.semester_start_date}
            onChange={(e) => setFormData({ ...formData, semester_start_date: e.target.value })}
            className="w-full p-2 border rounded-md text-gray-800"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-800">Semester End Date:</label>
          <input
            type="date"
            value={formData.semester_end_date}
            onChange={(e) => setFormData({ ...formData, semester_end_date: e.target.value })}
            className="w-full p-2 border rounded-md text-gray-800"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">Section</th>
            <th className="p-2 text-left">Teacher</th>
            <th className="p-2 text-left">Subject</th>
            <th className="p-2 text-left">Day</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Start Date</th>
            <th className="p-2 text-left">End Date</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2 text-gray-800">{item.section.name}</td>
              <td className="p-2 text-gray-800">{item.teacher.first_name} {item.teacher.last_name}</td>
              <td className="p-2 text-gray-800">{item.subject.name}</td>
              <td className="p-2 text-gray-800">{item.day_of_week}</td>
              <td className="p-2 text-gray-800">{item.start_time}</td>
              <td className="p-2 text-gray-800">{item.semester_start_date}</td>
              <td className="p-2 text-gray-800">{item.semester_end_date}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline mr-2">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimetableCRUD;


*/


