import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify'; // Import toast directly

// StyledCard component, adapted from your PassStudents.jsx
const StyledCard = styled(motion.create(Card))(({ theme }) => ({ // Wrap Card with motion for framer-motion animations
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
  marginBottom: theme.spacing(3),
  width: '100%',
  maxWidth: 450, // Adjust max-width as needed
  margin: theme.spacing(2), // Add some margin around the card
  textAlign: 'center',
  padding: theme.spacing(3),
}));

// Custom Button component (assuming you have one, if not, replace with a standard MUI Button)
// If you don't have a custom Button.jsx, you can replace this with:
// import { Button } from '@mui/material';
// and remove the relative import.
import Button from './Button'; // Adjust path if your Button component is elsewhere

function GetBackup({ notifyUser }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const navigate = useNavigate();
  const handleBackupClick = async () => {
    setLoading(true);
    setMessage('Initiating database backup...');
    setMessageType('info');
    notifyUser('Initiating database backup...', 'info');

    try {
      // IMPORTANT: Retrieve the authentication token securely.
      // This token is crucial for your Django backend's IsAdminUser permission.
      // Make sure 'access_token' is the correct key used to store your token in localStorage after login.
      const token = localStorage.getItem('access_token');

      if (!token) {
        const errorMessage = 'Authentication token is missing. Please log in as an admin user.';
        setMessage(errorMessage);
        setMessageType('error');
        notifyUser(errorMessage, 'error');
        setLoading(false);
        return;
      }

      // Send a POST request to your Django REST Framework backup endpoint
      const response = await axios.post(
        'http://localhost:8000/api/backup/', // Ensure this URL matches your Django URL
        {}, // Empty body for a POST request that triggers an action
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Use Bearer token for DRF
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming your backend sends a success message in `response.data.message`
      setMessage(response.data.message || 'Database backup successfully initiated!');
      setMessageType('success');
      notifyUser(response.data.message || 'Database backup successfully initiated!', 'success');

    } catch (error) {
      console.error('Error during backup request:', error.response || error);
      const errorMessage = error.response?.data?.error || `Network error or unexpected issue: ${error.message}`;
      setMessage(errorMessage);
      setMessageType('error');
      notifyUser(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>


    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>

    <Button onClick={() => navigate('/admin')}>Dashboard</Button>


    <Box sx={{ p: 3, bgcolor: 'background.default',display: "flex" , justifyContent: 'center', alignItems: 'center' }}>


      <StyledCard>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
            Get Database Backup
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Click the button below to generate a full backup of your MySQL database, including all tables and records.
          </Typography>

          <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
            <Button
              variant="contained"
              onClick={handleBackupClick}
              disabled={loading}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Retrieve Backup'
              )}
            </Button>
          </form>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                sx={{ mt: 3 }}
              >
                <Box
                  className={`message-box ${messageType === 'success' ? 'message-success' : messageType === 'error' ? 'message-error' : 'message-info'}`}
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: messageType === 'success' ? '#34d399' : messageType === 'error' ? '#ef4444' : '#38b2ac',
                    backgroundColor: messageType === 'success' ? '#d1fae5' : messageType === 'error' ? '#fee2e2' : '#e0f2fe',
                    color: messageType === 'success' ? '#065f46' : messageType === 'error' ? '#991b1b' : '#0369a1',
                    wordBreak: 'break-word',
                    textAlign: 'left',
                  }}
                >
                  <Typography variant="body2">{message}</Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </StyledCard>
      {/* ToastContainer should typically be in your App.js or a higher-level component */}
      {/* <ToastContainer /> */}
    </Box>
    </Box>
    </>
  );
}

export default GetBackup;
