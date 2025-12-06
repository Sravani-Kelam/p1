import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, InputAdornment, Button, Chip, Avatar, Pagination } from '@mui/material';
import { Search, Business, LocationOn, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Companies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 4;
  const navigate = useNavigate();

  const companies = [
    {
      id: '1',
      name: 'Google',
      logo: 'G',
      industry: 'Technology',
      location: 'Mountain View, CA',
      employees: '100,000+',
      openJobs: 1250,
      rating: 4.5,
      description: 'A multinational technology company specializing in Internet-related services and products.'
    },
    {
      id: '2',
      name: 'Microsoft',
      logo: 'M',
      industry: 'Technology',
      location: 'Redmond, WA',
      employees: '200,000+',
      openJobs: 890,
      rating: 4.4,
      description: 'American multinational technology corporation producing computer software and consumer electronics.'
    },
    {
      id: '3',
      name: 'Amazon',
      logo: 'A',
      industry: 'E-commerce',
      location: 'Seattle, WA',
      employees: '1,500,000+',
      openJobs: 2100,
      rating: 4.2,
      description: 'American multinational technology company focusing on e-commerce and cloud computing.'
    },
    {
      id: '4',
      name: 'Apple',
      logo: 'A',
      industry: 'Technology',
      location: 'Cupertino, CA',
      employees: '150,000+',
      openJobs: 650,
      rating: 4.6,
      description: 'American multinational technology company that designs and manufactures consumer electronics.'
    },
    {
      id: '5',
      name: 'Netflix',
      logo: 'N',
      industry: 'Entertainment',
      location: 'Los Gatos, CA',
      employees: '12,000+',
      openJobs: 320,
      rating: 4.3,
      description: 'American streaming entertainment service with TV series, documentaries and feature films.'
    },
    {
      id: '6',
      name: 'Tesla',
      logo: 'T',
      industry: 'Automotive',
      location: 'Austin, TX',
      employees: '127,000+',
      openJobs: 890,
      rating: 4.1,
      description: 'American electric vehicle and clean energy company based in Austin, Texas.'
    },
    {
      id: '7',
      name: 'Meta',
      logo: 'M',
      industry: 'Social Media',
      location: 'Menlo Park, CA',
      employees: '87,000+',
      openJobs: 1100,
      rating: 4.0,
      description: 'American multinational technology conglomerate holding company based in Menlo Park.'
    },
    {
      id: '8',
      name: 'Spotify',
      logo: 'S',
      industry: 'Music Streaming',
      location: 'Stockholm, Sweden',
      employees: '9,000+',
      openJobs: 450,
      rating: 4.4,
      description: 'Swedish audio streaming and media services provider founded in Stockholm.'
    }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  const startIndex = (currentPage - 1) * companiesPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, startIndex + companiesPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 6, mb: 4 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
          Top Companies
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 4, color: 'rgba(255,255,255,0.9)' }}>
          Discover amazing companies and their open positions
        </Typography>
        
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <TextField
            fullWidth
            placeholder="Search companies..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              sx: { bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' } }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 4, px: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#212121' }}>
          Showing {startIndex + 1}-{Math.min(startIndex + companiesPerPage, filteredCompanies.length)} of {filteredCompanies.length} companies
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ px: 3 }}>
        {currentCompanies.map((company) => (
          <Grid item xs={12} md={6} key={company.id}>
            <Card sx={{ 
              height: '100%',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: '#1976d2', fontSize: '1.5rem', fontWeight: 700 }}>
                    {company.logo}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#212121' }}>
                      {company.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {company.industry}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: '#757575' }} paragraph>
                  {company.description}
                </Typography>

                <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <LocationOn fontSize="small" sx={{ color: '#757575' }} />
                    <Typography variant="body2" sx={{ color: '#212121' }}>{company.location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <People fontSize="small" sx={{ color: '#757575' }} />
                    <Typography variant="body2" sx={{ color: '#212121' }}>{company.employees}</Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="between" alignItems="center">
                  <Chip 
                    label={`${company.openJobs} Open Jobs`} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Button variant="contained" size="small">
                    View Jobs
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" sx={{ mt: 4, pb: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default Companies;