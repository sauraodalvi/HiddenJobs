
export const ATS_PLATFORMS = [
  { name: 'Greenhouse', domain: 'boards.greenhouse.io', isPro: false },
  { name: 'Lever', domain: 'jobs.lever.co', isPro: false },
  { name: 'Workday', domain: 'myworkdayjobs.com', isPro: false },
  { name: 'SmartRecruiters', domain: 'jobs.smartrecruiters.com', isPro: false },
  { name: 'BambooHR', domain: 'bamboohr.com/jobs', isPro: false },
  { name: 'JazzHR', domain: 'applytojob.com', isPro: false },
  { name: 'Breezy HR', domain: 'breezy.hr', isPro: false },
  { name: 'iCIMS', domain: 'icims.com', isPro: false },
  { name: 'Jobvite', domain: 'jobs.jobvite.com', isPro: true },
  { name: 'Recruiterbox', domain: 'recruiterbox.com', isPro: true },
  { name: 'Ashby', domain: 'ashbyhq.com', isPro: true },
  { name: 'Workable', domain: 'apply.workable.com', isPro: true },
];

export const ROLE_PRESETS: Record<string, string> = {
  // Product
  'Product Manager': 'Product Manager OR "PM" OR "Product Lead"',
  'Product Analyst': 'Product Analyst OR "Associate Product Manager" OR "APM"',
  'Product Designer': 'Product Designer OR "UX Engineer" OR "Start-up Designer"',
  'Product Owner': 'Product Owner OR "PO" OR "Technical Product Manager"',
  'Product Marketing Manager': 'Product Marketing Manager OR "PMM" OR "Growth Marketer"',

  // Design
  'UX Designer': 'UX Designer OR "User Experience Designer" OR "Interaction Designer"',
  'UI Designer': 'UI Designer OR "User Interface Designer" OR "Visual Designer"',
  'Graphic Designer': 'Graphic Designer OR "Brand Designer" OR "Visual Communication"',
  'Motion Designer': 'Motion Designer OR "Motion Graphics" OR "Animator"',
  'Brand Designer': 'Brand Designer OR "Creative Director" OR "Art Director"',

  // Engineering
  'Software Engineer': 'Software Engineer OR "SWE" OR "Developer"',
  'Frontend Engineer': 'Frontend Engineer OR "Frontend Developer" OR "UI Engineer" OR "React Developer"',
  'Backend Engineer': 'Backend Engineer OR "Backend Developer" OR "API Developer" OR "Golang" OR "Java"',
  'Full Stack Engineer': 'Full Stack Engineer OR "Full Stack Developer" OR "MERN"',
  'DevOps Engineer': 'DevOps Engineer OR "SRE" OR "Site Reliability Engineer" OR "Platform Engineer"',
  'Data Engineer': 'Data Engineer OR "ETL Developer" OR "Big Data Engineer"',
  'Machine Learning Engineer': 'Machine Learning Engineer OR "ML Engineer" OR "AI Engineer"',
  'QA Engineer': 'QA Engineer OR "Quality Assurance" OR "SDET" OR "Test Automation"',
  'Mobile Engineer': 'Mobile Engineer OR "iOS Developer" OR "Android Developer" OR "React Native"',

  // Data & Analytics
  'Data Analyst': 'Data Analyst OR "Business Intelligence Analyst" OR "BI Analyst"',
  'Data Scientist': 'Data Scientist OR "Decision Scientist" OR "Research Scientist"',
  'Business Analyst': 'Business Analyst OR "Systems Analyst" OR "Requirements Analyst"',
  'Analytics Engineer': 'Analytics Engineer OR "Data Warehouse Engineer" OR "dbt"',

  // Marketing
  'Marketing Manager': 'Marketing Manager OR "Brand Manager"',
  'Content Marketing Manager': 'Content Marketing Manager OR "Copywriter" OR "Content Strategist"',
  'Growth Manager': 'Growth Manager OR "Growth Hacker" OR "Head of Growth"',
  'Social Media Manager': 'Social Media Manager OR "Community Manager"',
  'SEO Specialist': 'SEO Specialist OR "Search Engine Optimization" OR "SEO Manager"',
  'Performance Marketing Manager': 'Performance Marketing Manager OR "Paid Acquisition" OR "PPC Manager"',

  // Sales
  'Account Executive': 'Account Executive OR "AE" OR "Sales Executive"',
  'Sales Development Representative': 'Sales Development Representative OR "SDR" OR "BDR"',
  'Customer Success Manager': 'Customer Success Manager OR "CSM" OR "Client Success"',
  'Sales Manager': 'Sales Manager OR "Director of Sales" OR "VP of Sales"',
  'Account Manager': 'Account Manager OR "Client Manager" OR "Relationship Manager"',

  // Operations
  'Operations Manager': 'Operations Manager OR "Director of Operations" OR "COO"',
  'Program Manager': 'Program Manager OR "PgM" OR "Technical Program Manager"',
  'Project Manager': 'Project Manager OR "PjM" OR "Delivery Manager"',
  'Supply Chain Manager': 'Supply Chain Manager OR "Logistics Manager"',
  'Operations Analyst': 'Operations Analyst OR "BizOps" OR "Business Operations"',

  // Finance
  'Financial Analyst': 'Financial Analyst OR "FP&A" OR "Finance Associate"',
  'Accountant': 'Accountant OR "CPA" OR "Controller"',
  'Financial Planning Analyst': 'Financial Planning Analyst OR "Finance Manager"',
  'Controller': 'Controller OR "Finance Director"',

  // HR
  'Recruiter': 'Recruiter OR "Talent Acquisition" OR "Sourcer"',
  'HR Manager': 'HR Manager OR "Human Resources Manager" OR "HRBP"',
  'People Operations': 'People Operations OR "People Ops" OR "HR Generalist"',
  'Talent Partner': 'Talent Partner OR "Talent Manager"',

  // Legal
  'Legal Counsel': 'Legal Counsel OR "General Counsel" OR "Corporate Counsel"',
  'Compliance Manager': 'Compliance Manager OR "Risk Manager"',
  'Paralegal': 'Paralegal OR "Legal Assistant"',

  // Content
  'Content Writer': 'Content Writer OR "Technical Writer" OR "UX Writer"',
  'Video Editor': 'Video Editor OR "Videographer" OR "Post Production"',
  'Photographer': 'Photographer OR "Photo Editor"',

  // Support
  'Customer Support': 'Customer Support OR "Customer Service" OR "Support Specialist"',
  'Technical Support Engineer': 'Technical Support Engineer OR "Support Engineer" OR "Solutions Engineer"',

  // Leadership
  'Chief Technology Officer': 'Chief Technology Officer OR "CTO" OR "VP of Engineering"',
  'Chief Product Officer': 'Chief Product Officer OR "CPO" OR "Head of Product"',
  'Engineering Manager': 'Engineering Manager OR "EM" OR "Tech Lead Manager"',
  'Director of Product': 'Director of Product OR "Group Product Manager"',

  // Internships
  'Product Manager Intern': '"Product Manager Intern" OR "APM Intern" OR "Product Intern"',
  'Software Engineer Intern': '"Software Engineer Intern" OR "SWE Intern" OR "Engineering Intern"',
  'Data Analyst Intern': '"Data Analyst Intern" OR "DA Intern"',
  'UX Design Intern': '"UX Design Intern" OR "Design Intern"',
  'Marketing Intern': '"Marketing Intern" OR "Social Media Intern"',
  'Data Science Intern': '"Data Science Intern" OR "ML Intern"',
  'Business Analyst Intern': '"Business Analyst Intern" OR "BA Intern"',
  'Sales Intern': '"Sales Intern" OR "SDR Intern"',
  'HR Intern': '"HR Intern" OR "Recruiting Intern"',
  'Finance Intern': '"Finance Intern" OR "Accounting Intern"',
};
