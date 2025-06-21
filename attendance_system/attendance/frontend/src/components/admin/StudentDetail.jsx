// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Stack,

//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   CircularProgress,
// } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion, AnimatePresence } from 'framer-motion';
// import { styled } from '@mui/material/styles';
// import SchoolIcon from '@mui/icons-material/School';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import { deepPurple, teal } from '@mui/material/colors';

// function StudentDetail({ notifyUser }) {
//   const { studentId } = useParams();
//   const id = parseInt(studentId, 10);
//   const navigate = useNavigate();
//   const [student, setStudent] = useState(null);
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch student details and attendance
//   const fetchStudentDetails = async () => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       setError('Please log in first');
//       notifyUser('Please log in first', 'warning');
//       return;
//     }
//     try {
//       const response = await axios.get(`http://localhost:8000/api/student-details/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Student details response:', response);
//       setStudent(response.data.student);
//       setAttendance(response.data.attendance);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to load student details');
//       notifyUser('Failed to load student details', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudentDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
//         <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
//           Student Profile
//         </Typography>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!student) {
//     return (
//       <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
//         <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
//           Student Profile
//         </Typography>
//         <Typography color="textSecondary">Student not found.</Typography>
//       </Box>
//     );
//   }

//   // Calculate overall attendance
//   const overall = attendance.reduce(
//     (acc, att) => ({
//       attended: acc.attended + att.classes_attended,
//       total: acc.total + att.total_classes,
//     }),
//     { attended: 0, total: 0 }
//   );
//   const overallPercentage = overall.total > 0 ? ((overall.attended / overall.total) * 100).toFixed(2) : 0;

//   return (
//     <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
//         Student Profile: {student.first_name} {student.last_name || ''}
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
//       <Button
//         variant="outlined"
//         onClick={() => navigate('/admin/student-profiles')}
//         sx={{ mb: 3 }}
//       >
//         Back to Student List
//       </Button>

//       <Grid container spacing={3}>


//         <Grid item xs={12} md={6}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Personal Information
//               </Typography>
//               <Typography><strong>Name:</strong> {student.first_name} {student.last_name || ''}</Typography>
//               <Typography><strong>ID:</strong> {student.id}</Typography>
//               <Typography><strong>Roll Number:</strong> {student.roll_number}</Typography>
//               <Typography><strong>Section:</strong> {student.section}</Typography>
//               <Typography><strong>Semester:</strong> {student.semester}</Typography>
//               <Typography><strong>Email:</strong> {student.email || 'N/A'}</Typography>
//               <Typography><strong>Phone:</strong> {student.phone || 'N/A'}</Typography>
//               {/* <Typography><strong>Subjects:</strong> {student.subjects.length > 0 ? student.subjects.join(', ') : 'None'}</Typography> */}
//             </CardContent>
//           </Card>
//         </Grid>


//         <Grid item xs={12} md={6}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Overall Attendance
//               </Typography>
//               <Typography><strong>Classes Attended:</strong> {overall.attended}</Typography>
//               <Typography><strong>Total Classes:</strong> {overall.total}</Typography>
//               <Typography><strong>Percentage:</strong> {overallPercentage}%</Typography>
//             </CardContent>
//           </Card>
//         </Grid>




//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Subject-wise Attendance
//               </Typography>
//               {attendance.length > 0 ? (
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
//                       <TableCell sx={{ color: '#fff' }}>Subject</TableCell>
//                       <TableCell sx={{ color: '#fff' }}>Classes Attended</TableCell>
//                       <TableCell sx={{ color: '#fff' }}>Total Classes</TableCell>
//                       <TableCell sx={{ color: '#fff' }}>Percentage</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {attendance.map((att) => (
//                       <TableRow key={att.subject_id}>
//                         <TableCell>{att.subject_name}</TableCell>
//                         <TableCell>{att.classes_attended}</TableCell>
//                         <TableCell>{att.total_classes}</TableCell>
//                         <TableCell>
//                           {att.total_classes > 0
//                             ? ((att.classes_attended / att.total_classes) * 100).toFixed(2)
//                             : 0}
//                           %
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               ) : (
//                 <Typography>No attendance records found.</Typography>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <ToastContainer />
//     </Box>
//   );
// }

// export default StudentDetail;





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, startOfWeek, startOfMonth, addWeeks, addMonths } from 'date-fns';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
}));

