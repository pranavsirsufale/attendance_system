// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Grid, Box, FormControl, InputLabel, Select, MenuItem, Typography, Table, TableBody, TableCell, TableHead,
//   TableRow, TablePagination, Paper, FormHelperText, CircularProgress, TextField,
// } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion, AnimatePresence } from 'framer-motion';
// import Button from '../utilities/Button';

// function StudentProfile({ notifyUser }) {
//   const [programs, setPrograms] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedProgram, setSelectedProgram] = useState('');
//   const [selectedSection, setSelectedSection] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [students, setStudents] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const rowsPerPage = 20;
//   const navigate = useNavigate();

//   if (error && error !== '') {
//     notifyUser(error, 'error');
//     setError('');
//   }

//   // Fetch programs
//   const fetchPrograms = async () => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       setError('Please log in first');
//       notifyUser('Please log in first', 'warning');
//       return;
//     }
//     try {
//       const response = await axios.get('http://localhost:8000/api/programs/', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(response)
//       setPrograms(response.data);
//     } catch (err) {
//       setError('Failed to load programs');
//       notifyUser('Failed to load programs', 'error');
//     }
//   };

//   // Fetch sections
//   const fetchSections = async (programId) => {
//     const token = localStorage.getItem('access_token');
//     try {
//       const response = await axios.get(`http://localhost:8000/api/sections-for-program/?program_id=${programId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSections(response.data);
//       console.log(response)
//     } catch (err) {
//       setError('Failed to load sections');
//       notifyUser('Failed to load sections', 'error');
//     }
//   };

//   // Fetch semesters
//   const fetchSemesters = async (sectionId) => {
//     const token = localStorage.getItem('access_token');
//     try {
//       const response = await axios.get(`http://localhost:8000/api/semesters-for-section/?section_id=${sectionId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.status == 200) {
//         setSemesters(response.data.semesters);
//         console.log(response)
//       }
//     } catch (err) {
//       setError('Failed to load semesters');
//       notifyUser('Failed to load semesters', 'error');
//     }
//   };

//   // Fetch students and subjects
//   const fetchStudentAttendance = async (newPage = 0) => {
//     if (!selectedProgram || !selectedSection || !selectedSemester) return;
//     setLoading(true);
//     const token = localStorage.getItem('access_token');
//     try {
//       const params = {
//         program_id: selectedProgram,
//         section_id: selectedSection,
//         semester: selectedSemester,
//         page: newPage + 1,
//         page_size: rowsPerPage,
//       };
//       if (startDate && endDate) {
//         params.start_date = startDate;
//         params.end_date = endDate;
//       }
//       const response = await axios.get(`http://localhost:8000/api/student-attendance/`, {
//         params,
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(response)
//       if (response.status == 200){
//         const data = response.data;
//         if (data.count > 0 ){
//           setSubjects(data.results.subjects);
//           setStudents(data.results.students);
//           setTotalCount(data.count);
//           setPage(newPage);
//         } else notifyUser('No records found for the selected semester.', 'warning');
//         }
//     } catch (err) {
//       setError(err.message || 'Failed to load student attendance');
//       notifyUser('Failed to load student attendance', 'error');
//       setStudents([]);
//       setSubjects([]);
//       setTotalCount(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     fetchStudentAttendance(newPage);
//   };

//   // Handle row click
//   const handleRowClick = (studentId) => {
//     navigate(`/admin/student/${studentId}`);
//   };

//   // Validate date range
//   const validateDateRange = () => {
//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       if (start > end) {
//         setError('Start date must be before end date');
//         notifyUser('Start date must be before end date', 'error');
//         return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     fetchPrograms();
//   }, []);

//   useEffect(() => {
//     setSelectedSection('');
//     setSelectedSemester('');
//     setSections([]);
//     setSemesters([]);
//     setStudents([]);
//     setSubjects([]);
//     setStartDate('');
//     setEndDate('');
//     setPage(0);
//     setTotalCount(0);
//     if (selectedProgram) {
//       fetchSections(selectedProgram);
//     }
//   }, [selectedProgram]);

//   useEffect(() => {
//     setSelectedSemester('');
//     setSemesters([]);
//     setStudents([]);
//     setSubjects([]);
//     setStartDate('');
//     setEndDate('');
//     setPage(0);
//     setTotalCount(0);
//     if (selectedSection) {
//       fetchSemesters(selectedSection);
//     }
//   }, [selectedSection]);

//   useEffect(() => {
//     setStudents([]);
//     setSubjects([]);
//     setStartDate('');
//     setEndDate('');
//     setPage(0);
//     setTotalCount(0);
//     if (selectedProgram && selectedSection && selectedSemester && validateDateRange()) {
//       fetchStudentAttendance(0);
//     }
//   }, [selectedProgram, selectedSection, selectedSemester, startDate, endDate]);

