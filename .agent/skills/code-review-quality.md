# Code Review & Quality

## Overview
Ensures that code changes meet production standards before being considered complete.

## Process
1. **Size Matters**: Keep PRs small (~100 lines). Split large changes.
2. **Five-Axis Review**:
   - Correctness: Does it work?
   - Readability: Is it clear?
   - Maintainability: Will it break later?
   - Security: Are there vulnerabilities?
   - Performance: Is it efficient?
3. **Labels**: Use Nit/Optional/FYI for clear communication.

## Verification
- PR/Task summary includes a self-review against the five axes.
- No "zombie code" or unused imports remain.
