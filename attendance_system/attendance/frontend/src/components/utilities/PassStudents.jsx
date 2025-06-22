import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Box, Button, FormControl, FormHelperText, InputLabel, Select, MenuItem, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Card, CardContent, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Grid,
  } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
  marginBottom: theme.spacing(3),
}));

function PassStudents({ notifyUser }) {
  const [programs, setPrograms] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [targetSections, setTargetSections] = useState([]);
  const [targetSemesters, setTargetSemesters] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedTargetSection, setSelectedTargetSection] = useState('');
  const [selectedTargetSemester, setSelectedTargetSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

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

  // Fetch target sections for program
  const fetchTargetSections = async (programId) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/sections-for-program/?program_id=${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTargetSections(response.data);
    } catch (err) {
      console.error('Error fetching target sections:', err.response || err);
      setError('Failed to load target sections');
      notifyUser('Failed to load target sections', 'error');
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

  // Generate target semesters based on program
  const generateTargetSemesters = (programId) => {
    const maxSemester = programId === 2 ? 6 : 10;
    const semesters = Array.from({ length: maxSemester }, (_, i) => i + 1);
    setTargetSemesters(semesters);
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
      // Handle both paginated and non-paginated responses
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

  // Pass students
  const passStudents = async () => {
    if (!students.length) {
      setError('No students to pass');
      notifyUser('No students selected', 'warning');
      setOpenConfirm(false);
      return;
    }
    if (!selectedTargetSemester || !selectedTargetSection) {
      setError('Please select target semester and section');
      notifyUser('Please select target semester and section', 'warning');
      setOpenConfirm(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const updatedStudents = students.map((student) => ({
        id: student.id,
        semester: parseInt(selectedTargetSemester),
        section_id: parseInt(selectedTargetSection),
      }));

      console.log('Sending promotion payload:', updatedStudents);
      const response = await axios.post('http://localhost:8000/api/students/pass/', updatedStudents, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Pass students response:', response.data);
      notifyUser(`Successfully passed ${response.data.updated} students`, 'success');
      setStudents([]);
      setSelectedProgram('');
      setSelectedSection('');
      setSelectedSemester('');
      setSelectedTargetSection('');
      setSelectedTargetSemester('');
      setSemesters([]);
      setTargetSemesters([]);
      setSections([]);
      setTargetSections([]);
      setOpenConfirm(false);
      setError('');
    } catch (err) {
      console.error('Error passing students:', err.response || err);
      setError(err.response?.data?.error || 'Failed to pass students');
      notifyUser('Failed to pass students', 'error');
      setOpenConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  // Get promotion details for display
  const getPromotionDetails = (student) => {
    if (!student.section) {
      return {
        nextSemester: selectedTargetSemester || student.semester + 1,
        nextSection: selectedTargetSection ? targetSections.find((s) => s.id === parseInt(selectedTargetSection))?.name || 'Unknown' : 'Unknown',
      };
    }

    const programId = student.section.program?.id || 0;
    const maxSemester = programId === 2 ? 6 : 10;
    const nextSemester = selectedTargetSemester ? parseInt(selectedTargetSemester) : student.semester + 1;

    if (nextSemester > maxSemester) {
      return { nextSemester: 'Graduated', nextSection: 'N/A' };
    }

    const targetSection = targetSections.find((s) => s.id === parseInt(selectedTargetSection));
    return {
      nextSemester,
      nextSection: targetSection ? `${targetSection.name} (Year ${targetSection.year})` : 'No Section Selected',
    };
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    setSelectedSection('');
    setSelectedSemester('');
    setSelectedTargetSection('');
    setSelectedTargetSemester('');
    setSections([]);
    setSemesters([]);
    setTargetSections([]);
    setTargetSemesters([]);
    setStudents([]);
    if (selectedProgram) {
      fetchSections(selectedProgram);
      fetchTargetSections(selectedProgram);
      generateTargetSemesters(selectedProgram);
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
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
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
            Select Students to Promote
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Select a program, section, and semester to view students. Choose target semester and section, then click "Promote Students".
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedProgram}>
                <InputLabel id="section-label">Current Section</InputLabel>
                <Select
                  labelId="section-label"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  label="Current Section"
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
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedSection}>
                <InputLabel id="semester-label">Current Semester</InputLabel>
                <Select
                  labelId="semester-label"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  label="Current Semester"
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
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedProgram}>
                <InputLabel id="target-semester-label">Target Semester</InputLabel>
                <Select
                  labelId="target-semester-label"
                  value={selectedTargetSemester}
                  onChange={(e) => setSelectedTargetSemester(e.target.value)}
                  label="Target Semester"
                >
                  <MenuItem value="">Select Target Semester</MenuItem>
                  {targetSemesters.map((sem) => (
                    <MenuItem key={sem} value={sem}>
                      Semester {sem}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select semester to promote to</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedProgram}>
                <InputLabel id="target-section-label">Target Section</InputLabel>
                <Select
                  labelId="target-section-label"
                  value={selectedTargetSection}
                  onChange={(e) => setSelectedTargetSection(e.target.value)}
                  label="Target Section"
                >
                  <MenuItem value="">Select Target Section</MenuItem>
                  {targetSections.map((section) => (
                    <MenuItem key={section.id} value={section.id}>
                      {section.name} (Year {section.year})
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Choose section to promote to</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          {students.length > 0 && (
            <StyledCard sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Promotion Summary
                </Typography>
                <Typography>
                  <strong>Students to Promote:</strong> {students.length}
                </Typography>
                <Typography>
                  <strong>Current Semester:</strong> {selectedSemester || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Target Semester:</strong> {selectedTargetSemester || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Target Section:</strong>{' '}
                  {selectedTargetSection && targetSections.find((s) => s.id === parseInt(selectedTargetSection))
                    ? `${targetSections.find((s) => s.id === parseInt(selectedTargetSection)).name} (Year ${targetSections.find((s) => s.id === parseInt(selectedTargetSection)).year})`
                    : 'N/A'}
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
                    <TableCell sx={{ color: '#fff' }}>Current Semester</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Target Semester</TableCell>
                    <TableCell sx={{ color: '#fff' }}>Target Section</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => {
                    const { nextSemester, nextSection } = getPromotionDetails(student);
                    return (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.roll_number}</TableCell>
                        <TableCell>{`${student.first_name} ${student.last_name || ''}`}</TableCell>
                        <TableCell>{student.section?.program?.name || 'N/A'}</TableCell>
                        <TableCell>{student.section?.name ? `${student.section.name} (Year ${student.section.year})` : 'N/A'}</TableCell>
                        <TableCell>{student.semester}</TableCell>
                        <TableCell>{nextSemester}</TableCell>
                        <TableCell>{nextSection}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Button
                variant="contained"
                onClick={() => setOpenConfirm(true)}
                disabled={loading || !students.length || !selectedTargetSemester || !selectedTargetSection}
                sx={{ mt: 2 }}
              >
                Promote Students
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
        <DialogTitle>Confirm Student Promotion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to promote {students.length} student(s) to Semester {selectedTargetSemester} in Section{' '}
            {selectedTargetSection && targetSections.find((s) => s.id === parseInt(selectedTargetSection))
              ? `${targetSections.find((s) => s.id === parseInt(selectedTargetSection)).name} (Year ${targetSections.find((s) => s.id === parseInt(selectedTargetSection)).year})`
              : 'N/A'}?
            {students.some((s) => getPromotionDetails(s).nextSemester === 'Graduated') && (
              <Typography color="warning.main" sx={{ mt: 1 }}>
                Note: Some students may have reached the final semester and will be marked as Graduated.
              </Typography>
            )}
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