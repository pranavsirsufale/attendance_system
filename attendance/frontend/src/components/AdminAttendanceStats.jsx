



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

      {/* Visualizations */}
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




//  first previous

/*
? firest previous

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function AdminAttendanceStats({ notifyUser }) {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [section, setSection] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in first');
        notifyUser('Please log in first', 'warning');
        return;
      }

      let url = `http://localhost:8000/api/admin-attendance-stats/?period=${period}`;
      if (section) url += `§ion=${section}`; // Fixed typo in comment: '§ion' to '§ion'
      let computedEndDate = '';
      if (period === 'daily' && date) {
        url += `&date=${date}`;
        // Calculate end date as the next day for daily period
        const selectedDate = new Date(date);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        computedEndDate = nextDay.toISOString().split('T')[0];
        url += `&end_date=${computedEndDate}`;
      }

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats);
        setStartDate(response.data.start_date);
        // Use computed end date for daily period to ensure correct display
        setEndDate(period === 'daily' && computedEndDate ? computedEndDate : response.data.end_date);
        console.log(response);

        setError('');
        
        if (response.status >= 200 && response.status <= 300) {
          notifyUser(
            `${response.data.stats.length} records found for the duration period ${response.data.start_date} - ${response.data.end_date}✅`,
            'info'
          );
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.response?.data?.error || 'Failed to load attendance stats');
      }
    };
    fetchStats();
  }, [period, section, date]);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6"
      >
        All Attendance Statistics
      </motion.h2>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300 p-3 rounded-lg mb-6 shadow-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center space-x-4"
        >
          <label className="text-indigo-700 dark:text-indigo-300 font-medium">View by:</label>
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="semester">Semester</option>
          </motion.select>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <label className="text-indigo-700 dark:text-indigo-300 font-medium">Section ID:</label>
          <motion.input
            whileHover={{ scale: 1.02 }}
            type="number"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Optional"
            className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
          />
        </motion.div>
        <AnimatePresence>
          {period === 'daily' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-4"
            >
              <label className="text-indigo-700 dark:text-indigo-300 font-medium">Date:</label>
              <motion.input
                whileHover={{ scale: 1.02 }}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="text-gray-800 dark:text-gray-200 font-medium mb-6"
      >
        Period: {startDate} to {endDate}
      </motion.p>
      <AnimatePresence>
        {stats.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="overflow-x-auto"
          >
            <motion.table
              className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden"
            >
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
                  <th className="p-3 text-left text-white font-semibold">Student Name</th>
                  <th className="p-3 text-left text-white font-semibold">Roll Number</th>
                  <th className="p-3 text-left text-white font-semibold">Total Sessions</th>
                  <th className="p-3 text-left text-white font-semibold">Present</th>
                  <th className="p-3 text-left text-white font-semibold">Absent</th>
                  <th className="p-3 text-left text-white font-semibold">Attendance %</th>
                  <th className="p-3 text-left text-white font-semibold">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-indigo-100 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.name}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.roll_number}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.total_sessions}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.present}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.absent}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.attendance_percentage}%</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.recorded_by}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 dark:text-gray-400 font-medium"
          >
            No attendance stats available for this period.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminAttendanceStats;

*/




