

/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminAttendanceStats({ notifyUser }) {
  const [stats, setStats] = useState([]);
  const [vizData, setVizData] = useState({});
  const [period, setPeriod] = useState('semester');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useState({
    roll_number: '',
    name: '',
    email: '',
    phone: '',
    semester: '',
    year: '',
    program: '',
  });
  const [searchResults, setSearchResults] = useState([]);

  const fetchStats = async (url) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.results.stats);
      setVizData(response.data.results.viz_data);
      setStartDate(response.data.results.start_date);
      setEndDate(response.data.results.end_date);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setTotalCount(response.data.count);
      setError('');
      notifyUser(
        `${response.data.results.stats.length} records found for ${period} period ${response.data.results.start_date} - ${response.data.results.end_date} ✅`,
        'info'
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load attendance stats');
      notifyUser('Failed to load attendance stats', 'error');
    }
  };

  const fetchStudentSearch = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    let url = `http://localhost:8000/api/admin-student-search/?page=${page}`;
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) url += `&${key}=${encodeURIComponent(value)}`;
    });

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data.results.stats);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setTotalCount(response.data.count);
      setError('');
      notifyUser(`${response.data.results.stats.length} student records found`, 'info');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load student search results');
      notifyUser('Failed to load student search results', 'error');
    }
  };

  useEffect(() => {
    let url = `http://localhost:8000/api/admin/attendance-stats/?period=${period}&page=${page}`;
    if (section) url += `§ion=${section}`;
    if (subject) url += `&subject=${subject}`;
    if (teacher) url += `&teacher=${teacher}`;
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
    fetchStats(url);
  }, [period, section, subject, teacher, program, year, semester, date, page]);

  const handleExport = async (format) => {
    const token = localStorage.getItem('access_token');
    let url = `http://localhost:8000/api/admin/attendance-export/?period=${period}&format=${format}`;
    if (section) url += `§ion=${section}`;
    if (subject) url += `&subject=${subject}`;
    if (teacher) url += `&teacher=${teacher}`;
    if (program) url += `&program=${program}`;
    if (year) url += `&year=${year}`;
    if (semester) url += `&semester=${semester}`;
    if (period === 'daily' && date) url += `&date=${date}`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `attendance_report.${format}`;
      link.click();
      notifyUser(`Exported attendance report as ${format}`, 'success');
    } catch (err) {
      notifyUser('Failed to export report', 'error');
    }
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudentSearch();
  };

  const handleNextPage = () => {
    if (nextPage) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (prevPage) setPage(page - 1);
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
          <Select value={period} onChange={(e) => { setPeriod(e.target.value); setPage(1); }}>
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
          onChange={(e) => { setSection(e.target.value); setPage(1); }}
          sx={{ minWidth: 120 }}
        />
        <TextField
          label="Subject ID"
          type="number"
          value={subject}
          onChange={(e) => { setSubject(e.target.value); setPage(1); }}
          sx={{ minWidth: 120 }}
        />
        <TextField
          label="Teacher ID"
          type="number"
          value={teacher}
          onChange={(e) => { setTeacher(e.target.value); setPage(1); }}
          sx={{ minWidth: 120 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Program</InputLabel>
          <Select value={program} onChange={(e) => { setProgram(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">BALLB 5 Yr</MenuItem>
            <MenuItem value="2">LLB 3 Yr</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => { setYear(e.target.value); setPage(1); }}
          sx={{ minWidth: 120 }}
        />
        <TextField
          label="Semester"
          type="number"
          value={semester}
          onChange={(e) => { setSemester(e.target.value); setPage(1); }}
          sx={{ minWidth: 120 }}
        />
        {period === 'daily' && (
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setPage(1); }}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
        )}
      </Box>

      {vizData && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Attendance Overview</Typography>
          <PieChart
            series={[{
              data: [
                { id: 'Present', value: vizData.total_present || 0, label: 'Present' },
                { id: 'Absent', value: vizData.total_absent || 0, label: 'Absent' },
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            }]}
            height={300}
            sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
          />
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>By Subject</Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: vizData.by_subject?.map(s => s.session__timetable__subject__name) || [] }]}
            series={[
              { label: 'Present', data: vizData.by_subject?.map(s => s.present) || [], stack: 'total' },
              { label: 'Absent', data: vizData.by_subject?.map(s => s.absent) || [], stack: 'total' },
            ]}
            height={300}
            sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
            tooltip={{ trigger: 'item' }}
          />
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>By Teacher</Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: vizData.by_teacher?.map(t => `${t.session__timetable__teacher__first_name} ${t.session__timetable__teacher__last_name}`) || [] }]}
            series={[
              { label: 'Present', data: vizData.by_teacher?.map(t => t.present) || [] },
              { label: 'Absent', data: vizData.by_teacher?.map(t => t.absent) || [] },
            ]}
            height={300}
            sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
            tooltip={{ trigger: 'item' }}
            slots={{
              bar: (props) => {
                const { dataIndex, seriesId, value } = props;
                const total = vizData.by_teacher?.[dataIndex]?.present + vizData.by_teacher?.[dataIndex]?.absent;
                const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
                return (
                  <g>
                    <rect {...props} />
                    <text
                      x={props.x + props.width / 2}
                      y={props.y - 10}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#000"
                    >
                      {percentage}%
                    </text>
                  </g>
                );
              },
            }}
          />
          {vizData.by_date && vizData.by_date.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>By Date</Typography>
              <LineChart
                xAxis={[{ data: vizData.by_date.map(d => new Date(d.session__date)), scaleType: 'time' }]}
                series={[
                  { label: 'Present', data: vizData.by_date.map(d => d.present), stack: 'total', area: true },
                  { label: 'Absent', data: vizData.by_date.map(d => d.absent), stack: 'total', area: true },
                ]}
                height={300}
                sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
                tooltip={{ trigger: 'item' }}
              />
            </>
          )}
        </Box>
      )}

 
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => handleExport('csv')}
          sx={{ mr: 2 }}
        >
          Export as CSV
        </Button>
        <Button
          variant="contained"
          onClick={() => handleExport('excel')}
        >
          Export as Excel
        </Button>
      </Box>


      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Period: {startDate} to {endDate} | Showing {stats.length} of {totalCount} records
      </Typography>
      {stats.length > 0 ? (
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                <TableCell sx={{ color: '#fff' }}>Student Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Student ID</TableCell>
                <TableCell sx={{ color: '#fff' }}>Roll Number</TableCell>
                <TableCell sx={{ color: '#fff' }}>Program</TableCell>
                <TableCell sx={{ color: '#fff' }}>Year</TableCell>
                <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                <TableCell sx={{ color: '#fff' }}>Total Sessions</TableCell>
                <TableCell sx={{ color: '#fff' }}>Present</TableCell>
                <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
                <TableCell sx={{ color: '#fff' }}>Attendance %</TableCell>
                <TableCell sx={{ color: '#fff' }}>Recorded By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((stat, index) => (
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
                  <TableCell>{stat.year}</TableCell>
                  <TableCell>{stat.semester}</TableCell>
                  <TableCell>{stat.total_sessions}</TableCell>
                  <TableCell>{stat.present}</TableCell>
                  <TableCell>{stat.absent}</TableCell>
                  <TableCell>{stat.attendance_percentage}%</TableCell>
                  <TableCell>{stat.recorded_by}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handlePrevPage}
              disabled={!prevPage}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={!nextPage}
            >
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography color="textSecondary">No attendance stats available for this period.</Typography>
      )}

     
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Search Students</Typography>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <TextField
            label="Roll Number"
            name="roll_number"
            value={searchParams.roll_number}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Name"
            name="name"
            value={searchParams.name}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Email"
            name="email"
            value={searchParams.email}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={searchParams.phone}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Semester"
            type="number"
            name="semester"
            value={searchParams.semester}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Year"
            type="number"
            name="year"
            value={searchParams.year}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Program</InputLabel>
            <Select
              name="program"
              value={searchParams.program}
              onChange={handleSearchChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">BALLB 5 Yr</MenuItem>
              <MenuItem value="2">LLB 3 Yr</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">Search</Button>
        </form>
        {searchResults.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Showing {searchResults.length} of {totalCount} student records
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                  <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Roll Number</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Phone</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Program</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Year</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Total Sessions</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Present</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Attendance %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.roll_number}</TableCell>
                    <TableCell>{result.email}</TableCell>
                    <TableCell>{result.phone}</TableCell>
                    <TableCell>{result.program}</TableCell>
                    <TableCell>{result.year}</TableCell>
                    <TableCell>{result.semester}</TableCell>
                    <TableCell>{result.total_sessions}</TableCell>
                    <TableCell>{result.present}</TableCell>
                    <TableCell>{result.absent}</TableCell>
                    <TableCell>{result.attendance_percentage}%</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={!prevPage}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={!nextPage}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
}

export default AdminAttendanceStats;


*/
{/* Visualizations */}
      {/* {vizData && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Attendance Overview</Typography>
          <PieChart
            series={[{
              data: [
                { id: 'Present', value: vizData.total_present || 0, label: 'Present' },
                { id: 'Absent', value: vizData.total_absent || 0, label: 'Absent' },
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            }]}
            height={300}
            sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
          />
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>By Subject</Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: vizData.by_subject?.map(s => s.session__timetable__subject__name) || [] }]}
            series={[
              { label: 'Present', data: vizData.by_subject?.map(s => s.present) || [], stack: 'total' },
              { label: 'Absent', data: vizData.by_subject?.map(s => s.absent) || [], stack: 'total' },
            ]}
            height={300}
            sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
            tooltip={{ trigger: 'item' }}
          />
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>By Teacher</Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: vizData.by_teacher?.map(t => `${t.session__timetable__teacher__first_name} ${t.session__timetable__teacher__last_name}`) || [] }]}
            series={[
              { label: 'Present', data: vizData.by_teacher?.map(t => t.present) || [] },
              { label: 'Absent', data: vizData.by_teacher?.map(t => t.absent) || [] },
            ]}
            height={300}
            sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
            tooltip={{ trigger: 'item' }}
            slots={{
              bar: (props) => {
                const { dataIndex, seriesId, value } = props;
                const total = vizData.by_teacher?.[dataIndex]?.present + vizData.by_teacher?.[dataIndex]?.absent;
                const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
                return (
                  <g>
                    <rect {...props} />
                    <text
                      x={props.x + props.width / 2}
                      y={props.y - 10}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#000"
                    >
                      {percentage}%
                    </text>
                  </g>
                );
              },
            }}
          />
          {vizData.by_date && vizData.by_date.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>By Date</Typography>
              <LineChart
                xAxis={[{ data: vizData.by_date.map(d => new Date(d.session__date)), scaleType: 'time' }]}
                series={[
                  { label: 'Present', data: vidData.by_date.map(d => d.present), stack: 'total', area: true },
                  { label: 'Absent', data: vizData.by_date.map(d => d.absent), stack: 'total', area: true },
                ]}
                height={300}
                sx={{ bgcolor: 'white', borderRadius: 2, p: 2 }}
                tooltip={{ trigger: 'item' }}
              />
            </>
          )}
        </Box>
      )} */}

      //************************************************* */








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminAttendanceStats({ notifyUser }) {
  const [stats, setStats] = useState([]);
  const [vizData, setVizData] = useState({});
  const [period, setPeriod] = useState('semester');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchParams, setSearchParams] = useState({
    roll_number: '',
    name: '',
    email: '',
    phone: '',
    semester: '',
    year: '',
    program: '',
  });
  const [searchResults, setSearchResults] = useState([]);

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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load teachers');
      notifyUser('Failed to load teachers', 'error');
    }
  };

  const fetchStats = async (url) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.results.stats);
      setVizData(response.data.results.viz_data);
      setStartDate(response.data.results.start_date);
      setEndDate(response.data.results.end_date);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setTotalCount(response.data.count);
      setError('');
      notifyUser(
        `${response.data.results.stats.length} records found for ${period} period ${response.data.results.start_date} - ${response.data.results.end_date} ✅`,
        'info'
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load attendance stats');
      notifyUser('Failed to load attendance stats', 'error');
    }
  };

  const fetchStudentSearch = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Please log in first');
      notifyUser('Please log in first', 'warning');
      return;
    }

    let url = `http://localhost:8000/api/admin-student-search/?page=${page}`;
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) url += `&${key}=${encodeURIComponent(value)}`;
    });

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data.results.stats);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setTotalCount(response.data.count);
      setError('');
      notifyUser(`${response.data.results.stats.length} student records found`, 'info');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load student search results');
      notifyUser('Failed to load student search results', 'error');
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    let url = `http://localhost:8000/api/admin/attendance-stats/?period=${period}&page=${page}`;
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
    fetchStats(url);
  }, [period, section, subject, selectedTeacher, program, year, semester, date, page]);

  const handleExport = async (format) => {
    const token = localStorage.getItem('access_token');
    let url = `http://localhost:8000/api/admin/attendance-export/?period=${period}&format=${format}`;
    if (section) url += `&section=${section}`;
    if (subject) url += `&subject=${subject}`;
    if (selectedTeacher) url += `&teacher=${selectedTeacher}`;
    if (program) url += `&program=${program}`;
    if (year) url += `&year=${year}`;
    if (semester) url += `&semester=${semester}`;
    if (period === 'daily' && date) url += `&date=${date}`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `attendance_report.${format}`;
      link.click();
      notifyUser(`Exported attendance report as ${format}`, 'success');
    } catch (err) {
      notifyUser('Failed to export report', 'error');
    }
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudentSearch();
  };

  const handleNextPage = () => {
    if (nextPage) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (prevPage) setPage(page - 1);
  };

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId);
    setPage(1);
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

      {/* Teacher Cards */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Select Teacher</Typography>
        <Grid container spacing={2} >
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  minWidth:'300px',
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

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Period</InputLabel>
          <Select value={period} onChange={(e) => { setPeriod(e.target.value); setPage(1); }}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="semester">Semester</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Program</InputLabel>
          <Select value={program} onChange={(e) => { setProgram(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">BALLB 5 Yr</MenuItem>
            <MenuItem value="2">LLB 3 Yr</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => { setYear(e.target.value); setPage(1); }}
          sx={{ minWidth: 120 }}
        />
        <TextField
          label="Semester"
          type="number"
          value={semester}
          onChange={(e) => { setSemester(e.target.value); setPage(1); }}
          sx={{ minWidth: 120 }}
        />
        {period === 'daily' && (
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setPage(1); }}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
        )}
      </Box>

      

      {/* Export Buttons */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => handleExport('csv')}
          sx={{ mr: 2 }}
        >
          Export as CSV
        </Button>
        <Button
          variant="contained"
          onClick={() => handleExport('excel')}
        >
          Export as Excel
        </Button>
      </Box>

      {/* Attendance Table */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Period: {startDate} to {endDate} | Showing {stats.length} of {totalCount} records
      </Typography>
      {stats.length > 0 ? (
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                <TableCell sx={{ color: '#fff' }}>Student Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Student ID</TableCell>
                <TableCell sx={{ color: '#fff' }}>Roll Number</TableCell>
                <TableCell sx={{ color: '#fff' }}>Program</TableCell>
                <TableCell sx={{ color: '#fff' }}>Year</TableCell>
                <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                <TableCell sx={{ color: '#fff' }}>Total Sessions</TableCell>
                <TableCell sx={{ color: '#fff' }}>Present</TableCell>
                <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
                <TableCell sx={{ color: '#fff' }}>Attendance %</TableCell>
                <TableCell sx={{ color: '#fff' }}>Recorded By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((stat, index) => (
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
                  <TableCell>{stat.year}</TableCell>
                  <TableCell>{stat.semester}</TableCell>
                  <TableCell>{stat.total_sessions}</TableCell>
                  <TableCell>{stat.present}</TableCell>
                  <TableCell>{stat.absent}</TableCell>
                  <TableCell>{stat.attendance_percentage}%</TableCell>
                  <TableCell>{stat.recorded_by}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handlePrevPage}
              disabled={!prevPage}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={!nextPage}
            >
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography color="textSecondary">No attendance stats available for this period.</Typography>
      )}

      {/* Student Search */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Search Students</Typography>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <TextField
            label="Roll Number"
            name="roll_number"
            value={searchParams.roll_number}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Name"
            name="name"
            value={searchParams.name}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Email"
            name="email"
            value={searchParams.email}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={searchParams.phone}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Semester"
            type="number"
            name="semester"
            value={searchParams.semester}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Year"
            type="number"
            name="year"
            value={searchParams.year}
            onChange={handleSearchChange}
            sx={{ minWidth: 120 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Program</InputLabel>
            <Select
              name="program"
              value={searchParams.program}
              onChange={handleSearchChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">BALLB 5 Yr</MenuItem>
              <MenuItem value="2">LLB 3 Yr</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">Search</Button>
        </form>
        {searchResults.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Showing {searchResults.length} of {totalCount} student records
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(to right, #3f51b5, #9c27b0)' }}>
                  <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Roll Number</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Phone</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Program</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Year</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Semester</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Total Sessions</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Present</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Attendance %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.roll_number}</TableCell>
                    <TableCell>{result.email}</TableCell>
                    <TableCell>{result.phone}</TableCell>
                    <TableCell>{result.program}</TableCell>
                    <TableCell>{result.year}</TableCell>
                    <TableCell>{result.semester}</TableCell>
                    <TableCell>{result.total_sessions}</TableCell>
                    <TableCell>{result.present}</TableCell>
                    <TableCell>{result.absent}</TableCell>
                    <TableCell>{result.attendance_percentage}%</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={!prevPage}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={!nextPage}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
}
export default AdminAttendanceStats;