// src/components/admin/SessionCRUD.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SessionCRUD() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const resource = "sessions";

  useEffect(() => {
    fetchItems();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/admin/${resource}/${editingId}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:8000/api/admin/${resource}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({});
      setEditingId(null);
      fetchItems();
    } catch (err) {
      setError("Failed to save data: " + JSON.stringify(err.response?.data || "Unknown error"));
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
        setError("Failed to delete: " + (err.response?.data?.detail || "Unknown error"));
      }
    }
  };

  const fields = ["timetable", "date", "status"];

  const renderFields = () => fields.map((key) => (
    <div key={key} className="mb-2">
      <label className="block text-gray-800 capitalize">{key.replace("_", " ")}:</label>
      {key === "status" ? (
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
    <td key={key} className="p-2 text-gray-800">{item[key] || "-"}</td>
  ));

  if (loading) return <div className="p-6">Loading {resource}...</div>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Sessions</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        {renderFields()}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setFormData({}); setEditingId(null); }}
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

export default SessionCRUD;