# Test-Driven Development

## Overview
Enforces the Red-Green-Refactor cycle to ensure code works as expected and is maintainable.

## When to Use
- Implementing logic or business rules.
- Fixing bugs (reproduce with a test first).
- Refactoring existing code.

## Process
1. **Red**: Write a failing test that defines the expected behavior.
2. **Green**: Write the minimal code necessary to make the test pass.
3. **Refactor**: Clean up the code while keeping the test passing.
4. **Pyramid**: Aim for 80% Unit, 15% Integration, 5% E2E.

## Verification
- Test suite passes.
- Coverage reports (if available) show adequate testing of new logic.
