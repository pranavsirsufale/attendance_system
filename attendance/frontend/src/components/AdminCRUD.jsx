


/*
// src/components/AdminCRUD.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCRUD({ resource }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [resource]);

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
      console.log(response.data)
      setError("");
    } catch (err) {
      const message = err.response?.status === 404
        ? "Resource not found on server"
        : err.response?.data?.detail || err.message || "Unknown error";
      setError(`Failed to load ${resource}: ${message} (Status: ${err.response?.status})`);
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };



  // hnadle submit handle submit and update both
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/admin/${resource}/${editingId}/`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`http://localhost:8000/api/admin/${resource}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({});
      setEditingId(null);
      fetchItems();
    } catch (err) {
      const errorDetail = err.response?.data || "Unknown error";
      console.log("Error response:", errorDetail);  // Add this
      setError("Failed to save data: " + JSON.stringify(errorDetail));
    }
  };



  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (window.confirm(`Are you sure you want to delete this ${resource.slice(0, -1)}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${resource}/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(items.filter((item) => item.id !== id));
      } catch (err) {
        setError("Failed to delete item: " + (err.response?.data?.detail || "Unknown error"));
      }
    }
  };

  const renderFields = () => {
    const fieldMap = {
      teachers: ["first_name", "last_name", "phone", "email",'password', "is_admin"],
      students: ["roll_number", "first_name", "last_name", "email", "phone", 'subjects', "section"],
      programs: ["name", "duration_years"],
      subjects: ["name", "is_law_subject", "semester", "teacher"],
      timetables: ["section", "teacher", "subject", "day_of_week", "start_time", "semester_start_date", "semester_end_date"],
      sessions: ["timetable", "date", "status"],
    };
    const fields = fieldMap[resource] || [];
    return fields.map((key) => (
      <div key={key} className="mb-2">
        <label className="block text-gray-800 capitalize">{key.replace("_", " ")}:</label>
        <input
          type={key.includes("date") ? "date" : key === "is_admin" ? "checkbox" : "text"}
          value={key === "is_admin" ? undefined : (formData[key] || "")}
          checked={key === "is_admin" ? formData[key] : undefined}
          onChange={(e) =>
            setFormData({
              ...formData,
              [key]: key === "is_admin" ? e.target.checked : e.target.value,
            })
          }
          className="w-full p-2 border rounded-md text-gray-800"
        />
      </div>
    ));
  };

  const renderTableHeaders = () => {
    if (items.length === 0) return null;
    return Object.keys(items[0])
      .filter((key) => key !== "id")
      .map((key) => (
        <th key={key} className="p-2 text-left capitalize">
          {key.replace("_", " ")}
        </th>
      ));
  };






  const renderTableRow = (item) => {
    return Object.keys(item)
      .filter((key) => key !== "id")
      .map((key) => (
        <td key={key} className="p-2 text-gray-800">
          {typeof item[key] === "object" && item[key] !== null 
            ? JSON.stringify(item[key]) 
            : typeof item[key] === "boolean"
              ?  item[key] === true ? "YES" : "-" 
              : item[key]}
        </td>
      ));
  };



  if (loading) return <div className="p-6">Loading {resource}...</div>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Manage {resource.charAt(0).toUpperCase() + resource.slice(1)}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        {renderFields()}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setFormData({});
              setEditingId(null);
            }}
            className="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>
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
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCRUD;


*/




// src/components/AdminCRUD.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCRUD({ resource }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    if (resource === "students") {
      fetchSections();
    }
  }, [resource]);

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
      console.log(response.data);
      setError("");
    } catch (err) {
      const message = err.response?.status === 404
        ? "Resource not found on server"
        : err.response?.data?.detail || err.message || "Unknown error";
      setError(`Failed to load ${resource}: ${message} (Status: ${err.response?.status})`);
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/");
      }
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
      setError("Failed to load sections: " + (err.response?.data?.detail || "Unknown error"));
    }
  };

  const getSemesterOptions = (sectionId) => {
    const section = sections.find(s => s.id === parseInt(sectionId));
    if (!section) return [];
    const year = section.year;
    const maxSemesters = section.program.duration_years * 2; // 5 years = 10 semesters, 3 years = 6
    const startSemester = (year - 1) * 2 + 1; // Year 1 = 1, Year 2 = 3, Year 3 = 5, Year 4 = 7, Year 5 = 9
    const endSemester = Math.min(startSemester + 1, maxSemesters); // Ensure it doesn’t exceed max
    return Array.from({ length: endSemester - startSemester + 1 }, (_, i) => startSemester + i);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const payload = { ...formData };
      if (resource === "students") {
        payload.section = parseInt(payload.section); // Ensure section is an integer
        payload.semester = parseInt(payload.semester); // Ensure semester is an integer
      }
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/admin/${resource}/${editingId}/`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`http://localhost:8000/api/admin/${resource}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({});
      setEditingId(null);
      fetchItems();
    } catch (err) {
      const errorDetail = err.response?.data || "Unknown error";
      console.log("Error response:", errorDetail);
      setError("Failed to save data: " + JSON.stringify(errorDetail));
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (window.confirm(`Are you sure you want to delete this ${resource.slice(0, -1)}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${resource}/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(items.filter((item) => item.id !== id));
      } catch (err) {
        setError("Failed to delete item: " + (err.response?.data?.detail || "Unknown error"));
      }
    }
  };

  const renderFields = () => {
    const fieldMap = {
      teachers: ["first_name", "last_name", "phone", "email", "password", "is_admin"],
      students: ["roll_number", "first_name", "last_name", "email", "phone", "section", "semester"],
      programs: ["name", "duration_years"],
      subjects: ["name", "is_law_subject", "semester", "teacher"],
      timetables: ["section", "teacher", "subject", "day_of_week", "start_time", "semester_start_date", "semester_end_date"],
      sessions: ["timetable", "date", "status"],
    };
    const fields = fieldMap[resource] || [];
    return fields.map((key) => (
      <div key={key} className="mb-2">
        <label className="block text-gray-800 capitalize">{key.replace("_", " ")}:</label>
        {key === "section" && resource === "students" ? (
          <select
            value={formData[key] || ""}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-2 border rounded-md text-gray-800"
          >
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.program.name} - Year {section.year} - {section.name}
              </option>
            ))}
          </select>
        ) : key === "semester" && resource === "students" ? (
          <select
            value={formData[key] || ""}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-2 border rounded-md text-gray-800"
            disabled={!formData.section}
          >
            <option value="">Select a semester</option>
            {getSemesterOptions(formData.section).map((sem) => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        ) : (
          <input
            type={key.includes("date") ? "date" : key === "is_admin" ? "checkbox" : "text"}
            value={key === "is_admin" ? undefined : (formData[key] || "")}
            checked={key === "is_admin" ? formData[key] : undefined}
            onChange={(e) =>
              setFormData({
                ...formData,
                [key]: key === "is_admin" ? e.target.checked : e.target.value,
              })
            }
            className="w-full p-2 border rounded-md text-gray-800"
          />
        )}
      </div>
    ));
  };

  const renderTableHeaders = () => {
    if (items.length === 0) return null;
    const headersMap = {
      teachers: ['first_name', 'last_name', 'phone', 'email', 'is_admin'],
      students: ['roll_number', 'first_name', 'last_name', 'email', 'phone', 'program', 'section', 'semester', 'subjects'],
      programs: ['name', 'duration_years'],
      subjects: ['name', 'is_law_subject', 'semester', 'teacher'],
      timetables: ['section', 'teacher', 'subject', 'day_of_week', 'start_time', 'semester_start_date', 'semester_end_date'],
      sessions: ['timetable', 'date', 'status'],
    };
    const headers = headersMap[resource] || Object.keys(items[0]).filter((key) => key !== "id");
    return headers.map((key) => (
      <th key={key} className="p-2 text-left capitalize">
        {key.replace("_", " ")}
      </th>
    ));
  };

  const renderTableRow = (item) => {
    const rowData = {
      teachers: {
        first_name: item.first_name,
        last_name: item.last_name,
        phone: item.phone,
        email: item.email,
        is_admin: item.is_admin ? "Yes" : "No",
      },
      students: {
        roll_number: item.roll_number,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        phone: item.phone,
        program: item.section?.program.name || "-",
        section: `${item.section?.year} - ${item.section?.name}` || "-",
        semester: item.semester || "-",
        subjects: item.subjects.length > 0 ? item.subjects.map(s => s.name).join(", ") : "None",
      },
      programs: item,
      subjects: item,
      timetables: item,
      sessions: item,
    };
    const data = rowData[resource] || item;
    return Object.keys(data).map((key) => (
      <td key={key} className="p-2 text-gray-800">
        {data[key]}
      </td>
    ));
  };

  if (loading) return <div className="p-6">Loading {resource}...</div>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Manage {resource.charAt(0).toUpperCase() + resource.slice(1)}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        {renderFields()}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setFormData({});
              setEditingId(null);
            }}
            className="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>
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
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCRUD;







