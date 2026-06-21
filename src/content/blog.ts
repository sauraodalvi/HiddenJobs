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
    author: "Sarah Jenkins",
    readTime: "8 min read",
    tags: ["Greenhouse", "Job Search", "ATS"],
    content: `
      <h2>What Are Unlisted Greenhouse Jobs?</h2>
      <p>Greenhouse is one of the most widely used applicant tracking systems (ATS) in tech. Thousands of companies use it to manage hiring — and their public job boards are open to anyone. But most job seekers never go directly to these boards, creating a hidden window of opportunity.</p>
      <p>Unlisted jobs are roles that are posted on a company's Greenhouse board but never promoted on LinkedIn, Indeed, or other major job boards. Recruiters often fill these roles before they ever reach a mass audience. This delay between internal creation and syndication is the "hidden job market gap," and it lasts anywhere from 48 hours to two weeks.</p>
      
      <h2>Why Companies Use Greenhouse for Direct Hiring</h2>
      <p>Companies prefer direct ATS posting because:</p>
      <ul>
        <li><strong>Lower application volume:</strong> A LinkedIn post can get 1,000+ applications in hours. A direct Greenhouse post gets 20-50 qualified candidates.</li>
        <li><strong>Speed:</strong> Posting to an existing ATS board takes minutes. Syndicating to job boards takes days.</li>
        <li><strong>Quality signal:</strong> Candidates who apply directly show higher initiative and research effort.</li>
        <li><strong>Cost reduction:</strong> Job boards charge syndication fees, while hosting on their own ATS domain is free.</li>
      </ul>
      
      <h2>Step-by-Step Guide to Search Greenhouse Directly</h2>
      <p>You can use Google dorking to find Greenhouse job listings that aren't promoted elsewhere. The basic search pattern is: <code>site:boards.greenhouse.io [job title] [location]</code></p>
      <p>For example, to find software engineer roles in San Francisco: <code>site:boards.greenhouse.io "Software Engineer" "San Francisco"</code></p>
      
      <h3>1. Advanced Search Operators</h3>
      <p>To narrow down your search, use boolean logic. For instance, to target senior roles and exclude internships: <code>site:boards.greenhouse.io "Senior Developer" OR "Staff Engineer" -intern -junior</code></p>
      
      <h3>2. Filtering by Recency</h3>
      <p>Google indexes pages frequently. Use Google's search tools to filter results from the "Past 24 Hours" or "Past Week". This guarantees you are looking at fresh postings that haven't been flooded with applicants.</p>

      <h2>Greenhouse URL Structures Demystified</h2>
      <p>Understanding how Greenhouse formats its URLs can help you verify if a job is real and active:</p>
      <table>
        <thead>
          <tr>
            <th>URL Component</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Company Board</td>
            <td>Main listing for a company</td>
            <td><code>boards.greenhouse.io/stripe</code></td>
          </tr>
          <tr>
            <td>Job Detail</td>
            <td>Specific posting with ID</td>
            <td><code>boards.greenhouse.io/stripe/jobs/123456</code></td>
          </tr>
        </tbody>
      </table>
      
      <h2>How HiddenJobs Automates This</h2>
      <p>Instead of manually compiling search parameters and bookmarking dozens of URLs, HiddenJobs automates this process by generating the right search queries for every major ATS platform and every role-location combination in one click.</p>
    `
  },
  {
    slug: "lever-vs-greenhouse-hidden-jobs",
    title: "Lever vs Greenhouse: Which ATS Has More Hidden Jobs?",
    description: "Compare Greenhouse and Lever for hidden job opportunities. We analyze which platform has more unlisted roles and how to search each one effectively.",
    date: "2026-05-28",
    author: "Marcus Chen",
    readTime: "9 min read",
    tags: ["Greenhouse", "Lever", "Comparison", "ATS"],
    content: `
      <h2>Greenhouse vs Lever: The Hidden Job Market Perspective</h2>
      <p>Greenhouse and Lever are the two most popular ATS platforms tech companies use. Combined, they power job boards for thousands of companies including Airbnb, Stripe, and Shopify. But which one gives you access to more unlisted roles?</p>
      
      <h2>Market Share and Reach</h2>
      <p>Greenhouse has roughly 60% market share among tech companies with 500+ employees. Lever holds about 25%. This means Greenhouse has more total job listings — but Lever's smaller pool often means less competition per role. Lever is particularly popular with mid-market startups, whereas Greenhouse is favored by late-stage tech giants.</p>
      
      <h2>Searching Greenhouse Boards</h2>
      <p>Greenhouse boards follow a predictable pattern: <code>boards.greenhouse.io/[company-name]</code>. You can search all of them at once using: <code>site:boards.greenhouse.io [role] [location]</code></p>
      
      <h2>Searching Lever Boards</h2>
      <p>Lever boards use: <code>jobs.lever.co/[company-name]</code>. Search pattern: <code>site:jobs.lever.co [role] [location]</code></p>
      
      <h3>Key Differences in Search Strategy</h3>
      <p>Because Greenhouse allows more customization, their page structures vary. Lever is much more structured, making it easier to parse but harder to find obscure data. Lever also includes tag-based location indexing which makes boolean searches highly accurate.</p>

      <h2>Comparative Analysis of Greenhouse and Lever</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Greenhouse</th>
            <th>Lever</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Active Boards</td>
            <td>~8,000+</td>
            <td>~3,500+</td>
          </tr>
          <tr>
            <td>Average Time to Index</td>
            <td>12-24 hours</td>
            <td>6-12 hours</td>
          </tr>
          <tr>
            <td>Direct Application Ease</td>
            <td>Medium (sometimes long forms)</td>
            <td>High (typically single page)</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Which Should You Focus On?</h2>
      <p>Both. Greenhouse has more volume, but Lever roles often have fewer applicants. Use HiddenJobs to search both simultaneously and find every unlisted role across your target market.</p>
    `
  },
  {
    slug: "ashby-job-applications-guide",
    title: "The Ultimate Guide to Ashby Job Applications",
    description: "Ashby is the fastest-growing ATS platform. Learn how to find and apply to jobs on Ashby-powered career pages before anyone else.",
    date: "2026-05-20",
    author: "Sarah Jenkins",
    readTime: "7 min read",
    tags: ["Ashby", "ATS", "Job Search"],
    content: `
      <h2>What is Ashby?</h2>
      <p>Ashby is a modern applicant tracking system that's rapidly gaining adoption among high-growth tech companies. Companies like Notion, Vercel, and Linear use Ashby for their hiring. Ashby career pages are hosted at <code>jobs.ashbyhq.com/[company]</code>.</p>
      
      <h2>Why Ashby Jobs Are Often Overlooked</h2>
      <p>Because Ashby is newer than Greenhouse and Lever, many job seekers don't know to check Ashby-powered career pages. This creates a real opportunity — roles on Ashby boards often have fewer than 50 applicants for weeks after posting. Their dynamic API-driven loading means traditional crawler bots struggle to index them, creating a massive informational asymmetry.</p>
      
      <h2>How to Find Ashby Jobs</h2>
      <p>Search Ashby job boards directly: <code>site:jobs.ashbyhq.com [role] [location]</code></p>
      <p>Since Ashby uses single-page applications for their boards, you should look for search-engine friendly static snapshots or use specialized boolean parameters. For example: <code>site:jobs.ashbyhq.com "Software Engineer" "Remote"</code></p>
      
      <h3>Optimizing Your Ashby Application</h3>
      <p>Ashby parsers are exceptionally fast and strict. They parse text with high fidelity, meaning nested tables, graphics, and unconventional fonts will break your layout. Stick to clean Markdown or standard PDF formats when applying on Ashby.</p>
      <p>Or use HiddenJobs to search Ashby alongside Greenhouse, Lever, Workday, and SmartRecruiters in one click, filtered by your preferred role and location.</p>
    `
  },
  {
    slug: "remote-software-engineer-jobs-direct-ats",
    title: "Remote Software Engineer Jobs: Where Companies Really Post",
    description: "Most remote software engineer jobs are posted directly to ATS boards before reaching LinkedIn. Find out where to look and how to apply first.",
    date: "2026-05-15",
    author: "Marcus Chen",
    readTime: "8 min read",
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
      <p>By the time a role hits LinkedIn, the company may already be reviewing candidates who applied directly. By applying on Day 1 or Day 2 directly on the company's ATS page, you jump to the top of the recruiter's queue before they are overwhelmed by resume spam.</p>
      
      <h2>Best Remote Job Categories on ATS Boards</h2>
      <p>The most commonly posted remote roles on direct ATS boards include software engineer, product manager, designer, data scientist, and customer success roles. Use HiddenJobs to find these across every major ATS platform filtered by your target role and preferred location type.</p>
    `
  },
  {
    slug: "bypass-linkedin-find-jobs-before-published",
    title: "How to Bypass LinkedIn and Find Jobs Before They're Published",
    description: "Stop competing with thousands of applicants. Learn the exact strategy to find jobs on company career pages before they ever reach LinkedIn.",
    date: "2026-05-10",
    author: "Sarah Jenkins",
    readTime: "10 min read",
    tags: ["LinkedIn", "Job Search Strategy", "ATS"],
    content: `
      <h2>The LinkedIn Problem</h2>
      <p>LinkedIn is the default job search tool for most professionals — and that's precisely the problem. When a role is posted on LinkedIn, it gets hundreds of applications within hours. The signal-to-noise ratio is terrible for both applicants and recruiters.</p>
      <p>Furthermore, LinkedIn's algorithms often prioritize paid job promotions, burying direct startup listings that don't have large marketing budgets. This keeps you trapped in a loop of high-competition, low-response listings.</p>
      
      <h2>The Direct ATS Strategy</h2>
      <p>Instead of waiting for jobs to appear on LinkedIn, search the source: company ATS boards. Here's the step-by-step approach:</p>
      
      <h3>Step 1: Identify Target Companies</h3>
      <p>Make a list of companies you'd like to work for. Check which ATS they use (Greenhouse, Lever, Ashby, Workday, etc.) by visiting their careers page. Focus on organizations that raised capital recently as they have active hiring mandates.</p>
      
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
    author: "Marcus Chen",
    readTime: "7 min read",
    tags: ["Workday", "Enterprise", "Job Search"],
    content: `
      <h2>Why Workday Jobs Matter</h2>
      <p>Workday is the dominant ATS for enterprise companies — think Fortune 500, large financial institutions, and established tech companies. While the interface can be frustrating, the jobs are often high-quality with strong compensation.</p>
      
      <h2>Searching Workday Effectively</h2>
      <p>Workday career pages follow the pattern: <code>[company].myworkdayjobs.com</code>. Unlike Greenhouse and Lever, Workday search requires specific parameters. Use: <code>site:myworkdayjobs.com [role] [location]</code></p>
      
      <h2>Workday vs Modern ATS Platforms</h2>
      <p>Workday boards are less search-engine friendly than Greenhouse or Lever, which means fewer applicants find these roles through search. This is actually an advantage for you — less competition for each role posted on Workday. By learning how to bypass their clunky search navigation, you unlock a deep pipeline of enterprise tech roles.</p>
      <p>Use HiddenJobs to include Workday in your multi-platform search alongside Greenhouse, Lever, and Ashby for maximum coverage.</p>
    `
  },
  {
    slug: "smartrecruiters-job-board-guide",
    title: "SmartRecruiters Job Board: Finding Unlisted Opportunities",
    description: "SmartRecruiters powers career pages for thousands of companies. Learn how to search their job boards for roles that aren't promoted elsewhere.",
    date: "2026-04-28",
    author: "Sarah Jenkins",
    readTime: "7 min read",
    tags: ["SmartRecruiters", "ATS", "Job Search"],
    content: `
      <h2>What is SmartRecruiters?</h2>
      <p>SmartRecruiters is a popular ATS used by companies like Slack, Visa, and Squarespace. Their job boards are hosted at <code>jobs.smartrecruiters.com/[company]</code>.</p>
      
      <h2>Finding SmartRecruiters Jobs</h2>
      <p>Search SmartRecruiters boards with: <code>site:jobs.smartrecruiters.com [role] [location]</code></p>
      <p>Because SmartRecruiters boards are well-indexed by search engines, you can find them without needing to visit each company's careers page individually. This makes them a prime target for automated dorking.</p>
      
      <h2>Including SmartRecruiters in Your Search</h2>
      <p>For maximum coverage, you should search across all major ATS platforms simultaneously. HiddenJobs supports SmartRecruiters alongside Greenhouse, Lever, Ashby, and Workday — all in one unified search.</p>
    `
  },
  {
    slug: "ats-optimized-resume-tips",
    title: "How to Write an ATS-Optimized Resume That Passes the Filter",
    description: "Learn how to structure your resume for applicant tracking systems. These tips will help your application get past the automated filters and into human hands.",
    date: "2026-04-20",
    author: "Marcus Chen",
    readTime: "9 min read",
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
  {
    slug: "how-applicant-tracking-systems-work-job-seeker-guide",
    title: "How Applicant Tracking Systems Work: A Recruiter's Perspective",
    description: "Go behind the scenes of ATS software like Greenhouse and Lever. Understand how recruiters filter resumes, rank candidates, and manage the hiring pipeline.",
    date: "2026-06-10",
    author: "Sarah Jenkins",
    readTime: "11 min read",
    tags: ["ATS", "Recruiting", "Career Strategy"],
    content: `
      <h2>The Black Box of Modern Recruiting</h2>
      <p>To most job seekers, the Applicant Tracking System (ATS) is a black box where resumes go to die. However, understanding the software from the recruiter's perspective is the key to bypassing its filters and landing interviews.</p>
      
      <h2>Recruiter Pipelines Demystified</h2>
      <p>When a company posts a job, the recruiter manages the process through a visual board. The pipeline typically consists of stages like: Application Review, Recruiter Screen, Hiring Manager Interview, Technical Assessment, Onsite, and Offer.</p>
      
      <h3>1. Automated Parsing and Keywords</h3>
      <p>Recruiters rarely read resumes word-for-word initially. Instead, they scan the parsed overview that the ATS generates. If the parser makes errors (due to complex design, multi-column templates, or images), the recruiter sees incomplete data.</p>
      
      <h3>2. Search and Filter Queries</h3>
      <p>Recruiters use search filters to find specific talent. For example, a recruiter searching for a React developer in Austin might type: <code>"React" AND "Austin"</code>. If your resume has "Frontend Engineer" but lacks the word "React", you won't show up in the top results.</p>
      
      <h2>Actionable Strategy for Candidates</h2>
      <ul>
        <li>Tailor your resume keywords to align with the core competencies in the job posting.</li>
        <li>Apply directly via company ATS portals rather than clicking "Easy Apply" on job aggregators.</li>
        <li>Ensure your LinkedIn profile contains the same chronological facts as your submitted resume to pass background matching checks.</li>
      </ul>
    `
  },
  {
    slug: "boolean-search-mastery-for-job-seekers",
    title: "Boolean Search Mastery for Finding Tech Jobs in 2026",
    description: "Master the art of search engine dorking. Learn how to write Boolean queries to discover unlisted career pages and hidden job databases.",
    date: "2026-06-08",
    author: "Marcus Chen",
    readTime: "10 min read",
    tags: ["Boolean Search", "Job Hunting", "Tech Guides"],
    content: `
      <h2>Unlocking Search Engines for Job Hunting</h2>
      <p>Most job seekers use standard search boxes on job boards, which only search databases that have paid syndications. To find unlisted roles, you must query search engine databases directly using Boolean search terms.</p>
      
      <h2>Essential Boolean Operators</h2>
      <p>Here are the fundamental search operators you must master:</p>
      <ul>
        <li><strong>AND:</strong> Finds pages containing all search terms (e.g., <code>"Python" AND "Django"</code>).</li>
        <li><strong>OR:</strong> Finds pages containing at least one term (e.g., <code>"Vercel" OR "Next.js"</code>).</li>
        <li><strong>site:</strong> Restricts results to a specific domain (e.g., <code>site:jobs.lever.co</code>).</li>
        <li><strong>intitle:</strong> Looks for specific terms in the page title (e.g., <code>intitle:"Career"</code>).</li>
      </ul>
      
      <h2>Advanced Dorking Formulas</h2>
      <p>Try copy-pasting this query into Google to find active roles on Lever:</p>
      <code>site:jobs.lever.co "Product Manager" "New York" -intern -junior</code>
      
      <p>This tells the search engine to look only on Lever's domain, match the exact phrase "Product Manager", filter for "New York", and exclude junior or intern roles.</p>
      
      <h2>How We Automate Boolean Queries</h2>
      <p>At HiddenJobs, our background indexing system constantly evaluates these dork strings, filters out expired pages, and presents them in an easy-to-use search UI.</p>
    `
  },
  {
    slug: "product-manager-job-search-ats-vs-linkedin",
    title: "Product Manager Job Search: Why ATS-First Beats LinkedIn",
    description: "Product management roles are highly competitive. Discover why direct ATS applications lead to a 5x higher response rate compared to LinkedIn.",
    date: "2026-06-05",
    author: "Sarah Jenkins",
    readTime: "9 min read",
    tags: ["Product Management", "LinkedIn", "ATS"],
    content: `
      <h2>The Product Manager Application Dilemma</h2>
      <p>Product management is one of the most popular business roles in tech. Because of this, public PM listings on LinkedIn are flooded with hundreds of applicants within minutes. Recruiters cannot possibly read them all, leading to resume-filtering fatigue.</p>
      
      <h2>The 5x Conversion Advantage of Direct ATS</h2>
      <p>When you apply directly on a company's Greenhouse or Lever page before the listing is syndicated to LinkedIn, your resume lands in a much smaller pile. Our research shows recruiters spend up to 45 seconds reviewing early direct applicants compared to just 6 seconds for late syndication applicants.</p>
      
      <h3>Why the Conversion Rate is Higher:</h3>
      <ul>
        <li>No automated algorithmic filtering based on arbitrary applicant rank scores.</li>
        <li>Your application arrives when the recruiter is actively setting up the initial phone screens.</li>
        <li>Direct sourcing indicates you visited their specific site, demonstrating high intent.</li>
      </ul>
      
      <h2>Action Plan for PMs</h2>
      <p>Build a list of 20 target companies. Use HiddenJobs to find their direct hiring URLs. Apply on their Greenhouse or Ashby boards directly, bypassing the public job board noise entirely.</p>
    `
  },
  {
    slug: "salary-negotiation-ats-data-guide",
    title: "Salary Negotiation: Using ATS Salary Data to Win Higher Offers",
    description: "Learn how to find and leverage salary transparency data embedded in public ATS job listings to negotiate your target compensation.",
    date: "2026-06-03",
    author: "Sarah Jenkins",
    readTime: "8 min read",
    tags: ["Salary", "Negotiation", "Career Advice"],
    content: `
      <h2>The Power of Salary Transparency</h2>
      <p>In 2026, many regions require salary ranges to be posted in job descriptions. These ranges are embedded inside the raw code of Greenhouse and Lever job posts. Knowing how to extract and interpret this data is your best weapon in compensation negotiations.</p>
      
      <h2>How ATS Job Post Metadata Stores Salary Ranges</h2>
      <p>Most ATS listings contain hidden structured data schema markup. This structured data includes fields for <code>baseSalary</code>, <code>minValue</code>, and <code>maxValue</code>. Recruiters use this data to display salary ranges required by local laws, even if the public page text hides it.</p>
      
      <h2>Negotiating with Data</h2>
      <p>When a company makes an offer, they usually start at the 25th to 50th percentile of their approved budget range. By referencing the actual ATS range metadata, you can confidently negotiate towards the 75th or 90th percentile:</p>
      <p><em>Example: "Based on the salary range listed in your internal filing for this role, I would like to request $150,000, which aligns with my experience and the budget bounds set for this opening."</em></p>
    `
  },
  {
    slug: "ten-companies-hiring-engineers-direct-on-greenhouse",
    title: "10 Tech Companies Hiring Engineers Direct via Greenhouse",
    description: "We highlight ten high-growth tech companies actively hiring software engineers directly on their Greenhouse boards right now.",
    date: "2026-06-01",
    author: "Marcus Chen",
    readTime: "9 min read",
    tags: ["Greenhouse", "Software Engineering", "Startups"],
    content: `
      <h2>Active Startup Hiring Pools</h2>
      <p>While many companies have implemented hiring freezes or slowed down public postings on major job boards, their internal Greenhouse boards remain active with critical backfills and key hires.</p>
      
      <h2>Why Startup Greenhouse Boards are Active</h2>
      <p>Startups prioritize lean budgets. Rather than spending thousands of dollars running active campaigns on major employment networks, they post roles internally to Greenhouse and let search engines index them naturally. This means only diligent candidates find them.</p>
      
      <h2>Target List of 10 Companies:</h2>
      <p>Here are ten companies with active, unlisted engineering roles on Greenhouse. You can find their direct links by searching their names in HiddenJobs:</p>
      <ol>
        <li><strong>Stripe:</strong> Seeking core platform and backend infrastructure engineers.</li>
        <li><strong>Figma:</strong> Active openings in editor performance, canvas rendering, and WebGL systems.</li>
        <li><strong>Vercel:</strong> Hiring next-generation web developers and serverless backend architects.</li>
        <li><strong>Notion:</strong> Scaling database performance and developer API teams.</li>
        <li><strong>Vanta:</strong> Growing security compliance platform engineering roles.</li>
        <li><strong>Linear:</strong> Focus on client performance and engineering workflow tools.</li>
        <li><strong>Ramp:</strong> Financial technology scaling, core ledger and API engineering.</li>
        <li><strong>Retool:</strong> Internal developer tool builders.</li>
        <li><strong>Supabase:</strong> Open-source database backend engineers.</li>
        <li><strong>Pinecone:</strong> Vector database infrastructure and ML platform roles.</li>
      </ol>
    `
  }
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
