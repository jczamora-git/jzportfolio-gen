---
name: portfolio-architect
description: System architecture, component boundaries, Pinia stores, routing, and static deployment rules for Portfolio Launchpad.
---

# Skill: Portfolio Architect

## Core Responsibilities
1. **Maintain Clean Vue 3 Architecture**: Guard component boundaries, modular composables, Pinia state stores, and Vue Router configuration.
2. **Enforce Client-Side Invariant**: Ensure Portfolio Launchpad remains a 100% client-side tool with zero backend APIs, databases, or cloud accounts.
3. **Preserve Static Build Compatibility**: Keep the project buildable via Vite for static hosting (Vercel, GitHub Pages).
4. **Prevent Over-Abstraction**: Keep components focused and avoid premature abstractions or unnecessary third-party dependencies.

---

## Architectural Invariants
- **No Backend**: All state exists in memory (Pinia) and persists via `localStorage`.
- **No AI API Calls**: The app generates structured prompt text; it never invokes OpenAI, Anthropic, or Google APIs directly.
- **Route Structure**:
  - `/` -> `LandingView.vue` (Product showcase, hero upper-sheet, process, capabilities, CTA)
  - `/builder` -> `WizardView.vue` (5-step guided wizard for profile, skills, projects, design, review)
  - `/result` -> `ResultView.vue` (Structured summary, prompt output, copy, Markdown export)
  - `/learn/deploy` -> `DeployGuideView.vue` (GitHub Actions static deployment tutorial)
  - `/privacy` -> `PrivacyView.vue` (Client-side privacy and local data handling statement)

---

## Change Checklist for Architects
- [ ] Does this change add unapproved backend dependencies? (Must be NO).
- [ ] Does this change modify Pinia store structure without updating Zod schemas and tests? (Must be NO).
- [ ] Are all imports strictly using `@/` path aliases configured in `vite.config.ts`?
- [ ] Does `npm run build` produce a clean static bundle in `dist/`?
