-- ============================================================
-- Smart Job Application Tracker - Seed / Reference Data
-- ============================================================

USE job_tracker;

-- Application Status lookup
INSERT INTO Application_Status (status_name, description) VALUES
('Applied',       'Application submitted, waiting for response'),
('Shortlisted',   'Resume shortlisted by HR'),
('Interview',     'Interview scheduled or ongoing'),
('Offer',         'Received an offer letter'),
('Rejected',      'Application was rejected'),
('Ghosted',       'No response after 3+ weeks'),
('Withdrawn',     'Withdrew application voluntarily');

-- Skills
INSERT INTO Skills (skill_name, category) VALUES
('SQL', 'technical'),
('Python', 'technical'),
('Power BI', 'tool'),
('Excel', 'tool'),
('Tableau', 'tool'),
('Data Modeling', 'technical'),
('ETL', 'technical'),
('Machine Learning', 'technical'),
('Communication', 'soft'),
('Problem Solving', 'soft'),
('JavaScript', 'technical'),
('React', 'technical'),
('Node.js', 'technical'),
('Java', 'technical'),
('C++', 'technical'),
('Git', 'tool'),
('Docker', 'tool'),
('AWS', 'tool'),
('Statistics', 'technical'),
('Data Visualization', 'technical');

-- Resume Versions
INSERT INTO Resume_Versions (version_name, focus_area, last_updated, notes) VALUES
('v1_general',      'General software roles',            '2024-11-01', 'Basic resume used at start'),
('v2_data',         'Data analyst / BI focused',         '2024-12-10', 'Added SQL projects and Power BI'),
('v3_fullstack',    'Full stack developer roles',        '2025-01-05', 'Highlighted web projects'),
('v4_intern_data',  'Data internships specifically',     '2025-02-20', 'Shorter, tailored for internships');

-- Companies
INSERT INTO Companies (company_name, industry, location, company_size, website) VALUES
('TCS', 'IT Services', 'Chennai', 'large', 'tcs.com'),
('Infosys', 'IT Services', 'Bangalore', 'large', 'infosys.com'),
('Wipro', 'IT Services', 'Hyderabad', 'large', 'wipro.com'),
('Cognizant', 'IT Services', 'Chennai', 'large', 'cognizant.com'),
('HCL Technologies', 'IT Services', 'Noida', 'large', 'hcltech.com'),
('Zoho', 'SaaS', 'Chennai', 'mid-size', 'zoho.com'),
('Freshworks', 'SaaS', 'Chennai', 'mid-size', 'freshworks.com'),
('Chargebee', 'Fintech SaaS', 'Chennai', 'mid-size', 'chargebee.com'),
('PhonePe', 'Fintech', 'Bangalore', 'mid-size', 'phonepe.com'),
('Razorpay', 'Fintech', 'Bangalore', 'mid-size', 'razorpay.com'),
('CRED', 'Fintech', 'Bangalore', 'mid-size', 'cred.club'),
('Swiggy', 'Food Tech', 'Bangalore', 'large', 'swiggy.com'),
('Zomato', 'Food Tech', 'Gurgaon', 'large', 'zomato.com'),
('Ola', 'Transport Tech', 'Bangalore', 'large', 'olacabs.com'),
('Meesho', 'E-Commerce', 'Bangalore', 'mid-size', 'meesho.com'),
('Flipkart', 'E-Commerce', 'Bangalore', 'large', 'flipkart.com'),
('Amazon India', 'E-Commerce', 'Hyderabad', 'large', 'amazon.in'),
('Microsoft India', 'Tech', 'Hyderabad', 'large', 'microsoft.com'),
('Google India', 'Tech', 'Bangalore', 'large', 'google.com'),
('IBM India', 'IT Services', 'Bangalore', 'large', 'ibm.com'),
('Accenture', 'Consulting', 'Mumbai', 'large', 'accenture.com'),
('Deloitte India', 'Consulting', 'Mumbai', 'large', 'deloitte.com'),
('PwC India', 'Consulting', 'Delhi', 'large', 'pwc.in'),
('Capgemini', 'IT Services', 'Mumbai', 'large', 'capgemini.com'),
('Tech Mahindra', 'IT Services', 'Pune', 'large', 'techmahindra.com'),
('Mphasis', 'IT Services', 'Bangalore', 'mid-size', 'mphasis.com'),
('Hexaware', 'IT Services', 'Chennai', 'mid-size', 'hexaware.com'),
('Mindtree', 'IT Services', 'Bangalore', 'mid-size', 'mindtree.com'),
('Persistent Systems', 'IT Services', 'Pune', 'mid-size', 'persistent.com'),
('NIIT Technologies', 'IT Services', 'Delhi', 'mid-size', 'niit-tech.com'),
('Lenskart', 'E-Commerce', 'Delhi', 'mid-size', 'lenskart.com'),
('Urban Company', 'Services', 'Gurgaon', 'mid-size', 'urbancompany.com'),
('Nykaa', 'E-Commerce', 'Mumbai', 'mid-size', 'nykaa.com'),
('ShareChat', 'Social Media', 'Bangalore', 'mid-size', 'sharechat.com'),
('Dream11', 'Gaming', 'Mumbai', 'mid-size', 'dream11.com'),
('Unacademy', 'EdTech', 'Bangalore', 'mid-size', 'unacademy.com'),
('BYJU''s', 'EdTech', 'Bangalore', 'large', 'byjus.com'),
('upGrad', 'EdTech', 'Mumbai', 'mid-size', 'upgrad.com'),
('Vedantu', 'EdTech', 'Bangalore', 'startup', 'vedantu.com'),
('Cure.fit', 'Health Tech', 'Bangalore', 'mid-size', 'cure.fit'),
('1mg', 'Health Tech', 'Delhi', 'mid-size', '1mg.com'),
('Practo', 'Health Tech', 'Bangalore', 'mid-size', 'practo.com'),
('Porter', 'Logistics', 'Bangalore', 'startup', 'porter.in'),
('Delhivery', 'Logistics', 'Gurgaon', 'large', 'delhivery.com'),
('BlackBuck', 'Logistics', 'Bangalore', 'mid-size', 'blackbuck.com'),
('Groww', 'Fintech', 'Bangalore', 'mid-size', 'groww.in'),
('Zerodha', 'Fintech', 'Bangalore', 'mid-size', 'zerodha.com'),
('Paytm', 'Fintech', 'Noida', 'large', 'paytm.com'),
('MakeMyTrip', 'Travel Tech', 'Gurgaon', 'mid-size', 'makemytrip.com'),
('OYO', 'Travel Tech', 'Gurgaon', 'large', 'oyorooms.com');

