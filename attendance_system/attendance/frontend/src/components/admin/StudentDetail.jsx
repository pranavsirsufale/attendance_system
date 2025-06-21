

          {/* <Grid item xs={12} md={6}>
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
          </Grid> */}







/*



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






  // Define a styled component for the card to get the custom background and border
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2, // More rounded corners
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)', // Softer, more pronounced shadow
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)', // Subtle lift on hover
  },
  // Gradient background similar to Melati image
  background: 'linear-gradient(135deg, #f0f0f5 0%, #ffffff 100%)',
  border: '1px solid rgba(224, 224, 224, 0.6)', // Lighter border
}));

// Define a styled component for the circular image/logo container
const LogoContainer = styled(Box)(({ theme }) => ({
  width: 140, // Fixed width
  height: 140, // Fixed height
  borderRadius: '50%', // Circular shape
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // Gradient border similar to Melati image circle
  background: 'linear-gradient(45deg, #a7b7e5, #e0a7e5, #f5d1b3)',
  padding: '3px', // Creates the border effect
  flexShrink: 0, // Prevents shrinking when content is large
  '& .inner-circle': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#ffffff', // Inner white circle background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Example: A simple text logo or icon
    fontSize: '3rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main, // Primary color for the text logo
    // Add specific styles for the logo here, e.g., a custom SVG icon
  },
}));




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


// Grid was here



  <Grid item xs={12} md={6}>
    <StyledCard>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 3, sm: 5 } }}>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="overline" // Smaller, uppercase for "HELLO THERE..." feel
              sx={{ color: 'text.secondary', letterSpacing: '0.1em', mb: 0.5 }}
            >
              STUDENT PROFILE
            </Typography>
            <Typography
              variant="h3" // Larger for "Melati" like name
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 3, // More space below the prominent name
                fontFamily: 'serif' // Or a custom elegant font if loaded
              }}
            >
              {student.first_name} {student.last_name || ''}
            </Typography>

            <Stack spacing={1.5}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <Typography component="span" fontWeight="bold" color="text.primary">ID:</Typography>{' '}
                {student.id || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <Typography component="span" fontWeight="bold" color="text.primary">Roll Number:</Typography>{' '}
                {student.roll_number || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <Typography component="span" fontWeight="bold" color="text.primary">Section:</Typography>{' '}
                {student.section || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <Typography component="span" fontWeight="bold" color="text.primary">Semester:</Typography>{' '}
                {student.semester || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <Typography component="span" fontWeight="bold" color="text.primary">Email:</Typography>{' '}
                {student.email || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <Typography component="span" fontWeight="bold" color="text.primary">Phone:</Typography>{' '}
                {student.phone || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <Typography component="span" fontWeight="bold" color="text.primary">Subjects:</Typography>{' '}
                {Array.isArray(student.subjects) && student.subjects.length > 0
                  ? student.subjects.join(', ')
                  : 'None'}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            width: { xs: '100%', sm: 'auto' }, // Full width on small, auto on larger
            mt: { xs: 3, sm: 0 } // Top margin on small screens
          }}>
            <LogoContainer>
              <Box className="inner-circle">
               </Box>
            </LogoContainer>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  </Grid>


  <Grid item xs={12} md={6}>
    <StyledCard>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Typography
          variant="h5" // Consistent heading size
          color="primary"
          sx={{ mb: 3, fontWeight: 'bold' }}
        >
          Overall Attendance ({filterType.charAt(0).toUpperCase() + filterType.slice(1)})
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <Typography component="span" fontWeight="bold" color="text.primary">Classes Attended:</Typography>{' '}
            {overall.attended || 0}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <Typography component="span" fontWeight="bold" color="text.primary">Total Classes:</Typography>{' '}
            {overall.total || 0}
          </Typography>
          <Typography
            variant="h4" // Prominent percentage
            sx={{ mt: 2, fontWeight: 'bold', color: 'success.main' }} // Use success.main for a bright green
          >
            <Typography component="span" variant="body1" color="text.secondary">Percentage:</Typography>{' '}
            {overallPercentage !== undefined ? `${overallPercentage}%` : 'N/A'}
          </Typography>
        </Stack>
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

*/



