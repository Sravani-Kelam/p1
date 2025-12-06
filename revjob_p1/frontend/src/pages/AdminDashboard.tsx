import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Chip, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Tabs,
  Tab,
  TablePagination
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Visibility, 
  People, 
  Work, 
  Business, 
  Assessment 
} from '@mui/icons-material';
import { User, Job } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data for demonstration
  useEffect(() => {
    setUsers([
      { id: '1', email: 'john@example.com', firstName: 'John', lastName: 'Doe', role: 'JOB_SEEKER' },
      { id: '2', email: 'jane@company.com', firstName: 'Jane', lastName: 'Smith', role: 'EMPLOYER' },
      { id: '3', email: 'admin@revjobs.com', firstName: 'Admin', lastName: 'User', role: 'ADMIN' },
    ]);

    setJobs([
      {
        id: '1',
        title: 'Senior React Developer',
        description: 'Looking for an experienced React developer...',
        requirements: ['React', 'TypeScript', 'Node.js'],
        salaryMin: 120000,
        salaryMax: 150000,
        location: 'San Francisco',
        remote: true,
        experienceLevel: 'SENIOR',
        employerId: '2',
        companyName: 'TechCorp',
        postedDate: '2024-01-15',
        status: 'ACTIVE'
      },
      {
        id: '2',
        title: 'Product Manager',
        description: 'Seeking a product manager to lead our team...',
        requirements: ['Product Management', 'Agile', 'Analytics'],
        salaryMin: 130000,
        salaryMax: 160000,
        location: 'New York',
        remote: false,
        experienceLevel: 'MID',
        employerId: '2',
        companyName: 'StartupXYZ',
        postedDate: '2024-01-10',
        status: 'ACTIVE'
      }
    ]);

    setCompanies([
      { id: '1', name: 'TechCorp', employees: 500, industry: 'Technology', verified: true },
      { id: '2', name: 'StartupXYZ', employees: 50, industry: 'Fintech', verified: false },
    ]);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string, type: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'user') {
        setUsers(users.filter(u => u.id !== id));
      } else if (type === 'job') {
        setJobs(jobs.filter(j => j.id !== id));
      } else if (type === 'company') {
        setCompanies(companies.filter(c => c.id !== id));
      }
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stats = [
    { title: 'Total Users', value: users.length, icon: <People />, color: 'primary' },
    { title: 'Active Jobs', value: jobs.filter(j => j.status === 'ACTIVE').length, icon: <Work />, color: 'success' },
    { title: 'Companies', value: companies.length, icon: <Business />, color: 'info' },
    { title: 'Applications', value: 156, icon: <Assessment />, color: 'warning' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Admin Dashboard
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
            <Tab label="Users" />
            <Tab label="Jobs" />
            <Tab label="Companies" />
            <Tab label="Reports" />
          </Tabs>
        </Box>

        {/* Users Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={user.role === 'ADMIN' ? 'error' : user.role === 'EMPLOYER' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(user)} size="small">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id, 'user')} size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>

        {/* Jobs Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Posted Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.companyName}</TableCell>
                    <TableCell>{job.location} {job.remote && '(Remote)'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={job.status} 
                        color={job.status === 'ACTIVE' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(job)} size="small">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(job.id, 'job')} size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={jobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>

        {/* Companies Tab */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.employees}</TableCell>
                    <TableCell>
                      <Chip 
                        label={company.verified ? 'Verified' : 'Pending'} 
                        color={company.verified ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(company)} size="small">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(company.id, 'company')} size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={companies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>

        {/* Reports Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>User Registration Trends</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Analytics and reporting features would be implemented here with charts and graphs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Job Application Metrics</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Detailed metrics about job applications, success rates, and more.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit {selectedItem?.firstName ? 'User' : selectedItem?.title ? 'Job' : 'Company'}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Edit functionality would be implemented here with appropriate forms for each entity type.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;