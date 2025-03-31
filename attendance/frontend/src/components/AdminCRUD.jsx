import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AdminCRUD({ resource }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`http://localhost:8000/api/${resource}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        setError('Failed to load data');
      }
    };
    fetchItems();
  }, [resource]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/${resource}/${editingId}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:8000/api/${resource}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({});
      setEditingId(null);
      const response = await axios.get(`http://localhost:8000/api/${resource}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
    } catch (err) {
      setError('Failed to save data');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:8000/api/${resource}/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage {resource.charAt(0).toUpperCase() + resource.slice(1)}</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        {Object.keys(formData).map(key => (
          key !== 'id' && (
            <div key={key} className="mb-2">
              <label className="block text-gray-800">{key.replace('_', ' ')}:</label>
              <input
                type="text"
                value={formData[key] || ''}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                className="w-full p-2 border rounded-md text-gray-800"
              />
            </div>
          )
        ))}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          {editingId ? 'Update' : 'Create'}
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
            {items.length > 0 && Object.keys(items[0]).map(key => (
              key !== 'id' && <th key={key} className="p-2 text-left">{key.replace('_', ' ')}</th>
            ))}
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-t">
              {Object.keys(item).map(key => (
                key !== 'id' && <td key={key} className="p-2 text-gray-800">{JSON.stringify(item[key])}</td>
              ))}
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

export default AdminCRUD;