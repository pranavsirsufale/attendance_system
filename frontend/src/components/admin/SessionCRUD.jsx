import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../utilities/Button";

function SessionCRUD({notifyUser}) {
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
    fetchSemesters();
  }, []);

  useEffect(() => {
    fetchItems();
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
      console.log("Sessions fetched:", response);
      setItems(response.data.results || response.data);
      setTotalPages(Math.ceil((response.data.count || response.data.length) / pageSize));
      setError("");

      if( response.status >= 200 && response.status <= 300 ){
        notifyUser(response.data.message || `${response.data.count || 0 } Records found ✅`,'info')
      }
    } catch (err) {
      const message = err.response?.status === 404 ? "Resource not found" : err.response?.data?.detail || "Unknown error";
      setError(`Failed to load ${resource}: ${message}`);
      notifyUser(`Failed to load ${resource}: ${message}` , 'error');

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
      notifyUser("Teachers fetch error:"+err.response?.data || err.message ,'error');
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
      notifyUser("Timetables fetch error:" + err.response?.data || err.message,'error');
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

      notifyUser("Semesters fetch error:" + err.response?.data || err.message, 'error') ;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      console.log("Submitting:", formData);
      if (editingId) {
        const response = await axios.put(`http://localhost:8000/api/admin/${resource}/${editingId}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if( response.status >= 200 && response.status <= 300 ){
          notifyUser(response.data.message || `Record has been updated successfully ✅ `,'success')
        }
      } else {
        const response = await axios.post(`http://localhost:8000/api/admin/${resource}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if( response.status >= 200 && response.status <= 300 ){
          notifyUser(response.data.message || "Record has been saved successfully ✅ ",'success')
        }
      }
      setFormData({ timetable: "", date: "", status: "" });
      setEditingId(null);
      fetchItems();
    } catch (err) {
      setError("Failed to save data: " + JSON.stringify(err.response?.data || "Unknown error"));
      notifyUser("Failed to save data: " + JSON.stringify(err.response?.data || "Unknown error") , 'error');
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
    notifyUser('Record has been fetched successfully ✅ ','info')
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (window.confirm(`Are you sure you want to delete this ${resource.slice(0, -1)}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${resource}/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if( response.status >= 200 && response.status <= 300 ){
          notifyUser(response.data.message || 'Record has been deleted successfully ⚠ ','warning')
        }
        fetchItems();
      } catch (err) {
        setError("Failed to delete: " + (err.response?.data?.detail || "Unknown error"));
        notifyUser("Failed to delete: " + (err.response?.data?.detail || "Unknown error") , 'error' );
      }
    }
  };

  const fields = ["timetable", "date", "status"];

  const renderFields = () => fields.map((key) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <label className="block text-indigo-700 dark:text-indigo-300 font-medium capitalize mb-1">
        {key.replace("_", " ")}:
      </label>
      {key === "timetable" ? (
        <motion.select
          whileHover={{ scale: 1.02 }}
          value={formData[key] || ""}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">Select Timetable</option>
          {timetables.map((timetable) => (
            <option key={timetable.id} value={timetable.id}>
              {timetable.section.name} - {timetable.subject.name} ({timetable.day_of_week} {timetable.start_time})
            </option>
          ))}
        </motion.select>
      ) : key === "status" ? (
        <motion.select
          whileHover={{ scale: 1.02 }}
          value={formData[key] || ""}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">Select</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </motion.select>
      ) : (
        <motion.input
          whileHover={{ scale: 1.02 }}
          type={key === "date" ? "date" : "text"}
          value={formData[key] || ""}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
        />
      )}
    </motion.div>
  ));

  const renderTableHeaders = () => fields.map((key) => (
    <th key={key} className="p-3 text-left capitalize text-white font-semibold">
      {key.replace("_", " ")}
    </th>
  ));

  const renderTableRow = (item) => fields.map((key) => (
    <td key={key} className="p-3 text-gray-700 dark:text-gray-200">
      {key === "timetable" ? `${item.timetable.section.name} - ${item.timetable.subject.name}` : item[key] || "-"}
    </td>
  ));

  const handleTeacherClick = (teacherId) => {
    setSelectedTeacher(teacherId);
    setPage(1);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading && page === 1) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 flex items-center justify-center min-h-screen text-indigo-600 dark:text-indigo-300 font-medium"
    >
      Loading {resource}...
    </motion.div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Button  onClick={() => navigate('/admin')}>Dashboard</Button>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 mb-6"
     >
        Manage Sessions
      </motion.h2>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300 p-3 rounded-lg mb-6 shadow-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Teacher Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4"
        >
          Filter by Teacher
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teachers.map((teacher) => (
            <motion.div
              key={teacher.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTeacherClick(teacher.id)}
              className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer border-2 ${
                selectedTeacher === teacher.id ? "border-indigo-600 dark:border-indigo-400" : "border-transparent"
              } transition-all duration-200`}
            >
              <p className="text-gray-800 dark:text-gray-200 font-medium">{teacher.first_name} {teacher.last_name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{teacher.email}</p>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTeacherClick(null)}
            className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer border-2 ${
              !selectedTeacher ? "border-indigo-600 dark:border-indigo-400" : "border-transparent"
            } transition-all duration-200`}
          >
            <p className="text-gray-800 dark:text-gray-200 font-medium">All Teachers</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Semester Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4"
        >
          Filter by Semester
        </motion.h3>
        <motion.select
          whileHover={{ scale: 1.02 }}
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="w-full md:w-1/4 p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">All Semesters</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              Semester {semester}
            </option>
          ))}
        </motion.select>
      </motion.div>

      {/* CRUD Form */}
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700"
      >
        {renderFields()}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 text-white py-2 px-6 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
          >
            {editingId ? "Update" : "Create"}
          </motion.button>
          {editingId && (
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => { setFormData({ timetable: "", date: "", status: "" }); setEditingId(null); }}
              className="bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 text-white py-2 px-6 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.form>

      {/* Sessions Table */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 text-indigo-600 dark:text-indigo-300 font-medium"
        >
          Loading more sessions...
        </motion.div>
      ) : (
        <>
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden"
          >
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
                {renderTableHeaders()}
                <th className="p-3 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-indigo-100 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {renderTableRow(item)}
                  <td className="p-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium mr-4 transition-colors duration-200"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium transition-colors duration-200"
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>

          {/* Pagination Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 flex justify-between items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevPage}
              disabled={page === 1}
              className="bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 text-white py-2 px-6 rounded-full shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              Previous
            </motion.button>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Page {page} of {totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 text-white py-2 px-6 rounded-full shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              Next
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default SessionCRUD;





/*

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

      // Teacher Cards

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


     // semester filter

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

        // CRUD form


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

      // Session table

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

            // Pagaination control

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

*/


