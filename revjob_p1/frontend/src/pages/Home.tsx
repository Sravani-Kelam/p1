import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Card, CardContent, TextField, InputAdornment, Grid, Chip, Alert } from '@mui/material';
import { Work, Business, Search, LocationOn, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:2706/api/test/health');
        if (response.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      } catch (error) {
        setBackendStatus('error');
      }
    };
    testBackendConnection();
  }, []);

  const handleSearch = () => {
    navigate(`/jobs?search=${searchQuery}&location=${location}`);
  };

  const featuredJobs = [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'Remote', salary: '$120k - $150k' },
    { id: 2, title: 'Product Manager', company: 'StartupXYZ', location: 'San Francisco', salary: '$130k - $160k' },
    { id: 3, title: 'UX Designer', company: 'DesignStudio', location: 'New York', salary: '$90k - $120k' },
  ];

  const topCompanies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix'];

  return (
    <Box>
      {/* Hero Section */}
      <Box className="hero-gradient" sx={{ py: 12, position: 'relative' }}>
        <Container maxWidth="lg">
          {/* Backend Status */}
          {backendStatus === 'connected' && (
            <Alert severity="success" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              ✅ Backend Connected Successfully! Real-time features are active.
            </Alert>
          )}
          {backendStatus === 'error' && (
            <Alert severity="warning" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              ⚠️ Backend not connected. Start the backend server on port 2706.
            </Alert>
          )}
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              mb: 3,
              letterSpacing: '-0.02em'
            }}
          >
            Find Your Dream Job
          </Typography>
          <Typography 
            variant="h4" 
            align="center" 
            paragraph
            sx={{ 
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 400,
              color: '#4a5568',
              mb: 6,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Connect with top employers and discover opportunities that match your skills
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, mb: 8 }}>
            <Card className="search-card" sx={{ p: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleSearch}
                    sx={{ height: 56 }}
                  >
                    Search Jobs
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
          
          <Box display="flex" justifyContent="center" gap={3} mt={4}>
            {!user ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/jobs')}
                >
                  Browse Jobs
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/jobs')}
              >
                Browse Jobs
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Featured Jobs Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Featured Jobs
        </Typography>
        <Grid container spacing={3}>
          {featuredJobs.map((job) => (
            <Grid item xs={12} md={4} key={job.id}>
              <Card sx={{ 
                height: '100%', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="primary" gutterBottom>
                    {job.company}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    {job.salary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top Companies Section */}
      <Box className="section-light" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Top Companies Hiring
          </Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            {topCompanies.map((company) => (
              <Chip
                key={company}
                label={company}
                variant="outlined"
                sx={{ 
                  fontSize: '1rem',
                  py: 2,
                  px: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose RevJobs?
        </Typography>
        <Box display="flex" gap={4} mt={6} flexWrap="wrap">
          <Card sx={{ 
            flex: 1, 
            minWidth: 300, 
            textAlign: 'center', 
            p: 3,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'primary.light', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <Search sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Smart Job Search
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Advanced filters and AI-powered recommendations to find jobs that match your skills and preferences.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ 
            flex: 1, 
            minWidth: 300, 
            textAlign: 'center', 
            p: 3,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'secondary.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <Work sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                One-Click Apply
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Apply to multiple jobs quickly with your saved profile and resume. Track all applications in one place.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ 
            flex: 1, 
            minWidth: 300, 
            textAlign: 'center', 
            p: 3,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'success.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}>
                <Business sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Direct Communication
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Chat directly with recruiters, schedule interviews, and get real-time updates on your applications.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Platform Pages Showcase */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Explore Our Platform
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {[
            { title: 'Jobs', count: '5,000+', icon: '💼', path: '/jobs', desc: 'Browse thousands of job opportunities' },
            { title: 'Companies', count: '500+', icon: '🏢', path: '/companies', desc: 'Discover top companies hiring now' },
            { title: 'Services', count: '10+', icon: '⚡', path: '/services', desc: 'Career development services' },
            { title: 'Careers', count: 'Join Us', icon: '🚀', path: '/careers', desc: 'Work with our amazing team' },
            { title: 'Blog', count: 'Learn', icon: '📚', path: '/blog', desc: 'Career tips and insights' },
            { title: 'Applications', count: 'Track', icon: '📊', path: '/applications', desc: 'Monitor your job applications' },
            { title: 'Messages', count: 'Real-time', icon: '💬', path: '/messages', desc: 'Chat with recruiters instantly' },
            { title: 'Profile', count: 'Build', icon: '👤', path: '/profile', desc: 'Create your professional profile' }
          ].map((page, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }} onClick={() => navigate(page.path)}>
                <CardContent sx={{ py: 4 }}>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                    {page.icon}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {page.title}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                    {page.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {page.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Page Counter */}
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 4, 
          px: 6, 
          borderRadius: 4,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
        }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            17+ Pages
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Complete job portal with real-time features & forgot password
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[
              'Home', 'Jobs', 'Companies', 'Services', 'Careers', 'Blog',
              'Login', 'Register', 'Forgot Password', 'Applications', 'Messages', 'Profile', 'Job Details',
              'Admin Dashboard', 'Employer Dashboard', 'Recruiter Panel', 'Candidate Profiles'
            ].map((page, index) => (
              <Grid item key={index}>
                <Chip 
                  label={page} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box className="section-light" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to Start Your Career Journey?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Join thousands of professionals who found their perfect job through RevJobs
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(user ? '/jobs' : '/register')}
            >
              {user ? 'Browse Jobs' : 'Sign Up Now'}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;