-- Job Roles
INSERT INTO Job_Roles (role_title, role_type, domain, min_salary, max_salary) VALUES
('Data Analyst Intern',          'internship',  'Data Analytics',    8000,   15000),
('Junior Data Analyst',          'full-time',   'Data Analytics',    350000, 600000),
('SQL Developer Intern',         'internship',  'Database',          6000,   12000),
('Business Analyst',             'full-time',   'Business Analysis', 400000, 700000),
('Data Engineer Intern',         'internship',  'Data Engineering',  10000,  18000),
('Power BI Developer',           'full-time',   'BI & Reporting',    450000, 750000),
('Software Engineer',            'full-time',   'Software Dev',      500000, 900000),
('Software Engineer Intern',     'internship',  'Software Dev',      10000,  20000),
('Frontend Developer',           'full-time',   'Web Dev',           400000, 700000),
('Frontend Dev Intern',          'internship',  'Web Dev',           8000,   15000),
('Backend Developer',            'full-time',   'Web Dev',           450000, 800000),
('Full Stack Intern',            'internship',  'Web Dev',           10000,  18000),
('Product Analyst',              'full-time',   'Product',           500000, 850000),
('Operations Analyst',           'full-time',   'Operations',        350000, 550000),
('Data Science Intern',          'internship',  'Data Science',      12000,  20000),
('Machine Learning Engineer',    'full-time',   'ML/AI',             600000, 1200000),
('IT Analyst',                   'full-time',   'IT',                400000, 650000),
('Associate Consultant',         'full-time',   'Consulting',        500000, 800000),
('Technology Analyst',           'full-time',   'IT',                450000, 700000),
('Systems Engineer',             'full-time',   'IT',                350000, 580000);

-- Recruiters (sample)
INSERT INTO Recruiters (recruiter_name, company_id, email, linkedin_url) VALUES
('Priya Sharma',    1,  'priya.sharma@tcs.com',         'linkedin.com/in/priyasharma'),
('Rahul Mehta',     2,  'rahul.mehta@infosys.com',      'linkedin.com/in/rahulmehta'),
('Sneha Iyer',      6,  'sneha.iyer@zoho.com',          'linkedin.com/in/snehaiyer'),
('Arvind Kumar',    7,  'arvind@freshworks.com',        'linkedin.com/in/arvindkumar'),
('Deepa Nair',      10, 'deepa@razorpay.com',           'linkedin.com/in/deepanair'),
('Karthik Rajan',   17, 'karthik@amazon.in',            'linkedin.com/in/karthikriajan'),
('Ananya Singh',    18, 'ananya@microsoft.com',         'linkedin.com/in/ananyasingh'),
('Vijay Prasad',    21, 'vijay@accenture.com',          'linkedin.com/in/vijayprasad'),
('Meena Balaji',    16, 'meena@flipkart.com',           'linkedin.com/in/meenabalaji'),
('Suresh Naidu',    12, 'suresh@swiggy.com',            'linkedin.com/in/sureshnaidu');
