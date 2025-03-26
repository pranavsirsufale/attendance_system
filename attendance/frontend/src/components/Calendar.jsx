/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/calendar/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sessionEvents = response.data.map((session) => ({
          title: `${session.timetable.subject.name} (${session.status})`,
          start: `${session.date}T${session.timetable.start_time}`,
          end: `${session.date}T${new Date(`1970-01-01T${session.timetable.start_time}`).getTime() + 60*60*1000}`.slice(0, -1), // Add 1 hour
          extendedProps: {
            sessionId: session.id,
            status: session.status,
          },
        }));
        setEvents(sessionEvents);
      } catch (err) {
        setError('Failed to fetch sessions. Please try again.');
        console.error(err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '50px auto' }}>
      <h2>Your Teaching Schedule</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        slotMinTime="08:00:00"
        slotMaxTime="14:00:00"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventClick={(info) => {
          alert(`Session ID: ${info.event.extendedProps.sessionId}\nSubject: ${info.event.title}\nStatus: ${info.event.extendedProps.status}`);
        }}
      />
    </div>
  );
}

export default Calendar;
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import AttendanceForm from './AttendanceForm';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/calendar/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sessionEvents = response.data.map((session) => ({
          title: `${session.timetable.subject.name} (${session.status})`,
          start: `${session.date}T${session.timetable.start_time}`,
          end: `${session.date}T${new Date(`1970-01-01T${session.timetable.start_time}`).getTime() + 60*60*1000}`.slice(0, -1),
          extendedProps: {
            sessionId: session.id,
            status: session.status,
          },
        }));
        setEvents(sessionEvents);
      } catch (err) {
        setError('Failed to fetch sessions');
        console.error(err);
      }
    };

    fetchSessions();
  }, []);

  const handleEventClick = (info) => {
    if (info.event.extendedProps.status !== 'Scheduled') {
      alert('Attendance can only be marked for Scheduled sessions.');
      return;
    }
    setSelectedSession({
      id: info.event.extendedProps.sessionId,
      title: info.event.title,
    });
  };

  const closeAttendanceForm = () => {
    setSelectedSession(null);
    // Refresh calendar after marking attendance
    const token = localStorage.getItem('access_token');
    axios.get('http://localhost:8000/api/calendar/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      const updatedEvents = response.data.map((session) => ({
        title: `${session.timetable.subject.name} (${session.status})`,
        start: `${session.date}T${session.timetable.start_time}`,
        end: `${session.date}T${new Date(`1970-01-01T${session.timetable.start_time}`).getTime() + 60*60*1000}`.slice(0, -1),
        extendedProps: {
          sessionId: session.id,
          status: session.status,
        },
      }));
      setEvents(updatedEvents);
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '50px auto' }}>
      <h2>Your Teaching Schedule</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        slotMinTime="08:00:00"
        slotMaxTime="14:00:00"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventClick={handleEventClick}
      />
      {selectedSession && (
        <AttendanceForm session={selectedSession} onClose={closeAttendanceForm} />
      )}
    </div>
  );
}

export default Calendar;