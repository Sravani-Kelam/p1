import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Work, School, TrendingUp, Assessment, Support, Security } from '@mui/icons-material';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Work sx={{ fontSize: 48 }} />,
      title: 'Job Search',
      description: 'Find your dream job from thousands of opportunities across various industries and locations.',
      features: ['Advanced Filters', 'Job Alerts', 'One-Click Apply', 'Application Tracking']
    },
    {
      icon: <School sx={{ fontSize: 48 }} />,
      title: 'Skill Development',
      description: 'Enhance your skills with our comprehensive learning platform and certification programs.',
      features: ['Online Courses', 'Certifications', 'Skill Assessments', 'Learning Paths']
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: 'Career Growth',
      description: 'Get personalized career guidance and insights to accelerate your professional growth.',
      features: ['Career Counseling', 'Resume Building', 'Interview Prep', 'Salary Insights']
    },
    {
      icon: <Assessment sx={{ fontSize: 48 }} />,
      title: 'Analytics & Reports',
      description: 'Access detailed analytics about job market trends and your application performance.',
      features: ['Market Trends', 'Salary Reports', 'Application Analytics', 'Industry Insights']
    },
    {
      icon: <Support sx={{ fontSize: 48 }} />,
      title: '24/7 Support',
      description: 'Get round-the-clock support from our dedicated team of career experts.',
      features: ['Live Chat', 'Email Support', 'Phone Support', 'FAQ Resources']
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Privacy & Security',
      description: 'Your data is protected with enterprise-grade security and privacy measures.',
      features: ['Data Encryption', 'Privacy Controls', 'Secure Payments', 'GDPR Compliant']
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 8, mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
          Our Services
        </Typography>
        <Typography variant="h6" align="center" sx={{ maxWidth: 800, mx: 'auto', color: 'rgba(255,255,255,0.9)' }}>
          Comprehensive career solutions designed to help you succeed in your professional journey
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ px: 3 }}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ 
              height: '100%',
              backgroundColor: '#ffffff',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-8px)',
                boxShadow: 6
              }
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ 
                  color: '#1976d2',
                  mb: 3
                }}>
                  {service.icon}
                </Box>
                
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#212121' }}>
                  {service.title}
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#757575' }} paragraph>
                  {service.description}
                </Typography>

                <Box sx={{ textAlign: 'left', mb: 3 }}>
                  {service.features.map((feature, idx) => (
                    <Typography key={idx} variant="body2" sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 1,
                      color: '#212121',
                      '&:before': {
                        content: '"✓"',
                        color: '#4caf50',
                        fontWeight: 'bold',
                        mr: 1
                      }
                    }}>
                      {feature}
                    </Typography>
                  ))}
                </Box>

                <Button variant="outlined" fullWidth>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ bgcolor: '#f5f5f5', py: 8, mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#212121' }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" sx={{ color: '#757575' }} paragraph>
          Join thousands of professionals who have transformed their careers with RevJobs
        </Typography>
        <Button variant="contained" size="large" sx={{ mt: 2 }}>
          Start Your Journey
        </Button>
      </Box>
    </Box>
  );
};

export default Services;