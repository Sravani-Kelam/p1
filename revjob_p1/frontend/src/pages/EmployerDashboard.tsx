import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Add, Visibility, People, Work } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Job, Application } from '../types';

const EmployerDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Mock data for demonstration
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        description: 'We are looking for an experienced React developer...',
        requirements: ['React', 'TypeScript', 'Node.js'],
        salaryMin: 80000,
        salaryMax: 120000,
        location: 'San Francisco, CA',
        remote: true,
        experienceLevel: 'SENIOR',
        employerId: 'emp1',
        companyName: 'TechCorp',
        postedDate: '2024-01-15',
        status: 'ACTIVE'
      },
      {
        id: '2',
        title: 'Product Manager',
        description: 'Join our product team to drive innovation...',
        requirements: ['Product Management', 'Analytics', 'Leadership'],
        salaryMin: 90000,
        salaryMax: 140000,
        location: 'New York, NY',
        remote: false,
        experienceLevel: 'MID',
        employerId: 'emp1',
        companyName: 'TechCorp',
        postedDate: '2024-01-10',
        status: 'ACTIVE'
      }
    ];

    const mockApplications: Application[] = [
      {
        id: '1',
        jobId: '1',
        candidateId: 'John Doe',
        coverLetter: 'I am interested in this position...',
        status: 'APPLIED',
        appliedDate: '2024-01-20',
        lastUpdated: '2024-01-20'
      },
      {
        id: '2',
        jobId: '2',
        candidateId: 'Jane Smith',
        coverLetter: 'I would love to join your team...',
        status: 'REVIEWED',
        appliedDate: '2024-01-18',
        lastUpdated: '2024-01-19'
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setApplications(mockApplications);
      setLoading(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED': return 'info';
      case 'REVIEWED': return 'warning';
      case 'INTERVIEW': return 'primary';
      case 'OFFERED': return 'success';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    // Mock update - in real app this would call API
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: status as any, lastUpdated: new Date().toISOString() }
          : app
      )
    );
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="between" alignItems="center" mb={4}>
        <Typography variant="h4">Employer Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/employer/jobs/create')}
        >
          Post New Job
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box display="flex" gap={3} mb={4} flexWrap="wrap">
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Work sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4">{jobs.length}</Typography>
                <Typography color="text.secondary">Active Jobs</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <People sx={{ fontSize: 40, color: 'success.main' }} />
              <Box>
                <Typography variant="h4">{applications.length}</Typography>
                <Typography color="text.secondary">Total Applications</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Visibility sx={{ fontSize: 40, color: 'info.main' }} />
              <Box>
                <Typography variant="h4">
                  {jobs.reduce((sum, job) => sum + (job as any).views || 0, 0)}
                </Typography>
                <Typography color="text.secondary">Total Views</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Applications */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Applications
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Candidate</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.slice(0, 10).map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      {jobs.find(j => j.id === application.jobId)?.title}
                    </TableCell>
                    <TableCell>{application.candidateId}</TableCell>
                    <TableCell>
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => navigate(`/applications/${application.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Posted Jobs */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Posted Jobs
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {jobs.map((job) => (
              <Box key={job.id} sx={{ flex: '1 1 300px' }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {job.location} • {job.experienceLevel}
                    </Typography>
                    <Box display="flex" justifyContent="between" alignItems="center">
                      <Chip
                        label={job.status}
                        color={job.status === 'ACTIVE' ? 'success' : 'default'}
                        size="small"
                      />
                      <Button
                        size="small"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployerDashboard;