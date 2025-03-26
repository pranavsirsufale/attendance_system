import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimetableForm({ onClose }) {
  const [formData, setFormData] = useState({
    section: '',
    subject: '',
    day_of_week: 'Monday',
    start_time: '08:30:00',
    semester_start_date: '',
    semester_end_date: '',
  });
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch sections and subjects, and set default dates on mount
  useEffect(() => {
    const fetchOptions = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const sectionsResponse = await axios.get('http://localhost:8000/api/sections/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subjectsResponse = await axios.get('http://localhost:8000/api/subjects/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSections(sectionsResponse.data);
        setSubjects(subjectsResponse.data);
      } catch (err) {
        setError('Failed to load sections or subjects');
      }
    };

    // Set default semester dates (e.g., current year)
    const currentYear = new Date().getFullYear();
    setFormData((prev) => ({
      ...prev,
      semester_start_date: `${currentYear}-01-01`,
      semester_end_date: `${currentYear}-06-30`,
    }));

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post('http://localhost:8000/api/timetables/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Timetable created successfully');
      setError('');
      setTimeout(onClose, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create timetable');
      setSuccess('');
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-lg w-full">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Timetable</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Section:</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name} - {section.program} - Year {section.year}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Subject:</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name} - Semester {subject.semester}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Day of Week:</label>
          <select
            name="day_of_week"
            value={formData.day_of_week}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Start Time:</label>
          <select
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="08:30:00">08:30 AM</option>
            <option value="09:30:00">09:30 AM</option>
            <option value="10:30:00">10:30 AM</option>
            <option value="12:00:00">12:00 PM</option>
            <option value="13:00:00">01:00 PM</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Semester Start Date:</label>
          <input
            type="date"
            name="semester_start_date"
            value={formData.semester_start_date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Semester End Date:</label>
          <input
            type="date"
            name="semester_end_date"
            value={formData.semester_end_date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TimetableForm;


/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TimetableForm({ onClose }) {
  const [formData, setFormData] = useState({
    section: '',
    subject: '',
    day_of_week: 'Monday',
    start_time: '08:30:00',
    semester_start_date: '',
    semester_end_date: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post('http://localhost:8000/api/timetables/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Timetable created successfully');
      setError('');
      setTimeout(() => {
        navigate('/calendar');
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create timetable');
      setSuccess('');
    }
  };

  return (
    <div style={{
      maxWidth: '500px', margin: '50px auto', padding: '20px',
      border: '1px solid #ddd', borderRadius: '8px'
    }}>
      <h3>Add New Timetable</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Section ID:</label>
          <input type="number" name="section" value={formData.section} onChange={handleChange} required />
        </div>
        <div>
          <label>Subject ID:</label>
          <input type="number" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label>Day of Week:</label>
          <select name="day_of_week" value={formData.day_of_week} onChange={handleChange}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div>
          <label>Start Time:</label>
          <select name="start_time" value={formData.start_time} onChange={handleChange}>
            <option value="08:30:00">08:30 AM</option>
            <option value="09:30:00">09:30 AM</option>
            <option value="10:30:00">10:30 AM</option>
            <option value="12:00:00">12:00 PM</option>
            <option value="13:00:00">01:00 PM</option>
          </select>
        </div>
        <div>
          <label>Semester Start Date:</label>
          <input type="date" name="semester_start_date" value={formData.semester_start_date} onChange={handleChange} required />
        </div>
        <div>
          <label>Semester End Date:</label>
          <input type="date" name="semester_end_date" value={formData.semester_end_date} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button type="button" onClick={() => navigate('/calendar')} style={{ padding: '8px 16px', marginRight: '10px' }}>
            Cancel
          </button>
          <button type="submit" style={{ padding: '8px 16px' }}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default TimetableForm;


=+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState } from 'react';
import axios from 'axios';

function TimetableForm({ onClose }) {
  const [formData, setFormData] = useState({
    section: '',
    subject: '',
    day_of_week: 'Monday',
    start_time: '08:30:00',
    semester_start_date: '',
    semester_end_date: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post('http://localhost:8000/api/timetables/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Timetable created successfully');
      setError('');
      setTimeout(onClose, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create timetable');
      setSuccess('');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      zIndex: 1000, maxWidth: '500px', width: '100%'
    }}>
      <h3>Add New Timetable</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Section ID:</label>
          <input type="number" name="section" value={formData.section} onChange={handleChange} required />
        </div>
        <div>
          <label>Subject ID:</label>
          <input type="number" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label>Day of Week:</label>
          <select name="day_of_week" value={formData.day_of_week} onChange={handleChange}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div>
          <label>Start Time:</label>
          <select name="start_time" value={formData.start_time} onChange={handleChange}>
            <option value="08:30:00">08:30 AM</option>
            <option value="09:30:00">09:30 AM</option>
            <option value="10:30:00">10:30 AM</option>
            <option value="12:00:00">12:00 PM</option>
            <option value="13:00:00">01:00 PM</option>
          </select>
        </div>
        <div>
          <label>Semester Start Date:</label>
          <input type="date" name="semester_start_date" value={formData.semester_start_date} onChange={handleChange} required />
        </div>
        <div>
          <label>Semester End Date:</label>
          <input type="date" name="semester_end_date" value={formData.semester_end_date} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 16px', marginRight: '10px' }}>Cancel</button>
          <button type="submit" style={{ padding: '8px 16px' }}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default TimetableForm;

*/