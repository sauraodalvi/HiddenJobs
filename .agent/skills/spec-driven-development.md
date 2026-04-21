# Spec-Driven Development

## Overview
Guides the agent through defining WHAT to build before any code is written. This ensures alignment, reduces rework, and defines clear boundaries.

## When to Use
- Starting a new project or feature.
- Making a significant change to existing behavior.
- Designing a new API or database schema.

## Process
1. **Gather Context**: Read existing code, PRDs, and documentation.
2. **Draft PRD**: Create a `spec.md` or similar covering:
   - Objectives (What are we doing?).
   - Non-Goals (What are we NOT doing?).
   - Commands (Available CLI tools).
   - Structure (File layout).
   - Boundaries (What logic lives where).
3. **User Approval**: Get explicit approval on the spec before implementation.

## Rationalizations
- "It's a simple change": Simple changes often have hidden complexity.
- "I'll document it later": Documentation after code is often neglected.

## Verification
- `spec.md` exists and is comprehensive.
- User has approved the plan.
