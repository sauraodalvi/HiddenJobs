# HiddenJobs Traffic Growth Loop Engineering

## Goal

Increase qualified website traffic to HiddenJobs through repeatable growth loops, not one-off campaigns. The target traffic is job seekers, career operators, recruiters, bootcamp communities, and AI/search engines looking for direct ATS job discovery.

Do not optimize for bot visits, fake sessions, spam backlinks, doorway pages, copied content, or irrelevant traffic. Those inflate analytics while damaging search quality, trust, and conversion.

## North Star

Qualified search actions per week.

A qualified search action is a user who lands on HiddenJobs and runs, opens, saves, or shares a direct ATS search for a role, platform, location, or company.

## Supporting Metrics

- Organic clicks from Google Search Console
- Indexed page count
- Impressions by route template
- CTR by query and page
- Saved searches
- Email or account signups
- Direct ATS outbound clicks
- Referring domains
- Mentions from newsletters, social posts, forums, and AI answer engines

## Loop 1: Search Demand Loop

Purpose: find demand before building pages.

Cadence: weekly.

Inputs:

- Google Search Console queries
- Product search logs
- Site search terms
- Customer support/user questions
- Reddit, LinkedIn, X, Hacker News, and job-search community discussions
- ATS/platform trend terms such as Greenhouse, Lever, Ashby, Workday, SmartRecruiters

Process:

1. Export queries with impressions but low clicks.
2. Cluster by role, platform, location, company, salary, resume/application intent, and comparison intent.
3. Score each cluster by search intent and product fit.
4. Pick 10 page/content opportunities for the week.
5. Feed winners into the Programmatic SEO Loop and Content Refresh Loop.

Output:

- Weekly keyword cluster list
- Page backlog
- Content refresh backlog

Decision rule:

Prioritize pages where HiddenJobs can answer the query better than a generic job board: direct ATS source, lower competition, freshness, role/location/platform specificity, or practical search workflow.

## Loop 2: Programmatic SEO Loop

Purpose: scale useful landing pages without creating thin doorway pages.

Cadence: twice weekly.

Current assets:

- `src/app/jobs/[platform]/page.tsx`
- `src/app/jobs/role/[role]/page.tsx`
- `src/app/jobs/location/[location]/page.tsx`
- `src/app/jobs/platform/[platform]/page.tsx`
- `src/app/jobs/platform/[platform]/[role]/[location]/page.tsx`
- `src/app/company/[domain]/page.tsx`
- `src/app/sitemap.ts`
- `src/lib/constants.ts`
- `src/lib/seo-utils.ts`

High-value page types:

- `/jobs/[role]-in-[location]`
- `/jobs/role/[role]`
- `/jobs/location/[location]`
- `/jobs/platform/[platform]`
- `/jobs/platform/[platform]/[role]/[location]`
- `/company/[domain]`
- Future: `/company/[domain]/[role]`
- Future: `/jobs/salary/[role]/[location]`

Quality requirements:

- Include unique role, location, platform, or company-specific copy.
- Include the generated ATS search query or workflow.
- Include internal links to adjacent role/location/platform pages.
- Include FAQ schema only when the FAQ is visible on the page.
- Use `JobPosting` schema only for real individual jobs, never generic directory pages.
- Noindex zero-job or low-value pages.
- Keep sitemap limited to indexable pages.

Weekly shipping target:

- 10 refreshed or newly useful pages.
- 1 template improvement that benefits many pages.

## Loop 3: Content Refresh Loop

Purpose: keep editorial pages fresh enough to earn clicks, shares, and AI citations.

Cadence: weekly.

Current asset:

- `src/content/blog.ts`

Recurring content formats:

- Best companies hiring engineers direct via Greenhouse this week
- Top Ashby companies hiring product managers this month
- Remote software engineer jobs before LinkedIn
- Greenhouse vs Lever vs Ashby search strategy
- ATS resume/application tips for a specific role
- Hidden job market report by city

Refresh process:

1. Pick posts with impressions but low CTR.
2. Improve title and description.
3. Add current examples, internal links, and a concise answer block.
4. Add a clear product CTA.
5. Republish distribution snippets for social/newsletters.

Decision rule:

Refresh before writing net-new content if an existing page already has impressions.

## Loop 4: Distribution Loop

Purpose: turn every page into external traffic and links.

Cadence: every page launch.

For each shipped page or post, create:

- LinkedIn post
- X thread
- Reddit/community answer where allowed and useful
- Founder/building-in-public update
- Newsletter blurb
- Short visual or screen-recorded search tip

