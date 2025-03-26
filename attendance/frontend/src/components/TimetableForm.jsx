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




/*
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