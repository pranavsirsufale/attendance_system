import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Button from './Button';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
  marginBottom: theme.spacing(3),
}));

function RemoveStudents({ notifyUser }) {
  const [programs, setPrograms] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
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
      console.error('Error fetching programs:', err.response || err);
      setError('Failed to load programs');
      notifyUser('Failed to load programs', 'error');
    }
  };

  // Fetch sections for program
  const fetchSections = async (programId) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/sections-for-program/?program_id=${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(response.data);
    } catch (err) {
      console.error('Error fetching sections:', err.response || err);
      setError('Failed to load sections');
      notifyUser('Failed to load sections', 'error');
    }
  };

  // Generate semesters for current section
  const generateSemesters = (year) => {
    const semesters = [];
    if (year >= 1 && year <= 5) {
      semesters.push(year * 2 - 1, year * 2);
    }
    setSemesters(semesters);
  };

  // Fetch all students for the selected program, section, and semester
  const fetchStudents = async () => {
    if (!selectedProgram || !selectedSection || !selectedSemester) return;
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/students/`, {
        params: {
          program_id: selectedProgram,
          section_id: selectedSection,
          semester: selectedSemester,
          all: true, // Disable pagination
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Students response:', response.data);
      const studentsData = Array.isArray(response.data) ? response.data : response.data.results || [];
      console.log(`Fetched ${studentsData.length} students`);
      setStudents(studentsData);
    } catch (err) {
      console.error('Error fetching students:', err.response || err);
      setError(err.response?.data?.error || `Failed to load students: ${err.message}`);
      notifyUser('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Remove students
  const removeStudents = async () => {
    if (!students.length) {
      setError('No students to remove');
      notifyUser('No students selected', 'warning');
      setOpenConfirm(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const studentIds = students.map((student) => ({ id: student.id }));

      console.log('Sending removal payload:', studentIds);
      const response = await axios.post('http://localhost:8000/api/students-remove/', studentIds, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Remove students response:', response.data);
      notifyUser(`Successfully removed ${response.data.removed} students`, 'success');
      setStudents([]);
      setSelectedProgram('');
      setSelectedSection('');
      setSelectedSemester('');
      setSemesters([]);
      setSections([]);
      setOpenConfirm(false);
      setError('');
    } catch (err) {
      console.error('Error removing students:', err.response || err);
      setError(err.response?.data?.error || 'Failed to remove students');
      notifyUser('Failed to remove students', 'error');
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
    if (selectedProgram) {
      fetchSections(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    setSelectedSemester('');
    setSemesters([]);
    setStudents([]);
    if (selectedSection) {
      const section = sections.find((s) => s.id === parseInt(selectedSection));
      if (section) {
        generateSemesters(section.year);
      }
    }
  }, [selectedSection]);

  useEffect(() => {
    setStudents([]);
    if (selectedProgram && selectedSection && selectedSemester) {
      fetchStudents();
    }
  }, [selectedProgram, selectedSection, selectedSemester]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>

           <Typography textAlign={"center"} variant="h4" sx={{ mb: 5, color: 'primary.main' }}>
                <Button onClick={() => navigate("/admin")}>Dashboard</Button>
                  Promote Students
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
      <StyledCard sx={{ maxWidth: 1200, mx: 'auto' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Select Students to Remove
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Select a program, section, and semester to view students. Review the list and click "Remove Students" to delete them.
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
          {students.length > 0 && (
            <StyledCard sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Removal Summary
                </Typography>
                <Typography>
                  <strong>Students to Remove:</strong> {students.length}
                </Typography>
                <Typography>
                  <strong>Program:</strong>{' '}
                  {selectedProgram && programs.find((p) => p.id === parseInt(selectedProgram))?.name || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Section:</strong>{' '}
                  {selectedSection && sections.find((s) => s.id === parseInt(selectedSection))
                    ? `${sections.find((s) => s.id === parseInt(selectedSection)).name} (Year ${sections.find((s) => s.id === parseInt(selectedSection)).year})`
                    : 'N/A'}
                </Typography>
                <Typography>
                  <strong>Semester:</strong> {selectedSemester || 'N/A'}
                </Typography>
              </CardContent>
            </StyledCard>
          )}
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
                    <TableCell sx={{ color: '#fff' }}>Program</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Section</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.roll_number}</TableCell>
                      <TableCell>{`${student.first_name} ${student.last_name || ''}`}</TableCell>
                      <TableCell>{student.section?.program?.name || 'N/A'}</TableCell>
                      <TableCell>{student.section?.name ? `${student.section.name} (Year ${student.section.year})` : 'N/A'}</TableCell>
                      <TableCell>{student.semester}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenConfirm(true)}
                disabled={loading || !students.length}
                sx={{ mt: 2 }}
              >
                Remove Students
              </Button>
            </>
          ) : (
            <Typography color="textSecondary">
              No students found for the selected program, section, and semester.
            </Typography>
          )}
        </CardContent>
      </StyledCard>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Student Removal</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove {students.length} student(s) from{' '}
            {selectedProgram && programs.find((p) => p.id === parseInt(selectedProgram))?.name || 'N/A'},{' '}
            {selectedSection && sections.find((s) => s.id === parseInt(selectedSection))
              ? `${sections.find((s) => s.id === parseInt(selectedSection)).name} (Year ${sections.find((s) => s.id === parseInt(selectedSection)).year})`
              : 'N/A'}, Semester {selectedSemester || 'N/A'}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={removeStudents} variant="contained" color="error" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

export default RemoveStudents;