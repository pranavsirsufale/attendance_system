import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const tok = () => localStorage.getItem('access_token');
const authH = () => ({ Authorization: `Bearer ${tok()}` });

const AVATAR_COLORS = [
  'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
  'bg-teal-500', 'bg-orange-500', 'bg-cyan-500',
];

const avatarColor = (name = '') =>
  AVATAR_COLORS[(name.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];

const initials = (name = '') => {
  const parts = name.trim().split(' ');
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
};

const fmtDate = (d) => {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
};

const pctMeta = (pct) => {
  const n = parseFloat(pct);
  if (n >= 75) return { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', bar: 'bg-green-500' };
  if (n >= 60) return { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300', bar: 'bg-yellow-400' };
  return { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', bar: 'bg-red-500' };
};

const PERIODS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'semester', label: 'Semester' },
  { value: 'custom', label: 'Custom' },
];

function AttendanceStats({ notifyUser }) {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);   // { id, name, semester }
  const [semesters, setSemesters] = useState([]);   // unique semester numbers

  /* ── bootstrap: derive subjects + semesters from teacher timetables ── */
  useEffect(() => {
    if (!tok()) return;
    axios.get('/api/timetables/', { headers: authH() })
      .then(r => {
        const tts = r.data ?? [];
        // unique subjects
        const subMap = new Map();
        tts.forEach(tt => {
          if (tt.subject?.id && !subMap.has(tt.subject.id))
            subMap.set(tt.subject.id, tt.subject);
        });
        setSubjects([...subMap.values()]);
        // unique semesters
        const semSet = new Set(tts.map(tt => tt.subject?.semester).filter(Boolean));
        setSemesters([...semSet].sort((a, b) => a - b));
      })
      .catch(() => { });
  }, []);

  /* ── fetch ─────────────────────────────────────────────── */
  useEffect(() => {
    // for custom period, wait until both dates are selected
    if (period === 'custom' && (!startDate || !endDate)) return;
    fetchStats();
  }, [period, startDate, endDate, subjectId, semester]);

  const fetchStats = async () => {
    if (!tok()) { notifyUser?.('Please log in first', 'warning'); return; }
    setLoading(true);
    try {
      let url = `/api/teacher-attendance-stats/?period=${period}`;
      if (period === 'custom' && startDate && endDate) {
        url += `&start_date=${startDate}&end_date=${endDate}`;
      }
      if (subjectId) url += `&subject_id=${subjectId}`;
      if (semester) url += `&semester=${semester}`;
      const r = await axios.get(url, { headers: authH() });
      setStats(r.data.stats ?? []);
      setDateRange({ start: r.data.start_date, end: r.data.end_date });
      notifyUser?.(
        `${r.data.stats?.length ?? 0} records found (${fmtDate(r.data.start_date)} – ${fmtDate(r.data.end_date)})`,
        'info'
      );
    } catch (e) {
      notifyUser?.(e.response?.data?.error || 'Failed to load attendance stats', 'error');
      setStats([]);
    } finally { setLoading(false); }
  };

  /* ── derived ────────────────────────────────────────────── */
  const filtered = stats.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.roll_number?.toLowerCase().includes(search.toLowerCase())
  );

  const avgPct = filtered.length
    ? (filtered.reduce((sum, s) => sum + parseFloat(s.attendance_percentage ?? 0), 0) / filtered.length).toFixed(1)
    : null;

  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Attendance Statistics
        </h1>
        {dateRange.start && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {fmtDate(dateRange.start)} — {fmtDate(dateRange.end)}
          </p>
        )}
        {/* active filter pills */}
        {(semester || subjectId) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {semester && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                Semester {semester}
                <button onClick={() => setSemester('')} className="hover:text-indigo-900 dark:hover:text-indigo-100">×</button>
              </span>
            )}
            {subjectId && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                {subjects.find(s => String(s.id) === String(subjectId))?.name ?? 'Subject'}
                <button onClick={() => setSubjectId('')} className="hover:text-purple-900 dark:hover:text-purple-100">×</button>
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* ── Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-gray-700 p-5 mb-8 space-y-4"
      >
        {/* Period toggle buttons */}
        <div>
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide mb-2">Period</p>
          <div className="flex flex-wrap gap-2">
            {PERIODS.map(p => (
              <button
                key={p.value}
                onClick={() => { setPeriod(p.value); setStartDate(''); setEndDate(''); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${period === p.value
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-400'
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Semester + Subject selects */}
        {(subjects.length > 0) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {subjects.length > 0 && (
              <div className="flex-1">
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide mb-1">Subject</p>
                <select
                  value={subjectId}
                  onChange={e => setSubjectId(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all"
                >
                  <option value="">All Subjects</option>
                  {(semester
                    ? subjects.filter(s => String(s.semester) === semester)
                    : subjects
                  ).map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Sem {s.semester})</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Custom date pickers */}
        <AnimatePresence>
          {period === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>
              </div>
              {period === 'custom' && (!startDate || !endDate) && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Select both dates to load stats.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Loading ── */}
      {loading ? (
        <div className="flex justify-center py-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full"
          />
        </div>
      ) : stats.length === 0 ? (
        <div className="text-center py-24 text-gray-400 dark:text-gray-500">
          <svg className="w-14 h-14 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm">No stats available for this period</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          {/* ── Summary cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Students', value: filtered.length, color: 'text-indigo-600 dark:text-indigo-400' },
              { label: 'Avg Attendance', value: avgPct ? `${avgPct}%` : '—', color: 'text-purple-600 dark:text-purple-400' },
              { label: '≥ 75%', value: filtered.filter(s => parseFloat(s.attendance_percentage) >= 75).length, color: 'text-green-600 dark:text-green-400' },
              { label: '< 75%', value: filtered.filter(s => parseFloat(s.attendance_percentage) < 75).length, color: 'text-red-600 dark:text-red-400' },
            ].map(card => (
              <div key={card.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-indigo-100 dark:border-gray-700 text-center">
                <p className={`text-2xl font-extrabold ${card.color}`}>{card.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{card.label}</p>
              </div>
            ))}
          </div>

          {/* ── Search ── */}
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or roll number…"
              className="w-full pl-10 pr-4 py-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          {/* ── Table ── */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm">
                  <th className="p-4 text-left font-semibold">Student</th>
                  <th className="p-4 text-left font-semibold">Roll No.</th>
                  <th className="p-4 text-left font-semibold">Sessions</th>
                  <th className="p-4 text-left font-semibold">Present</th>
                  <th className="p-4 text-left font-semibold">Absent</th>
                  <th className="p-4 text-left font-semibold">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((stat, i) => {
                  const meta = pctMeta(stat.attendance_percentage);
                  const pct = parseFloat(stat.attendance_percentage ?? 0);
                  return (
                    <motion.tr
                      key={stat.student_id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t border-indigo-50 dark:border-gray-700 hover:bg-indigo-50/50 dark:hover:bg-gray-700/40 transition-colors"
                    >
                      {/* avatar + name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColor(stat.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm uppercase`}>
                            {initials(stat.name)}
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{stat.name}</span>
                        </div>
                      </td>
                      {/* roll number */}
                      <td className="p-4">
                        <span className="font-mono text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md">
                          {stat.roll_number}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{stat.total_sessions}</td>
                      <td className="p-4 text-sm font-medium text-green-700 dark:text-green-400">{stat.present}</td>
                      <td className="p-4 text-sm font-medium text-red-600 dark:text-red-400">{stat.absent}</td>
                      {/* attendance % with bar */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden min-w-[60px]">
                            <div
                              className={`h-full rounded-full ${meta.bar} transition-all`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${meta.color} whitespace-nowrap`}>
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </motion.div>
      )}

    </div>
  );
}

export default AttendanceStats;
