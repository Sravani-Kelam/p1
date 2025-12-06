import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Avatar, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import { Work, LocationOn, Schedule, TrendingUp, Send } from '@mui/icons-material';

const Careers: React.FC = () => {
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setApplyDialogOpen(true);
  };

  const handleSubmitApplication = () => {
    const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
    const newApplication = {
      id: Date.now().toString(),
      jobTitle: selectedJob.title,
      ...applicationData,
      appliedDate: new Date().toISOString(),
      status: 'Applied'
    };
    applications.push(newApplication);
    localStorage.setItem('careerApplications', JSON.stringify(applications));
    
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplyDialogOpen(false);
      setApplicationSubmitted(false);
      setApplicationData({ name: '', email: '', phone: '', coverLetter: '' });
    }, 2000);
  };

  const jobOpenings = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      skills: ['React', 'TypeScript', 'Node.js'],
      description: 'Join our engineering team to build the next generation of job search platform.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco',
      type: 'Full-time',
      experience: '3+ years',
      skills: ['Product Strategy', 'Analytics', 'Agile'],
      description: 'Lead product development and strategy for our core platform features.'
    },
    {
      title: 'UX Designer',
      department: 'Design',
      location: 'New York',
      type: 'Full-time',
      experience: '4+ years',
      skills: ['Figma', 'User Research', 'Prototyping'],
      description: 'Design intuitive user experiences that help people find their dream jobs.'
    }
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Salary', desc: 'Top market rates with equity options' },
    { icon: '🏥', title: 'Health Benefits', desc: 'Comprehensive medical, dental, and vision' },
    { icon: '🏖️', title: 'Unlimited PTO', desc: 'Take time off when you need it' },
    { icon: '🎓', title: 'Learning Budget', desc: '$2000 annual learning and development' },
    { icon: '🏠', title: 'Remote Work', desc: 'Work from anywhere in the world' },
    { icon: '🚀', title: 'Growth Opportunities', desc: 'Fast career progression and mentorship' }
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
          Join Our Team
        </Typography>
        <Typography variant="h6" align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 4, color: 'rgba(255,255,255,0.9)' }}>
          Help us build the future of job searching and recruitment. Work with talented people on meaningful projects.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="secondary" size="large">
            View Open Positions
          </Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} size="large">
            Learn About Culture
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ py: 6, bgcolor: '#f5f5f5' }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { number: '50+', label: 'Team Members' },
            { number: '15+', label: 'Countries' },
            { number: '4.8/5', label: 'Employee Rating' },
            { number: '95%', label: 'Retention Rate' }
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2' }}>
                  {stat.number}
                </Typography>
                <Typography variant="h6" sx={{ color: '#757575' }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Open Positions */}
      <Box sx={{ py: 8, px: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 6, color: '#212121' }}>
          Open Positions
        </Typography>
        <Grid container spacing={3}>
          {jobOpenings.map((job, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', backgroundColor: '#ffffff', '&:hover': { boxShadow: 4 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#212121' }}>
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#1976d2' }} gutterBottom>
                    {job.department}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <LocationOn fontSize="small" sx={{ color: '#757575' }} />
                      <Typography variant="body2" sx={{ color: '#757575' }}>{job.location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Schedule fontSize="small" sx={{ color: '#757575' }} />
                      <Typography variant="body2" sx={{ color: '#757575' }}>{job.type}</Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: '#757575' }} paragraph>
                    {job.description}
                  </Typography>

                  <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
                    {job.skills.map((skill, idx) => (
                      <Chip key={idx} label={skill} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => handleApply(job)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Benefits */}
      <Box sx={{ py: 8, bgcolor: '#f5f5f5', px: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 6, color: '#212121' }}>
          Why Work With Us?
        </Typography>
        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%', backgroundColor: '#ffffff' }}>
                <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                  {benefit.icon}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#212121' }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575' }}>
                  {benefit.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA */}
      <Box sx={{ py: 8, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#212121' }}>
          Ready to Join Us?
        </Typography>
        <Typography variant="h6" sx={{ color: '#757575' }} paragraph>
          Don't see a perfect fit? Send us your resume anyway!
        </Typography>
        <Button variant="contained" size="large" onClick={() => handleApply({ title: 'General Application' })}>
          Send Resume
        </Button>
      </Box>

      {/* Application Dialog */}
      <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Apply for {selectedJob?.title}
        </DialogTitle>
        <DialogContent>
          {applicationSubmitted ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Application submitted successfully! We'll review your application and get back to you soon.
            </Alert>
          ) : (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={applicationData.name}
                onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={applicationData.email}
                onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={applicationData.phone}
                onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Cover Letter"
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                margin="normal"
                placeholder="Tell us why you're interested in this position..."
              />
            </Box>
          )}
        </DialogContent>
        {!applicationSubmitted && (
          <DialogActions>
            <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmitApplication} 
              variant="contained" 
              startIcon={<Send />}
              disabled={!applicationData.name || !applicationData.email}
            >
              Submit Application
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default Careers;