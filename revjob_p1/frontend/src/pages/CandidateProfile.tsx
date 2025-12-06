import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Chip, Avatar, Divider, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Email, Phone, LocationOn, Work, School, Download, Message, PersonAdd } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock candidate data
  const candidate = {
    id: id || '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior React Developer',
    summary: 'Experienced full-stack developer with 5+ years of expertise in React, Node.js, and modern web technologies. Passionate about creating scalable applications and leading development teams.',
    experience: [
      {
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        duration: '2021 - Present',
        description: 'Led a team of 4 developers in building responsive web applications using React and TypeScript. Improved application performance by 40% through code optimization.'
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        duration: '2019 - 2021',
        description: 'Developed and maintained multiple web applications using React, Node.js, and MongoDB. Collaborated with design team to implement pixel-perfect UI components.'
      },
      {
        company: 'WebSolutions',
        position: 'Junior Developer',
        duration: '2018 - 2019',
        description: 'Built responsive websites and web applications. Gained experience in modern JavaScript frameworks and backend technologies.'
      }
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        duration: '2014 - 2018',
        gpa: '3.8/4.0'
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'JavaScript', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB', 'PostgreSQL'],
    certifications: [
      'AWS Certified Developer',
      'React Professional Certification',
      'Agile Development Certification'
    ],
    languages: ['English (Native)', 'Spanish (Conversational)'],
    resumeUrl: '#'
  };

  return (
    <Box>
      <Button variant="outlined" sx={{ mb: 3 }} onClick={() => window.history.back()}>
        ← Back to Candidates
      </Button>

      <Grid container spacing={3}>
        {/* Left Column - Basic Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}>
                {candidate.name[0]}
              </Avatar>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {candidate.name}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {candidate.title}
              </Typography>
              
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Email sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{candidate.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{candidate.phone}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{candidate.location}</Typography>
                </Box>
              </Box>

              <Box display="flex" gap={1} flexDirection="column">
                <Button variant="contained" startIcon={<Message />} fullWidth>
                  Send Message
                </Button>
                <Button variant="outlined" startIcon={<Download />} fullWidth>
                  Download Resume
                </Button>
                <Button variant="outlined" startIcon={<PersonAdd />} fullWidth>
                  Schedule Interview
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Skills
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {candidate.skills.map((skill, index) => (
                  <Chip key={index} label={skill} variant="outlined" size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Languages
              </Typography>
              {candidate.languages.map((language, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                  {language}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Detailed Info */}
        <Grid item xs={12} md={8}>
          {/* Summary */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Professional Summary
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {candidate.summary}
              </Typography>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Work sx={{ mr: 1 }} />
                Work Experience
              </Typography>
              {candidate.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {exp.position}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {exp.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {exp.duration}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {exp.description}
                  </Typography>
                  {index < candidate.experience.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <School sx={{ mr: 1 }} />
                Education
              </Typography>
              {candidate.education.map((edu, index) => (
                <Box key={index}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {edu.institution}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {edu.duration}
                  </Typography>
                  <Typography variant="body2">
                    GPA: {edu.gpa}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Certifications
              </Typography>
              <List>
                {candidate.certifications.map((cert, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemText 
                      primary={cert}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateProfile;