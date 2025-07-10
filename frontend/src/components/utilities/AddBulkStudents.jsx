import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, TextField, CircularProgress, Grid, Paper, FormHelperText } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

function AddBulkStudents({ notifyUser }) {
  const [programs, setPrograms] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  // Fetch sections based on program
  const fetchSections = async (programId) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/sections-for-program/?program_id=${programId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      setSections(response.data);
    } catch (err) {
      setError('Failed to load sections');
      notifyUser('Failed to load sections', 'error');
    }
  };

  // Generate semesters based on section year
  const generateSemesters = (year) => {
    const semesters = [];
    if (year >= 1 && year <= 5) {
      semesters.push(year * 2 - 1, year * 2);
    }
    setSemesters(semesters);
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      notifyUser('Invalid file type', 'error');
      return;
    }

    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB');
      notifyUser('File too large', 'error');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  // Process and upload file
  const processFile = async () => {
    if (!file || !selectedProgram || !selectedSection || !selectedSemester) {
      setError('Please select program, section, semester, and upload a file');
      notifyUser('Missing required fields', 'warning');
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Validate data
        const requiredFields = ['id', 'first_name', 'roll_number'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const students = [];
        const errors = [];

        jsonData.forEach((row, index) => {
          const rowNum = index + 2; // Account for header
          const student = {};

          // Check required fields
          for (const field of requiredFields) {
            if (!row[field] && row[field] !== 0) {
              errors.push(`Row ${rowNum}: Missing ${field}`);
              return;
            }
            student[field] = row[field];
          }

          // Validate id
          if (!Number.isInteger(Number(student.id))) {
            errors.push(`Row ${rowNum}: Invalid id (must be an integer)`);
            return;
          }

          // Validate roll_number
          if (typeof student.roll_number !== 'string' || student.roll_number.trim() === '') {
            errors.push(`Row ${rowNum}: Invalid roll_number (must be non-empty)`);
            return;
          }

          // Validate email if provided
          if (row.email && !emailRegex.test(row.email)) {
            errors.push(`Row ${rowNum}: Invalid email format`);
            return;
          }

          student.last_name = row.last_name || '';
          student.email = row.email || '';
          student.phone = row.phone || '';
          student.section_id = parseInt(selectedSection);
          student.semester = parseInt(selectedSemester);

          students.push(student);
        });

        if (errors.length > 0) {
          setError(errors.join('; '));
          notifyUser('Validation errors in file', 'error');
          setLoading(false);
          return;
        }

        // Check for duplicate IDs
        const idSet = new Set(students.map(s => s.id));
        if (idSet.size !== students.length) {
          setError('Duplicate student IDs found in file');
          notifyUser('Duplicate IDs in file', 'error');
          setLoading(false);
          return;
        }

        // Send to backend
        try {
          const token = localStorage.getItem('access_token');
          const response = await axios.post('http://localhost:8000/api/students/bulk/', students, {
            headers: { Authorization: `Bearer ${token}` },
          });
          notifyUser(`Successfully added ${response.data.added} students`, 'success');
          setFile(null);
          setSelectedProgram('');
          setSelectedSection('');
          setSelectedSemester('');
          setSections([]);
          setSemesters([]);
          setError('');
        } catch (err) {
          setError(err.response?.data?.error || 'Failed to upload students');
          notifyUser('Failed to upload students', 'error');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError('Error processing file');
      notifyUser('Error processing file', 'error');
      setLoading(false);
    }
  };

  // Download sample template
  const downloadTemplate = () => {
    const template = [
      {
        id: 1001,
        first_name: 'John',
        last_name: 'Doe',
        roll_number: 'BALLB501',
        email: 'john@example.com',
        phone: '1234567890',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_template.xlsx');
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    setSelectedSection('');
    setSelectedSemester('');
    setSections([]);
    setSemesters([]);
    if (selectedProgram) {
      fetchSections(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    setSelectedSemester('');
    setSemesters([]);
    if (selectedSection) {
      const section = sections.find(s => s.id === parseInt(selectedSection));
      if (section) {
        generateSemesters(section.year);
      }
    }
  }, [selectedSection]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
        Add Bulk Students
      </Typography> */}

                 <Typography textAlign={"center"} variant="h4" sx={{ mb: 5, color: 'primary.main' }}>
                      <Button onClick={() => navigate("/admin")}>Dashboard</Button>
                        Add Bulk Students
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
      <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upload Student Data
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Select a program, section, and semester, then upload a CSV or Excel file. Required columns: <strong>id</strong> (unique integer), <strong>first_name</strong>, <strong>roll_number</strong>. Optional: <strong>last_name</strong>, <strong>email</strong>, <strong>phone</strong>.
        </Typography>
        <Grid container spacing={2}>
          <Grid>
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
          <Grid>
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
          <Grid>
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
          <Grid>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={downloadTemplate}
                sx={{ flexShrink: 0 }}
              >
                Download Sample
              </Button>
              <TextField
                type="file"
                inputProps={{ accept: '.csv,.xlsx,.xls' }}
                onChange={handleFileChange}
                label="Upload CSV/Excel File"
                InputLabelProps={{ shrink: true }}
                sx={{ flexGrow: 1, minWidth: 200 }}
              />
              <Button
                variant="contained"
                onClick={processFile}
                disabled={loading || !file || !selectedProgram || !selectedSection || !selectedSemester}
                sx={{ flexShrink: 0 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Upload Students'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <ToastContainer />
    </Box>
  );
}

export default AddBulkStudents;