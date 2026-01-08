import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const CalendarPicker = ({isAdmin,notifyUser}) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateSessions, setDateSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [queryTeacher, setQueryTeacher] = useState(null);
  const [querySubject, setQuerySubject] = useState(null);
  const navigate = useNavigate();

  // Read query params for teacher/subject filtering (admin student-attendance flow)
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    const teacher = qp.get('teacher');
    const subject_name = qp.get('subject_name');
    if (teacher) setQueryTeacher(teacher);
    if (subject_name) setQuerySubject(subject_name);
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      navigate('/login');
      return;
    }
    fetchSections(token);
  }, [navigate]);


  const fetchSections = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/sections/', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setSections(data);
    } catch (err) {
      console.error('Error fetching sections:', err);
      setError('Failed to load sections');
    }
  };

  const fetchMonthSessions = useCallback(async (start, end) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const month = start.toISOString().slice(0, 7);
      let url = `http://localhost:8000/api/scheduled-dates/?month=${month}`;
      if (selectedSection) url += `&section_id=${selectedSection}`;
      if (queryTeacher) url += `&teacher=${queryTeacher}`;
      if (querySubject) url += `&subject_name=${encodeURIComponent(querySubject)}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const formattedEvents = (data.dates || []).map((date) => ({
        title: 'Scheduled Session',
        date,
      }));
      setEvents(formattedEvents);
    } catch (err) {
      console.error('Error fetching month sessions:', err);
      setError('Failed to load sessions for this month. Showing sample data.');
      setEvents([
        { title: 'Sample Session', date: '2025-06-24' },
        { title: 'Sample Session', date: '2025-06-25' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [navigate, selectedSection]);

  const fetchDateSessions = async (dateStr) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      let url = `http://localhost:8000/api/sessions-by-date/?date=${dateStr}`;
      if (selectedSection) url += `&section_id=${selectedSection}`;
      if (queryTeacher) url += `&teacher=${queryTeacher}`;
      if (querySubject) url += `&subject_name=${encodeURIComponent(querySubject)}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const formattedSessions = (data || []).map((session) => ({
        id: session.id,
        title: session.timetable?.subject?.name || 'Untitled Session',
        date: session.date,
        day: session.timetable?.day_of_week || 'Unknown Day',
        time: session.timetable?.start_time || 'Unknown Time',
        section: session.timetable?.section?.name || 'Unknown Section',
        year: session.timetable?.section?.year || 'Unknown',
        semester: session.timetable?.semester || 'Unknown',
        program: session.timetable?.section?.program || 'Unknown',
        periodStart: session.timetable?.semester_start_date || 'Unknown',
        periodEnd: session.timetable?.semester_end_date || 'Unknown',
        status: session.status || 'Unknown',
      }));
      setDateSessions(formattedSessions);
    } catch (err) {
      console.error('Error fetching date sessions:', err);
      setError('Failed to load sessions for this date.');
      setDateSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (info) => {
    const dateStr = info.dateStr;
    setSelectedDate(dateStr);
    fetchDateSessions(dateStr);
  };

  const handleDatesSet = (info) => {
    const { start, end } = info;
    fetchMonthSessions(start, end);
  };

  const viewAllSessions = () => {
    navigate('/all-sessions');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-6 text-indigo-800"
      >
        Session Calendar
      </motion.h2>
      <div>

        <Button onClick={viewAllSessions}>View All Sessions</Button>

        { isAdmin && <Button onClick={()=>navigate('/admin')} > Admin DashBoard </Button>}
      </div>

</motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-red-500 bg-red-100 p-3 rounded-lg mb-4 shadow-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <label className="block text-lg font-medium text-indigo-800 mb-2">Filter Sessions by Section:</label>
        <motion.select
          whileHover={{ scale: 1.02 }}
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full p-3 border border-indigo-200 rounded-xl bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
        >
          <option value="">All Sections</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name} (Year: {section.year}, Program: {section.program})
            </option>
          ))}
        </motion.select>
      </motion.div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-indigo-600 mb-4"
        >
          Loading sessions...
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-lg rounded-lg p-6 mb-6"
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          eventColor="#4f46e5"
          datesSet={handleDatesSet}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          }}
          editable={true}
          selectable={true}
          height="auto"
        />
      </motion.div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-indigo-800">
            Sessions on {selectedDate}
          </h3>
          {dateSessions.length > 0 ? (
            <motion.ul
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {dateSessions.map((session) => (
                <motion.li
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-indigo-200 via-indigo-100 to-white rounded-3xl shadow-2xl hover:shadow-indigo-300 transition-all duration-300 p-6 border border-indigo-300/50"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-indigo-700 drop-shadow-sm">{session.title}</h3>
                    <p className="text-sm text-indigo-500">{session.section} • Year {session.year} • Semester {session.semester}</p>
                  </div>
                  <div className="space-y-2 text-indigo-700 text-sm">
                    <p><span className="font-semibold">📅 Date:</span> {session.date}</p>
                    <p><span className="font-semibold">📆 Day:</span> {session.day}</p>
                    <p><span className="font-semibold">⏰ Time:</span> {session.time}</p>
                    <p><span className="font-semibold">🎓 Program:</span> {session.program}</p>
                    <p><span className="font-semibold">🗓️ Period:</span> {session.periodStart} → {session.periodEnd}</p>
                    <p>
                      <span className="font-semibold">📌 Status:</span>
                      <span className={`ml-1 font-bold ${session.status === 'Scheduled' ? 'text-yellow-600' : 'text-green-600'}`}>
                        {session.status}
                      </span>
                    </p>
                  </div>
                  <motion.div
                    className="mt-5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/attendance/${session.id}`}
                      className={`inline-block w-full text-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                        session.status === 'Scheduled'
                          ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {session.status === 'Scheduled' ? '📋 Mark Attendance' : '✏️ Update Attendance'}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 italic"
            >
              No sessions scheduled for this date.
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CalendarPicker;