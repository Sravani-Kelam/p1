import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, Link } from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Simple email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for password reset
      setTimeout(() => {
        setEmailSent(true);
        setMessage('Password reset link has been sent to your email address');
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh" 
        sx={{ 
          backgroundColor: '#f5f5f5',
          padding: { xs: 2, sm: 4 }
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            maxWidth: 450, 
            width: '100%', 
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <LockReset sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#212121' }}>
            Check Your Email
          </Typography>
          <Typography variant="body1" sx={{ color: '#757575' }} paragraph>
            We've sent a password reset link to <strong>{email}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575' }} paragraph>
            Click the link in the email to reset your password. If you don't see the email, check your spam folder.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/login')}
            sx={{ mt: 2, mb: 2 }}
          >
            Back to Login
          </Button>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            Didn't receive the email?{' '}
            <Link
              component="button"
              onClick={() => {
                setEmailSent(false);
                setMessage('');
              }}
              sx={{ fontWeight: 600 }}
            >
              Try again
            </Link>
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      sx={{ 
        backgroundColor: '#f5f5f5',
        padding: { xs: 2, sm: 4 }
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, sm: 4 }, 
          maxWidth: 450, 
          width: '100%', 
          borderRadius: 3,
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box textAlign="center" mb={3}>
          <LockReset sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#212121' }}>
            Reset Password
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            Enter your email address and we'll send you a link to reset your password
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            placeholder="Enter your email address"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
            disabled={loading}
          >
            {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </Button>
        </form>

        <Box textAlign="center">
          <Typography variant="body2" sx={{ color: '#757575' }}>
            Remember your password?{' '}
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
              Back to Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;