/*

//!! the second last program uno reverse

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function AdminAttendanceStats({notifyUser}) {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [section, setSection] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in first');
        notifyUser('Please log in first' , 'warning')
        return;
        
      }

      let url = `http://localhost:8000/api/admin-attendance-stats/?period=${period}`;
      if (section) url += `&section=${section}`; // Fixed typo: '§ion' to '&section'
      if (period === 'daily' && date) url += `&date=${date}`;

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats);
        setStartDate(response.data.start_date);
        setEndDate(response.data.end_date);
        console.log(response)

        setError('');
        
        if( response.status >= 200 && response.status <= 300 ){

          notifyUser(`${response.data.stats.length} records found for the duration period ${response.data.start_date} - ${ response.data.end_date}✅` , 'info')
        }

      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.response?.data?.error || 'Failed to load attendance stats');
      }
    };
    fetchStats();
  }, [period, section, date]);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6"
      >
        All Attendance Statistics
      </motion.h2>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300 p-3 rounded-lg mb-6 shadow-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center space-x-4"
        >
          <label className="text-indigo-700 dark:text-indigo-300 font-medium">View by:</label>
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="semester">Semester</option>
          </motion.select>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <label className="text-indigo-700 dark:text-indigo-300 font-medium">Section ID:</label>
          <motion.input
            whileHover={{ scale: 1.02 }}
            type="number"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Optional"
            className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
          />
        </motion.div>
        <AnimatePresence>
          {period === 'daily' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-4"
            >
              <label className="text-indigo-700 dark:text-indigo-300 font-medium">Date:</label>
              <motion.input
                whileHover={{ scale: 1.02 }}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="text-gray-800 dark:text-gray-200 font-medium mb-6"
      >
        Period: {startDate} to {endDate}
      </motion.p>
      <AnimatePresence>
        {stats.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="overflow-x-auto"
          >
            <motion.table
              className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden"
            >
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
                  <th className="p-3 text-left text-white font-semibold">Student Name</th>
                  <th className="p-3 text-left text-white font-semibold">Roll Number</th>
                  <th className="p-3 text-left text-white font-semibold">Total Sessions</th>
                  <th className="p-3 text-left text-white font-semibold">Present</th>
                  <th className="p-3 text-left text-white font-semibold">Absent</th>
                  <th className="p-3 text-left text-white font-semibold">Attendance %</th>
                  <th className="p-3 text-left text-white font-semibold">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat,index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-indigo-100 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.name}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.roll_number}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.total_sessions}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.present}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.absent}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.attendance_percentage}%</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{stat.recorded_by}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 dark:text-gray-400 font-medium"
          >
            No attendance stats available for this period.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminAttendanceStats;

*/




/*

//! the second last program 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAttendanceStats() {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState('semester');
  const [section, setSection] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in first');
        return;
      }

      let url = `http://localhost:8000/api/admin-attendance-stats/?period=${period}`;
      if (section) url += `&section=${section}`;
      if (period === 'daily' && date) url += `&date=${date}`;

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats);
        setStartDate(response.data.start_date);
        setEndDate(response.data.end_date);
        setError('');
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.response?.data?.error || 'Failed to load attendance stats');
      }
    };
    fetchStats();
  }, [period, section, date]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Attendance Statistics</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="mr-2 text-gray-800">View by:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="p-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="semester">Semester</option>
          </select>
        </div>
        <div>
          <label className="mr-2 text-gray-800">Section ID:</label>
          <input
            type="number"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="p-2 border rounded-md text-gray-800"
            placeholder="Optional"
          />
        </div>
        {period === 'daily' && (
          <div>
            <label className="mr-2 text-gray-800">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-md text-gray-800"
              required
            />
          </div>
        )}
      </div>
      <p className="text-gray-800 mb-4">Period: {startDate} to {endDate}</p>
      {stats.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 text-left">Student Name</th>
                <th className="p-2 text-left">Roll Number</th>
                <th className="p-2 text-left">Total Sessions</th>
                <th className="p-2 text-left">Present</th>
                <th className="p-2 text-left">Absent</th>
                <th className="p-2 text-left">Attendance %</th>
                <th className="p-2 text-left">Recorded By</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.student_id} className="border-t">
                  <td className="p-2 text-gray-800">{stat.name}</td>
                  <td className="p-2 text-gray-800">{stat.roll_number}</td>
                  <td className="p-2 text-gray-800">{stat.total_sessions}</td>
                  <td className="p-2 text-gray-800">{stat.present}</td>
                  <td className="p-2 text-gray-800">{stat.absent}</td>
                  <td className="p-2 text-gray-800">{stat.attendance_percentage}%</td>
                  <td className="p-2 text-gray-800">{stat.recorded_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No attendance stats available for this period.</p>
      )}
    </div>
  );
}

export default AdminAttendanceStats;

*/

