export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  credentials: string[];
  linkedin: string;
}

export const AUTHORS: Author[] = [
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Editorial Director & Tech Recruiting Expert",
    bio: "Sarah is a former Recruiting Manager who spent over 8 years leading technical talent acquisition teams at Google and Stripe. She specializes in building modern recruitment funnels, analyzing Applicant Tracking Systems (ATS) metrics, and teaching candidates how to navigate internal hiring pipelines that bypass standard third-party job boards.",
    avatar: "/images/authors/sarah.jpg",
    credentials: [
      "Former Recruiting Lead at Stripe",
      "Former Senior Technical Recruiter at Google",
      "M.S. in Organizational Psychology",
      "10+ Years in Tech Talent Acquisition"
    ],
    linkedin: "https://www.linkedin.com/in/sarah-jenkins-placeholder"
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Lead Systems Engineer & Job Search Architect",
    bio: "Marcus is a veteran systems engineer with a passion for web scraping, database optimization, and search engine mechanics. At HiddenJobs, he designs the Boolean dorking algorithms and scraping engines that interface directly with Greenhouse, Lever, Ashby, and Workday subdomains to locate unlisted tech listings before they syndicate to public boards.",
    avatar: "/images/authors/marcus.jpg",
    credentials: [
      "Former Senior Systems Architect at Slack",
      "B.S. in Computer Science from UC Berkeley",
      "Expert in Boolean Search & Open Source Intelligence (OSINT)",
      "Creator of ATS-Scraper Core Engine"
    ],
    linkedin: "https://www.linkedin.com/in/marcus-chen-placeholder"
  }
];

export function getAuthor(id: string): Author | undefined {
  return AUTHORS.find(a => a.id === id);
}

export function getAuthorByName(name: string): Author | undefined {
  return AUTHORS.find(a => a.name.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(a.name.toLowerCase()));
}