import React, { useState, useEffect, useRef } from 'react';
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
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO } from 'date-fns'; // Import parseISO for safety
import PrintIcon from '@mui/icons-material/Print';

// Define styled components outside the main component
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  background: 'linear-gradient(135deg, #f0f0f5 0%, #ffffff 100%)',
  border: '1px solid rgba(224, 224, 224, 0.6)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: 140,
  height: 140,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(45deg, #a7b7e5, #e0a7e5, #f5d1b3)',
  padding: '3px',
  flexShrink: 0,
  '& .inner-circle': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
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
  // New state to hold the formatted time duration string
  const [displayTimeRange, setDisplayTimeRange] = useState('All Time');


  const componentRef = useRef();

  // Function to determine and format the display time range
  const getFormattedTimeRange = () => {
    switch (filterType) {
      case 'daily':
        return selectedDate ? ` for ${format(selectedDate, 'PPP')}` : ' for a specific day';
      case 'weekly':
        if (selectedWeek) {
          const start = startOfWeek(selectedWeek, { weekStartsOn: 0 }); // Sunday as start of week
          const end = endOfWeek(selectedWeek, { weekStartsOn: 0 });
          return ` for the week of ${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
        }
        return ' for a specific week';
      case 'monthly':
        return selectedMonth ? ` for ${format(selectedMonth, 'MMMM yyyy')}` : ' for a specific month';
      case 'semester':
        return student?.semester ? ` for Semester ${student.semester}` : ' for the current semester';
      case 'custom':
        if (startDate && endDate) {
          return ` from ${format(startDate, 'PPP')} to ${format(endDate, 'PPP')}`;
        }
        return ' for a custom date range';
      case 'all':
      default:
        return ' for All Time';
    }
  };

  useEffect(() => {
    // Update the display time range whenever filter criteria change
    setDisplayTimeRange(getFormattedTimeRange());
  }, [filterType, selectedDate, selectedWeek, selectedMonth, startDate, endDate, student]); // Added student dependency for semester

  // Print functionality
  const handlePrint = () => {
    const printContent = componentRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>Student Report Card</title>');
    printWindow.document.write(`
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .no-print { display: none !important; }
        .MuiGrid-container { display: block !important; }
        .MuiGrid-item { width: 100% !important; margin-bottom: 20px; }
        .MuiPaper-root { box-shadow: none !important; border: 1px solid #ddd !important; }
        .MuiTypography-root { color: #000 !important; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2 !important; color: #333 !important; }
        .attendance-percentage { color: #28a745 !important; font-weight: bold; }
        .MuiTableCell-head {
          background: #3f51b5 !important;
          color: #fff !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        /* New styles for the print header */
        .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
        }
        .print-header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
        .print-header p {
            margin: 5px 0 0;
            font-size: 16px;
            color: #555;
        }
      </style>
    `);
    printWindow.document.write('</head><body>');

    // Add the report card header with the dynamic time range
    printWindow.document.write(`
        <div class="print-header">
            <h1>Student Report Card</h1>
            <p><strong>Name:</strong> ${student?.first_name} ${student?.last_name || ''}</p>
            <p><strong>ID:</strong> ${student?.id || 'N/A'}</p>
            <p><strong>Attendance Period:</strong> ${displayTimeRange}</p>
            <p><em>Generated on: ${format(new Date(), 'PPP p')}</em></p>
        </div>
    `);

    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };


  // Fetch student details and attendance (unchanged logic)
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
  }, [id, filterType, selectedDate, selectedWeek, selectedMonth, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterType(value);
    setSelectedDate(null);
    setSelectedWeek(null);
    setSelectedMonth(null);
    setStartDate(null);
    setEndDate(null);
  };

  // Calculate overall attendance (unchanged logic)
  const overall = attendance.reduce(
    (acc, att) => ({
      attended: acc.attended + att.classes_attended,
      total: acc.total + att.total_classes,
    }),
    { attended: 0, total: 0 }
  );
  const overallPercentage = overall.total > 0 ? ((overall.attended / overall.total) * 100).toFixed(2) : 0;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
          Student Profile
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!student) {
    return (
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
          Student Profile
        </Typography>
        <Typography color="textSecondary">Student not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }} className="no-print">
        Student Report Card: {student?.first_name} {student?.last_name || ''}
      </Typography>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ backgroundColor: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}
            className="no-print"
          >
            <Typography color="error">{error}</Typography>
          </motion.div>
        )}
      </AnimatePresence>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} className="no-print">
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/student-profiles')}
        >
          Back to Student List
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ ml: 2 }}
        >
          Print Report Card
        </Button>
      </Stack>

      <StyledCard sx={{ mb: 3 }} className="no-print"> {/* Filter card is not for print */}
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
                  {/* <MenuItem value="monthly">Monthly</MenuItem> */}
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


            {/* {filterType === 'monthly' && (
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
            )} */}



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

      {/* Content to be printed (Report Card) */}
      <div ref={componentRef}>
        {/* The overall attendance card already has a dynamic display for the filter type */}
        <Grid container spacing={3} sx={{ pt: 2 }}>

          {/* Personal Information Card */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 3, sm: 5 } }}>
                  {/* Left side: Details */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="overline"
                      sx={{ color: 'text.secondary', letterSpacing: '0.1em', mb: 0.5 }}
                    >
                      STUDENT PROFILE
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        mb: 3,
                        fontFamily: 'serif'
                      }}
                    >
                      {student.first_name} {student.last_name || ''}
                    </Typography>

                    <Stack spacing={1.5}>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Typography component="span" fontWeight="bold" color="text.primary">ID:</Typography>{' '}
                        {student.id || 'N/A'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Typography component="span" fontWeight="bold" color="text.primary">Roll Number:</Typography>{' '}
                        {student.roll_number || 'N/A'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Typography component="span" fontWeight="bold" color="text.primary">Section:</Typography>{' '}
                        {student.section || 'N/A'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Typography component="span" fontWeight="bold" color="text.primary">Semester:</Typography>{' '}
                        {student.semester || 'N/A'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Typography component="span" fontWeight="bold" color="text.primary">Email:</Typography>{' '}
                        {student.email || 'N/A'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Typography component="span" fontWeight="bold" color="text.primary">Phone:</Typography>{' '}
                        {student.phone || 'N/A'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Typography component="span" fontWeight="bold" color="text.primary">Subjects:</Typography>{' '}
                        {Array.isArray(student.subjects) && student.subjects.length > 0
                          ? student.subjects.join(', ')
                          : 'None'}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Right side: Image/Logo */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: { xs: '100%', sm: 'auto' },
                    mt: { xs: 3, sm: 0 }
                  }}>
                    <LogoContainer>
                      <Box className="inner-circle">
                        🎓
                      </Box>
                    </LogoContainer>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Overall Attendance Card */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ mb: 3, fontWeight: 'bold' }}
                >
                  Overall Attendance {displayTimeRange} {/* Display the time range here */}
                </Typography>
                <Stack spacing={1.5}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    <Typography component="span" fontWeight="bold" color="text.primary">Classes Attended:</Typography>{' '}
                    {overall.attended || 0}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    <Typography component="span" fontWeight="bold" color="text.primary">Total Classes:</Typography>{' '}
                    {overall.total || 0}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 2, fontWeight: 'bold', color: 'success.main' }}
                  >
                    <Typography component="span" variant="body1" color="text.secondary">Percentage:</Typography>{' '}
                    <span className="attendance-percentage">{overallPercentage !== undefined ? `${overallPercentage}%` : 'N/A'}</span>
                  </Typography>
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Subject-wise Attendance Table */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Subject-wise Attendance
                </Typography>
                {attendance.length > 0 ? (
                  <Table sx={{ minWidth: 650, borderRadius: '8px', overflow: 'hidden' }}>
                    <TableHead>
                      <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderTopLeftRadius: '8px' }}>Subject</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Classes Attended</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total Classes</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold', borderTopRightRadius: '8px' }}>Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendance.map((att, index) => (
                        <TableRow key={att.subject_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
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
                  <Typography color="textSecondary" sx={{ mt: 2 }}>No attendance records found for the selected period.</Typography>
                )}
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </div>

      <ToastContainer />
    </Box>
  );
}

export default StudentDetail;