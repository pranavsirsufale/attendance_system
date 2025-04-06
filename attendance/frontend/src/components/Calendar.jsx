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
  const [selectedSemester, setSelectedSemester] = useState('');
  const [timetableData, setTimetableData] = useState({
    section: '',
    semester: '',
    daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
    semester_start_date: '',
    semester_end_date: '',
  });

  useEffect(() => {
    fetchSessions();
    fetchTimetables();
    fetchOptions();
  }, [selectedSection]);

  const fetchSessions = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) { setError('Please log in first'); return; }
    try {
      const url = selectedSection ? `http://localhost:8000/api/calendar/?section_id=${selectedSection}` : 'http://localhost:8000/api/calendar/';
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
    if (!token) { setError('Please log in first'); return; }
    try {
      const response = await axios.get('http://localhost:8000/api/timetables/', { headers: { Authorization: `Bearer ${token}` } });
      setTimetables(response.data);
    } catch (err) {
      console.error('Failed to fetch timetables:', err);
      setError('Failed to load timetables');
    }
  };

  const fetchOptions = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) { setError('Please log in first'); return; }
    try {
      const [sectionsRes, timeSlotsRes] = await Promise.all([
        axios.get('http://localhost:8000/api/sections/', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/time-slots/', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      console.log('Sections received:', sectionsRes.data);
      setSections(sectionsRes.data);
      setTimeSlots(timeSlotsRes.data);
      if (timetableData.section && timetableData.semester) {
        fetchSubjects(timetableData.section, timetableData.semester);
      }
    } catch (err) {
      console.error('Failed to fetch options:', err);
      setError('Failed to load options: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const fetchSubjects = async (sectionId, semester , semester_start_date) => {
    const token = localStorage.getItem('access_token');
    semester_start_date = semester_start_date | timetableData.semester_start_date
    try {
      console.log(`Fetching subjects: section_id=${sectionId}, semester=${semester}`);
      const response = await axios.get('http://localhost:8000/api/subjects-for-section/', {
        params: { section_id: sectionId, semester  , semester_start_date : timetableData.semester_start_date},
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      console.log('Subjects received:', data);
      setSubjects(data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch subjects:', err.response?.data || err.message);
      setError('Failed to load subjects: ' + (err.response?.data?.error || 'Unknown error'));
      setSubjects([]);
    }
  };

  const handleSectionSemesterChange = async (e) => {
    const [sectionId, semester] = e.target.value.split('-');
    console.log(`Fetching subjects for sectionId=${sectionId}, semester=${semester}`);
    setTimetableData({ ...timetableData, section: sectionId, semester });
    setSelectedSemester(semester);
    if (sectionId && semester) {
      try {
        const token = localStorage.getItem('access_token');
        const timetableRes = await axios.get(`http://localhost:8000/api/timetables/?section=${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const existingTimetable = timetableRes.data[0];
        setTimetableData(prev => ({
          ...prev,
          section: sectionId,
          semester,
          semester_start_date: existingTimetable?.semester_start_date || '',
          semester_end_date: existingTimetable?.semester_end_date || '',
        }));
        fetchSubjects(sectionId, semester);
      } catch (err) {
        console.error('Failed to fetch timetable for section:', err);
        setTimetableData(prev => ({
          ...prev,
          section: sectionId,
          semester,
          semester_start_date: '', // Default if no timetable exists
          semester_end_date: '',
        }));
        fetchSubjects(sectionId, semester);
      }
    }
  };

  const handleDateChange = (field) => (e) => {
    setTimetableData({ ...timetableData, [field]: e.target.value });
  };

  const handleTimetableSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      const data = {
        section: timetableData.section,
        semester: parseInt(timetableData.semester),
        daily_schedules: timetableData.daily_schedules,
        semester_start_date: timetableData.semester_start_date || '2025-03-01', // Default if not set
        semester_end_date: timetableData.semester_end_date || '2025-08-31',
      };
      if (editTimetableId) {
        await axios.put(`http://localhost:8000/api/timetables/${editTimetableId}/`, {
          section: data.section,
          subject: data.daily_schedules[0].subject,
          day_of_week: data.daily_schedules[0].day_of_week,
          start_time: data.daily_schedules[0].start_time,
          semester_start_date: data.semester_start_date,
          semester_end_date: data.semester_end_date,
        }, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('http://localhost:8000/api/timetables/', data, { headers: { Authorization: `Bearer ${token}` } });
      }
      setShowTimetableForm(false);
      setEditTimetableId(null);
      setTimetableData({
        section: '',
        semester: '',
        daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
        semester_start_date: '',
        semester_end_date: '',
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
      daily_schedules: [...timetableData.daily_schedules, { day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
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
      semester: timetable.semester.toString(),
      daily_schedules: [{
        day_of_week: timetable.day_of_week,
        subject: timetable.subject.id,
        start_time: timetable.start_time,
      }],
      semester_start_date: timetable.semester_start_date,
      semester_end_date: timetable.semester_end_date,
    });
    fetchSubjects(timetable.section.id, timetable.semester , timetable.semester_start_date);
    setShowTimetableForm(true);
  };

  const handleDeleteTimetable = async (timetableId) => {
    const token = localStorage.getItem('access_token');
    if (window.confirm('Are you sure you want to delete this timetable?')) {
      try {
        await axios.delete(`http://localhost:8000/api/timetables/${timetableId}/`, { headers: { Authorization: `Bearer ${token}` } });
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
        <Link to="/attendance-stats" className="text-blue-600 hover:underline">View Attendance Statistics</Link>
        <button
          onClick={() => {
            setEditTimetableId(null);
            setTimetableData({
              section: '',
              semester: '',
              daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
              semester_start_date: '',
              semester_end_date: '',
            });
            setShowTimetableForm(true);
          }}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create Timetable
        </button>
      </div>

      <h3 className="text-xl font-bold mb-2 text-gray-800">Your Timetables</h3>
      {timetables.length > 0 ? (
        <ul className="space-y-4 mb-6">
          {timetables.map((timetable) => (
            <li key={timetable.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p><strong>Section:</strong> {timetable.section.name} (Year: {timetable.section.year}, Semester: {timetable.semester}, Program: {timetable.section.program})</p>
                <p><strong>Period:</strong> {timetable.semester_start_date} to {timetable.semester_end_date}</p>
                <p><strong>Schedule:</strong> {timetable.day_of_week}: {timetable.subject.name} at {timetable.start_time}</p>
              </div>
              <div className="space-x-2">


                <button onClick={() => handleEditTimetable(timetable)} className="bg-yellow-600 text-white py-1 px-2 rounded-md hover:bg-yellow-700">Edit</button>


                <button onClick={() => handleDeleteTimetable(timetable.id)} className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-6">No timetables found.</p>
      )}

      <div className="mb-4">
        <label className="block text-gray-800">Filter Sessions by Section:</label>
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="w-full p-2 border rounded-md bg-white text-gray-800">
          <option value="">All Sections</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>{section.name} (Year: {section.year}, Program: {section.program})</option>
          ))}
        </select>
      </div>

      {showTimetableForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{editTimetableId ? 'Edit Timetable' : 'Create Timetable'}</h3>
            <form onSubmit={handleTimetableSubmit}>
              <div className="mb-4">
                <label className="block text-gray-800">Semester Period:</label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={timetableData.semester_start_date}
                    onChange={handleDateChange('semester_start_date')}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                  <span className="text-gray-800">to</span>
                  <input
                    type="date"
                    value={timetableData.semester_end_date}
                    onChange={handleDateChange('semester_end_date')}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-800">Section and Semester:</label>
                <select
                  value={timetableData.section && timetableData.semester ? `${timetableData.section}-${timetableData.semester}` : ''}
                  onChange={handleSectionSemesterChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-800"
                  required
                >
                  <option value="">Select Section and Semester</option>
                  {sections.flatMap((section) =>
                    section.available_semesters.map((semester) => (
                      <option key={`${section.id}-${semester}`} value={`${section.id}-${semester}`}>
                        {section.name} (Year: {section.year}, Semester: {semester}, Program: {section.program})
                      </option>
                    ))
                  )}
                </select>
              </div>
              {timetableData.daily_schedules.map((schedule, index) => (
                <div key={index} className="mb-4 flex space-x-2">
                  <select
                    value={schedule.day_of_week}
                    onChange={(e) => updateSchedule(index, 'day_of_week', e.target.value)}
                    className="p-2 border rounded-md bg-white text-gray-800"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                      <option key={day} value={day}>{day}</option>
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
                      <option key={subject.id} value={subject.id}>{subject.name} (Semester: {subject.semester})</option>
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
                      <option key={slot} value={slot}>{slot}</option>
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
                      semester: '',
                      daily_schedules: [{ day_of_week: 'Monday', subject: '', start_time: '08:30:00' }],
                      semester_start_date: '',
                      semester_end_date: '',
                    });
                    setError('');
                  }}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  {editTimetableId ? 'Update Timetable' : 'Save Timetable'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {sessions.length > 0 ? (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.id} className="p-4 bg-white rounded-lg shadow-md">
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Day:</strong> {session.timetable.day_of_week}</p>
              <p><strong>Time:</strong> {session.timetable.start_time}</p>
              <p><strong>Subject:</strong> {session.timetable.subject.name}</p>
              <p><strong>Section:</strong> {session.timetable.section.name} (Year: {session.timetable.section.year}, Semester: {session.timetable.semester}, Program: {session.timetable.section.program})</p>
              <p><strong>Period:</strong> {session.timetable.semester_start_date} to {session.timetable.semester_end_date}</p>
              <p><strong>Status:</strong> {session.status}</p>
              {session.status === 'Scheduled' ? (
                <Link to={`/attendance/${session.id}`} className="text-blue-600 hover:underline">Mark Attendance</Link>
              ) : (
                <Link to={`/attendance/${session.id}`} className="text-green-600 hover:underline">Update Attendance</Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No sessions found for this section.</p>
      )}
    </div>
  );
}

export default Calendar;