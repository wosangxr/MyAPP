let MOCK_JOBS = [
  {
    id: "1",
    title: "Full Stack Developer",
    description: "Develop web applications using React and Node.js.",
    requirements: "React, Node.js, PostgreSQL, 2+ Years Exp",
    location: "Bangkok",
    salary: "35,000 - 65,000",
    job_type: 'full-time',
    remote_option: 'hybrid',
    category: 'IT',
    experience_level: 'mid',
    status: 'active',
    company_id: "comp_1",
    created_at: new Date(Date.now() - 2*86400000).toISOString(),
    applications_count: 5,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    description: "Design user interfaces and experiences for apps.",
    requirements: "Figma, Adobe XD, Design Thinking",
    location: "Bangkok",
    salary: "30,000 - 55,000",
    job_type: 'full-time',
    remote_option: 'onsite',
    category: 'Design',
    experience_level: 'mid',
    status: 'active',
    company_id: "comp_1",
    created_at: new Date(Date.now() - 5*86400000).toISOString(),
    applications_count: 12,
  }
];

let MOCK_APPLICATIONS = [
  {
    id: "a1",
    job_id: "1",
    job_title: "Full Stack Developer",
    applicant_name: "Somchai Jaidee",
    applicant_email: "somchai@email.com",
    applicant_title: "Web Developer",
    status: "pending",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "a2",
    job_id: "1",
    job_title: "Full Stack Developer",
    applicant_name: "Supaporn Kengmark",
    applicant_email: "supaporn@email.com",
    applicant_title: "Senior React Dev",
    status: "accepted",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "a3",
    job_id: "2",
    job_title: "UX/UI Designer",
    applicant_name: "Nattapon Creative",
    applicant_email: "nattapon@email.com",
    applicant_title: "Product Designer",
    status: "reviewing",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  }
];

let MOCK_PROFILE = {
    id: 'comp_1',
    name: 'Digital Tech Co., Ltd.',
    industry: 'Information Technology',
    size: '51-200 Employees',
    location: 'Bangkok, Silom',
    description: 'Leading software development company focusing on innovation and agile culture.',
    website: 'https://digitaltech.co.th',
    email: 'hr@digitaltech.co.th',
    phone: '02-123-4567',
    logo_url: null
};

export const companyService = {
  getStats: async (companyId) => {
    await new Promise(r => setTimeout(r, 500));
    return {
      total_jobs: MOCK_JOBS.filter(j => j.status === 'active').length,
      total_applications: MOCK_APPLICATIONS.length,
      pending_reviews: MOCK_APPLICATIONS.filter(a => a.status === 'pending' || a.status === 'reviewing').length,
      accepted_candidates: MOCK_APPLICATIONS.filter(a => a.status === 'accepted').length,
    };
  },

  getMyJobs: async (companyId) => {
    await new Promise(r => setTimeout(r, 500));
    return [...MOCK_JOBS];
  },

  getJobApplicants: async (jobId) => {
    await new Promise(r => setTimeout(r, 500));
    return MOCK_APPLICATIONS.filter(a => a.job_id === jobId || !jobId);
  },

  getProfile: async (companyId) => {
    await new Promise(r => setTimeout(r, 500));
    return { ...MOCK_PROFILE };
  },

  createJob: async (jobData) => {
    await new Promise(r => setTimeout(r, 1000));
    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      title: jobData.title || "New Job",
      description: jobData.description || "",
      requirements: jobData.requirements || "",
      location: jobData.location || "Bangkok",
      salary: jobData.salary || "Negotiable",
      job_type: jobData.job_type || 'full-time',
      remote_option: jobData.remote_option || 'onsite',
      category: jobData.category || 'IT',
      experience_level: jobData.experience_level || 'mid',
      status: 'active',
      company_id: "comp_1",
      created_at: new Date().toISOString(),
      applications_count: 0,
    };
    MOCK_JOBS.unshift(newJob);
    return newJob;
  },

  updateJob: async (jobId, jobData) => {
    await new Promise(r => setTimeout(r, 500));
    const idx = MOCK_JOBS.findIndex(j => j.id === jobId);
    if (idx !== -1) {
        MOCK_JOBS[idx] = { ...MOCK_JOBS[idx], ...jobData };
        return true;
    }
    return false;
  },

  deleteJob: async (jobId) => {
    await new Promise(r => setTimeout(r, 500));
    MOCK_JOBS = MOCK_JOBS.filter(j => j.id !== jobId);
    return true;
  },

  updateApplicationStatus: async (appId, status) => {
    await new Promise(r => setTimeout(r, 500));
    const idx = MOCK_APPLICATIONS.findIndex(a => a.id === appId);
    if (idx !== -1) {
        MOCK_APPLICATIONS[idx].status = status;
        return true;
    }
    return false;
  },

  updateProfile: async (companyId, profileData) => {
    await new Promise(r => setTimeout(r, 500));
    MOCK_PROFILE = { ...MOCK_PROFILE, ...profileData };
    return true;
  },

  getAllJobs: async () => {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_JOBS.filter(j => j.status === 'active');
  },

  applyToJob: async (jobId, applicantData) => {
    await new Promise(r => setTimeout(r, 800));
    // Find the job title
    const job = MOCK_JOBS.find(j => j.id === jobId) || MOCK_JOBS[0];
    const actualJobId = job ? job.id : "1";
    const jobTitle = job ? job.title : "Software Engineer";

    const newApp = {
      id: "a" + Math.floor(Math.random() * 10000),
      job_id: actualJobId,
      job_title: jobTitle,
      applicant_name: applicantData.name || "Unknown Applicant",
      applicant_email: applicantData.email || "applicant@example.com",
      applicant_title: applicantData.title || "Applicant",
      status: "pending",
      created_at: new Date().toISOString(),
    };
    MOCK_APPLICATIONS.unshift(newApp);
    return newApp;
  }
};
