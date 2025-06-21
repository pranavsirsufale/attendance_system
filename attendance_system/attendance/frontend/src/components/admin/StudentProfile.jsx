import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Grid, Box, FormControl, InputLabel, Select, MenuItem, Typography, Table, TableBody, TableCell, TableHead,
    TableRow, TablePagination, Paper, FormHelperText, CircularProgress,
    } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

function StudentProfile({ notifyUser }) {
  const [programs, setPrograms] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const rowsPerPage = 20;
  const navigate = useNavigate();

  // Fetch programs
  const fetchPrograms = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8000/api/programs/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrograms(response.data);
    } catch (err) {
      setError('Failed to load programs');
      notifyUser('Failed to load programs', 'error');
    }
  };

  // Fetch sections
  const fetchSections = async (programId) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/sections/?program_id=${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(response.data);
    } catch (err) {
      setError('Failed to load sections');
      notifyUser('Failed to load sections', 'error');
    }
  };

  // Generate semesters
  const generateSemesters = (year) => {
    const semesters = [];
    if (year >= 1 && year <= 5) {
      semesters.push(year * 2 - 1, year * 2);
    }
    setSemesters(semesters);
  };

  // Fetch students
  const fetchStudents = async (newPage = 0) => {
    if (!selectedProgram || !selectedSection || !selectedSemester) return;
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/students/`, {
        params: {
          program_id: selectedProgram,
          section_id: selectedSection,
          semester: selectedSemester,
          page: newPage + 1,
          page_size: rowsPerPage,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      if (!data.results || typeof data.count === 'undefined') {
        throw new Error('Invalid API response format');
      }
      setStudents(data.results);
      setTotalCount(data.count);
      setPage(newPage);
    } catch (err) {
      setError(err.message || 'Failed to load students');
      notifyUser('Failed to load students', 'error');
      setStudents([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    fetchStudents(newPage);
  };

  // Handle row click
  const handleRowClick = (studentId) => {
    navigate(`/admin/student/${studentId}`);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    setSelectedSection('');
    setSelectedSemester('');
    setSections([]);
    setSemesters([]);
    setStudents([]);
    setPage(0);
    setTotalCount(0);
    if (selectedProgram) {
      fetchSections(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    setSelectedSemester('');
    setSemesters([]);
    setStudents([]);
    setPage(0);
    setTotalCount(0);
    if (selectedSection) {
      const section = sections.find((s) => s.id === parseInt(selectedSection));
      if (section) {
        generateSemesters(section.year);
      }
    }
  }, [selectedSection]);

  useEffect(() => {
    setStudents([]);
    setPage(0);
    setTotalCount(0);
    if (selectedProgram && selectedSection && selectedSemester) {
      fetchStudents(0);
    }
  }, [selectedProgram, selectedSection, selectedSemester]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
        Student Profiles
      </Typography>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ backgroundColor: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}
          >
            <Typography color="error">{error}</Typography>
          </motion.div>
        )}
      </AnimatePresence>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Students
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Select a program, section, and semester to view student profiles. Click a student to view detailed information.
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ minWidth: 120 }}>
              <InputLabel id="program-label">Program</InputLabel>
              <Select
                labelId="program-label"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                label="Program"
              >
                <MenuItem value="">Select Program</MenuItem>
                {programs.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a program to filter sections</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedProgram}>
              <InputLabel id="section-label">Section</InputLabel>
              <Select
                labelId="section-label"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                label="Section"
              >
                <MenuItem value="">Select Section</MenuItem>
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.name} (Year {section.year})
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Choose a section for the program</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedSection}>
              <InputLabel id="semester-label">Semester</InputLabel>
              <Select
                labelId="semester-label"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                label="Semester"
              >
                <MenuItem value="">Select Semester</MenuItem>
                {semesters.map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    Semester {sem}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select semester based on year</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : students.length > 0 ? (
          <>
            <Table sx={{ mb: 3 }}>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                  <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Roll Number</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Section</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow
                    key={student.id}
                    onClick={() => handleRowClick(student.id)}
                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                  >
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.roll_number}</TableCell>
                    <TableCell>{`${student.first_name} ${student.last_name || ''}`}</TableCell>
                    <TableCell>
                      {/* {sections.find((s) => s.id === student.section_id)?.name} (Year{' '}
                      {sections.find((s) => s.id === student.section_id)?.year}, Semester {student.semester}) */}
                      {student.section}
                    </TableCell>
                    <TableCell>
                        {student.semester}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[rowsPerPage]}
            />
          </>
        ) : (
          <Typography color="textSecondary">
            No students found for the selected section and semester.
          </Typography>
        )}
      </Paper>
      <ToastContainer />
    </Box>
  );
}

export default StudentProfile;