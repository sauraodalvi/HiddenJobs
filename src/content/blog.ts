export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-find-unlisted-jobs-on-greenhouse",
    title: "How to Find Unlisted Jobs on Greenhouse in 2026",
    description: "Learn how to search Greenhouse job boards directly to find roles before they hit LinkedIn. The hidden job market is real — here's how to access it.",
    date: "2026-06-01",
    author: "HiddenJobs Editorial Team",
    readTime: "5 min read",
    tags: ["Greenhouse", "Job Search", "ATS"],
    content: `
      <h2>What Are Unlisted Greenhouse Jobs?</h2>
      <p>Greenhouse is one of the most widely used applicant tracking systems (ATS) in tech. Thousands of companies use it to manage hiring — and their public job boards are open to anyone. But most job seekers never go directly to these boards, creating a hidden window of opportunity.</p>
      <p>Unlisted jobs are roles that are posted on a company's Greenhouse board but never promoted on LinkedIn, Indeed, or other major job boards. Recruiters often fill these roles before they ever reach a mass audience.</p>
      
      <h2>Why Companies Use Greenhouse for Direct Hiring</h2>
      <p>Companies prefer direct ATS posting because:</p>
      <ul>
        <li><strong>Lower application volume:</strong> A LinkedIn post can get 1000+ applications in hours. A direct Greenhouse post gets 20-50 qualified candidates.</li>
        <li><strong>Speed:</strong> Posting to an existing ATS board takes minutes. Syndicating to job boards takes days.</li>
        <li><strong>Quality signal:</strong> Candidates who apply directly show higher initiative and research effort.</li>
      </ul>
      
      <h2>How to Search Greenhouse Directly</h2>
      <p>You can use Google dorking to find Greenhouse job listings that aren't promoted elsewhere. The basic search pattern is: <code>site:boards.greenhouse.io [job title] [location]</code></p>
      <p>For example, to find software engineer roles in San Francisco: <code>site:boards.greenhouse.io "Software Engineer" San Francisco</code></p>
      <p>HiddenJobs automates this process by generating the right search queries for every major ATS platform and every role-location combination.</p>
    `
  },
  {
    slug: "lever-vs-greenhouse-hidden-jobs",
    title: "Lever vs Greenhouse: Which ATS Has More Hidden Jobs?",
    description: "Compare Greenhouse and Lever for hidden job opportunities. We analyze which platform has more unlisted roles and how to search each one effectively.",
    date: "2026-05-28",
    author: "HiddenJobs Editorial Team",
    readTime: "6 min read",
    tags: ["Greenhouse", "Lever", "Comparison", "ATS"],
    content: `
      <h2>Greenhouse vs Lever: The Hidden Job Market Perspective</h2>
      <p>Greenhouse and Lever are the two most popular ATS platforms tech companies use. Combined, they power job boards for thousands of companies including Airbnb, Stripe, and Shopify. But which one gives you access to more unlisted roles?</p>
      
      <h2>Market Share and Reach</h2>
      <p>Greenhouse has roughly 60% market share among tech companies with 500+ employees. Lever holds about 25%. This means Greenhouse has more total job listings — but Lever's smaller pool often means less competition per role.</p>
      
      <h2>Searching Greenhouse Boards</h2>
      <p>Greenhouse boards follow a predictable pattern: <code>boards.greenhouse.io/[company-name]</code>. You can search all of them at once using: <code>site:boards.greenhouse.io [role] [location]</code></p>
      
      <h2>Searching Lever Boards</h2>
      <p>Lever boards use: <code>jobs.lever.co/[company-name]</code>. Search pattern: <code>site:jobs.lever.co [role] [location]</code></p>
      
      <h2>Which Should You Focus On?</h2>
      <p>Both. Greenhouse has more volume, but Lever roles often have fewer applicants. Use HiddenJobs to search both simultaneously and find every unlisted role across your target market.</p>
    `
  },
  {
    slug: "ashby-job-applications-guide",
    title: "The Ultimate Guide to Ashby Job Applications",
    description: "Ashby is the fastest-growing ATS platform. Learn how to find and apply to jobs on Ashby-powered career pages before anyone else.",
    date: "2026-05-20",
    author: "HiddenJobs Editorial Team",
    readTime: "4 min read",
    tags: ["Ashby", "ATS", "Job Search"],
    content: `
      <h2>What is Ashby?</h2>
      <p>Ashby is a modern applicant tracking system that's rapidly gaining adoption among high-growth tech companies. Companies like Notion, Vercel, and Linear use Ashby for their hiring. Ashby career pages are hosted at <code>jobs.ashbyhq.com/[company]</code>.</p>
      
      <h2>Why Ashby Jobs Are Often Overlooked</h2>
      <p>Because Ashby is newer than Greenhouse and Lever, many job seekers don't know to check Ashby-powered career pages. This creates a real opportunity — roles on Ashby boards often have fewer than 50 applicants for weeks after posting.</p>
      
      <h2>How to Find Ashby Jobs</h2>
      <p>Search Ashby job boards directly: <code>site:jobs.ashbyhq.com [role] [location]</code></p>
      <p>Or use HiddenJobs to search Ashby alongside Greenhouse, Lever, Workday, and SmartRecruiters in one click, filtered by your preferred role and location.</p>
    `
  },
  {
    slug: "remote-software-engineer-jobs-direct-ats",
    title: "Remote Software Engineer Jobs: Where Companies Really Post",
    description: "Most remote software engineer jobs are posted directly to ATS boards before reaching LinkedIn. Find out where to look and how to apply first.",
    date: "2026-05-15",
    author: "HiddenJobs Editorial Team",
    readTime: "5 min read",
    tags: ["Remote", "Software Engineer", "Job Search"],
    content: `
      <h2>The Remote Job Market Reality</h2>
      <p>Remote software engineer jobs are more competitive than ever. A single LinkedIn posting can attract thousands of applicants globally within hours. But the smartest candidates know where to look before the crowd arrives.</p>
      
      <h2>Where Remote Jobs Are Actually Posted First</h2>
      <p>Companies post remote roles to their internal ATS boards first — often days or weeks before they syndicate to job boards. Here's the typical sequence:</p>
      <ol>
        <li>Role is created in Greenhouse/Lever/Ashby (Day 0)</li>
        <li>Internal referral period (Day 0-3)</li>
        <li>Direct applicants via career page (Day 1-7)</li>
        <li>LinkedIn/Indeed syndication (Day 7-14)</li>
      </ol>
      <p>By the time a role hits LinkedIn, the company may already be reviewing candidates who applied directly.</p>
      
      <h2>Best Remote Job Categories on ATS Boards</h2>
      <p>The most commonly posted remote roles on direct ATS boards include software engineer, product manager, designer, data scientist, and customer success roles. Use HiddenJobs to find these across every major ATS platform filtered by your target role and preferred location type.</p>
    `
  },
  {
    slug: "bypass-linkedin-find-jobs-before-published",
    title: "How to Bypass LinkedIn and Find Jobs Before They're Published",
    description: "Stop competing with thousands of applicants. Learn the exact strategy to find jobs on company career pages before they ever reach LinkedIn.",
    date: "2026-05-10",
    author: "HiddenJobs Editorial Team",
    readTime: "7 min read",
    tags: ["LinkedIn", "Job Search Strategy", "ATS"],
    content: `
      <h2>The LinkedIn Problem</h2>
      <p>LinkedIn is the default job search tool for most professionals — and that's precisely the problem. When a role is posted on LinkedIn, it gets hundreds of applications within hours. The signal-to-noise ratio is terrible for both applicants and recruiters.</p>
      
      <h2>The Direct ATS Strategy</h2>
      <p>Instead of waiting for jobs to appear on LinkedIn, search the source: company ATS boards. Here's the step-by-step approach:</p>
      
      <h3>Step 1: Identify Target Companies</h3>
      <p>Make a list of companies you'd like to work for. Check which ATS they use (Greenhouse, Lever, Ashby, Workday, etc.) by visiting their careers page.</p>
      
      <h3>Step 2: Search Across All ATS Platforms</h3>
      <p>Instead of visiting each company individually, use dork search to find all roles matching your criteria: <code>site:boards.greenhouse.io OR site:jobs.lever.co OR site:jobs.ashbyhq.com "Software Engineer"</code></p>
      
      <h3>Step 3: Apply Immediately</h3>
      <p>Direct ATS applications are reviewed by real recruiters. Without the LinkedIn applicant count, your application gets more attention. Apply within 48 hours of posting for the best response rate.</p>
      
      <h2>Automating the Process</h2>
      <p>HiddenJobs automates all of this — select your role and location, and we generate the right search queries for every ATS platform instantly. No more manual dorking.</p>
    `
  },
  {
    slug: "workday-job-search-tips",
    title: "How to Search Workday Jobs Like a Pro",
    description: "Workday is used by enterprise companies but their job search interface is clunky. Learn advanced tips to find Workday job listings faster.",
    date: "2026-05-05",
    author: "HiddenJobs Editorial Team",
    readTime: "4 min read",
    tags: ["Workday", "Enterprise", "Job Search"],
    content: `
      <h2>Why Workday Jobs Matter</h2>
      <p>Workday is the dominant ATS for enterprise companies — think Fortune 500, large financial institutions, and established tech companies. While the interface can be frustrating, the jobs are often high-quality with strong compensation.</p>
      
      <h2>Searching Workday Effectively</h2>
      <p>Workday career pages follow the pattern: <code>[company].myworkdayjobs.com</code>. Unlike Greenhouse and Lever, Workday search requires specific parameters. Use: <code>site:myworkdayjobs.com [role] [location]</code></p>
      
      <h2>Workday vs Modern ATS Platforms</h2>
      <p>Workday boards are less search-engine friendly than Greenhouse or Lever, which means fewer applicants find these roles through search. This is actually an advantage for you — less competition for each role posted on Workday.</p>
      <p>Use HiddenJobs to include Workday in your multi-platform search alongside Greenhouse, Lever, and Ashby for maximum coverage.</p>
    `
  },
  {
    slug: "smartrecruiters-job-board-guide",
    title: "SmartRecruiters Job Board: Finding Unlisted Opportunities",
    description: "SmartRecruiters powers career pages for thousands of companies. Learn how to search their job boards for roles that aren't promoted elsewhere.",
    date: "2026-04-28",
    author: "HiddenJobs Editorial Team",
    readTime: "4 min read",
    tags: ["SmartRecruiters", "ATS", "Job Search"],
    content: `
      <h2>What is SmartRecruiters?</h2>
      <p>SmartRecruiters is a popular ATS used by companies like Slack, Visa, and Squarespace. Their job boards are hosted at <code>jobs.smartrecruiters.com/[company]</code>.</p>
      
      <h2>Finding SmartRecruiters Jobs</h2>
      <p>Search SmartRecruiters boards with: <code>site:jobs.smartrecruiters.com [role] [location]</code></p>
      <p>Because SmartRecruiters boards are well-indexed by search engines, you can find them without needing to visit each company's careers page individually.</p>
      
      <h2>Including SmartRecruiters in Your Search</h2>
      <p>For maximum coverage, you should search across all major ATS platforms simultaneously. HiddenJobs supports SmartRecruiters alongside Greenhouse, Lever, Ashby, and Workday — all in one unified search.</p>
    `
  },
  {
    slug: "ats-optimized-resume-tips",
    title: "How to Write an ATS-Optimized Resume That Passes the Filter",
    description: "Learn how to structure your resume for applicant tracking systems. These tips will help your application get past the automated filters and into human hands.",
    date: "2026-04-20",
    author: "HiddenJobs Editorial Team",
    readTime: "6 min read",
    tags: ["Resume", "ATS", "Career Advice"],
    content: `
      <h2>How ATS Filters Work</h2>
      <p>Applicant Tracking Systems parse resumes into structured data. They extract your skills, experience, education, and contact information. The ATS then ranks candidates based on keyword matches with the job description.</p>
      
      <h2>ATS Optimization Tips</h2>
      
      <h3>Use Standard Section Headings</h3>
      <p>ATS parsers look for standard headings like "Work Experience," "Education," "Skills," and "Professional Summary." Creative headings like "Where I've Worked" may not be parsed correctly.</p>
      
      <h3>Include Keywords from the Job Description</h3>
      <p>If the job description mentions specific technologies, tools, or methodologies, include them in your skills section — but only if you genuinely have experience with them.</p>
      
      <h3>Use Standard File Formats</h3>
      <p>PDF is generally safe, but DOCX is the most reliably parsed format across all ATS platforms. Avoid images, tables, and columns that can confuse parsers.</p>
      
      <h3>Keep It Simple</h3>
      <p>ATS systems struggle with complex formatting. Stick to a clean, single-column layout with standard fonts. Save the creative resume design for after you've passed the automated filter.</p>
      
      <h2>Finding Direct ATS Opportunities</h2>
      <p>Once your resume is optimized, use HiddenJobs to find roles on Greenhouse, Lever, Ashby, and Workday boards directly — before they reach LinkedIn and other competitive platforms.</p>
    `
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const current = getBlogPost(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, count);
  return BLOG_POSTS
    .filter(p => p.slug !== currentSlug)
    .filter(p => p.tags.some(t => current.tags.includes(t)))
    .slice(0, count);
}
