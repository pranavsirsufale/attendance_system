import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function StudentProfile({ notifyUser }) {
  const [programs, setPrograms] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 30;
  const navigate = useNavigate();

  const fetchPrograms = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) { navigate('/'); return; }
    try {
      const res = await axios.get('/api/programs/', { headers: { Authorization: `Bearer ${token}` } });
      setPrograms(res.data);
    } catch { notifyUser('Failed to load programs', 'error'); }
  };

  const fetchSections = async (programId) => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.get(`/api/sections-for-program/?program_id=${programId}`, { headers: { Authorization: `Bearer ${token}` } });
      setSections(res.data);
    } catch { notifyUser('Failed to load sections', 'error'); }
  };

  const fetchSemesters = async (sectionId) => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.get(`/api/semesters-for-section/?section_id=${sectionId}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) setSemesters(res.data.semesters);
    } catch { notifyUser('Failed to load semesters', 'error'); }
  };

  const fetchStudentAttendance = async () => {
    if (!selectedProgram || !selectedSection || !selectedSemester) return;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      notifyUser('Start date must be before end date', 'error');
      return;
    }
    setLoading(true);
    setStudents([]);
    setSubjects([]);
    const token = localStorage.getItem('access_token');
    try {
      const params = { program_id: selectedProgram, section_id: selectedSection, semester: selectedSemester };
      if (startDate && endDate) { params.start_date = startDate; params.end_date = endDate; }
      const res = await axios.get('/api/student-attendance/', { params, headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) {
        const studentList = res.data.results?.students || [];
        const subjectList = res.data.results?.subjects || [];
        setSubjects(subjectList);
        setStudents(studentList);
        setTotalCount(res.data.count || studentList.length);
        setPage(1);
        if (studentList.length === 0) {
          notifyUser('No students found for this selection', 'warning');
        } else {
          notifyUser(`Loaded ${studentList.length} students`, 'success');
        }
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to load attendance';
      notifyUser(msg, 'error');
      setStudents([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPrograms(); }, []);

  useEffect(() => {
    setSelectedSection(''); setSections([]);
    setSelectedSemester(''); setSemesters([]);
    setStudents([]); setSubjects([]);
    if (selectedProgram) fetchSections(selectedProgram);
  }, [selectedProgram]);

  useEffect(() => {
    setSelectedSemester(''); setSemesters([]);
    setStudents([]); setSubjects([]);
    if (selectedSection) fetchSemesters(selectedSection);
  }, [selectedSection]);

  useEffect(() => {
    setStudents([]); setSubjects([]);
    if (selectedProgram && selectedSection && selectedSemester) fetchStudentAttendance();
  }, [selectedSemester]);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(s =>
      s.name.toLowerCase().includes(q) || s.roll_number.toLowerCase().includes(q)
    );
  }, [students, search]);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const pagedStudents = filteredStudents.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const getAttPct = (att, subjId) => {
    const a = att.find(x => x.subject_id === subjId) || { classes_attended: 0, total_classes: 0 };
    return { ...a, pct: a.total_classes > 0 ? ((a.classes_attended / a.total_classes) * 100).toFixed(1) : null };
  };

  const pctColor = (pct) => {
    if (pct === null) return 'bg-gray-100 text-gray-500';
    if (pct >= 75) return 'bg-green-100 text-green-800';
    if (pct >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-700';
  };

  const selectedSectionObj = sections.find(s => s.id === Number(selectedSection));
  const selectedProgramObj = programs.find(p => p.id === Number(selectedProgram));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Student Profiles
          </h1>
          <p className="text-sm text-gray-500 mt-1">View subject-wise attendance by semester</p>
        </div>
        <button
          onClick={() => navigate('/admin')}
          className="px-4 py-2 rounded-lg border border-indigo-200 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition"
        >
          ← Dashboard
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-5 mb-6">
        <h2 className="text-base font-semibold text-indigo-700 mb-4">Select Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Program</label>
            <select
              value={selectedProgram}
              onChange={e => setSelectedProgram(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            >
              <option value="">— Select Program —</option>
              {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Section</label>
            <select
              value={selectedSection}
              onChange={e => setSelectedSection(e.target.value)}
              disabled={!selectedProgram}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">— Select Section —</option>
              {sections.map(s => <option key={s.id} value={s.id}>{s.name} (Year {s.year})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Semester</label>
            <select
              value={selectedSemester}
              onChange={e => setSelectedSemester(e.target.value)}
              disabled={!selectedSection}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">— Select Semester —</option>
              {semesters.map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Start Date <span className="font-normal normal-case text-gray-400">(optional)</span>
            </label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              End Date <span className="font-normal normal-case text-gray-400">(optional)</span>
            </label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition" />
          </div>
          <button
            onClick={fetchStudentAttendance}
            disabled={!selectedProgram || !selectedSection || !selectedSemester || loading}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Apply / Refresh'}
          </button>
        </div>
      </div>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <span className="ml-3 text-indigo-600 font-medium">Loading attendance data…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {!loading && students.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {/* Info bar + search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
                {selectedProgramObj?.name}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
                {selectedSectionObj ? `${selectedSectionObj.name} — Year ${selectedSectionObj.year}` : ''}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
                Semester {selectedSemester}
              </span>
              {startDate && endDate && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                  {startDate} → {endDate}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                {totalCount} Students
              </span>
            </div>
            <input
              type="text"
              placeholder="Search name or roll number…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition w-full sm:w-64"
            />
          </div>

          {/* Legend */}
          <div className="flex gap-3 mb-3 flex-wrap">
            <span className="text-xs text-gray-500">Attendance %:</span>
            <span className="inline-flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>≥75% Good</span>
            <span className="inline-flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>60–74% Average</span>
            <span className="inline-flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>&lt;60% Low</span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">#</th>
                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Roll No.</th>
                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Name</th>
                    {subjects.map(sub => (
                      <th key={sub.id} className="px-3 py-3 text-center font-semibold whitespace-nowrap">
                        <div className="text-xs leading-tight">{sub.name}</div>
                        <div className="text-xs font-normal opacity-80">(P / T — %)</div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">Overall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pagedStudents.map((student, idx) => {
                    const totalP = student.attendance.reduce((s, a) => s + a.classes_attended, 0);
                    const totalT = student.attendance.reduce((s, a) => s + a.total_classes, 0);
                    const overallPct = totalT > 0 ? ((totalP / totalT) * 100).toFixed(1) : null;
                    return (
                      <tr
                        key={student.id}
                        onClick={() => navigate(`/admin/student/${student.id}`)}
                        className="hover:bg-indigo-50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-400 text-xs">{(page - 1) * rowsPerPage + idx + 1}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-indigo-700 whitespace-nowrap">{student.roll_number}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{student.name}</td>
                        {subjects.map(sub => {
                          const { classes_attended, total_classes, pct } = getAttPct(student.attendance, sub.id);
                          return (
                            <td key={sub.id} className="px-3 py-3 text-center whitespace-nowrap">
                              {total_classes === 0 ? (
                                <span className="text-gray-400 text-xs">—</span>
                              ) : (
                                <div className="flex flex-col items-center gap-0.5">
                                  <span className="text-xs text-gray-500">{classes_attended}/{total_classes}</span>
                                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${pctColor(parseFloat(pct))}`}>
                                    {pct}%
                                  </span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-4 py-3 text-center">
                          {overallPct === null ? (
                            <span className="text-gray-400 text-xs">—</span>
                          ) : (
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${pctColor(parseFloat(overallPct))}`}>
                              {overallPct}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                <span className="text-xs text-gray-500">
                  Showing {(page - 1) * rowsPerPage + 1}–{Math.min(page * rowsPerPage, filteredStudents.length)} of {filteredStudents.length}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg text-xs border border-gray-300 disabled:opacity-40 hover:bg-indigo-50 transition">Prev</button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const pg = totalPages <= 7 ? i + 1 : (page <= 4 ? i + 1 : page + i - 3);
                    if (pg < 1 || pg > totalPages) return null;
                    return (
                      <button key={pg} onClick={() => setPage(pg)}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition ${pg === page ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-indigo-50'}`}>
                        {pg}
                      </button>
                    );
                  })}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg text-xs border border-gray-300 disabled:opacity-40 hover:bg-indigo-50 transition">Next</button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Empty states */}
      {!loading && students.length === 0 && selectedSemester && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">📋</div>
          <p className="text-lg font-medium">No students found</p>
          <p className="text-sm mt-1">Try a different program, section, or semester.</p>
        </div>
      )}

      {!loading && !selectedSemester && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🎓</div>
          <p className="text-lg font-medium">Select a program, section, and semester above</p>
          <p className="text-sm mt-1">Student attendance will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
