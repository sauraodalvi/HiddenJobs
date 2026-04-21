# Agent Skills & Standards

Professional-grade engineering standards for the HiddenJobs project. These rules ensure consistency, reliability, and high-quality software engineering practices.

## Core Philosophy
- **Process over Prose**: Follow structured workflows, not just reference docs.
- **Verification is Mandatory**: "Seems right" is never sufficient. Provide evidence (tests, builds, logs).
- **Anti-Rationalization**: Do not skip steps. Quality is the priority over speed.

## Quick Start Commands
- `/spec`: Define what to build before any code.
- `/plan`: Decompose specs into small, verifiable, atomic tasks.
- `/build`: Implement incrementally (one slice at a time).
- `/test`: Prove it works with automated tests (TDD preferred).
- `/review`: Quality gate before merging (~100 lines/PR).
- `/code-simplify`: Reduce complexity while preserving behavior.
- `/ship`: Ship to production with confidence.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **UI/Styling**: Tailwind CSS + Lucide React + Leaflet (for maps)
- **AI**: Google Generative AI (Gemini)

## Engineering Skills (Applied by Default)

### 1. Define
- **idea-refine**: Turn vague concepts into concrete proposals through divergent thinking.
- **spec-driven-development**: Write a PRD covering objectives, commands, structure, and boundaries BEFORE coding.

### 2. Plan
- **planning-and-task-breakdown**: Break specs into small units with clear acceptance criteria.

### 3. Build
- **incremental-implementation**: Small vertical slices. Implement, test, verify, commit.
- **test-driven-development**: Red-Green-Refactor. DAMP over DRY in tests. Beyonce Rule.
- **context-engineering**: Use rules files and context packing to stay sharp.
- **source-driven-development**: Ground decisions in official documentation. Cite sources.

### 4. Verify
- **browser-testing**: Use devtools/playwright for live runtime verification.
- **debugging-recovery**: Reproduce, localize, reduce, fix, guard.

### 5. Review
- **code-review-quality**: Five-axis review. Would a staff engineer approve this?
- **code-simplification**: Chesterton's Fence. Rule of 500.

### 6. Ship
- **git-workflow**: Trunk-based development. Atomic commits (~100 lines).
- **ci-cd-automation**: Shift Left. Feature flags. Faster is safer.
- **documentation-adrs**: Document the "Why" using Architecture Decision Records.

## Red Flags
- Skipping tests for "simple" changes.
- Large, monolithic PRs (>200 lines).
- Lack of cited documentation for new library usage.
- Missing verification evidence in task completions.
