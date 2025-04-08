



/*
second
// src/components/AdminCRUD.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminCRUD({ resource }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [resource]);

  const fetchItems = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/admin/${resource}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
      console.log(response)
      setError('');
    } catch (err) {
      setError(`Failed to fetch ${resource}: ` + (err.response?.data?.detail || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    if (window.confirm(`Are you sure you want to delete this ${resource.slice(0, -1)}?`)) {
      try {
        await axios.delete(`http://localhost:8000/admin/${resource}/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchItems();
      } catch (err) {
        setError(`Failed to delete ${resource.slice(0, -1)}: ` + (err.response?.data?.detail || 'Unknown error'));
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage {resource.charAt(0).toUpperCase() + resource.slice(1)}</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
            <span>{JSON.stringify(item)}</span> 
            <div>
              <button className="text-blue-600 hover:underline mr-2">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCRUD;



*/


/*
first 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AdminCRUD({ resource }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/${resource}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setItems(response.data);
      } catch (err) {
        setError("Failed to load data");
      }
    };
    fetchItems();
  }, [resource]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/${resource}/${editingId}/`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(`http://localhost:8000/api/${resource}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({});
      setEditingId(null);
      const response = await axios.get(
        `http://localhost:8000/api/${resource}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(response.data);
    } catch (err) {
      setError("Failed to save data");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`http://localhost:8000/api/${resource}/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Manage {resource.charAt(0).toUpperCase() + resource.slice(1)}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 rounded-lg shadow-md"
      >
        {Object.keys(formData).map(
          (key) =>
            key !== "id" && (
              <div key={key} className="mb-2">
                <label className="block text-gray-800">
                  {key.replace("_", " ")}:
                </label>
                <input
                  type="text"
                  value={formData[key] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className="w-full p-2 border rounded-md text-gray-800"
                />
              </div>
            )
        )}
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
            {items.length > 0 &&
              Object.keys(items[0]).map(
                (key) =>
                  key !== "id" && (
                    <th key={key} className="p-2 text-left">
                      {key.replace("_", " ")}
                    </th>
                  )
              )}
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              {Object.keys(item).map(
                (key) =>
                  key !== "id" && (
                    <td key={key} className="p-2 text-gray-800">
                      {JSON.stringify(item[key])}
                    </td>
                  )
              )}
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
      setError("Failed to save data: " + (err.response?.data?.detail || "Unknown error"));
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
      teachers: ["first_name", "last_name", "email", "phone", "is_admin"],
      students: ["roll_number", "first_name", "last_name", "email", "phone", "section"],
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
          {typeof item[key] === "object" && item[key] !== null ? JSON.stringify(item[key]) : item[key]}
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

