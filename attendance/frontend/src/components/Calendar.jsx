import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Calendar() {
  const [sessions, setSessions] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState('');
  const [showTimetableForm, setShowTimetableForm] = useState(false);
  const [editTimetableId, setEditTimetableId] = useState(null);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [timetableData, setTimetableData] = useState({
    section: '',
    daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
    semester_start_date: '2025-01-01',
    semester_end_date: '2025-06-30',
  });

  useEffect(() => {
    fetchSessions();
    fetchTimetables();
    fetchOptions();
  }, [selectedSection]);

  const fetchSessions = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      return;
    }
    try {
      const url = selectedSection
        ? `http://localhost:8000/api/calendar/?section_id=${selectedSection}`
        : 'http://localhost:8000/api/calendar/';
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setSessions(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
      setError('Failed to load sessions');
    }
  };

  const fetchTimetables = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8000/api/timetables/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimetables(response.data);
    } catch (err) {
      console.error('Failed to fetch timetables:', err);
      setError('Failed to load timetables');
    }
  };

  const fetchOptions = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      return;
    }
    try {
      const [sectionsRes, timeSlotsRes] = await Promise.all([
        axios.get('http://localhost:8000/api/sections/', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/time-slots/', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setSections(sectionsRes.data);
      setTimeSlots(timeSlotsRes.data);
      if (timetableData.section && timetableData.semester_start_date) {
        fetchSubjects(timetableData.section, timetableData.semester_start_date);
      }
      setError('');
    } catch (err) {
      console.error('Failed to fetch options:', err);
      setError('Failed to load timetable options: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const fetchSubjects = async (sectionId, semesterStartDate) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get('http://localhost:8000/api/subjects-for-section/', {
        params: { section_id: sectionId, semester_start_date: semesterStartDate },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
      setError('Failed to load subjects: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const handleSectionChange = (e) => {
    const sectionId = e.target.value;
    setTimetableData({ ...timetableData, section: sectionId });
    if (sectionId && timetableData.semester_start_date) {
      fetchSubjects(sectionId, timetableData.semester_start_date);
    }
  };

  const handleSemesterStartChange = (e) => {
    const startDate = e.target.value;
    setTimetableData({ ...timetableData, semester_start_date: startDate });
    if (timetableData.section && startDate) {
      fetchSubjects(timetableData.section, startDate);
    }
  };

  const getSemesterNumber = (startDate) => {
    const date = new Date(startDate);
    const month = date.getMonth(); // 0-11
    return month <= 5 ? '1 ': '2 '; // 1st semester: Jan-Jun, 2nd semester: Jul-Dec
  };

  const handleTimetableSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      if (editTimetableId) {
        await axios.put(`http://localhost:8000/api/timetables/${editTimetableId}/`, {
          section: timetableData.section,
          subject: timetableData.daily_schedules[0].subject,
          day_of_week: timetableData.daily_schedules[0].day_of_week,
          start_time: timetableData.daily_schedules[0].start_time,
          semester_start_date: timetableData.semester_start_date,
          semester_end_date: timetableData.semester_end_date,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:8000/api/timetables/', timetableData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowTimetableForm(false);
      setEditTimetableId(null);
      setTimetableData({
        section: '',
        daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
        semester_start_date: '2025-01-01',
        semester_end_date: '2025-06-30',
      });
      setSubjects([]);
      fetchSessions();
      fetchTimetables();
      setError('');
    } catch (err) {
      console.error('Failed to save timetable:', err);
      setError(err.response?.data?.detail || 'Failed to save timetable');
    }
  };

  const addSchedule = () => {
    setTimetableData({
      ...timetableData,
      daily_schedules: [
        ...timetableData.daily_schedules,
        { day_of_week: 'Monday', subject: '', start_time: '08:30:00' },
      ],
    });
  };

  const updateSchedule = (index, field, value) => {
    const newSchedules = [...timetableData.daily_schedules];
    newSchedules[index][field] = value;
    setTimetableData({ ...timetableData, daily_schedules: newSchedules });
  };

  const handleEditTimetable = (timetable) => {
    setEditTimetableId(timetable.id);
    setTimetableData({
      section: timetable.section.id,
      daily_schedules: [{
        day_of_week: timetable.day_of_week,
        subject: timetable.subject.id,
        start_time: timetable.start_time,
      }],
      semester_start_date: timetable.semester_start_date,
      semester_end_date: timetable.semester_end_date,
    });
    fetchSubjects(timetable.section.id, timetable.semester_start_date);
    setShowTimetableForm(true);
  };

  const handleDeleteTimetable = async (timetableId) => {
    const token = localStorage.getItem('access_token');
    if (window.confirm('Are you sure you want to delete this timetable?')) {
      try {
        await axios.delete(`http://localhost:8000/api/timetables/${timetableId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTimetables();
        fetchSessions();
        setError('');
      } catch (err) {
        console.error('Failed to delete timetable:', err);
        setError('Failed to delete timetable');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Teacher Calendar</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4 flex space-x-4">
        <Link to="/attendance-stats" className="text-blue-600 hover:underline">
          View Attendance Statistics
        </Link>
        <button
          onClick={() => {
            setEditTimetableId(null);
            setTimetableData({
              section: '',
              daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
              semester_start_date: '2025-01-01',
              semester_end_date: '2025-06-30',
            });
            setShowTimetableForm(true);
          }}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Timetable
        </button>
      </div>

      {/* Timetable List */}
      <h3 className="text-xl font-bold mb-2 text-gray-800">Your Timetables</h3>
      {timetables.length > 0 ? (
        <table className="table-auto w-full mb-6 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-gray-800">Section</th>
              <th className="px-4 py-2 text-left text-gray-800">Semester</th>
              <th className="px-4 py-2 text-left text-gray-800">Schedule</th>
              <th className="px-4 py-2 text-left text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((timetable) => (
              <tr key={timetable.id} className="border-t">
                <td className="px-4 py-2 text-gray-800">
                  {timetable.section.name} (Year: {timetable.section.year})
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {timetable.semester_start_date} to {timetable.semester_end_date} (Semester {getSemesterNumber(timetable.semester_start_date)})
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {timetable.day_of_week}: {timetable.subject.name} at {timetable.start_time}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditTimetable(timetable)}
                    className="bg-yellow-600 text-white py-1 px-2 rounded-md hover:bg-yellow-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTimetable(timetable.id)}
                    className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 mb-6">No timetables found.</p>
      )}

      {/* Section Selector */}
      <div className="mb-4">
        <label className="block text-gray-800">Filter Sessions by Section:</label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full p-2 border rounded-md bg-white text-gray-800"
        >
          <option value="">All Sections</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name} (Year: {section.year})
            </option>
          ))}
        </select>
      </div>

      {showTimetableForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {editTimetableId ? 'Edit Timetable' : 'Create Timetable'}
            </h3>
            <form onSubmit={handleTimetableSubmit}>
              <div className="mb-4">
                <label className="block text-gray-800">Section:</label>
                <select
                  value={timetableData.section}
                  onChange={handleSectionChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-800"
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name} (Year: {section.year})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-800">Semester Period:</label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={timetableData.semester_start_date}
                    onChange={handleSemesterStartChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                  <span className="text-gray-800">to</span>
                  <input
                    type="date"
                    value={timetableData.semester_end_date}
                    onChange={(e) => setTimetableData({ ...timetableData, semester_end_date: e.target.value })}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Semester: {getSemesterNumber(timetableData.semester_start_date)} ({timetableData.semester_start_date} to {timetableData.semester_end_date})
                </p>
              </div>
              {timetableData.daily_schedules.map((schedule, index) => (
                <div key={index} className="mb-4 flex space-x-2">
                  <select
                    value={schedule.day_of_week}
                    onChange={(e) => updateSchedule(index, 'day_of_week', e.target.value)}
                    className="p-2 border rounded-md bg-white text-gray-800"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    value={schedule.subject}
                    onChange={(e) => updateSchedule(index, 'subject', e.target.value)}
                    className="p-2 border rounded-md bg-white text-gray-800"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={schedule.start_time}
                    onChange={(e) => updateSchedule(index, 'start_time', e.target.value)}
                    className="p-2 border rounded-md bg-white text-gray-800"
                    required
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                type="button"
                onClick={addSchedule}
                className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 mb-4"
              >
                Add Another Schedule
              </button>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowTimetableForm(false);
                    setEditTimetableId(null);
                    setTimetableData({
                      section: '',
                      daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
                      semester_start_date: '2025-01-01',
                      semester_end_date: '2025-06-30',
                    });
                    setError('');
                  }}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  {editTimetableId ? 'Update Timetable' : 'Save Timetable'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {sessions.length > 0 ? (
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-gray-800">Date</th>
              <th className="px-4 py-2 text-left text-gray-800">Day</th>
              <th className="px-4 py-2 text-left text-gray-800">Time</th>
              <th className="px-4 py-2 text-left text-gray-800">Subject</th>
              <th className="px-4 py-2 text-left text-gray-800">Section</th>
              <th className="px-4 py-2 text-left text-gray-800">Semester</th>
              <th className="px-4 py-2 text-left text-gray-800">Status</th>
              <th className="px-4 py-2 text-left text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-t">
                <td className="px-4 py-2 text-gray-800">{session.date}</td>
                <td className="px-4 py-2 text-gray-800">{session.timetable.day_of_week}</td>
                <td className="px-4 py-2 text-gray-800">{session.timetable.start_time}</td>
                <td className="px-4 py-2 text-gray-800">{session.timetable.subject.name}</td>
                <td className="px-4 py-2 text-gray-800">
                  {session.timetable.section.name} (Year: {session.timetable.section.year})
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {session.timetable.semester_start_date} to {session.timetable.semester_end_date} (Semester {getSemesterNumber(session.timetable.semester_start_date)})
                </td>
                <td className="px-4 py-2 text-gray-800">{session.status}</td>
                <td className="px-4 py-2">
                  {session.status === 'Scheduled' ? (
                    <Link to={`/attendance/${session.id}`} className="text-blue-600 hover:underline">
                      Mark Attendance
                    </Link>
                  ) : (
                    <Link to={`/attendance/${session.id}`} className="text-green-600 hover:underline">
                      Update Attendance
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No sessions found for this section.</p>
      )}
    </div>
  );
}

export default Calendar;