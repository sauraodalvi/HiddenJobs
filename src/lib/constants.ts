
export const ATS_PLATFORMS = [
  { name: 'Greenhouse', domain: 'boards.greenhouse.io', logoDomain: 'greenhouse.io', isPro: false },
  { name: 'Lever', domain: 'jobs.lever.co', logoDomain: 'lever.co', isPro: false },
  { name: 'Workday', domain: 'myworkdayjobs.com', logoDomain: 'workday.com', isPro: false },
  { name: 'SmartRecruiters', domain: 'jobs.smartrecruiters.com', logoDomain: 'smartrecruiters.com', isPro: false },
  { name: 'BambooHR', domain: 'bamboohr.com', logoDomain: 'bamboohr.com', isPro: false },
  { name: 'JazzHR', domain: 'applytojob.com', logoDomain: 'jazzhr.com', isPro: false },
  { name: 'Breezy HR', domain: 'breezy.hr', logoDomain: 'breezy.hr', isPro: false },
  { name: 'iCIMS', domain: 'icims.com', logoDomain: 'icims.com', isPro: false },
  { name: 'Jobvite', domain: 'jobs.jobvite.com', logoDomain: 'jobvite.com', isPro: false },
  { name: 'Recruiterbox', domain: 'recruiterbox.com', logoDomain: 'recruiterbox.com', isPro: true },
  { name: 'Ashby', domain: 'ashbyhq.com', logoDomain: 'ashbyhq.com', isPro: true },
  { name: 'Workable', domain: 'apply.workable.com', logoDomain: 'workable.com', isPro: true },
];

