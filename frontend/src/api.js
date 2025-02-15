// Mock data — mirrors real MySQL data for demo deployment
export const MOCK_OVERVIEW = {
  total_applications: 400,
  total_offers: 20,
  total_rejections: 88,
  in_interview: 80,
  pending: 120,
  ghosted: 24,
  offer_rate: 5.0,
  response_rate: 25.0,
};

export const MOCK_BY_STATUS = [
  { status_name: 'Applied',     count: 120 },
  { status_name: 'Rejected',    count: 88  },
  { status_name: 'Interview',   count: 80  },
  { status_name: 'Shortlisted', count: 60  },
  { status_name: 'Ghosted',     count: 24  },
  { status_name: 'Offer',       count: 20  },
  { status_name: 'Withdrawn',   count: 8   },
];

export const MOCK_MONTHLY = [
  { month: '2024-08', count: 28 },
  { month: '2024-09', count: 35 },
  { month: '2024-10', count: 42 },
  { month: '2024-11', count: 55 },
  { month: '2024-12', count: 48 },
  { month: '2025-01', count: 62 },
  { month: '2025-02', count: 50 },
  { month: '2025-03', count: 45 },
  { month: '2025-04', count: 35 },
];

export const MOCK_COMPANIES = [
  { company_name: 'TCS',           applications: 18 },
  { company_name: 'Infosys',       applications: 15 },
  { company_name: 'Zoho',          applications: 14 },
  { company_name: 'Wipro',         applications: 13 },
  { company_name: 'Cognizant',     applications: 12 },
  { company_name: 'Freshworks',    applications: 11 },
  { company_name: 'Razorpay',      applications: 10 },
  { company_name: 'Flipkart',      applications: 9  },
  { company_name: 'Amazon India',  applications: 8  },
  { company_name: 'Swiggy',        applications: 7  },
];

export const MOCK_SOURCES = [
  { source: 'LinkedIn',      count: 140 },
  { source: 'Naukri',        count: 90  },
  { source: 'Company Site',  count: 65  },
  { source: 'Internshala',   count: 45  },
  { source: 'Referral',      count: 35  },
  { source: 'Campus Drive',  count: 25  },
];

export const MOCK_APPLICATIONS = [
  { application_id:1,  company_name:'Zoho',         role_title:'Data Analyst Intern',      role_type:'internship', status_name:'Interview',   source:'LinkedIn',     location:'Chennai',   is_remote:0, applied_date:'2025-01-15', notes:'Good culture, SQL test round 1 cleared' },
  { application_id:2,  company_name:'TCS',          role_title:'Systems Engineer',         role_type:'full-time',  status_name:'Applied',     source:'Naukri',       location:'Chennai',   is_remote:0, applied_date:'2025-01-18', notes:'' },
  { application_id:3,  company_name:'Razorpay',     role_title:'Business Analyst',         role_type:'full-time',  status_name:'Shortlisted', source:'LinkedIn',     location:'Bangalore', is_remote:0, applied_date:'2025-01-20', notes:'HR called, waiting for technical round' },
  { application_id:4,  company_name:'Freshworks',   role_title:'Data Analyst Intern',      role_type:'internship', status_name:'Offer',       source:'Referral',     location:'Chennai',   is_remote:0, applied_date:'2024-12-10', notes:'Got offer! Stipend 18k/month' },
  { application_id:5,  company_name:'Infosys',      role_title:'Technology Analyst',       role_type:'full-time',  status_name:'Rejected',    source:'Campus Drive', location:'Bangalore', is_remote:0, applied_date:'2024-11-05', notes:'Failed aptitude round' },
  { application_id:6,  company_name:'Swiggy',       role_title:'Operations Analyst',       role_type:'full-time',  status_name:'Ghosted',     source:'LinkedIn',     location:'Bangalore', is_remote:0, applied_date:'2024-12-01', notes:'No reply after 3 weeks' },
  { application_id:7,  company_name:'Amazon India', role_title:'Data Analyst Intern',      role_type:'internship', status_name:'Interview',   source:'Company Site', location:'Hyderabad', is_remote:0, applied_date:'2025-02-01', notes:'OA completed, waiting for results' },
  { application_id:8,  company_name:'Wipro',        role_title:'IT Analyst',               role_type:'full-time',  status_name:'Applied',     source:'Naukri',       location:'Hyderabad', is_remote:0, applied_date:'2025-02-10', notes:'' },
  { application_id:9,  company_name:'CRED',         role_title:'Product Analyst',          role_type:'full-time',  status_name:'Rejected',    source:'LinkedIn',     location:'Bangalore', is_remote:1, applied_date:'2025-01-25', notes:'Strong profile needed, try again later' },
  { application_id:10, company_name:'Cognizant',    role_title:'Junior Data Analyst',      role_type:'full-time',  status_name:'Shortlisted', source:'Naukri',       location:'Chennai',   is_remote:0, applied_date:'2025-02-05', notes:'Resume shortlisted, HR round pending' },
  { application_id:11, company_name:'Flipkart',     role_title:'Data Science Intern',      role_type:'internship', status_name:'Applied',     source:'LinkedIn',     location:'Bangalore', is_remote:0, applied_date:'2025-03-01', notes:'' },
  { application_id:12, company_name:'PhonePe',      role_title:'Data Analyst Intern',      role_type:'internship', status_name:'Interview',   source:'LinkedIn',     location:'Bangalore', is_remote:0, applied_date:'2025-02-20', notes:'Technical interview scheduled for next week' },
  { application_id:13, company_name:'Zerodha',      role_title:'Business Analyst',         role_type:'full-time',  status_name:'Ghosted',     source:'Company Site', location:'Bangalore', is_remote:0, applied_date:'2024-12-15', notes:'' },
  { application_id:14, company_name:'Meesho',       role_title:'Full Stack Intern',        role_type:'internship', status_name:'Rejected',    source:'Internshala',  location:'Bangalore', is_remote:1, applied_date:'2025-01-10', notes:'Skills didnt match JD' },
  { application_id:15, company_name:'HCL Tech',     role_title:'Software Engineer',        role_type:'full-time',  status_name:'Applied',     source:'Naukri',       location:'Noida',     is_remote:0, applied_date:'2025-03-10', notes:'' },
];
