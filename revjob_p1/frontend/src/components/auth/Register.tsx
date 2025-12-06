import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, FormControl, InputLabel, Select, MenuItem, Link, Divider } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: 'JOB_SEEKER',
    companyName: 'TechCorp Inc',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await register(formData);
      setSuccess('Registration successful! You can now login with your credentials.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      className="auth-page"
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      sx={{ 
        padding: { xs: 2, sm: 4 }
      }}
    >
      <Paper 
        className="auth-container"
        elevation={0} 
        sx={{ 
          p: { xs: 3, sm: 4 }, 
          maxWidth: 500, 
          width: '100%'
        }}
      >
        <Box textAlign="center" mb={4}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1a202c' }}>
            Join RevJobs
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Create your account and start your career journey
          </Typography>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        {/* Demo Information */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%)',
          border: '1px solid #f6ad55',
          borderRadius: 2,
          p: 2,
          mb: 3
        }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#744210' }}>Quick Demo Setup:</Typography>
          <Typography variant="body2" sx={{ color: '#744210', mb: 2 }}>Choose a demo profile to get started quickly</Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ 
                borderColor: '#ff6b6b',
                color: '#ff6b6b',
                '&:hover': { background: '#ff6b6b', color: 'white' }
              }}
              onClick={() => setFormData({
                firstName: 'John',
                lastName: 'Doe', 
                email: 'john.seeker@example.com',
                password: 'password123',
                role: 'JOB_SEEKER',
                companyName: ''
              })}
            >
              👤 Job Seeker
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ 
                borderColor: '#4ecdc4',
                color: '#4ecdc4',
                '&:hover': { background: '#4ecdc4', color: 'white' }
              }}
              onClick={() => setFormData({
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.employer@company.com', 
                password: 'password123',
                role: 'EMPLOYER',
                companyName: 'TechCorp Inc'
              })}
            >
              🏢 Employer
            </Button>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
            >
              <MenuItem value="JOB_SEEKER">Job Seeker</MenuItem>
              <MenuItem value="EMPLOYER">Employer</MenuItem>
            </Select>
          </FormControl>
          {formData.role === 'EMPLOYER' && (
            <TextField
              fullWidth
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              margin="normal"
              required
            />
          )}
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
              background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
              boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #44a08d 0%, #396f6b 100%)',
                boxShadow: '0 6px 20px rgba(78, 205, 196, 0.6)',
                transform: 'translateY(-2px)'
              }
            }}
            disabled={loading}
          >
            {loading ? '⏳ Creating Account...' : '✨ Create Account'}
          </Button>
        </form>
        
        <Divider sx={{ my: 2 }} />
        
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
              Sign in here
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

export default Register;