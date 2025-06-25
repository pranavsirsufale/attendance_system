

// src/components/admin/ProgramCRUD.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../utilities/Button";

function ProgramCRUD({notifyUser}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const resource = "programs";

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

      if( response.status >= 200 && response.status <= 300 ){
        notifyUser(response.data.message || `${response.data.length} records found ✅`,'info')
      }
    } catch (err) {
      const message = err.response?.status === 404 ? "Resource not found" : err.response?.data?.detail || "Unknown error";
      setError(`Failed to load ${resource}: ${message}`);
      notifyUser(`Failed to load ${resource}: ${message}`, 'error');
      if (err.response?.status === 401 || err.response?.status === 403) navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const payload = { ...formData, duration_years: parseInt(formData.duration_years) };
      if (editingId) {
        const programUpdateResponse = await axios.put(`http://localhost:8000/api/admin/${resource}/${editingId}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if(programUpdateResponse.status >= 200 && programUpdateResponse.status <= 300){
          notifyUser(programUpdateResponse.data.message || "Program Record has been updated successfully ✅" , 'success')
        }

      } else {
        const programSavedResponse = await axios.post(`http://localhost:8000/api/admin/${resource}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if(programSavedResponse.status >= 200 && programSavedResponse.status <= 300){
          notifyUser(programSavedResponse.data.message || "Program Record has been saved successfully ✅" , 'success')
        }
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
    notifyUser('data has been fetched successfully ✅','info')
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (window.confirm(`Are you sure you want to delete this ${resource.slice(0, -1)}?, by removing this Program might delete all the records related to this program `)) {
      try {
        const deletedProgramResponse = await axios.delete(`http://localhost:8000/api/admin/${resource}/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(items.filter((item) => item.id !== id));
        if(deletedProgramResponse.status >= 200 && deletedProgramResponse.status <= 300){
          notifyUser(deletedProgramResponse.data.message || "Program record has been deleted successfully ⚠ ", 'warning')
        }
      } catch (err) {
        setError("Failed to delete: " + (err.response?.data?.detail || "Unknown error"));
        notifyUser("Failed to delete: " + (err.response?.data?.detail || "Unknown error" ) , 'error');
      }
    }
  };

  const fields = ["name", "duration_years"];

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
      <motion.input
        whileHover={{ scale: 1.02 }}
        type="text"
        value={formData[key] || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all duration-200"
      />
    </motion.div>
  ));

  const renderTableHeaders = () => fields.map((key) => (
    <th key={key} className="p-3 text-left capitalize text-white font-semibold">
      {key.replace("_", " ")}
    </th>
  ));

  const renderTableRow = (item) => fields.map((key) => (
    <td key={key} className="p-3 text-gray-700 dark:text-gray-200">
      {item[key] || "-"}
    </td>
  ));

  if (loading) return (
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
        Manage Programs
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
              onClick={() => { setFormData({}); setEditingId(null); }}
              className="bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 text-white py-2 px-6 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.form>
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
    </div>
  );
}

export default ProgramCRUD;





/*
// src/components/admin/ProgramCRUD.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProgramCRUD() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const resource = "programs";

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
      const payload = { ...formData, duration_years: parseInt(formData.duration_years) };
      if (editingId) {
        await axios.put(`http://localhost:8000/api/admin/${resource}/${editingId}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:8000/api/admin/${resource}/`, payload, {
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

  const fields = ["name", "duration_years"];

  const renderFields = () => fields.map((key) => (
    <div key={key} className="mb-2">
      <label className="block text-gray-800 capitalize">{key.replace("_", " ")}:</label>
      <input
        type="text"
        value={formData[key] || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full p-2 border rounded-md text-gray-800"
      />
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Programs</h2>
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

export default ProgramCRUD;

*/

