import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimetableForm({ onClose }) {
  const [section, setSection] = useState('');
  const [semesterStart, setSemesterStart] = useState(`${new Date().getFullYear()}-03-01`);
  const [semesterEnd, setSemesterEnd] = useState(`${new Date().getFullYear()}-08-31`);
  const [dailySchedules, setDailySchedules] = useState({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [],
  });
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSections = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/sections/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSections(response.data);
      } catch (err) {
        setError('Failed to load sections');
      }
    };
    fetchSections();
  }, []);

  useEffect(() => {
    if (section) {
      const fetchSubjects = async () => {
        const token = localStorage.getItem('access_token');
        const selectedSection = sections.find((sec) => sec.id === parseInt(section));
        if (selectedSection) {
          try {
            const response = await axios.get('http://localhost:8000/api/subjects/', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const semesterSubjects = response.data.filter((sub) => sub.semester === selectedSection.year);
            setSubjects(semesterSubjects);
          } catch (err) {
            setError('Failed to load subjects');
          }
        }
      };
      fetchSubjects();
    }
  }, [section, sections]);

  const calculateFirstDates = () => {
    if (!semesterStart) return {};
    const startDate = new Date(semesterStart);
    const dayOfWeekMap = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 5 };
    const dates = {};
    Object.keys(dayOfWeekMap).forEach((day) => {
      const daysAhead = dayOfWeekMap[day] - startDate.getDay();
      const targetDate = new Date(startDate);
      targetDate.setDate(startDate.getDate() + (daysAhead < 0 ? daysAhead + 7 : daysAhead));
      dates[day] = targetDate.toLocaleDateString();
    });
    return dates;
  };

  const firstDates = calculateFirstDates();

  const addSchedule = (day) => {
    if (dailySchedules[day].length >= 5) {
      setError(`Cannot add more than 5 lectures on ${day}`);
      return;
    }
    setDailySchedules((prev) => ({
      ...prev,
      [day]: [...prev[day], { subject: '', start_time: '08:30:00' }],
    }));
  };

  const updateSchedule = (day, index, field, value) => {
    setDailySchedules((prev) => {
      const updated = [...prev[day]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [day]: updated };
    });
  };

  const removeSchedule = (day, index) => {
    setDailySchedules((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('access_token');
  //   const payload = {
  //     section,
  //     daily_schedules: Object.entries(dailySchedules).flatMap(([day, schedules]) =>
  //       schedules.map((sched) => ({
  //         day_of_week: day,
  //         subject: sched.subject,
  //         start_time: sched.start_time,
  //       }))
  //     ),
  //     semester_start_date: semesterStart,
  //     semester_end_date: semesterEnd,
  //   };

  //   try {
  //     await axios.post('http://localhost:8000/api/timetables/', payload, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setSuccess('Semester timetable created successfully');
  //     setError('');
  //     setTimeout(onClose, 2000);
  //   } catch (err) {
  //     setError(err.response?.data?.detail || 'Failed to create timetable');
  //     setSuccess('');
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      return;
    }
    const payload = {
      section,
      daily_schedules: Object.entries(dailySchedules).flatMap(([day, schedules]) =>
        schedules.map((sched) => ({
          day_of_week: day,
          subject: sched.subject,
          start_time: sched.start_time,
        }))
      ),
      semester_start_date: semesterStart,
      semester_end_date: semesterEnd,
    };
  
    if (payload.daily_schedules.length === 0) {
      setError('Please add at least one lecture');
      return;
    }
  
    console.log('Submitting payload:', payload); // Debug payload
  
    try {
      const response = await axios.post('http://localhost:8000/api/timetables/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response.data); // Debug response
      setSuccess('Semester timetable created successfully');
      setError('');
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error('Error details:', err.response?.data); // Log detailed error
      setError(err.response?.data?.detail || 'Failed to create timetable');
      setSuccess('');
    }
  };


  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Add Semester Timetable</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Section:</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.name} - {sec.program} - Semester {sec.year}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Semester Start:</label>
            <input
              type="date"
              value={semesterStart}
              onChange={(e) => setSemesterStart(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Semester End:</label>
            <input
              type="date"
              value={semesterEnd}
              onChange={(e) => setSemesterEnd(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {section && (
          <div>
            {days.map((day) => (
              <div key={day} className="mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  {day} (First: {firstDates[day] || 'N/A'})
                </h4>
                {dailySchedules[day].map((sched, index) => (
                  <div key={index} className="flex space-x-2 mb-2 items-center">
                    <select
                      value={sched.subject}
                      onChange={(e) => updateSchedule(day, index, 'subject', e.target.value)}
                      className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={sched.start_time}
                      onChange={(e) => updateSchedule(day, index, 'start_time', e.target.value)}
                      className="w-1/4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="08:30:00">08:30 AM</option>
                      <option value="09:30:00">09:30 AM</option>
                      <option value="10:30:00">10:30 AM</option>
                      <option value="12:00:00">12:00 PM</option>
                      <option value="13:00:00">01:00 PM</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeSchedule(day, index)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addSchedule(day)}
                  className="bg-gray-500 text-white py-1 px-2 rounded-md hover:bg-gray-600"
                >
                  Add Lecture
                </button>
              </div>
            ))}
          </div>
        )}
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
            Save Semester Timetable
          </button>
        </div>
      </form>
    </div>
  );
}

export default TimetableForm;