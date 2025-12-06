import React from 'react';
import { Box, Container } from '@mui/material';
import JobList from '../components/jobs/JobList';

const Jobs: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <JobList />
    </Container>
  );
};

export default Jobs;