function StudentDetail({ notifyUser }) {
  const { studentId } = useParams();
  const id = parseInt(studentId, 10);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch student details and attendance
  const fetchStudentDetails = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }
    try {
      const params = {};
      if (filterType === 'daily' && selectedDate) {
        params.date = format(selectedDate, 'yyyy-MM-dd');
      } else if (filterType === 'weekly' && selectedWeek) {
        params.week = format(selectedWeek, 'yyyy-MM-dd');
      } else if (filterType === 'monthly' && selectedMonth) {
        params.month = format(selectedMonth, 'yyyy-MM');
      } else if (filterType === 'semester') {
        params.semester = true;
      } else if (filterType === 'custom' && startDate && endDate) {
        params.start_date = format(startDate, 'yyyy-MM-dd');
        params.end_date = format(endDate, 'yyyy-MM-dd');
      }
      const response = await axios.get(`http://localhost:8000/api/student-details/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setStudent(response.data.student);
      setAttendance(response.data.attendance);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load student details');
      notifyUser('Failed to load student details', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [id, filterType, selectedDate, selectedWeek, selectedMonth, startDate, endDate]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterType(value);
    setSelectedDate(null);
    setSelectedWeek(null);
    setSelectedMonth(null);
    setStartDate(null);
    setEndDate(null);
  };

  // Calculate overall attendance
  const overall = attendance.reduce(
    (acc, att) => ({
      attended: acc.attended + att.classes_attended,
      total: acc.total + att.total_classes,
    }),
    { attended: 0, total: 0 }
  );
  const overallPercentage = overall.total > 0 ? ((overall.attended / overall.total) * 100).toFixed(2) : 0;

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
        Student Report Card: {student?.first_name} {student?.last_name || ''}
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
      <Button
        variant="outlined"
        onClick={() => navigate('/admin/student-profiles')}
        sx={{ mb: 3 }}
      >
        Back to Student List
      </Button>

      <StyledCard sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Attendance Filter
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="filter-type-label">Filter Type</InputLabel>
                <Select
                  labelId="filter-type-label"
                  value={filterType}
                  onChange={handleFilterChange}
                  label="Filter Type"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="semester">Semester</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {filterType === 'daily' && (
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {filterType === 'weekly' && (
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Week Start"
                    value={selectedWeek}
                    onChange={(newValue) => setSelectedWeek(newValue ? startOfWeek(newValue) : null)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {filterType === 'monthly' && (
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Month"
                    views={['year', 'month']}
                    value={selectedMonth}
                    onChange={(newValue) => setSelectedMonth(newValue ? startOfMonth(newValue) : null)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {filterType === 'custom' && (
              <>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </StyledCard>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Personal Information
                </Typography>
                <Stack spacing={1}>
                  <Typography><strong>Name:</strong> {student.first_name} {student.last_name || ''}</Typography>
                  <Typography><strong>ID:</strong> {student.id}</Typography>
                  <Typography><strong>Roll Number:</strong> {student.roll_number}</Typography>
                  <Typography><strong>Section:</strong> {student.section}</Typography>
                  <Typography><strong>Semester:</strong> {student.semester}</Typography>
                  <Typography><strong>Email:</strong> {student.email || 'N/A'}</Typography>
                  <Typography><strong>Phone:</strong> {student.phone || 'N/A'}</Typography>
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Overall Attendance ({filterType.charAt(0).toUpperCase() + filterType.slice(1)})
                </Typography>
                <Typography><strong>Classes Attended:</strong> {overall.attended}</Typography>
                <Typography><strong>Total Classes:</strong> {overall.total}</Typography>
                <Typography><strong>Percentage:</strong> {overallPercentage}%</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Subject-wise Attendance
                </Typography>
                {attendance.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                        <TableCell sx={{ color: '#fff' }}>Subject</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Classes Attended</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Total Classes</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendance.map((att) => (
                        <TableRow key={att.subject_id}>
                          <TableCell>{att.subject_name}</TableCell>
                          <TableCell>{att.classes_attended}</TableCell>
                          <TableCell>{att.total_classes}</TableCell>
                          <TableCell>
                            {att.total_classes > 0
                              ? ((att.classes_attended / att.total_classes) * 100).toFixed(2)
                              : 0}
                            %
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>No attendance records found for the selected period.</Typography>
                )}
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      )}
      <ToastContainer />
    </Box>
  );
}

export default StudentDetail;