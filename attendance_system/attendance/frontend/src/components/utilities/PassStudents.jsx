import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  FormHelperText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

function PassStudents({ notifyUser }) {
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
  const [openConfirm, setOpenConfirm] = useState(false);
  const rowsPerPage = 20;

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
      const response = await axios.get(`http://localhost:8000/api/sections-for-program/?program_id=${programId}`, {
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

  // Fetch students with pagination
  const fetchStudents = async (newPage = 0) => {
    if (!selectedSection || !selectedSemester) return;
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/admin/students/`, {
        params: {
          section_id: selectedSection,
          semester: selectedSemester,
          page: newPage + 1,
          page_size: rowsPerPage,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      setStudents(response.data.results || response.data);
      setTotalCount(response.data.count || response.data.length);
      setPage(newPage);
    } catch (err) {
      setError('Failed to load students');
      notifyUser('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    fetchStudents(newPage);
  };

  // Pass students
  const passStudents = async () => {
    if (!students.length) {
      setError('No students to pass');
      notifyUser('No students selected', 'warning');
      setOpenConfirm(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const updatedStudents = students.map((student) => {
        const currentSection = sections.find((s) => s.id === student.section_id);
        const programId = currentSection.program_id;
        const currentYear = currentSection.year;
        const sectionName = currentSection.name;

        const newSemester = student.semester + 1;
        let newSectionId = student.section_id;

        // Odd-to-even semester (new year)
        if (student.semester % 2 === 1) {
          const newYear = currentYear + 1;
          // Prefer same section name
          const newSection = sections.find(
            (s) => s.program_id === programId && s.year === newYear && s.name === sectionName
          ) || sections.find((s) => s.program_id === programId && s.year === newYear);
          newSectionId = newSection ? newSection.id : student.section_id; // Fallback
        }

        return {
          id: student.id,
          semester: newSemester,
          section_id: newSectionId,
        };
      });

      // Filter out final semester
      const maxSemester = selectedProgram == 2 ? 6 : 10;
      const validStudents = updatedStudents.filter((s) => s.semester <= maxSemester);

      if (!validStudents.length) {
        setError('All students are in the final semester');
        notifyUser('No students can be passed', 'warning');
        setOpenConfirm(false);
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:8000/api/students/pass/', validStudents, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notifyUser(`Successfully passed ${response.data.updated} students`, 'success');
      setStudents([]);
      setOpenConfirm(false);
      fetchStudents(0);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to pass students');
      notifyUser('Failed to pass students', 'error');
      setOpenConfirm(false);
    } finally {
      setLoading(false);
    }
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
    if (selectedSection && selectedSemester) {
      fetchStudents(0);
    }
  }, [selectedSection, selectedSemester]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
        Pass Students
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
          Select Students to Pass
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Select a program, section, and semester to view students. Verify the list and click "Pass Students" to advance them to the next semester.
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
                  <TableCell sx={{ color: '#fff' }}>Roll No</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Program Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Program Duration</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Section</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Current Year</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.roll_number}</TableCell>
                    <TableCell>{`${student.first_name} ${student.last_name || ''}`}</TableCell>
                    <TableCell>{student.section.program.name}</TableCell>
                    <TableCell>{student.section.program.duration_years}</TableCell>
                    <TableCell>
                     {student.section.name}
                    </TableCell>
                    <TableCell>{student.section.year}</TableCell>
                    <TableCell>{student.semester}</TableCell>
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
            <Button
              variant="contained"
              onClick={() => setOpenConfirm(true)}
              disabled={loading || !students.length}
              sx={{ mt: 2 }}
            >
              Pass Students
            </Button>
          </>
        ) : (
          <Typography color="textSecondary">
            No students found for the selected section and semester.
          </Typography>
        )}
      </Paper>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Pass Students</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to pass {students.length} student(s) to Semester {parseInt(selectedSemester) + 1}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={passStudents} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

export default PassStudents;