//   return (
//     <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
//       <Typography textAlign="center" variant="h4" sx={{ mb: 5, color: 'primary.main' }}>
//         <Button onClick={() => navigate('/admin')}>Dashboard</Button>
//         Student Profiles
//       </Typography>
//       <AnimatePresence>
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             style={{ backgroundColor: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}
//           >
//             <Typography color="error">{error}</Typography>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Select Students
//         </Typography>
//         <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
//           Select a program, section, semester, and optional date range to view student profiles with subject-wise attendance.
//         </Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid>
//             <FormControl fullWidth sx={{ minWidth: 120 }}>
//               <InputLabel id="program-label">Program</InputLabel>
//               <Select
//                 labelId="program-label"
//                 value={selectedProgram}
//                 onChange={(e) => setSelectedProgram(e.target.value)}
//                 label="Program"
//               >
//                 <MenuItem value="">Select Program</MenuItem>
//                 {programs.map((program) => (
//                   <MenuItem key={program.id} value={program.id}>
//                     {program.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <FormHelperText>Select a program to filter sections</FormHelperText>
//             </FormControl>
//           </Grid>
//           <Grid>
//             <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedProgram}>
//               <InputLabel id="section-label">Section</InputLabel>
//               <Select
//                 labelId="section-label"
//                 value={selectedSection}
//                 onChange={(e) => setSelectedSection(e.target.value)}
//                 label="Section"
//               >
//                 <MenuItem value="">Select Section</MenuItem>
//                 {sections.map((section) => (
//                   <MenuItem key={section.id} value={section.id}>
//                     {section.name} (Year {section.year})
//                   </MenuItem>
//                 ))}
//               </Select>
//               <FormHelperText>Choose a section for the program</FormHelperText>
//             </FormControl>
//           </Grid>
//           <Grid>
//             <FormControl fullWidth sx={{ minWidth: 120 }} disabled={!selectedSection}>
//               <InputLabel id="semester-label">Semester</InputLabel>
//               <Select
//                 labelId="semester-label"
//                 value={selectedSemester}
//                 onChange={(e) => setSelectedSemester(e.target.value)}
//                 label="Semester"
//               >
//                 <MenuItem value="">Select Semester</MenuItem>
//                 {semesters.map((sem) => (
//                   <MenuItem key={sem} value={sem}>
//                     Semester {sem}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <FormHelperText>Select semester based on year</FormHelperText>
//             </FormControl>
//           </Grid>
//           <Grid>
//             <TextField
//               fullWidth
//               label="Start Date"
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               helperText="Optional: Select start date"
//             />
//           </Grid>
//           <Grid>
//             <TextField
//               fullWidth
//               label="End Date"
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               helperText="Optional: Select end date"
//             />
//           </Grid>
//         </Grid>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : students.length > 0 && subjects.length > 0 ? (
//           <>
//             <Table sx={{ mb: 3, minWidth: 650, overflowX: 'auto' }}>
//               <TableHead>
//                 <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
//                   <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
//                   <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Roll Number</TableCell>
//                   <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
//                   {subjects.map((subject) => (
//                     <TableCell key={subject.id} sx={{ color: '#fff', fontWeight: 'bold' }}>
//                       {subject.name} (Attended/Total)
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {students.map((student) => (
//                   <TableRow
//                     key={student.id}
//                     onClick={() => handleRowClick(student.id)}
//                     sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
//                   >
//                     <TableCell>{student.id}</TableCell>
//                     <TableCell>{student.roll_number}</TableCell>
//                     <TableCell>{student.name}</TableCell>
//                     {subjects.map((subject) => {
//                       const attendance = student.attendance.find(
//                         (att) => att.subject_id === subject.id
//                       ) || { classes_attended: 0, total_classes: 0 };
//                       return (
//                         <TableCell key={subject.id}>
//                           {attendance.classes_attended}/{attendance.total_classes}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               component="div"
//               count={totalCount}
//               page={page}
//               onPageChange={handleChangePage}
//               rowsPerPage={rowsPerPage}
//               rowsPerPageOptions={[rowsPerPage]}
//             />
//           </>
//         ) : (
//           <Typography color="textSecondary">
//             {subjects.length === 0
//               ? 'No subjects found for the selected program, section, and semester.'
//               : 'No students found for the selected program, section, and semester.'}
//           </Typography>
//         )}
//       </Paper>
//       <ToastContainer />
//     </Box>
//   );
// }

// export default StudentProfile;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid, Box, FormControl, InputLabel, Select, MenuItem, Typography, Table, TableBody, TableCell, TableHead,
  TableRow, TablePagination, Paper, FormHelperText, CircularProgress, TextField, Button as MuiButton
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../utilities/Button';

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
  // const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const rowsPerPage = 20;
  const navigate = useNavigate();

  if (error && error !== '') {
    notifyUser(error, 'error');
    setError('');
  }

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

  // Fetch semesters
  const fetchSemesters = async (sectionId) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://localhost:8000/api/semesters-for-section/?section_id=${sectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setSemesters(response.data.semesters);
      }
    } catch (err) {
      setError('Failed to load semesters');
      notifyUser('Failed to load semesters', 'error');
    }
  };

  // Fetch students and subjects
  const fetchStudentAttendance = async (newPage = 0) => {
    if (!selectedProgram || !selectedSection || !selectedSemester) return;
    if (!validateDateRange()) return;
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const params = {
        program_id: selectedProgram,
        section_id: selectedSection,
        semester: selectedSemester,
        page: newPage + 1,
        page_size: rowsPerPage,
      };
      if (startDate && endDate) {
        params.start_date = startDate;
        params.end_date = endDate;
      }
      const response = await axios.get(`http://localhost:8000/api/student-attendance/`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const data = response.data;
        if (data.count > 0) {
          setSubjects(data.results.subjects);
          setStudents(data.results.students);
          setTotalCount(data.count);
          if (startDate && endDate) {
          notifyUser(`Successfully retreived ${data.count} records, from ${startDate} to ${endDate}`, 'success')
          }else {
            notifyUser(`Successfully retreived ${data.count} records`, 'success')
          }
          // setPage(newPage);
        } else {
          notifyUser('No records found for the selected criteria.', 'warning');
          setSubjects([]);
          setStudents([]);
          setTotalCount(0);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load student attendance');
      notifyUser('Failed to load student attendance', 'error');
      setStudents([]);
      setSubjects([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };


  const handleChangePage = (event, newPage) => {
    fetchStudentAttendance(newPage);
  };

  const handleRowClick = (studentId) => {
    navigate(`/admin/student/${studentId}`);
  };

  const validateDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        setError('Start date must be before end date');
        notifyUser('Start date must be before end date', 'error');
        return false;
      }
    }
    return true;
  };

  // Handle apply date range
  const handleApplyDateRange = () => {
    if (selectedProgram && selectedSection && selectedSemester && validateDateRange()) {
      fetchStudentAttendance(0);
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
    setSubjects([]);
    // setPage(0);
    setTotalCount(0);
    if (selectedProgram) {
      fetchSections(selectedProgram);
    }
  }, [selectedProgram]);

  useEffect(() => {
    setSelectedSemester('');
    setSemesters([]);
    setStudents([]);
    setSubjects([]);
    // setPage(0);
    setTotalCount(0);
    if (selectedSection) {
      fetchSemesters(selectedSection);
    }
  }, [selectedSection]);

  useEffect(() => {
    setStudents([]);
    setSubjects([]);
    // setPage(0);
    setTotalCount(0);
    if (selectedProgram && selectedSection && selectedSemester && validateDateRange()) {
      fetchStudentAttendance(0);
    }
  }, [selectedProgram, selectedSection, selectedSemester]);

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography textAlign="center" variant="h4" sx={{ mb: 5, color: 'primary.main' }}>
        <Button onClick={() => navigate('/admin')}>Dashboard</Button>
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
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Students
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Select a program, section, semester, and optional date range to view student profiles with subject-wise attendance.
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
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
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              helperText="Optional: Select start date"
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              helperText="Optional: Select end date"
            />
          </Grid>
          <Grid>
            <MuiButton
              variant="contained"
              onClick={handleApplyDateRange}
              disabled={!selectedProgram || !selectedSection || !selectedSemester}
              sx={{ mt: 1 }}
            >
              Apply Date Range
            </MuiButton>
          </Grid>
        </Grid>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : students.length > 0 && subjects.length > 0 ? (
          <>
            <Table sx={{ mb: 3, minWidth: 650, overflowX: 'auto' }}>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold'}}>Sr</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Roll Number</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                  {subjects.map((subject) => (
                    <TableCell key={subject.id} sx={{ color: '#fff', fontWeight: 'bold' }}>
                      {subject.name} (Attended/Total)
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow
                    key={student.id}
                    onClick={() => handleRowClick(student.id)}
                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                  >
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.roll_number}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    {subjects.map((subject) => {
                      const attendance = student.attendance.find(
                        (att) => att.subject_id === subject.id
                      ) || { classes_attended: 0, total_classes: 0 };
                      return (
                        <TableCell key={subject.id}>
                          {attendance.classes_attended}/{attendance.total_classes}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            {/* <TableRow
              component="div"
              totalCount
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[rowsPerPage]}
              /> */}
          </>
        ) : (
          <Typography color="textSecondary">
            {subjects.length === 0
              ? 'No subjects found for the selected program, section, and semester.'
              : 'No students found for the selected program, section, and semester.'}
          </Typography>
        )}
      </Paper>
      <ToastContainer />
    </Box>
  );
}

export default StudentProfile;
