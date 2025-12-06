import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Grid, Divider, Alert } from '@mui/material';
import { LocationOn, Work, AttachMoney, CalendarToday, Business, Share, Bookmark } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

import { Job } from '../../types';
import { jobAPI, applicationAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      // Mock job data
      const mockJob = {
        id: id!,
        title: 'Senior React Developer',
        description: '<h3>About the Role</h3><p>We are looking for an experienced React developer to join our growing team. You will be responsible for building scalable web applications and working closely with our design and backend teams.</p><h3>Responsibilities</h3><ul><li>Develop and maintain React applications</li><li>Collaborate with cross-functional teams</li><li>Write clean, maintainable code</li><li>Participate in code reviews</li></ul>',
        requirements: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Jest', 'Git'],
        salaryMin: 120000,
        salaryMax: 150000,
        location: 'San Francisco',
        remote: true,
        experienceLevel: 'SENIOR' as const,
        employerId: '2',
        companyName: 'TechCorp',
        postedDate: '2024-01-15',
        applicationDeadline: '2024-02-15',
        status: 'ACTIVE' as const
      };
      setJob(mockJob);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!job) return;
    
    setApplying(true);
    try {
      const result = await applicationAPI.apply(job.id, coverLetter);
      setApplyDialogOpen(false);
      setCoverLetter('');
      setApplied(true);
      
      // Show success message
      console.log('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying:', error);
    } finally {
      setApplying(false);
    }
  };

  // Check if already applied
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (job && user) {
        try {
          const application = await applicationAPI.getApplicationStatus(job.id);
          if (application) {
            setApplied(true);
          }
        } catch (error) {
          console.error('Error checking application status:', error);
        }
      }
    };
    
    checkApplicationStatus();
  }, [job, user]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!job) return (
    <Box textAlign="center" py={8}>
      <Typography variant="h5" gutterBottom>Job not found</Typography>
      <Typography color="text.secondary">The job you're looking for doesn't exist or has been removed.</Typography>
    </Box>
  );

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    return `Up to $${max?.toLocaleString()}`;
  };

  return (
    <Box>
      {applied && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Application submitted successfully! We'll notify you about the next steps.
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="between" alignItems="start" mb={3}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {job.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Business color="primary" />
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      {job.companyName}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" gap={1}>
                  <Button variant="outlined" startIcon={<Share />} size="small">
                    Share
                  </Button>
                  <Button variant="outlined" startIcon={<Bookmark />} size="small">
                    Save
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center" gap={1} p={2} bgcolor="grey.50" borderRadius={2}>
                    <LocationOn color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Location</Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {job.location} {job.remote && '(Remote)'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center" gap={1} p={2} bgcolor="grey.50" borderRadius={2}>
                    <Work color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Experience</Typography>
                      <Typography variant="body1" fontWeight={500}>{job.experienceLevel}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center" gap={1} p={2} bgcolor="grey.50" borderRadius={2}>
                    <AttachMoney color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Salary</Typography>
                      <Typography variant="body1" fontWeight={500}>{formatSalary(job.salaryMin, job.salaryMax)}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box display="flex" alignItems="center" gap={1} p={2} bgcolor="grey.50" borderRadius={2}>
                    <CalendarToday color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Posted</Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {new Date(job.postedDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Job Description
              </Typography>
              <Box sx={{ 
                fontSize: '1rem',
                lineHeight: 1.6,
                '& h3': { fontWeight: 600, mb: 2 },
                '& p': { mb: 2 },
                '& ul': { pl: 3, mb: 2 },
                '& li': { mb: 1 }
              }}>
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              </Box>

              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Required Skills
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
                {job.requirements.map((req, index) => (
                  <Chip 
                    key={index} 
                    label={req} 
                    variant="outlined"
                    sx={{ 
                      bgcolor: 'primary.50',
                      borderColor: 'primary.200',
                      fontWeight: 500
                    }}
                  />
                ))}
              </Box>

              {job.applicationDeadline && (
                <Alert severity="warning" sx={{ mt: 3 }}>
                  Application deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              {user?.role === 'JOB_SEEKER' && (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => setApplyDialogOpen(true)}
                  disabled={applied}
                  sx={{ 
                    mb: 2, 
                    py: 1.5, 
                    fontSize: '1.1rem', 
                    fontWeight: 600,
                    background: applied ? '#4ecdc4' : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    '&:hover': {
                      background: applied ? '#4ecdc4' : 'linear-gradient(135deg, #ee5a24 0%, #c44569 100%)',
                      transform: applied ? 'none' : 'translateY(-2px)'
                    }
                  }}
                >
                  {applied ? '✅ Application Submitted' : '🚀 Apply Now'}
                </Button>
              )}
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                Job Details
              </Typography>
              <Box sx={{ '& > div': { mb: 2 } }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Job Type</Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {job.remote ? 'Remote' : 'On-site'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Experience Level</Typography>
                  <Typography variant="body1" fontWeight={500}>{job.experienceLevel}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={job.status} 
                    color={job.status === 'ACTIVE' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            margin="normal"
            placeholder="Tell us why you're interested in this position..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyDialogOpen(false)} sx={{ color: '#666' }}>Cancel</Button>
          <Button 
            onClick={handleApply} 
            variant="contained" 
            disabled={applying}
            sx={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #ee5a24 0%, #c44569 100%)'
              }
            }}
          >
            {applying ? '🔄 Applying...' : '🚀 Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobDetail;