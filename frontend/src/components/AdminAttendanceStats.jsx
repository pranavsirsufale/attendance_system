import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography,
  Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Grid,
  Chip, Divider, CircularProgress, InputAdornment, Paper, Tooltip,
  IconButton, Collapse, Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ─── helpers ──────────────────────────────────────────────────────────────────

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('access_token')}` });

const pctColor = (pct) => {
  if (pct >= 75) return '#2e7d32';
  if (pct >= 50) return '#ed6c02';
  return '#d32f2f';
};

// ─── sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ icon, title, count }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      {icon}
      <Typography variant="h6" fontWeight={700}>{title}</Typography>
      {count !== undefined && <Chip label={count} size="small" color="primary" />}
    </Box>
  );
}

function SelectableCard({ children, selected, onClick, minWidth = 240 }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        minWidth,
        border: selected ? '2px solid' : '1px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        bgcolor: selected ? 'primary.50' : 'background.paper',
        transition: 'all .15s ease',
        '&:hover': { boxShadow: 3, borderColor: 'primary.light' },
      }}
    >
      <CardContent sx={{ pb: '12px !important' }}>{children}</CardContent>
    </Card>
  );
}

function PaginationBar({ onPrev, onNext, hasPrev, hasNext, page, total }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
      <Button size="small" variant="outlined" onClick={onPrev} disabled={!hasPrev} startIcon={<ArrowBackIcon />}>
        Prev
      </Button>
      <Typography variant="body2" color="text.secondary">
        Page {page}{total ? ` · ${total} total` : ''}
      </Typography>
      <Button size="small" variant="outlined" onClick={onNext} disabled={!hasNext}>
        Next
      </Button>
    </Box>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

function AdminAttendanceStats({ notifyUser }) {
  const navigate = useNavigate();

  // ── filters ──
  const [period, setPeriod] = useState('semester');
  const [semester, setSemester] = useState('');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [error, setError] = useState('');

  // ── teachers ──
  const [teachers, setTeachers] = useState([]);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  // ── subjects ──
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  // ── teacher stats ──
  const [teacherStats, setTeacherStats] = useState([]);
  const [teacherPage, setTeacherPage] = useState(1);
  const [teacherNextPage, setTeacherNextPage] = useState(null);
  const [teacherPrevPage, setTeacherPrevPage] = useState(null);
  const [teacherTotalCount, setTeacherTotalCount] = useState(0);
  const [teacherDateRange, setTeacherDateRange] = useState({ start: '', end: '' });
  const [loadingTeacherStats, setLoadingTeacherStats] = useState(false);

  // ── students ──
  const [students, setStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentPage, setStudentPage] = useState(1);
  const [studentNextPage, setStudentNextPage] = useState(null);
  const [studentPrevPage, setStudentPrevPage] = useState(null);
  const [studentTotalCount, setStudentTotalCount] = useState(0);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // ── student stats ──
  const [studentStats, setStudentStats] = useState(null);
  const [studentDateRange, setStudentDateRange] = useState({ start: '', end: '' });
  const [loadingStudentStats, setLoadingStudentStats] = useState(false);
  // ─── fetch helpers ─────────────────────────────────────────────────────────

  const notify = useCallback((msg, type = 'info') => {
    if (notifyUser) notifyUser(msg, type);
    else toast[type]?.(msg) ?? toast(msg);
  }, [notifyUser]);

  const checkAuth = () => {
    if (!localStorage.getItem('access_token')) {
      notify('Please log in first', 'warning');
      return false;
    }
    return true;
  };

  const dateParams = useCallback(() => {
    let p = '';
    if (period === 'daily' && date) p += `&date=${date}`;
    if (period === 'custom' && startDate) p += `&date=${startDate}&end_date=${endDate}`;
    return p;
  }, [period, date, startDate, endDate]);

  const fetchTeachers = useCallback(async () => {
    if (!checkAuth()) return;
    setLoadingTeachers(true);
    try {
      const { data } = await axios.get('/api/teachers/', { headers: authHeader() });
      setTeachers(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load teachers');
      notify('Failed to load teachers', 'error');
    } finally {
      setLoadingTeachers(false);
    }
  }, []);

  const fetchStudents = useCallback(async (page = 1) => {
    if (!checkAuth()) return;
    setLoadingStudents(true);
    try {
      const { data } = await axios.get(`/api/students/?page=${page}`, { headers: authHeader() });
      const list = data.results?.students || [];
      const total = data.results?.total_count || 0;
      setStudents(list);
      setStudentTotalCount(total);
      setStudentNextPage(data.next);
      setStudentPrevPage(data.previous);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load students');
      notify('Failed to load students', 'error');
    } finally {
      setLoadingStudents(false);
    }
  }, []);

  const fetchTeacherSubjects = useCallback(async (teacherId) => {
    if (!checkAuth() || !teacherId) return;
    setLoadingSubjects(true);
    try {
      const { data } = await axios.get(`/api/teacher-subjects/?teacher=${teacherId}`, { headers: authHeader() });
      setTeacherSubjects(data.subjects || []);
    } catch (err) {
      notify('Failed to load subjects', 'error');
    } finally {
      setLoadingSubjects(false);
    }
  }, []);

  const fetchTeacherStats = useCallback(async () => {
    if (!checkAuth() || !selectedSubject) return;
    setLoadingTeacherStats(true);
    let url = `/api/admin/attendance-stats/?period=${period}&page=${teacherPage}&subject_name=${encodeURIComponent(selectedSubject)}`;
    if (selectedTeacher) url += `&teacher=${selectedTeacher}`;
    if (semester) url += `&semester=${semester}`;
    url += dateParams();
    try {
      const { data } = await axios.get(url, { headers: authHeader() });
      const results = data.results;
      setTeacherStats(results.stats || []);
      setTeacherDateRange({ start: results.start_date, end: results.end_date });
      setTeacherNextPage(data.next);
      setTeacherPrevPage(data.previous);
      setTeacherTotalCount(data.count || 0);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load attendance stats');
      notify('Failed to load attendance stats', 'error');
    } finally {
      setLoadingTeacherStats(false);
    }
  }, [selectedSubject, selectedTeacher, period, teacherPage, semester, dateParams]);

  const fetchStudentStats = useCallback(async () => {
    if (!checkAuth() || !selectedStudent) return;
    const student = students.find((s) => s.id === selectedStudent);
    if (!student) return;
    setLoadingStudentStats(true);
    let url = `/api/attendance-stats/${student.roll_number}/?period=${period}&page=1`;
    if (semester) url += `&semester=${semester}`;
    url += dateParams();
    try {
      const { data } = await axios.get(url, { headers: authHeader() });
      setStudentStats(data);
      setStudentDateRange({ start: data.start_date, end: data.end_date });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load student stats');
      notify('Failed to load student stats', 'error');
    } finally {
      setLoadingStudentStats(false);
    }
  }, [selectedStudent, students, period, semester, dateParams]);

  // ─── export helpers ────────────────────────────────────────────────────────

  const handleTeacherExport = async () => {
    if (!checkAuth()) return;
    let url = `/api/admin/attendance-export/?`;
    if (selectedSubject) url += `&subject_name=${encodeURIComponent(selectedSubject.replace(/\s*\(sem\s*-\s*[IVX]+\)\s*$/i, ''))}`;
    if (selectedTeacher) url += `&teacher=${selectedTeacher}`;
    if (semester) url += `&semester=${semester}`;
    if (period === 'daily' && date) url += `&date=${date}`;
    if (period === 'custom' && startDate) url += `&date=${startDate}&end_date=${endDate}`;
    try {
      const response = await axios.get(url, { headers: authHeader(), responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `attendance_${selectedSubject}_teacher${selectedTeacher}.csv`;
      link.click();
      notify('Exported teacher attendance report', 'success');
    } catch (err) {
      notify(`Export failed: ${err.message}`, 'error');
    }
  };

  const handleStudentExport = async () => {
    const student = students.find((s) => s.id === selectedStudent);
    if (!student || !checkAuth()) return;
    let url = `/api/attendance-stats/${student.roll_number}/export/?period=${period}`;
    if (semester) url += `&semester=${semester}`;
    if (period === 'daily' && date) url += `&date=${date}`;
    if (period === 'custom' && startDate) url += `&date=${startDate}&end_date=${endDate}`;
    try {
      const response = await axios.get(url, { headers: authHeader(), responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `attendance_${student.roll_number}.csv`;
      link.click();
      notify('Exported student attendance report', 'success');
    } catch (err) {
      notify(`Export failed: ${err.message}`, 'error');
    }
  };

  // ─── effects ───────────────────────────────────────────────────────────────

  useEffect(() => { fetchTeachers(); }, [fetchTeachers]);
  useEffect(() => { fetchStudents(studentPage); }, [studentPage]);

  useEffect(() => {
    if (selectedTeacher) {
      fetchTeacherSubjects(selectedTeacher);
    } else {
      setTeacherSubjects([]);
      setSelectedSubject(null);
      setTeacherStats([]);
    }
  }, [selectedTeacher]);

  useEffect(() => {
    if (selectedSubject) fetchTeacherStats();
    else setTeacherStats([]);
  }, [selectedSubject, period, semester, date, startDate, endDate, teacherPage]);

  useEffect(() => {
    if (selectedStudent) fetchStudentStats();
    else setStudentStats(null);
  }, [selectedStudent, period, semester, date, startDate, endDate]);

  // ─── derived ───────────────────────────────────────────────────────────────

  const filteredTeachers = teachers.filter((t) =>
    `${t.first_name} ${t.last_name} ${t.email}`.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const filteredStudents = students.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.roll_number} ${s.email}`.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const activeFilterCount = [semester, date, startDate].filter(Boolean).length;

  // ─── render ────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── top bar ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Tooltip title="Back to Dashboard">
          <IconButton onClick={() => navigate('/admin')} size="small" sx={{ bgcolor: 'white', boxShadow: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" fontWeight={700} sx={{ flexGrow: 1 }}>
          Attendance Dashboard
        </Typography>
      </Box>

      {/* ── error banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Paper sx={{ p: 2, mb: 2, bgcolor: '#fff3cd', border: '1px solid #ffc107', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="warning.dark">{error}</Typography>
              <IconButton size="small" onClick={() => setError('')}><ClearIcon fontSize="small" /></IconButton>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── filter panel ── */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={1}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setShowFilters((v) => !v)}
        >
          <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" fontWeight={600} sx={{ flexGrow: 1 }}>Filters</Typography>
          <Badge badgeContent={activeFilterCount} color="primary" sx={{ mr: 1 }} />
          {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>

        <Collapse in={showFilters}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Period</InputLabel>
              <Select
                value={period}
                label="Period"
                onChange={(e) => { setPeriod(e.target.value); setDate(''); setStartDate(''); setEndDate(''); setTeacherPage(1); }}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">This Week</MenuItem>
                <MenuItem value="monthly">This Month</MenuItem>
                <MenuItem value="semester">By Semester</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Semester"
              type="number"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              sx={{ width: 120 }}
              inputProps={{ min: 1, max: 10 }}
            />

            {period === 'daily' && (
              <TextField
                size="small"
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            )}

            {period === 'custom' && (
              <>
                <TextField
                  size="small"
                  label="From"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  size="small"
                  label="To"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </>
            )}

            {activeFilterCount > 0 && (
              <Button
                size="small"
                variant="text"
                color="inherit"
                startIcon={<ClearIcon />}
                onClick={() => { setSemester(''); setDate(''); setStartDate(''); setEndDate(''); }}
              >
                Clear
              </Button>
            )}
          </Box>
        </Collapse>
      </Paper>

      {/* ══════════════════════════ TEACHER SECTION ══════════════════════════ */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={1}>
        <SectionHeader icon={<PersonIcon color="primary" />} title="Select Teacher" count={teachers.length} />

        <TextField
          size="small"
          placeholder="Search teachers…"
          value={teacherSearch}
          onChange={(e) => setTeacherSearch(e.target.value)}
          sx={{ mb: 2, width: { xs: '100%', sm: 320 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />

        {loadingTeachers ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={1.5}>
            {filteredTeachers.map((teacher) => (
              <Grid key={teacher.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <SelectableCard
                  selected={selectedTeacher === teacher.id}
                  onClick={() => setSelectedTeacher(selectedTeacher === teacher.id ? null : teacher.id)}
                >
                  <Typography fontWeight={600}>{teacher.first_name} {teacher.last_name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>{teacher.email}</Typography>
                  {teacher.phone && <Typography variant="body2" color="text.secondary">{teacher.phone}</Typography>}
                </SelectableCard>
              </Grid>
            ))}
            {filteredTeachers.length === 0 && (
              <Grid size={12}>
                <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>No teachers match your search.</Typography>
              </Grid>
            )}
          </Grid>
        )}

        {/* ── subject chips ── */}
        <AnimatePresence>
          {selectedTeacher && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                Subjects taught
                {loadingSubjects && <CircularProgress size={14} sx={{ ml: 1 }} />}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {teacherSubjects.map((sub) => (
                  <Chip
                    key={sub}
                    label={sub}
                    onClick={() => setSelectedSubject(selectedSubject === sub ? null : sub)}
                    color={selectedSubject === sub ? 'primary' : 'default'}
                    variant={selectedSubject === sub ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
                {!loadingSubjects && teacherSubjects.length === 0 && (
                  <Typography variant="body2" color="text.secondary">No subjects found for this teacher.</Typography>
                )}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>

      {/* ── teacher stats table ── */}
      <AnimatePresence>
        {selectedSubject && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ flexGrow: 1 }}>{selectedSubject}</Typography>
                {teacherDateRange.start && (
                  <Chip size="small" label={`${teacherDateRange.start} → ${teacherDateRange.end}`} variant="outlined" />
                )}
                <Chip size="small" label={`${teacherTotalCount} records`} color="primary" />
                <Tooltip title="Export CSV">
                  <span>
                    <IconButton size="small" onClick={handleTeacherExport} disabled={teacherStats.length === 0}>
                      <DownloadIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>

              {loadingTeacherStats ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
              ) : teacherStats.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>No records found for the selected filters.</Typography>
              ) : (
                <>
                  <Box sx={{ overflowX: 'auto' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                          {['Student', 'Roll No.', 'Program', 'Sem', 'Total', 'Present', 'Absent', 'Attendance %', 'Recorded By'].map((h) => (
                            <TableCell key={h} sx={{ color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teacherStats.map((stat, idx) => (
                          <motion.tr key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }}>
                            <TableCell>{stat.name}</TableCell>
                            <TableCell>{stat.roll_number}</TableCell>
                            <TableCell>{stat.program}</TableCell>
                            <TableCell>{stat.semester}</TableCell>
                            <TableCell>{stat.total_sessions}</TableCell>
                            <TableCell sx={{ color: 'success.main', fontWeight: 600 }}>{stat.present}</TableCell>
                            <TableCell sx={{ color: 'error.main', fontWeight: 600 }}>{stat.absent}</TableCell>
                            <TableCell>
                              <Chip
                                size="small"
                                label={`${Number(stat.attendance_percentage).toFixed(1)}%`}
                                sx={{ bgcolor: pctColor(stat.attendance_percentage), color: '#fff', fontWeight: 700 }}
                              />
                            </TableCell>
                            <TableCell>{stat.recorded_by_name}</TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                  <PaginationBar
                    onPrev={() => setTeacherPage((p) => p - 1)}
                    onNext={() => setTeacherPage((p) => p + 1)}
                    hasPrev={!!teacherPrevPage}
                    hasNext={!!teacherNextPage}
                    page={teacherPage}
                    total={teacherTotalCount}
                  />
                </>
              )}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════ STUDENT SECTION ══════════════════════════ */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={1}>
        <SectionHeader icon={<SchoolIcon color="secondary" />} title="Select Student" count={studentTotalCount} />

        <TextField
          size="small"
          placeholder="Search by name, roll number, email…"
          value={studentSearch}
          onChange={(e) => setStudentSearch(e.target.value)}
          sx={{ mb: 2, width: { xs: '100%', sm: 380 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />

        {loadingStudents ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
        ) : (
          <>
            <Grid container spacing={1.5}>
              {filteredStudents.map((student) => (
                <Grid key={student.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <SelectableCard
                    selected={selectedStudent === student.id}
                    onClick={() => setSelectedStudent(selectedStudent === student.id ? null : student.id)}
                  >
                    <Typography fontWeight={600}>{student.first_name} {student.last_name}</Typography>
                    <Typography variant="body2" color="text.secondary">{student.roll_number}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{student.email}</Typography>
                  </SelectableCard>
                </Grid>
              ))}
              {filteredStudents.length === 0 && (
                <Grid size={12}>
                  <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>No students match your search.</Typography>
                </Grid>
              )}
            </Grid>
            <PaginationBar
              onPrev={() => setStudentPage((p) => p - 1)}
              onNext={() => setStudentPage((p) => p + 1)}
              hasPrev={!!studentPrevPage}
              hasNext={!!studentNextPage}
              page={studentPage}
              total={studentTotalCount}
            />
          </>
        )}
      </Paper>

      {/* ── student stats ── */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={1}>
              {(() => {
                const student = students.find((s) => s.id === selectedStudent);
                return (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ flexGrow: 1 }}>
                        {student ? `${student.first_name} ${student.last_name}` : 'Student Stats'}
                      </Typography>
                      {studentDateRange.start && (
                        <Chip size="small" label={`${studentDateRange.start} → ${studentDateRange.end}`} variant="outlined" />
                      )}
                      <Tooltip title="Export CSV">
                        <span>
                          <IconButton size="small" onClick={handleStudentExport} disabled={!studentStats}>
                            <DownloadIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>

                    {loadingStudentStats ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
                    ) : !studentStats ? (
                      <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>No stats available.</Typography>
                    ) : (
                      <Box sx={{ overflowX: 'auto' }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: 'secondary.main' }}>
                              {['Subject', 'Program', 'Sem', 'Total', 'Present', 'Absent', 'Attendance %'].map((h) => (
                                <TableCell key={h} sx={{ color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {(Array.isArray(studentStats) ? studentStats : [studentStats]).map((stat, idx) => (
                              <motion.tr key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}>
                                <TableCell>{stat.subject_name || stat.name || '—'}</TableCell>
                                <TableCell>{stat.program}</TableCell>
                                <TableCell>{stat.semester}</TableCell>
                                <TableCell>{stat.total_sessions}</TableCell>
                                <TableCell sx={{ color: 'success.main', fontWeight: 600 }}>{stat.present}</TableCell>
                                <TableCell sx={{ color: 'error.main', fontWeight: 600 }}>{stat.absent}</TableCell>
                                <TableCell>
                                  <Chip
                                    size="small"
                                    label={`${Number(stat.attendance_percentage).toFixed(1)}%`}
                                    sx={{ bgcolor: pctColor(stat.attendance_percentage), color: '#fff', fontWeight: 700 }}
                                  />
                                </TableCell>
                              </motion.tr>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                  </>
                );
              })()}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default AdminAttendanceStats;
