import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar, TextField, InputAdornment, Tabs, Tab } from '@mui/material';
import { Search, Visibility, Message, PersonAdd, Work, TrendingUp, People } from '@mui/icons-material';

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

const RecruiterDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'Active Jobs', value: 12, icon: <Work />, color: 'primary' },
    { title: 'Applications', value: 156, icon: <People />, color: 'success' },
    { title: 'Interviews', value: 23, icon: <PersonAdd />, color: 'info' },
    { title: 'Hired', value: 8, icon: <TrendingUp />, color: 'warning' },
  ];

  const candidates = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Senior React Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      status: 'New',
      appliedDate: '2024-01-15',
      resumeUrl: '#'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      position: 'Product Manager',
      experience: '7 years',
      skills: ['Product Management', 'Agile', 'Analytics'],
      status: 'Interview',
      appliedDate: '2024-01-12',
      resumeUrl: '#'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      position: 'UX Designer',
      experience: '4 years',
      skills: ['Figma', 'User Research', 'Prototyping'],
      status: 'Shortlisted',
      appliedDate: '2024-01-10',
      resumeUrl: '#'
    }
  ];

  const jobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'San Francisco',
      applications: 45,
      status: 'Active',
      postedDate: '2024-01-01'
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'New York',
      applications: 32,
      status: 'Active',
      postedDate: '2024-01-05'
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'info';
      case 'Interview': return 'warning';
      case 'Shortlisted': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Recruiter Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              background: `linear-gradient(135deg, ${stat.color === 'primary' ? '#1976d2' : 
                stat.color === 'success' ? '#2e7d32' : 
                stat.color === 'info' ? '#0288d1' : '#ed6c02'} 0%, ${
                stat.color === 'primary' ? '#42a5f5' : 
                stat.color === 'success' ? '#66bb6a' : 
                stat.color === 'info' ? '#29b6f6' : '#ffb74d'} 100%)`,
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
            <Tab label="Candidates" />
            <Tab label="My Jobs" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        {/* Candidates Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: 400 }}
            />
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {candidate.name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {candidate.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {candidate.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>{candidate.experience}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={0.5} flexWrap="wrap">
                        {candidate.skills.slice(0, 2).map((skill, idx) => (
                          <Chip key={idx} label={skill} size="small" variant="outlined" />
                        ))}
                        {candidate.skills.length > 2 && (
                          <Chip label={`+${candidate.skills.length - 2}`} size="small" />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={candidate.status} 
                        color={getStatusColor(candidate.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(candidate.appliedDate).toLocaleDateString()}</TableCell>
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

        {/* Jobs Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Button variant="contained" startIcon={<PersonAdd />}>
              Post New Job
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Applications</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Posted Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {job.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      <Chip label={job.applications} color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={job.status} 
                        color={job.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button size="small">Edit</Button>
                        <Button size="small">View Applications</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Analytics Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Application Trends</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Analytics charts would be implemented here showing application trends, 
                    conversion rates, and hiring metrics.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Detailed performance metrics including time-to-hire, 
                    source effectiveness, and candidate quality scores.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default RecruiterDashboard;