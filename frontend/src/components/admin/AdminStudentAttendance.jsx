import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Box, Typography, Grid, Paper, TextField, InputAdornment,
  CircularProgress, Tooltip, IconButton, Card, CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

// Re-usable SelectableCard component, similar to AdminAttendanceStats
function SelectableCard({ children, selected, onClick, minWidth = 240 }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        minWidth,
        height: '100%',
        border: selected ? '2px solid' : '1px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        bgcolor: selected ? 'primary.light' : 'background.paper',
        transition: 'all .15s ease',
        '&:hover': { boxShadow: 3, borderColor: 'primary.light' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent sx={{ pb: '12px !important' }}>{children}</CardContent>
    </Card>
  );
}

function AdminStudentAttendance({ notifyUser }) {
  const [teachers, setTeachers] = useState([]);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = useCallback((msg, type = 'info') => {
    if (notifyUser) notifyUser(msg, type);
    else toast[type]?.(msg) ?? toast(msg);
  }, [notifyUser]);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      notify('Please log in first', 'error');
      navigate('/');
      return;
    }
    try {
      const res = await axios.get('/api/teachers/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data || []);
    } catch (err) {
      console.error(err);
      notify('Failed to load teachers', 'error');
    } finally {
      setLoading(false);
    }
  }, [navigate, notify]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleTeacherSelect = (teacher) => {
    const qp = new URLSearchParams();
    if (teacher && teacher.id) qp.set('teacher', teacher.id);
    navigate(`/calendar?${qp.toString()}`);
  };

  const filteredTeachers = teachers.filter((t) =>
    `${t.first_name} ${t.last_name} ${t.email}`.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* ── top bar ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Tooltip title="Back to Dashboard">
          <IconButton onClick={() => navigate('/admin')} size="small" sx={{ bgcolor: 'white', boxShadow: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" fontWeight={700} sx={{ flexGrow: 1 }}>
          View Attendance by Teacher
        </Typography>
      </Box>

      <Paper sx={{ p: 2, borderRadius: 2 }} elevation={1}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Select a Teacher</Typography>

        <TextField
          size="small"
          placeholder="Search teachers…"
          value={teacherSearch}
          onChange={(e) => setTeacherSearch(e.target.value)}
          sx={{ mb: 2, width: { xs: '100%', sm: 320 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
        ) : (
          <Grid container spacing={2}>
            {filteredTeachers.map((t) => (
              <Grid item key={t.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: '100%' }}
                >
                  <SelectableCard onClick={() => handleTeacherSelect(t)}>
                    <div>
                      <Typography fontWeight={600}>{t.first_name} {t.last_name}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>{t.email || ''}</Typography>
                    </div>
                    <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.secondary">Click to open calendar</Typography>
                    </Box>
                  </SelectableCard>
                </motion.div>
              </Grid>
            ))}
            {filteredTeachers.length === 0 && (
              <Grid item xs={12}>
                <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                  No teachers match your search.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default AdminStudentAttendance;
