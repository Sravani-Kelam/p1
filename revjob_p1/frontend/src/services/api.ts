const API_BASE_URL = 'http://localhost:2706/api';

export const api = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  register: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Jobs endpoints
  getJobs: async () => {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    return response.json();
  },

  getJobById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    return response.json();
  },

  // Companies endpoints
  getCompanies: async () => {
    const response = await fetch(`${API_BASE_URL}/companies`);
    return response.json();
  }
};

// Auth API
export const authAPI = {
  login: api.login,
  register: api.register
};

// Job API
export const jobAPI = {
  getJobs: async (filters?: any) => {
    const queryParams = filters ? new URLSearchParams(filters).toString() : '';
    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`);
    return response.json();
  },
  getJobById: api.getJobById,
  createJob: async (jobData: any) => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    return response.json();
  },
  searchJobs: async (query: string, location?: string, experience?: string) => {
    const params = new URLSearchParams({ q: query });
    if (location) params.append('location', location);
    if (experience) params.append('experience', experience);
    const response = await fetch(`${API_BASE_URL}/jobs/search?${params}`);
    return response.json();
  },
  getRecommendedJobs: async () => {
    const response = await fetch(`${API_BASE_URL}/jobs/recommended`);
    return response.json();
  }
};

// Application API
export const applicationAPI = {
  apply: async (jobId: string, coverLetter: string) => {
    // Real-time application simulation
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const newApplication = {
      id: Date.now().toString(),
      jobId,
      coverLetter,
      status: 'APPLIED',
      appliedDate: new Date().toISOString(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      progress: [
        { stage: 'Applied', date: new Date().toISOString(), completed: true },
        { stage: 'Under Review', date: null, completed: false },
        { stage: 'Interview', date: null, completed: false },
        { stage: 'Final Decision', date: null, completed: false }
      ]
    };
    
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // Simulate real-time status updates
    setTimeout(() => {
      const updatedApps = JSON.parse(localStorage.getItem('applications') || '[]');
      const appIndex = updatedApps.findIndex((app: any) => app.id === newApplication.id);
      if (appIndex !== -1) {
        updatedApps[appIndex].progress[1].completed = true;
        updatedApps[appIndex].progress[1].date = new Date().toISOString();
        updatedApps[appIndex].status = 'UNDER_REVIEW';
        localStorage.setItem('applications', JSON.stringify(updatedApps));
      }
    }, 3000);
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, application: newApplication, message: 'Application submitted successfully! You will receive updates on your application status.' });
      }, 800);
    });
  },
  
  getMyApplications: async () => {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    return applications.filter((app: any) => app.userId === userId);
  },
  
  getApplicationStatus: async (jobId: string) => {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    return applications.find((app: any) => app.jobId === jobId && app.userId === userId);
  },
  
  withdrawApplication: async (applicationId: string) => {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const updatedApps = applications.filter((app: any) => app.id !== applicationId);
    localStorage.setItem('applications', JSON.stringify(updatedApps));
    return { success: true, message: 'Application withdrawn successfully' };
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`);
    return response.json();
  },
  updateProfile: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  }
};

// Message API
export const messageAPI = {
  getMessages: async () => {
    const response = await fetch(`${API_BASE_URL}/messages`);
    return response.json();
  },
  sendMessage: async (messageData: any) => {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    return response.json();
  }
};