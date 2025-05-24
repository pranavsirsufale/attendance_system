import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminAttendanceStats({ notifyUser }) {
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [teacherStats, setTeacherStats] = useState([]);
  const [studentStats, setStudentStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [teacherStartDate, setTeacherStartDate] = useState('');
  const [teacherEndDate, setTeacherEndDate] = useState('');
  const [studentStartDate, setStudentStartDate] = useState('');
  const [studentEndDate, setStudentEndDate] = useState('');
  const [teacherPage, setTeacherPage] = useState(1);
  const [studentPage, setStudentPage] = useState(1);
  const [teacherNextPage, setTeacherNextPage] = useState(null);
  const [teacherPrevPage, setTeacherPrevPage] = useState(null);
  const [studentNextPage, setStudentNextPage] = useState(null);
  const [studentPrevPage, setStudentPrevPage] = useState(null);
  const [teacherTotalCount, setTeacherTotalCount] = useState(0);
  const [studentTotalCount, setStudentTotalCount] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedTeacherName, setSelectedTeacherName] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchTeachers = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/teachers/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load teachers');
      notifyUser('Failed to load teachers', 'error');
    }
  };

  const fetchStudents = async (page = 1) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/students/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const studentsData = response.data.results?.students || [];
      const totalCount = response.data.results?.total_count || 0;
      setStudents(studentsData);
      setStudentTotalCount(totalCount);
      setStudentNextPage(response.data.next);
      setStudentPrevPage(response.data.previous);
      setError('');
      notifyUser(
        studentsData.length > 0 
          ? `Loaded ${studentsData.length} of ${totalCount} students` 
          : `No students found (Total: ${totalCount}).`,
        studentsData.length > 0 ? 'info' : 'warning'
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load students');
      notifyUser('Failed to load students', 'error');
    }
  };

  const fetchTeacherSubjects = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    if (!selectedTeacher) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/teacher-subjects/?teacher=${selectedTeacher}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacherSubjects(response.data.subjects);
      setError('');
      notifyUser(
        `Loaded ${response.data.subjects.length} subjects for teacher`,
        'info'
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load subjects');
      notifyUser('Failed to load subjects', 'error');
    }
  };

  const fetchTeacherStats = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    if (!selectedSubject) return;

    let url = `http://localhost:8000/api/admin/attendance-stats/?period=${period}&page=${teacherPage}&subject_name=${encodeURIComponent(selectedSubject)}`;
    if (section) url += `&section=${section}`;
    if (subject) url += `&subject=${subject}`;
    if (selectedTeacher) url += `&teacher=${selectedTeacher}`;
    if (program) url += `&program=${program}`;
    if (year) url += `&year=${year}`;
    if (semester) url += `&semester=${semester}`;
    if (period === 'daily' && date) {
      url += `&date=${date}`;
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      const computedEndDate = nextDay.toISOString().split('T')[0];
      url += `&end_date=${computedEndDate}`;
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacherStats(response.data.results.stats);
      setSelectedTeacherName(response.data.results.stats.recorded_by_name)
      // console.log(response.data.results)
      setTeacherStartDate(response.data.results.start_date);
      setTeacherEndDate(response.data.results.end_date);
      setTeacherNextPage(response.data.next);
      setTeacherPrevPage(response.data.previous);
      setTeacherTotalCount(response.data.count);
      setError('');
      notifyUser(
        `Loaded ${response.data.results.stats.length} records for ${selectedSubject} (${period} period: ${response.data.results.start_date} - ${response.data.results.end_date})  `,
        'info'
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load attendance stats');
      notifyUser('Failed to load attendance stats', 'error');
    }
  };

  const fetchStudentStats = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    const selectedStudentData = students.find(student => student.id === selectedStudent);
    if (!selectedStudentData) return;

    let url = `http://localhost:8000/api/attendance-stats/${selectedStudentData.roll_number}/?period=${period}&page=${studentPage}`;
    if (section) url += `&section=${section}`;
    if (subject) url += `&subject=${subject}`;
    if (program) url += `&program=${program}`;
    if (year) url += `&year=${year}`;
    if (semester) url += `&semester=${semester}`;
    if (period === 'daily' && date) {
      url += `&date=${date}`;
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      const computedEndDate = nextDay.toISOString().split('T')[0];
      url += `&end_date=${computedEndDate}`;
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentStats([response.data]);
      setStudentStartDate(response.data.start_date);
      setStudentEndDate(response.data.end_date);
      setStudentNextPage(null);
      setStudentPrevPage(null);
      setStudentTotalCount(1);
      setError('');
      notifyUser(
        `Attendance stats for ${selectedStudentData.first_name} ${selectedStudentData.last_name} loaded`,
        'info'
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load student attendance stats');
      notifyUser('Failed to load student attendance stats', 'error');
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchStudents(studentPage);
  }, [studentPage]);

  useEffect(() => {
    if (selectedTeacher) {
      fetchTeacherSubjects();
    } else {
      setTeacherSubjects([]);
      setTeacherStats([]);
      setTeacherStartDate('');
      setTeacherEndDate('');
      setTeacherTotalCount(0);
      setTeacherNextPage(null);
      setTeacherPrevPage(null);
      setSelectedSubject(null);
    }
  }, [selectedTeacher]);

  useEffect(() => {
    if (selectedSubject) {
      fetchTeacherStats();
    } else {
      setTeacherStats([]);
      setTeacherStartDate('');
      setTeacherEndDate('');
      setTeacherTotalCount(0);
      setTeacherNextPage(null);
      setTeacherPrevPage(null);
    }
  }, [period, section, subject, selectedTeacher, selectedSubject, program, year, semester, date, teacherPage]);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentStats();
    } else {
      setStudentStats([]);
      setStudentStartDate('');
      setStudentEndDate('');
      setStudentTotalCount(0);
      setStudentNextPage(null);
      setStudentPrevPage(null);
    }
  }, [period, section, subject, selectedStudent, program, year, semester, date, studentPage]);


  const handleTeacherNextPage = () => {
    if (teacherNextPage) setTeacherPage(teacherPage + 1);
  };

  const handleTeacherPrevPage = () => {
    if (teacherPrevPage) setTeacherPage(teacherPage - 1);
  };

  const handleStudentNextPage = () => {
    if (studentNextPage) setStudentPage(studentPage + 1);
  };

  const handleStudentPrevPage = () => {
    if (studentPrevPage) setStudentPage(studentPage - 1);
  };

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId);
    setTeacherPage(1);
    setSelectedSubject(null);
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
    setStudentPage(1);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setTeacherPage(1);
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
        Admin Attendance Dashboard
      </Typography>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ color: 'red', backgroundColor: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Period</InputLabel>
          <Select value={period} onChange={(e) => { setPeriod(e.target.value); setTeacherPage(1); setStudentPage(1); setSelectedSubject(null); }}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="semester">Semester</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Section ID"
          type="number"
          value={section}
          onChange={(e) => { setSection(e.target.value); setTeacherPage(1); setStudentPage(1); setSelectedSubject(null); }}
          sx={{ minWidth: 120 }}
        />
        <TextField
          label="Subject ID"
          type="number"
          value={subject}
          onChange={(e) => { setSubject(e.target.value); setTeacherPage(1); setStudentPage(1); setSelectedSubject(null); }}
          sx={{ minWidth: 120 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Program</InputLabel>
          <Select value={program} onChange={(e) => { setProgram(e.target.value); setTeacherPage(1); setStudentPage(1); setSelectedSubject(null); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">BALLB 5 Yr</MenuItem>
            <MenuItem value="2">LLB 3 Yr</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => { setYear(e.target.value); setTeacherPage(1); setStudentPage(1); setSelectedSubject(null); }}
          sx={{ minWidth: 120 }}
        />
        <TextField
          label="Semester"
          type="number"
          value={semester}
          onChange={(e) => { setSemester(e.target.value); setTeacherPage(1); setStudentPage(1); setSelectedSubject(null); }}
          sx={{ minWidth: 120 }}
        />
        {period === 'daily' && (
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setTeacherPage(1); setStudentPage(1); setSelectedSubject(null); }}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Select Teacher (Total Teachers: {teachers.length})</Typography>
        <Grid container spacing={2}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  minWidth: '300px',
                  minHeight: '130px',
                  bgcolor: selectedTeacher === teacher.id ? 'primary.light' : 'white',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
                onClick={() => handleTeacherSelect(teacher.id)}
              >
                <CardContent>
                  <Typography variant="h6">{`${teacher.first_name} ${teacher.last_name}`}</Typography>
                  <Typography color="textSecondary">{teacher.email}</Typography>
                  <Typography color="textSecondary">{teacher.phone}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {selectedTeacher && (
          <Button
            variant="outlined"
            onClick={() => handleTeacherSelect(null)}
            sx={{ mt: 2 }}
          >
            Clear Teacher Filter
          </Button>
        )}
      </Box>

      {teacherSubjects.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Period: {teacherStartDate || 'N/A'} to {teacherEndDate || 'N/A'} | Total Records: {teacherTotalCount}
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Subjects Taught ({teacherSubjects.length})
            </Typography>
            <Grid container spacing={2}>
              {teacherSubjects.map((subject) => (
                <Grid item xs={12} sm={6} md={4} key={subject}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      minWidth: '300px',
                      minHeight: '100px',
                      bgcolor: selectedSubject === subject ? 'primary.light' : 'white',
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    <CardContent>
                      <Typography variant="h6">{subject}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {selectedSubject && (
              <Button
                variant="outlined"
                onClick={() => setSelectedSubject(null)}
                sx={{ mt: 2 }}
              >
                Clear Subject Filter
              </Button>
            )}
          </Box>
        </>
      )}

      {selectedSubject && teacherStats.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Subject: {selectedSubject}
            
          </Typography>
          
          
          
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                  <TableCell sx={{ color: '#fff' }}>Student Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Student ID</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Roll Number</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Program</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Total Sessions</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Present</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Attendance %</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Recorded By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherStats.map((stat, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell>{stat.name}</TableCell>
                    <TableCell>{stat.student_id}</TableCell>
                    <TableCell>{stat.roll_number}</TableCell>
                    <TableCell>{stat.program}</TableCell>
                    <TableCell>{stat.semester}</TableCell>
                    <TableCell>{stat.total_sessions}</TableCell>
                    <TableCell>{stat.present}</TableCell>
                    <TableCell>{stat.absent}</TableCell>
                    <TableCell>{stat.attendance_percentage.toFixed(2)}%</TableCell>
                    <TableCell>{stat.recorded_by_name}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleTeacherPrevPage}
                disabled={!teacherPrevPage}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleTeacherNextPage}
                disabled={!teacherNextPage}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Student (Total Students: {studentTotalCount})
        </Typography>
        {students.length > 0 ? (
          <Grid container spacing={2}>
            {students.map((student) => (
              <Grid item xs={12} sm={6} md={4} key={student.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    minWidth: '300px',
                    minHeight: '130px',
                    bgcolor: selectedStudent === student.id ? 'primary.light' : 'white',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                  onClick={() => handleStudentSelect(student.id)}
                >
                  <CardContent>
                    <Typography variant="h6">{`${student.first_name} ${student.last_name}`}</Typography>
                    <Typography color="textSecondary">{student.roll_number}</Typography>
                    <Typography color="textSecondary">{student.email}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="textSecondary">
            No students available.
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleStudentPrevPage}
            disabled={!studentPrevPage}
          >
            Load Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleStudentNextPage}
            disabled={!studentNextPage}
          >
            Load More
          </Button>
        </Box>
        {selectedStudent && (
          <Button
            variant="outlined"
            onClick={() => handleStudentSelect(null)}
            sx={{ mt: 2 }}
          >
            Clear Student Filter
          </Button>
        )}
      </Box>

      {studentStats.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Period: {studentStartDate} to {studentEndDate} | Showing {studentStats.length} of {studentTotalCount} records
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              onClick={() => handleStudentExport('csv')}
              sx={{ mr: 2 }}
            >
              Export as CSV
            </Button>
            <Button
              variant="contained"
              onClick={() => handleStudentExport('excel')}
            >
              Export as Excel
            </Button>
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                  <TableCell sx={{ color: '#fff' }}>Student Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Student ID</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Roll Number</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Program</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Total Sessions</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Present</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Attendance %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentStats.map((stat, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell>{stat.name}</TableCell>
                    <TableCell>{stat.student_id}</TableCell>
                    <TableCell>{stat.roll_number}</TableCell>
                    <TableCell>{stat.program}</TableCell>
                    <TableCell>{stat.semester}</TableCell>
                    <TableCell>{stat.total_sessions}</TableCell>
                    <TableCell>{stat.present}</TableCell>
                    <TableCell>{stat.absent}</TableCell>
                    <TableCell>{stat.attendance_percentage}%</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleStudentPrevPage}
                disabled={!studentPrevPage}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleStudentNextPage}
                disabled={!studentNextPage}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}

      <ToastContainer />
    </Box>
  );
}
export default AdminAttendanceStats;