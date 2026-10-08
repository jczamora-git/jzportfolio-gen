---
name: release-qa
description: Quality assurance, regression testing, type checking, production build validation, and release readiness.
---

# Skill: Release QA

## Core Responsibilities
1. **Execute Verification Gateway**: Enforce the mandatory pre-commit check `npm run verify` (`npm test` + `vue-tsc --noEmit` + `vite build`).
2. **Review Working Tree Hygiene**: Check `git status` and `git diff` to ensure no unintended modifications, debug logs, or broken styles are committed.
3. **Guard CI Integrity**: Ensure `.github/workflows/ci.yml` passes cleanly on all PRs and pushes.
4. **Handoff Maintenance**: Ensure `.agents/handoffs/LATEST.md` is updated with accurate test evidence and change logs.

---

## The Pre-Commit Quality Gate Checklist
Before committing any changes:

- [ ] **Tests**: `npm test` runs with **all passing tests** (exit code `0`).
- [ ] **Typecheck**: `vue-tsc --noEmit` completes with **0 errors**.
- [ ] **Production Build**: `npm run build` completes and outputs `dist/`.
- [ ] **Regression Matrix**: Checked `.agents/contracts/REGRESSION_MATRIX.md` for affected subsystems.
- [ ] **Diff Review**: Inspected `git diff` to confirm only requested changes are present.
- [ ] **Handoff**: Updated `.agents/handoffs/LATEST.md`.
- [ ] **Git Commit**: Created local commit with conventional format (`fix(...)`, `feat(...)`, `chore(...)`).
