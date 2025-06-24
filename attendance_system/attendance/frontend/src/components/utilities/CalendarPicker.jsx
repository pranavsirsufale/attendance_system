import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarPicker = () => {
  const [events, setEvents] = useState([]); // Events for current month
  const [selectedDate, setSelectedDate] = useState(null); // Clicked date
  const [dateSessions, setDateSessions] = useState([]); // Sessions for selected date
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message
  const navigate = useNavigate();

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      navigate('/login'); // Adjust to your login route
    }
  }, [navigate]);

  // Fetch sessions for the current month
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
      const month = start.toISOString().slice(0, 7); // YYYY-MM
      const response = await fetch(`http://localhost:8000/api/scheduled-dates/?month=${month}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const text = await response.text();
      console.log('Raw month sessions response:', text);
      const data = JSON.parse(text);
      console.log('Month sessions response:', data);
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
  }, [navigate]);

  // Fetch sessions for a specific date
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
      const response = await fetch(`http://localhost:8000/api/sessions-by-date/?date=${dateStr}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const text = await response.text();
      console.log('Raw date sessions response:', text);
      const data = JSON.parse(text);
      console.log('Date sessions response:', data);
      const formattedSessions = (data || []).map((session) => ({
        id: session.id,
        title: session.timetable?.subject?.name || 'Untitled Session',
        time: session.timetable?.start_time || 'Unknown Time',
        day: session.timetable?.day_of_week || 'Unknown Day',
        section: session.timetable?.section?.name || 'Unknown Section',
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

  // Handle date click
  const handleDateClick = (info) => {
    const dateStr = info.dateStr;
    console.log('Date clicked:', dateStr);
    setSelectedDate(dateStr);
    fetchDateSessions(dateStr);
  };

  // Handle month change
  const handleDatesSet = (info) => {
    const { start, end } = info;
    fetchMonthSessions(start, end);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-6 text-indigo-800"
      >
        Session Calendar
      </motion.h2>

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
                  className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100"
                >
                  <h4 className="text-xl font-semibold text-indigo-600 mb-3">{session.title}</h4>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium text-indigo-700">Time:</span> {session.time}</p>
                    <p><span className="font-medium text-indigo-700">Day:</span> {session.day}</p>
                    <p><span className="font-medium text-indigo-700">Section:</span> {session.section}</p>
                    <p>
                      <span className="font-medium text-indigo-700">Status:</span>{' '}
                      <span className={session.status === 'Scheduled' ? 'text-yellow-600' : 'text-green-600'}>
                        {session.status}
                      </span>
                    </p>
                  </div>
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
    </motion.div>
  );
};

export default CalendarPicker;