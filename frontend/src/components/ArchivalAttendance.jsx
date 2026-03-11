import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API = 'http://localhost:8000/api';
const tok = () => localStorage.getItem('access_token');
const authHead = () => ({ Authorization: `Bearer ${tok()}` });

// ── tiny reusable stat card ──────────────────────────────────────────────────
function StatCard({ label, value, color, icon }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow p-5 border-l-4 ${color} flex items-center gap-4`}>
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      </div>
    </motion.div>
  );
}

// ── tab button ───────────────────────────────────────────────────────────────
function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`flex-1 py-3.5 px-6 font-semibold text-sm transition-all rounded-t-lg
        ${active
          ? 'bg-indigo-600 text-white shadow-inner'
          : 'text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700'
        }`}>
      {children}
    </button>
  );
}

// ── select / input classes ───────────────────────────────────────────────────
const sel = "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-40 disabled:cursor-not-allowed";
const inp = "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";

function ArchivalAttendance({ notifyUser }) {
  const [activeTab, setActiveTab] = useState('create');
  const [loading, setLoading] = useState(false);

  // shared
  const [programs, setPrograms] = useState([]);
  const [archiveStats, setArchiveStats] = useState(null);

  // ── Create tab ──────────────────────────────────────────────────────────────
  const [createProgram, setCreateProgram] = useState('');
  const [createSemester, setCreateSemester] = useState('');
  const [createSemesters, setCreateSemesters] = useState([]);

  // ── View tab ────────────────────────────────────────────────────────────────
  const [viewProgram, setViewProgram] = useState('');
  const [viewSemester, setViewSemester] = useState('');
  const [viewSemesters, setViewSemesters] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [viewStartDate, setViewStartDate] = useState('');
  const [viewEndDate, setViewEndDate] = useState('');
  const [semesterData, setSemesterData] = useState({});   // { subjectName: { totalPresent, totalAbsent, totalRecords, records[] } }
  const [openSubject, setOpenSubject] = useState(null);
  const [subjectStudents, setSubjectStudents] = useState({});   // { subjectName: [ student… ] }
  const [studentDetail, setStudentDetail] = useState(null);
  const [studentDetailOpen, setStudentDetailOpen] = useState(false);

  // ── init ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    axios.get(`${API}/programs/`, { headers: authHead() })
      .then(r => setPrograms(r.data))
      .catch(() => notifyUser('Failed to load programs', 'error'));
    fetchStats();
  }, []);

  const fetchStats = () => {
    axios.get(`${API}/admin/archival-attendance/stats/`, { headers: authHead() })
      .then(r => setArchiveStats(r.data))
      .catch(console.error);
  };

  const semestersForProgram = (programId, programs) => {
    const prog = programs.find(p => p.id === parseInt(programId));
    if (!prog) return [];
    return Array.from({ length: prog.duration_years * 2 }, (_, i) => i + 1);
  };

  // ── CREATE ──────────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!createProgram) { notifyUser('Please select a program', 'warning'); return; }
    if (!createSemester) { notifyUser('Please select a semester', 'warning'); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/archival-attendance/`,
        { filters: { program_id: createProgram, semester: createSemester } },
        { headers: authHead() }
      );
      notifyUser(`✅ Archived ${res.data.count} records`, 'success');
      setCreateProgram('');
      setCreateSemester('');
      setCreateSemesters([]);
      fetchStats();
    } catch (err) {
      notifyUser(err.response?.data?.error || 'Failed to create archive', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── VIEW ────────────────────────────────────────────────────────────────────
  const handleView = async () => {
    if (!viewSemester) { notifyUser('Please select a semester', 'warning'); return; }
    setLoading(true);
    setSemesterData({});
    setOpenSubject(null);
    setSubjectStudents({});
    try {
      const params = new URLSearchParams({ page_size: 10000, semester: viewSemester });
      if (viewProgram) {
        const prog = programs.find(p => p.id === parseInt(viewProgram));
        if (prog) params.append('section_name', prog.name);
      }
      if (viewStartDate) params.append('start_date', viewStartDate);
      if (viewEndDate) params.append('end_date', viewEndDate);

      const res = await axios.get(`${API}/admin/archival-attendance/?${params}`, { headers: authHead() });

      const grouped = {};
      res.data.results.forEach(rec => {
        if (!grouped[rec.subject_name]) {
          grouped[rec.subject_name] = { totalPresent: 0, totalAbsent: 0, totalRecords: 0 };
        }
        grouped[rec.subject_name].totalRecords++;
        if (rec.status) grouped[rec.subject_name].totalPresent++;
        else grouped[rec.subject_name].totalAbsent++;
      });
      setSemesterData(grouped);
      if (Object.keys(grouped).length === 0) notifyUser('No archived records found', 'info');
    } catch {
      notifyUser('Failed to fetch archives', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectToggle = async (subjectName) => {
    if (openSubject === subjectName) { setOpenSubject(null); return; }
    if (subjectStudents[subjectName]) { setOpenSubject(subjectName); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams({ semester: viewSemester, subject_name: subjectName });
      if (viewProgram) {
        const prog = programs.find(p => p.id === parseInt(viewProgram));
        if (prog) params.append('section_name', prog.name);
      }
      const res = await axios.get(`${API}/admin/archival-attendance/subject-students/?${params}`, { headers: authHead() });
      setSubjectStudents(prev => ({ ...prev, [subjectName]: res.data.students }));
      setOpenSubject(subjectName);
    } catch {
      notifyUser('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentDetail = async (subjectName, roll) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ semester: viewSemester, subject_name: subjectName, student_roll_number: roll });
      const res = await axios.get(`${API}/admin/archival-attendance/student-detail/?${params}`, { headers: authHead() });
      setStudentDetail(res.data);
      setStudentDetailOpen(true);
    } catch {
      notifyUser('Failed to load student detail', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (format) => {
    if (!viewSemester) { notifyUser('Please select a semester first', 'warning'); return; }
    const params = new URLSearchParams({ format, semester: viewSemester });
    if (viewProgram) params.append('program_id', viewProgram);
    if (viewStartDate) params.append('start_date', viewStartDate);
    if (viewEndDate) params.append('end_date', viewEndDate);
    window.open(`${API}/admin/archival-attendance/export/?${params}`, '_blank');
    notifyUser(`Downloading ${format.toUpperCase()}…`, 'success');
  };

  const handleDelete = async () => {
    if (!viewSemester) { notifyUser('Please select a semester first', 'warning'); return; }
    if (!window.confirm(`Delete all archived attendance for Semester ${viewSemester}? This cannot be undone.`)) return;
    try {
      const params = new URLSearchParams({ semester: viewSemester });
      if (viewProgram) params.append('program_id', viewProgram);
      if (viewStartDate) params.append('start_date', viewStartDate);
      if (viewEndDate) params.append('end_date', viewEndDate);
      const res = await axios.delete(`${API}/admin/archival-attendance/delete/?${params}`, { headers: authHead() });
      notifyUser(`✅ ${res.data.message}`, 'success');
      setSemesterData({});
      fetchStats();
    } catch (err) {
      notifyUser(err.response?.data?.error || 'Delete failed', 'error');
    }
  };

  // ── derived summary stats ────────────────────────────────────────────────────
  const totalSubjects = Object.keys(semesterData).length;
  const totalPresent = Object.values(semesterData).reduce((s, d) => s + d.totalPresent, 0);
  const totalRecords = Object.values(semesterData).reduce((s, d) => s + d.totalRecords, 0);
  const overallPct = totalRecords ? ((totalPresent / totalRecords) * 100).toFixed(1) : '—';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 p-6">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto">

        {/* ── Page header ── */}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6">
          Archival Attendance Management
        </h1>

        {/* ── Stats cards ── */}
        {archiveStats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard label="Total Archived Records" value={archiveStats.total_archived_records?.toLocaleString() ?? 0} color="border-indigo-500" icon="🗂️" />
            <StatCard label="Semesters Covered" value={archiveStats.semester_statistics?.length ?? 0} color="border-purple-500" icon="📅" />
            <StatCard label="Recent Snapshots" value={archiveStats.recent_archives?.length ?? 0} color="border-blue-500" icon="📸" />
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-0">
          <Tab active={activeTab === 'create'} onClick={() => setActiveTab('create')}>
            📦 Create Archive
          </Tab>
          <Tab active={activeTab === 'view'} onClick={() => setActiveTab('view')}>
            🔍 Semester View
          </Tab>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-b-xl rounded-tr-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
          <AnimatePresence mode="wait">

            {/* ════════════════ CREATE TAB ════════════════ */}
            {activeTab === 'create' && (
              <motion.div key="create"
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Create Archival Snapshot</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Copies current semester attendance into long-term archive storage. Original records are not deleted.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  {/* Program */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Program <span className="text-red-500">*</span>
                    </label>
                    <select value={createProgram} className={sel}
                      onChange={e => {
                        setCreateProgram(e.target.value);
                        setCreateSemester('');
                        setCreateSemesters(e.target.value ? semestersForProgram(e.target.value, programs) : []);
                      }}>
                      <option value="">— Select Program —</option>
                      {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Semester <span className="text-red-500">*</span>
                    </label>
                    <select value={createSemester} disabled={!createProgram} className={sel}
                      onChange={e => setCreateSemester(e.target.value)}>
                      <option value="">{createProgram ? '— Select Semester —' : '— Select Program First —'}</option>
                      {createSemesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Preview banner */}
                <AnimatePresence>
                  {createProgram && createSemester && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700">
                      <p className="text-indigo-800 dark:text-indigo-200 font-medium">
                        📚 Will archive all attendance for{' '}
                        <strong>{programs.find(p => p.id === parseInt(createProgram))?.name}</strong>{' '}
                        — <strong>Semester {createSemester}</strong>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  onClick={handleCreate} disabled={loading || !createProgram || !createSemester}
                  className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Archive…
                    </span>
                  ) : 'Create Archival Snapshot'}
                </motion.button>
              </motion.div>
            )}

            {/* ════════════════ VIEW TAB ════════════════ */}
            {activeTab === 'view' && (
              <motion.div key="view"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Semester-Wise Archival View</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                  Browse, export or delete archived attendance by semester.
                </p>

                {/* ── Filters ── */}
                <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-5 border border-gray-200 dark:border-gray-600 mb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Program</label>
                      <select value={viewProgram} className={sel}
                        onChange={e => {
                          setViewProgram(e.target.value);
                          setViewSemester('');
                          setViewSemesters(e.target.value ? semestersForProgram(e.target.value, programs) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                        }}>
                        <option value="">All Programs</option>
                        {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                        Semester <span className="text-red-500">*</span>
                      </label>
                      <select value={viewSemester} className={sel}
                        onChange={e => { setViewSemester(e.target.value); setSemesterData({}); setOpenSubject(null); }}>
                        <option value="">— Select Semester —</option>
                        {viewSemesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">Start Date</label>
                      <input type="date" value={viewStartDate} onChange={e => setViewStartDate(e.target.value)} className={inp} />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5">End Date</label>
                      <input type="date" value={viewEndDate} onChange={e => setViewEndDate(e.target.value)} className={inp} />
                    </div>
                  </div>

                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    onClick={handleView} disabled={loading || !viewSemester}
                    className="w-full py-2.5 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Loading…
                      </span>
                    ) : '🔍 View Archives'}
                  </motion.button>
                </div>

                {/* ── Action bar (export/delete) ── */}
                <AnimatePresence>
                  {Object.keys(semesterData).length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600 mb-5">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white text-sm">Semester {viewSemester} — {totalSubjects} subjects</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{totalRecords.toLocaleString()} records · Overall {overallPct}% attendance</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleDownload('xlsx')}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold shadow transition-colors flex items-center gap-1.5">
                          📊 XLSX
                        </button>
                        <button onClick={() => handleDownload('csv')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow transition-colors flex items-center gap-1.5">
                          📄 CSV
                        </button>
                        <button onClick={handleDelete}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow transition-colors flex items-center gap-1.5">
                          🗑️ Delete
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Subject cards ── */}
                {loading ? (
                  <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
                    <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                    Loading archived records…
                  </div>
                ) : Object.keys(semesterData).length > 0 ? (
                  <div className="space-y-4">
                    {/* Summary row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
                      <StatCard label="Subjects" value={totalSubjects} color="border-indigo-400" icon="📖" />
                      <StatCard label="Total Records" value={totalRecords.toLocaleString()} color="border-blue-400" icon="📋" />
                      <StatCard label="Present" value={totalPresent.toLocaleString()} color="border-green-400" icon="✅" />
                      <StatCard label="Attendance %" value={`${overallPct}%`} color="border-purple-400" icon="📊" />
                    </div>

                    {Object.entries(semesterData).map(([subject, data]) => {
                      const pct = data.totalRecords ? ((data.totalPresent / data.totalRecords) * 100).toFixed(1) : 0;
                      const isOpen = openSubject === subject;
                      return (
                        <motion.div key={subject} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm">
                          {/* Subject header */}
                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
                            <div className="flex items-center gap-4">
                              <div>
                                <h3 className="font-bold text-gray-800 dark:text-white">{subject}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {data.totalRecords} records · {data.totalPresent} present · {data.totalAbsent} absent
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {/* Mini progress bar */}
                              <div className="hidden sm:block">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                                    <div className={`h-full rounded-full ${pct >= 75 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-400' : 'bg-red-500'}`}
                                      style={{ width: `${Math.min(pct, 100)}%` }} />
                                  </div>
                                  <span className={`text-sm font-bold ${pct >= 75 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {pct}%
                                  </span>
                                </div>
                              </div>
                              <button onClick={() => handleSubjectToggle(subject)}
                                disabled={loading}
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isOpen
                                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                  }`}>
                                {isOpen ? 'Hide ▲' : 'Students ▼'}
                              </button>
                            </div>
                          </div>

                          {/* Student table (collapsible) */}
                          <AnimatePresence>
                            {isOpen && subjectStudents[subject] && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="overflow-x-auto border-t border-gray-100 dark:border-gray-600">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">
                                        <th className="p-3 text-left">Roll No</th>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-center">Present</th>
                                        <th className="p-3 text-center">Absent</th>
                                        <th className="p-3 text-center">Total</th>
                                        <th className="p-3 text-center">%</th>
                                        <th className="p-3 text-center">Detail</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                      {subjectStudents[subject].map(stu => {
                                        const sp = parseFloat(stu.present_percent);
                                        return (
                                          <tr key={stu.student_roll_number}
                                            className={`hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors ${sp < 75 ? 'bg-red-50/40 dark:bg-red-900/10' : ''}`}>
                                            <td className="p-3 font-semibold text-gray-800 dark:text-gray-200">{stu.student_roll_number}</td>
                                            <td className="p-3 text-gray-600 dark:text-gray-300">{stu.student_name}</td>
                                            <td className="p-3 text-center font-bold text-green-600 dark:text-green-400">{stu.present}</td>
                                            <td className="p-3 text-center font-bold text-red-500 dark:text-red-400">{stu.absent}</td>
                                            <td className="p-3 text-center text-gray-500">{stu.total_records}</td>
                                            <td className="p-3 text-center">
                                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${sp >= 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                                                {stu.present_percent}%
                                              </span>
                                            </td>
                                            <td className="p-3 text-center">
                                              <button
                                                onClick={() => handleStudentDetail(subject, stu.student_roll_number)}
                                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold transition-colors">
                                                View
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : viewSemester ? (
                  <div className="py-16 text-center text-gray-400 dark:text-gray-500">
                    <p className="text-5xl mb-3">📭</p>
                    No archived records found for Semester {viewSemester}
                  </div>
                ) : (
                  <div className="py-16 text-center text-gray-400 dark:text-gray-500">
                    <p className="text-5xl mb-3">🗂️</p>
                    Select a semester and click "View Archives"
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>

      {/* ════════════════ STUDENT DETAIL MODAL ════════════════ */}
      <AnimatePresence>
        {studentDetailOpen && studentDetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={e => { if (e.target === e.currentTarget) setStudentDetailOpen(false); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden">

              {/* Modal header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{studentDetail.student_name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Roll: {studentDetail.student_roll_number}</p>
                </div>
                <button onClick={() => setStudentDetailOpen(false)}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none font-bold transition-colors">×</button>
              </div>

              {/* Summary pills */}
              <div className="flex gap-4 p-5 border-b border-gray-100 dark:border-gray-700">
                <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Present</p>
                  <p className="text-xl font-extrabold text-green-600 dark:text-green-400">{studentDetail.present}</p>
                </div>
                <div className="flex-1 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Absent</p>
                  <p className="text-xl font-extrabold text-red-600 dark:text-red-400">{studentDetail.absent}</p>
                </div>
                <div className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Percentage</p>
                  <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {studentDetail.present + studentDetail.absent > 0
                      ? ((studentDetail.present / (studentDetail.present + studentDetail.absent)) * 100).toFixed(1) + '%'
                      : '—'}
                  </p>
                </div>
              </div>

              {/* Records table */}
              <div className="overflow-y-auto flex-1">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="p-3 text-left">#</th>
                      <th className="p-3 text-left">Session Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Recorded By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {studentDetail.records.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="p-3 text-gray-400">{i + 1}</td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">{new Date(r.session_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-500 dark:text-gray-400">{r.original_recorded_by}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ArchivalAttendance;
