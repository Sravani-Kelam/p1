import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Work, AccountCircle, Dashboard, Message, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationBadge from '../ui/NotificationBadge';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: '#4285f4', zIndex: 1100 }}>
        <Toolbar>
          <Work sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }}
            onClick={() => navigate('/')}>
            RevJobs
          </Typography>
          
          {/* All Pages Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Button color="inherit" onClick={() => navigate('/')} size="small">Home</Button>
            <Button color="inherit" onClick={() => navigate('/jobs')} size="small">Jobs</Button>
            <Button color="inherit" onClick={() => navigate('/companies')} size="small">Companies</Button>
            <Button color="inherit" onClick={() => navigate('/services')} size="small">Services</Button>
            <Button color="inherit" onClick={() => navigate('/careers')} size="small">Careers</Button>
            <Button color="inherit" onClick={() => navigate('/blog')} size="small">Blog</Button>
            {user ? (
              <>
                {user.role === 'JOB_SEEKER' && (
                  <>
                    <Button color="inherit" onClick={() => navigate('/applications')} size="small">Applications</Button>
                    <Button color="inherit" onClick={() => navigate('/profile')} size="small">Profile</Button>
                  </>
                )}
                {user.role === 'EMPLOYER' && (
                  <>
                    <Button color="inherit" onClick={() => navigate('/employer/dashboard')} size="small">Dashboard</Button>
                    <Button color="inherit" onClick={() => navigate('/recruiter/dashboard')} size="small">Recruiter</Button>
                    <Button color="inherit" onClick={() => navigate('/employer/jobs/create')} size="small">Post Job</Button>
                  </>
                )}
                {user.role === 'ADMIN' && (
                  <Button color="inherit" onClick={() => navigate('/admin/dashboard')} size="small">Admin</Button>
                )}
                <Button color="inherit" onClick={() => navigate('/messages')} size="small">Messages</Button>
                <NotificationBadge />
                <Button color="inherit" onClick={handleLogout} size="small">Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')} size="small">Login</Button>
                <Button color="inherit" onClick={() => navigate('/register')} size="small">Register</Button>
                <Button color="inherit" onClick={() => navigate('/forgot-password')} size="small">Reset</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '64px' }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;