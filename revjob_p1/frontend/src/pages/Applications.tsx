import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, Tabs, Tab } from '@mui/material';
import { Visibility, Message, Delete, TrendingUp, Schedule, CheckCircle, Cancel } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Applications: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const applications = [
    {
      id: '1',
      jobTitle: 'Senior React Developer',
      company: 'TechCorp',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      statusColor: 'warning',
      progress: 75,
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      interviewDate: '2024-01-20',
      notes: 'Technical interview scheduled with the engineering team'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      appliedDate: '2024-01-12',
      status: 'Under Review',
      statusColor: 'info',
      progress: 50,
      location: 'New York, NY',
      salary: '$100k - $130k',
      notes: 'Application is being reviewed by the hiring team'
    },
    {
      id: '3',
      jobTitle: 'Frontend Developer',
      company: 'WebSolutions',
      appliedDate: '2024-01-10',
      status: 'Rejected',
      statusColor: 'error',
      progress: 25,
      location: 'Austin, TX',
      salary: '$90k - $110k',
      notes: 'Position filled by another candidate'
    },
    {
      id: '4',
      jobTitle: 'Product Manager',
      company: 'InnovateCorp',
      appliedDate: '2024-01-08',
      status: 'Applied',
      statusColor: 'default',
      progress: 25,
      location: 'Seattle, WA',
      salary: '$130k - $160k',
      notes: 'Application submitted successfully'
    }
  ];

  const stats = [
    { title: 'Total Applications', value: applications.length, icon: <TrendingUp />, color: 'primary' },
    { title: 'In Progress', value: applications.filter(app => app.status === 'Under Review' || app.status === 'Interview Scheduled').length, icon: <Schedule />, color: 'warning' },
    { title: 'Interviews', value: applications.filter(app => app.status === 'Interview Scheduled').length, icon: <CheckCircle />, color: 'success' },
    { title: 'Rejected', value: applications.filter(app => app.status === 'Rejected').length, icon: <Cancel />, color: 'error' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Interview Scheduled': return <Schedule />;
      case 'Under Review': return <TrendingUp />;
      case 'Rejected': return <Cancel />;
      default: return <CheckCircle />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        My Applications
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              background: `linear-gradient(135deg, ${stat.color === 'primary' ? '#1976d2' : 
                stat.color === 'success' ? '#2e7d32' : 
                stat.color === 'warning' ? '#ed6c02' : '#d32f2f'} 0%, ${
                stat.color === 'primary' ? '#42a5f5' : 
                stat.color === 'success' ? '#66bb6a' : 
                stat.color === 'warning' ? '#ffb74d' : '#ef5350'} 100%)`,
              color: 'white',
              height: 120
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Box sx={{ mr: 2, opacity: 0.8 }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {stat.title}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Applications" />
            <Tab label="Active" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        {/* All Applications Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Details</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {application.jobTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {application.location}
                        </Typography>
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                          {application.salary}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {application.company}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        icon={getStatusIcon(application.status)}
                        label={application.status} 
                        color={application.statusColor as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: 100 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={application.progress} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {application.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button size="small" startIcon={<Visibility />}>
                          View
                        </Button>
                        <Button size="small" startIcon={<Message />}>
                          Message
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Active Applications Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {applications.filter(app => app.status !== 'Rejected').map((application) => (
              <Grid item xs={12} md={6} key={application.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" justifyContent="between" alignItems="start" mb={2}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {application.jobTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          {application.company}
                        </Typography>
                      </Box>
                      <Chip 
                        label={application.status} 
                        color={application.statusColor as any}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {application.notes}
                    </Typography>
                    
                    {application.interviewDate && (
                      <Box sx={{ bgcolor: 'warning.50', p: 2, borderRadius: 2, mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Interview Scheduled: {new Date(application.interviewDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box display="flex" justifyContent="between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Applied: {new Date(application.appliedDate).toLocaleDateString()}
                      </Typography>
                      <Box display="flex" gap={1}>
                        <Button size="small" variant="outlined">
                          View Details
                        </Button>
                        <Button size="small" variant="contained">
                          Message HR
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Completed Applications Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {applications.filter(app => app.status === 'Rejected' || app.status === 'Hired').map((application) => (
              <Grid item xs={12} md={6} key={application.id}>
                <Card sx={{ height: '100%', opacity: 0.8 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="between" alignItems="start" mb={2}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {application.jobTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          {application.company}
                        </Typography>
                      </Box>
                      <Chip 
                        label={application.status} 
                        color={application.statusColor as any}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {application.notes}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      Applied: {new Date(application.appliedDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default Applications;