export const ROLE_PRESETS: Record<string, string> = {
  // Product
  'Product Manager': '"Product Manager" OR "PM" OR "Product Lead"',
  'Product Analyst': '"Product Analyst" OR "Associate Product Manager" OR "APM"',
  'Product Designer': '"Product Designer" OR "UX Engineer" OR "Start-up Designer"',
  'Product Owner': '"Product Owner" OR "PO" OR "Technical Product Manager"',
  'Associate Product Manager': '("Associate Product Manager" OR "APM" OR "Junior Product Manager")',
  'Product Marketing Manager': '"Product Marketing Manager" OR "PMM" OR "Growth Marketer"',

  // Design
  'UX Designer': '"UX Designer" OR "User Experience Designer" OR "Interaction Designer"',
  'UI Designer': '"UI Designer" OR "User Interface Designer" OR "Visual Designer"',
  'Graphic Designer': '"Graphic Designer" OR "Brand Designer" OR "Visual Communication"',
  'Motion Designer': '"Motion Designer" OR "Motion Graphics" OR "Animator"',
  'Brand Designer': '"Brand Designer" OR "Creative Director" OR "Art Director"',

  // Engineering
  'Software Engineer': '"Software Engineer" OR "SWE" OR "Developer"',
  'Frontend Engineer': '"Frontend Engineer" OR "Frontend Developer" OR "UI Engineer" OR "React Developer"',
  'Backend Engineer': '"Backend Engineer" OR "Backend Developer" OR "API Developer" OR "Golang" OR "Java"',
  'Full Stack Engineer': '"Full Stack Engineer" OR "Full Stack Developer" OR "MERN"',
  'DevOps Engineer': '"DevOps Engineer" OR "SRE" OR "Site Reliability Engineer" OR "Platform Engineer"',
  'Data Engineer': '"Data Engineer" OR "ETL Developer" OR "Big Data Engineer"',
  'Machine Learning Engineer': '"Machine Learning Engineer" OR "ML Engineer" OR "AI Engineer"',
  'QA Engineer': '"QA Engineer" OR "Quality Assurance" OR "SDET" OR "Test Automation"',
  'Mobile Engineer': '"Mobile Engineer" OR "iOS Developer" OR "Android Developer" OR "React Native"',

  // Data & Analytics
  'Data Analyst': '"Data Analyst" OR "Business Intelligence Analyst" OR "BI Analyst"',
  'Data Scientist': '"Data Scientist" OR "Decision Scientist" OR "Research Scientist"',
  'Business Analyst': '"Business Analyst" OR "Systems Analyst" OR "Requirements Analyst"',
  'Analytics Engineer': '"Analytics Engineer" OR "Data Warehouse Engineer" OR "dbt"',

  // Marketing
  'Marketing Manager': '"Marketing Manager" OR "Brand Manager"',
  'Content Marketing Manager': '"Content Marketing Manager" OR "Copywriter" OR "Content Strategist"',
  'Growth Manager': '"Growth Manager" OR "Growth Hacker" OR "Head of Growth"',
  'Social Media Manager': '"Social Media Manager" OR "Community Manager"',
  'SEO Specialist': '"SEO Specialist" OR "Search Engine Optimization" OR "SEO Manager"',
  'Performance Marketing Manager': '"Performance Marketing Manager" OR "Paid Acquisition" OR "PPC Manager"',

  // Sales
  'Account Executive': '"Account Executive" OR "AE" OR "Sales Executive"',
  'Sales Development Representative': '"Sales Development Representative" OR "SDR" OR "BDR"',
  'Customer Success Manager': '"Customer Success Manager" OR "CSM" OR "Client Success"',
  'Sales Manager': '"Sales Manager" OR "Director of Sales" OR "VP of Sales"',
  'Account Manager': '"Account Manager" OR "Client Manager" OR "Relationship Manager"',

  // Operations
  'Operations Manager': '"Operations Manager" OR "Director of Operations" OR "COO"',
  'Program Manager': '"Program Manager" OR "PgM" OR "Technical Program Manager"',
  'Project Manager': '"Project Manager" OR "PjM" OR "Delivery Manager"',
  'Supply Chain Manager': '"Supply Chain Manager" OR "Logistics Manager"',
  'Operations Analyst': '"Operations Analyst" OR "BizOps" OR "Business Operations"',

  // Finance
  'Financial Analyst': '"Financial Analyst" OR "FP&A" OR "Finance Associate"',
  'Accountant': '"Accountant" OR "CPA" OR "Controller"',
  'Financial Planning Analyst': '"Financial Planning Analyst" OR "Finance Manager"',
  'Controller': '"Controller" OR "Finance Director"',

  // HR
  'Recruiter': '"Recruiter" OR "Talent Acquisition" OR "Sourcer"',
  'HR Manager': '"HR Manager" OR "Human Resources Manager" OR "HRBP"',
  'People Operations': '"People Operations" OR "People Ops" OR "HR Generalist"',
  'Talent Partner': '"Talent Partner" OR "Talent Manager"',

  // Legal
  'Legal Counsel': '"Legal Counsel" OR "General Counsel" OR "Corporate Counsel"',
  'Compliance Manager': '"Compliance Manager" OR "Risk Manager"',
  'Paralegal': '"Paralegal" OR "Legal Assistant"',

  // Content
  'Content Writer': '"Content Writer" OR "Technical Writer" OR "UX Writer"',
  'Video Editor': '"Video Editor" OR "Videographer" OR "Post Production"',
  'Photographer': '"Photographer" OR "Photo Editor"',

  // Support
  'Customer Support': '"Customer Support" OR "Customer Service" OR "Support Specialist"',
  'Technical Support Engineer': '"Technical Support Engineer" OR "Support Engineer" OR "Solutions Engineer"',

  // Leadership
  'Chief Technology Officer': '"Chief Technology Officer" OR "CTO" OR "VP of Engineering"',
  'Chief Product Officer': '"Chief Product Officer" OR "CPO" OR "Head of Product"',
  'Engineering Manager': '"Engineering Manager" OR "EM" OR "Tech Lead Manager"',
  'Director of Product': '"Director of Product" OR "Group Product Manager"',

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

export const SENIORITY_MAPPINGS: Record<string, string[]> = {
  'senior': ['sr', 'snr', 'lead', 'experienced'],
  'sr': ['senior', 'snr', 'lead', 'experienced'],
  'junior': ['jr', 'jnr', 'entry', 'associate', 'intern'],
  'jr': ['junior', 'jnr', 'entry', 'associate', 'intern'],
  'lead': ['senior', 'principal', 'manager', 'head'],
  'principal': ['staff', 'lead', 'architect'],
  'staff': ['principal', 'lead'],
  'manager': ['lead', 'head', 'director', 'vp'],
  'director': ['head', 'vp', 'chief'],
};

export const COUNTRY_MAPPINGS: Record<string, string> = {
  'uk': '"United Kingdom" OR "UK" OR "London"',
  'united kingdom': '"United Kingdom" OR "UK" OR "London"',
  'gb': '"United Kingdom" OR "UK" OR "London"',
  'canada': '"Canada" OR "CA" OR "Toronto" OR "Vancouver" OR "Montreal"',
  'ca': '"Canada" OR "CA" OR "Toronto" OR "Vancouver" OR "Montreal"',
  'germany': '"Germany" OR "Deutschland" OR "Berlin" OR "Munich"',
  'de': '"Germany" OR "Deutschland" OR "Berlin" OR "Munich"',
  'france': '"France" OR "Paris"',
  'fr': '"France" OR "Paris"',
  'australia': '"Australia" OR "Sydney" OR "Melbourne"',
  'au': '"Australia" OR "Sydney" OR "Melbourne"',
  'india': '"India" OR "Bangalore" OR "Bengaluru" OR "Delhi" OR "Mumbai" OR "Pune"',
  'in': '"India" OR "Bangalore" OR "Bengaluru" OR "Delhi" OR "Mumbai" OR "Pune"',
  'pune': '"Pune" OR "Maharashtra" OR "India"',
  'remote': '"Remote" OR "Work From Home" OR "Anywhere"', // Fallback if needed
};

export const ENGLISH_KEYWORDS = {
  include: '("English speaking" OR "English fluent" OR "Work in English")',
  exclude: '-"German" -"French" -"Spanish" -"Dutch" -"Italian" -"Portuguese" -"Chinese" -"Japanese" -"Russian" -"Arabic"'
};

// SEO Directory Constants
export const DIRECTORY_ROLES = [
  // --- Engineering ---
  { slug: 'software-engineer', label: 'Software Engineer' },
  { slug: 'senior-software-engineer', label: 'Senior Software Engineer' },
  { slug: 'staff-software-engineer', label: 'Staff Software Engineer' },
  { slug: 'principal-software-engineer', label: 'Principal Software Engineer' },
  { slug: 'lead-software-engineer', label: 'Lead Software Engineer' },
  { slug: 'graduate-software-engineer', label: 'Graduate Software Engineer' },
  { slug: 'junior-software-engineer', label: 'Junior Software Engineer' },
  { slug: 'software-engineer-intern', label: 'Software Engineer Intern' },
  { slug: 'engineering-manager', label: 'Engineering Manager' },
  { slug: 'director-of-engineering', label: 'Director of Engineering' },
  { slug: 'vp-engineering', label: 'VP of Engineering' },
  { slug: 'head-of-engineering', label: 'Head of Engineering' },
  { slug: 'infrastructure-engineer', label: 'Infrastructure Engineer' },
  { slug: 'platform-engineer', label: 'Platform Engineer' },
  { slug: 'reliability-engineer', label: 'Site Reliability Engineer' },
  { slug: 'security-engineer', label: 'Security Engineer' },
  { slug: 'cloud-architect', label: 'Cloud Architect' },

  // Frontend/Mobile
  { slug: 'frontend-engineer', label: 'Frontend Engineer' },
  { slug: 'senior-frontend-engineer', label: 'Senior Frontend Engineer' },
  { slug: 'lead-frontend-engineer', label: 'Lead Frontend Engineer' },
  { slug: 'ios-engineer', label: 'iOS Engineer' },
  { slug: 'android-engineer', label: 'Android Engineer' },
  { slug: 'mobile-engineer', label: 'Mobile Engineer' },
  { slug: 'react-native-developer', label: 'React Native Developer' },

  // Backend/Fullstack
  { slug: 'backend-engineer', label: 'Backend Engineer' },
  { slug: 'senior-backend-engineer', label: 'Senior Backend Engineer' },
  { slug: 'full-stack-engineer', label: 'Full Stack Engineer' },
  { slug: 'senior-full-stack-engineer', label: 'Senior Full Stack Engineer' },

  // Data/AI
  { slug: 'data-engineer', label: 'Data Engineer' },
  { slug: 'senior-data-engineer', label: 'Senior Data Engineer' },
  { slug: 'machine-learning-engineer', label: 'Machine Learning Engineer' },
  { slug: 'ai-engineer', label: 'AI Engineer' },
  { slug: 'mlops-engineer', label: 'MLOps Engineer' },
  { slug: 'ai-researcher', label: 'AI Researcher' },
  { slug: 'data-scientist', label: 'Data Scientist' },
  { slug: 'senior-data-scientist', label: 'Senior Data Scientist' },
  { slug: 'analytics-engineer', label: 'Analytics Engineer' },

  // --- Product & Design ---
  { slug: 'product-manager', label: 'Product Manager' },
  { slug: 'senior-product-manager', label: 'Senior Product Manager' },
  { slug: 'growth-pm', label: 'Growth Product Manager' },
  { slug: 'platform-pm', label: 'Platform Product Manager' },
  { slug: 'technical-pm', label: 'Technical Product Manager' },
  { slug: 'staff-product-manager', label: 'Staff Product Manager' },
  { slug: 'director-of-product', label: 'Director of Product' },
  { slug: 'vp-product', label: 'VP of Product' },
  { slug: 'associate-pm', label: 'Associate Product Manager' },

  { slug: 'product-designer', label: 'Product Designer' },
  { slug: 'senior-product-designer', label: 'Senior Product Designer' },
  { slug: 'ux-designer', label: 'UX Designer' },
  { slug: 'ux-researcher', label: 'UX Researcher' },
  { slug: 'brand-designer', label: 'Brand Designer' },
  { slug: 'ux-writer', label: 'UX Writer' },

  // --- Ops, Marketing & Sales ---
  { slug: 'data-analyst', label: 'Data Analyst' },
  { slug: 'business-analyst', label: 'Business Analyst' },
  { slug: 'growth-marketer', label: 'Growth Marketer' },
  { slug: 'product-marketing-manager', label: 'Product Marketing Manager' },
  { slug: 'content-strategist', label: 'Content Strategist' },
  { slug: 'seo-specialist', label: 'SEO Specialist' },
  { slug: 'account-executive', label: 'Account Executive' },
  { slug: 'sales-development-representative', label: 'SDR' },
  { slug: 'customer-success-manager', label: 'Customer Success Manager' },
  { slug: 'operations-manager', label: 'Operations Manager' },
  { slug: 'legal-counsel', label: 'Legal Counsel' },
  { slug: 'hr-business-partner', label: 'HR Business Partner' },
];

export const DIRECTORY_LOCATIONS = [
  { slug: 'remote', label: 'Remote', coords: { lat: 20, lng: 0 } },
  // North America
  { slug: 'san-francisco', label: 'San Francisco', coords: { lat: 37.7749, lng: -122.4194 }, jobCount: 1240, companies: ['openai.com', 'anthropic.com', 'stripe.com', 'uber.com', 'airbnb.com'] },
  { slug: 'new-york', label: 'New York', coords: { lat: 40.7128, lng: -74.0060 }, jobCount: 980, companies: ['datadoghq.com', 'mongodb.com', 'etsy.com', 'bloomberg.com'] },
  { slug: 'seattle', label: 'Seattle', coords: { lat: 47.6062, lng: -122.3321 }, jobCount: 850, companies: ['amazon.com', 'microsoft.com', 'starbucks.com'] },
  { slug: 'austin', label: 'Austin', coords: { lat: 30.2672, lng: -97.7431 }, jobCount: 420, companies: ['tesla.com', 'oracle.com', 'dell.com'] },
  { slug: 'boston', label: 'Boston', coords: { lat: 42.3601, lng: -71.0589 }, jobCount: 380, companies: ['hubspot.com', 'wayfair.com', 'draftkings.com'] },
  { slug: 'chicago', label: 'Chicago', coords: { lat: 41.8781, lng: -87.6298 } },
  { slug: 'los-angeles', label: 'Los Angeles', coords: { lat: 34.0522, lng: -118.2437 } },
  { slug: 'denver', label: 'Denver', coords: { lat: 39.7392, lng: -104.9903 } },
  { slug: 'miami', label: 'Miami', coords: { lat: 25.7617, lng: -80.1918 } },
  { slug: 'vancouver', label: 'Vancouver', coords: { lat: 49.2827, lng: -123.1207 } },
  { slug: 'toronto', label: 'Toronto', coords: { lat: 43.6532, lng: -79.3832 }, jobCount: 520, companies: ['shopify.com', 'wealthsimple.com', 'instacart.com'] },

  // Europe
  { slug: 'london', label: 'London', coords: { lat: 51.5074, lng: -0.1278 }, jobCount: 1100, companies: ['revolut.com', 'monzo.com', 'deepmind.com', 'checkout.com'] },
  { slug: 'paris', label: 'Paris', coords: { lat: 48.8566, lng: 2.3522 }, jobCount: 450, companies: ['mistral.ai', 'ledger.com', 'dataiku.com'] },
  { slug: 'berlin', label: 'Berlin', coords: { lat: 52.5200, lng: 13.4050 }, jobCount: 460, companies: ['hellofresh.com', 'zalando.com', 'n26.com'] },
  { slug: 'amsterdam', label: 'Amsterdam', coords: { lat: 52.3676, lng: 4.9041 }, jobCount: 310, companies: ['adyen.com', 'booking.com', 'mollie.com'] },
  { slug: 'dublin', label: 'Dublin', coords: { lat: 53.3498, lng: -6.2603 } },
  { slug: 'stockholm', label: 'Stockholm', coords: { lat: 59.3293, lng: 18.0686 }, jobCount: 290, companies: ['klarna.com', 'spotify.com', 'northvolt.com'] },
  { slug: 'zurich', label: 'Zurich', coords: { lat: 47.3769, lng: 8.5417 } },
  { slug: 'madrid', label: 'Madrid', coords: { lat: 40.4168, lng: -3.7038 } },

  // Asia / Oceania
  { slug: 'bangalore', label: 'Bangalore', coords: { lat: 12.9716, lng: 77.5946 }, jobCount: 1560, companies: ['flipkart.com', 'zomato.com', 'swiggy.com', 'cred.club'] },
  { slug: 'pune', label: 'Pune', coords: { lat: 18.5204, lng: 73.8567 }, jobCount: 640, companies: ['nvidia.com', 'pubmatic.com', 'icertis.com', 'slack.com'] },
  { slug: 'mumbai', label: 'Mumbai', coords: { lat: 19.0760, lng: 72.8777 }, jobCount: 380, companies: ['tcs.com', 'reliance.com', 'hdfcbank.com'] },
  { slug: 'delhi', label: 'Delhi', coords: { lat: 28.6139, lng: 77.2090 }, jobCount: 420, companies: ['paytm.com', 'lenskart.com', 'nykaa.com'] },
  { slug: 'hyderabad', label: 'Hyderabad', coords: { lat: 17.3850, lng: 78.4867 }, jobCount: 410, companies: ['google.com', 'microsoft.com', 'service-now.com'] },
  { slug: 'chennai', label: 'Chennai', coords: { lat: 13.0827, lng: 80.2707 }, jobCount: 290, companies: ['zoho.com', 'freshworks.com'] },
  { slug: 'singapore', label: 'Singapore', coords: { lat: 1.3521, lng: 103.8198 }, jobCount: 520, companies: ['grab.com', 'sea.com', 'shopee.com'] },
  { slug: 'tokyo', label: 'Tokyo', coords: { lat: 35.6762, lng: 139.6503 }, jobCount: 310, companies: ['mercari.com', 'rakuten.com', 'sony.com'] },
  { slug: 'sydney', label: 'Sydney', coords: { lat: -33.8688, lng: 151.2093 } },
  { slug: 'melbourne', label: 'Melbourne', coords: { lat: -37.8136, lng: 144.9631 } },
  { slug: 'dubai', label: 'Dubai', coords: { lat: 25.2048, lng: 55.2708 } },
];

export const DIRECTORY_PLATFORMS = [
  { slug: 'greenhouse', label: 'Greenhouse', domain: 'boards.greenhouse.io' },
  { slug: 'lever', label: 'Lever', domain: 'jobs.lever.co' },
  { slug: 'ashby', label: 'Ashby', domain: 'jobs.ashbyhq.com' },
  { slug: 'workday', label: 'Workday', domain: 'myworkdayjobs.com' },
  { slug: 'smartrecruiters', label: 'SmartRecruiters', domain: 'jobs.smartrecruiters.com' },
];