Distribution principles:

- Lead with a specific job seeker problem.
- Show the exact ATS search trick.
- Link to the most specific relevant HiddenJobs page.
- Avoid spam posting. Prefer helpful answers in communities where job search tactics are already discussed.

CTA examples:

- Search direct ATS jobs for your role and city.
- Generate the Greenhouse/Lever/Ashby query for this role.
- Save this search and check fresh listings weekly.

## Loop 5: Free Tool Loop

Purpose: create linkable, useful traffic magnets.

Priority tools:

1. ATS search query generator
2. Hidden job alert builder
3. ATS resume keyword checker
4. Greenhouse company board finder
5. Lever/Ashby direct application finder

Tool requirements:

- Useful without signup.
- Shareable URL.
- Clear saved-search or email-alert conversion.
- Internal links to role, platform, and location pages.
- Schema appropriate to software/web application pages.

First recommended route:

- `/tools/ats-search-query-generator`

## Loop 6: Data Report / PR Loop

Purpose: earn backlinks and recurring mentions.

Cadence: monthly public report, weekly lightweight update.

Report ideas:

- HiddenJobs ATS Hiring Index
- Which ATS has the freshest remote tech jobs?
- Cities with the most direct ATS tech postings
- Companies posting before LinkedIn
- Role categories with the lowest public-board competition

Data requirements:

- Use real observed data when available.
- Clearly label methodology.
- Avoid unsupported claims.
- Publish charts/screenshots that newsletters can embed.

Outreach targets:

- Career newsletters
- Resume coaches
- Bootcamp communities
- Layoff support communities
- Indie hackers and founder communities
- Recruiting tech writers

## Loop 7: AI / GEO Loop

Purpose: make HiddenJobs easy for AI answer engines to cite and summarize.

Current assets:

- `public/llms.txt`
- `src/app/robots.ts`
- Answer blocks and FAQ sections across SEO pages

Actions:

- Add concise definition pages for hidden job market, ATS platforms, and direct ATS applications.
- Keep answer blocks factual and short.
- Use visible FAQs with matching schema.
- Add author and methodology details to data/report pages.
- Keep `llms.txt` synchronized with public route changes.

Target pages:

- `/resources/hidden-job-market`
- `/resources/ats-platforms`
- `/resources/direct-ats-application-guide`
- `/resources/greenhouse-search-operators`

## 30-Day Execution Plan

Week 1:

- Remove generic `JobPosting` schema from directory pages.
- Audit indexed route templates and noindex rules.
- Create the keyword cluster sheet.
- Refresh the top 5 posts/pages with impressions but weak CTR.
- Publish one tool spec for the ATS query generator.

Week 2:

- Ship `/tools/ats-search-query-generator`.
- Add unique direct-ATS query blocks to role/location/platform templates.
- Publish 2 fresh high-intent blog posts.
- Distribute each page/post across 5 channels.

Week 3:

- Add the first HiddenJobs ATS Hiring Index page.
- Add methodology and citation-friendly sections.
- Pitch 25 newsletters/communities.
- Refresh sitemap/indexing based on Search Console coverage.

Week 4:

- Review route-template performance.
- Expand winning role/location/platform clusters.
- Kill or noindex weak pages.
- Publish a second report or update the first report with fresh data.

## Engineering Backlog

Priority 0:

- Keep `JobPosting` schema limited to real job detail pages.
- Make sure sitemap only includes indexable URLs.
- Fix any visible encoding/mojibake in public copy.
- Confirm canonical URLs use the production domain.

Priority 1:

- Add `/tools/ats-search-query-generator`.
- Add a reusable `DirectAtsQueryBlock` component.
- Add visible FAQ blocks wherever FAQ schema is emitted.
- Add Search Console query import workflow.

Priority 2:

- Add `/resources/hidden-job-market`.
- Add `/resources/ats-platforms`.
- Add company-role pages if company pages get impressions.
- Add monthly ATS Hiring Index page.

Priority 3:

- Add share images for reports and tools.
- Add newsletter capture tied to saved searches.
- Add analytics events for qualified search actions.

## Weekly Review Template

Date:

Shipped:

- Pages:
- Posts:
- Tools:
- Distribution:

Metrics:

- Organic clicks:
- Impressions:
- CTR:
- Indexed URLs:
- Saved searches:
- Outbound ATS clicks:
- New referring domains:

Winners:

- Query/page:
- Why it worked:
- Next action:

Losers:

- Query/page:
- Why it underperformed:
- Next action:

Next week bets:

- Bet 1:
- Bet 2:
- Bet 3:
