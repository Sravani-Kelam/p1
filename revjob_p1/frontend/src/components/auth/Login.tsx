import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, Link, Divider } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      
      // Get user data from localStorage after successful login
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        // Redirect based on role
        switch (user.role) {
          case 'JOB_SEEKER':
            navigate('/jobs');
            break;
          case 'EMPLOYER':
            navigate('/employer/dashboard');
            break;
          case 'ADMIN':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/jobs');
        }
      } else {
        navigate('/jobs');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

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
        <Box textAlign="center" mb={4}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1a202c' }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Sign in to find your dream job
          </Typography>
        </Box>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {/* Demo Accounts */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)',
          border: '1px solid #38b2ac',
          borderRadius: 2,
          p: 2,
          mb: 3
        }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#234e52' }}>Demo Accounts:</Typography>
          <Typography variant="body2" sx={{ color: '#234e52' }}>👤 Job Seeker: john.doe@example.com</Typography>
          <Typography variant="body2" sx={{ color: '#234e52' }}>🏢 Employer: employer@company.com</Typography>
          <Typography variant="body2" sx={{ color: '#234e52' }}>⚙️ Admin: admin@revjobs.com</Typography>
          <Typography variant="body2" sx={{ color: '#234e52', fontWeight: 600 }}>🔑 Password: password123</Typography>
        </Box>
        
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
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.8, 
              fontSize: '1.1rem', 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #ee5a24 0%, #c44569 100%)',
                boxShadow: '0 6px 20px rgba(255, 107, 107, 0.6)',
                transform: 'translateY(-2px)'
              }
            }}
            disabled={loading}
          >
            {loading ? '🔄 Signing in...' : '🚀 Sign In'}
          </Button>
        </form>
        
        <Divider sx={{ my: 2 }} />
        
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" sx={{ fontWeight: 600 }}>
              Sign up here
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/forgot-password" sx={{ fontWeight: 600 }}>
              Forgot Password?
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;