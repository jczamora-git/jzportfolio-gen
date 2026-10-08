# AGENTS.md — Portfolio Launchpad AI Development Rules & Harness

> **MANDATORY INSTRUCTION FOR ALL AI CODING AGENTS (Codex, Antigravity, Pair Programmers):**
> You must strictly follow the rules, architecture contracts, and change-control protocols established in this document and the `.agents/` harness before, during, and after making any modifications to this repository.

---

## 1. Project Overview & Boundaries
**Portfolio Launchpad** is an AI-assisted, client-side portfolio prompt generator designed for students, fresh graduates, and developers. It collects verified facts (profile, skills, projects, and design preferences) and deterministically compiles an AI prompt ready for ChatGPT, Gemini, or Claude to build static, single-page HTML5/CSS3/JavaScript portfolios deployable via GitHub Pages and GitHub Actions.

- **Stack**: Vue 3 (Composition API, `<script setup>`), TypeScript, Vite, Tailwind CSS, Pinia, Vue Router, Zod, Vitest, GSAP + ScrollTrigger, Lenis.
- **Scope Invariants**:
  - 100% Client-Side execution.
  - No database, no backend API, no telemetry, no authentication.
  - Drafts persist strictly in browser `localStorage`.
  - Prompt generator must be deterministic (zero hallucinated claims or invented facts).

---

## 2. Mandatory Change-Control Rules

### RULE 1 — Inspect Before Editing
- Always read the target component, its parent views, shared styles, and store/composable dependencies before modifying code.
- Consult `.agents/handoffs/LATEST.md` and `.agents/contracts/REGRESSION_MATRIX.md` to identify affected systems.
- Never edit based on visual assumptions alone; inspect the actual TypeScript/Vue code and CSS classes.

### RULE 2 — Minimal Justified Diff
- Make the smallest change that completely resolves the issue.
- Do not rewrite entire Vue files when modifying a targeted template block, script function, or style rule is sufficient.
- Do not touch unrelated routes, components, or configuration files.

### RULE 3 — Preserve Working Features & Contracts
- Before editing shared components (e.g. `AppHeader.vue`, `AppFooter.vue`, `portfolioStore.ts`, `useTheme.ts`, `main.css`), verify all 5 routes (`/`, `/builder`, `/result`, `/learn/deploy`, `/privacy`).
- Verify theme consistency (both light and dark modes) on all affected surfaces.

### RULE 4 — No Unrequested Redesigns
- A bug fix must remain a bug fix.
- Do not alter approved brand identities, hero layouts, typography choices, or page structures unless explicitly tasked.

### RULE 5 — No Unnecessary Dependencies
- Do not install new packages without explicit justification. Utilize existing libraries (Vue 3, Pinia, Zod, Lucide, Tailwind, GSAP, Lenis).

### RULE 6 — Validate Before Committing
- Always run the unified verification command: `npm run verify` (`vitest run` + `vue-tsc --noEmit` + `vite build`).
- Ensure all tests pass with exit code `0` and the production bundle builds without type or bundle errors.

### RULE 7 — Accurate Reporting
- Never claim tests or builds passed without actual exit code verification.
- State clearly what was changed, verified, and if manual visual inspection is required from the user.

### RULE 8 — Preserve User Changes
- Check `git status` and `git diff` before and after changes.
- Never discard, overwrite, or reset uncommitted user modifications or working tree state.

---

## 3. Architecture & Key Directory Map

```
c:\Users\JC Zamora\Documents\Jeizi_Programming_Apps\portfolio-gen
├── .agents/                      # AI Agent Harness, Contracts, Skills & Handoffs
│   ├── contracts/                # Architecture, UI, Theme, Responsive, Motion contracts
│   ├── decisions/                # Architecture Decision Log (DECISIONS.md)
│   ├── handoffs/                 # Development handoff state (LATEST.md)
│   ├── skills/                   # Specialized agent workflow guides
│   └── KNOWN_ISSUES.md           # Defect tracker and regression history
├── src/
│   ├── components/
│   │   ├── common/               # AppHeader, AppFooter, FormField, ConfirmModal, ToastContainer
│   │   ├── prompt/               # PromptOutput (formatted markdown & copy controls)
│   │   └── wizard/               # WizardProgress, StepProfile, StepSkills, StepProjects, StepDesign, StepReview, SampleProfileSelector
│   ├── composables/              # useTheme, useSmoothScroll, useScrollAnimations, useToast
│   ├── data/                     # sampleProfiles (5 student personas), skillSuggestions
│   ├── lib/
│   │   ├── motion/               # motionPresets (easing curves, duration, media queries)
│   │   ├── prompt/               # promptGenerator, markdownExport
│   │   ├── storage/              # draftStorage (localStorage sync & schema validation)
│   │   └── validation/           # portfolioSchema (Zod schemas for all draft models)
│   ├── router/                   # Vue Router (5 static routes with scrollBehavior)
│   ├── stores/                   # portfolioStore (Pinia store for wizard & draft state)
│   ├── styles/                   # main.css (Tailwind layers, tokens, transitions, Lenis CSS)
│   ├── types/                    # TypeScript interfaces for portfolio models
│   └── views/                    # LandingView, WizardView, ResultView, DeployGuideView, PrivacyView
├── tests/                        # Vitest automated unit and regression test suite
└── AGENTS.md                     # Root rules and change protocol (this file)
```

---

## 4. Specific Domain Subsystem Rules

### A. Theme System (`useTheme.ts`)
1. **Single Source of Truth**: `useTheme.ts` manages reactive `currentTheme` (`'light' | 'dark'`).
2. **Synchronous Execution**: Root class `document.documentElement.classList.toggle('dark')` and `localStorage.setItem('portfolio-launchpad:ui-theme', theme)` must execute synchronously to avoid flash-of-wrong-theme.
3. **Fixed Dark Navigation**: `AppHeader` floating pill and mobile dropdown **must always remain dark** (`bg-[#12131C]/95 dark:bg-[#1A1A24]/95`) in both light and dark modes.
4. **No Structural Transition Lag**: Do not place `transition-colors duration-200` on high-level layout containers (`App.vue`, `landing-stage`, `upper-hero-sheet`, `lower-stage`) to prevent rectangular color cuts during rapid theme switching.

### B. Mobile Navigation (`AppHeader.vue`)
1. **Interaction Standards**:
   - Hamburger toggles `mobileMenuOpen`.
   - Clicking any route link closes the menu.
   - Pressing `Escape` closes the menu.
   - Clicking outside the header container closes the menu.
2. **Accessibility**: All buttons must have `type="button"`, `aria-label`, `aria-expanded="mobileMenuOpen"`, and `aria-controls="mobile-nav-menu"`.
3. **Styling**: Always compact, dark backdrop (`bg-[#12131C]/98 dark:bg-[#1A1A24]/98`), white text, no excessive spacer padding or artificial fixed min-heights.

### C. Landing Upper-Sheet Architecture (`LandingView.vue`)
1. **Curvature Separation**:
   - Upper hero sheet has pronounced bottom curvature (`rounded-b-[44px] sm:rounded-b-[72px] lg:rounded-b-[96px]`).
   - The container behind the curves has background matching the lower stage (`#F1F0F6` in light mode, `#0F0F15` in dark mode) so the curved boundary is cleanly visible.
2. **Header Continuity**: Top header area behind the floating capsule navbar matches the upper hero sheet (`bg-white` in light mode, `#20202B` in dark mode) with zero horizontal seam.
3. **Mobile Brief Invariant**: The Creative Portfolio Brief is visible only on tablet/desktop (`hidden md:block`). It must **never** be unhidden on mobile screens by CSS or GSAP inline style overrides.

### D. Motion & Scroll System (`useScrollAnimations.ts`, `useSmoothScroll.ts`)
1. **GSAP + Lenis Integration**: Lenis is driven exclusively via `gsap.ticker.add((time) => lenis.raf(time * 1000))` (no duplicate `requestAnimationFrame` loops).
2. **Lifecycle Cleanliness**: All animations must be registered within `gsap.context(..., scope)` and reverted via `ctx.revert()` in `onBeforeUnmount`.
3. **Accessibility**: If `isReducedMotion()` or touch device is detected, Lenis smooth scrolling and transforms are bypassed, keeping elements immediately visible at `opacity: 1`.
4. **No Permanent Theme Overrides**: GSAP must only animate `transform` and `opacity`. Never set permanent inline background colors or text colors via GSAP.

### E. Prompt Engine & State Management (`promptGenerator.ts`, `portfolioStore.ts`)
1. **Deterministic Output**: For given user inputs, `generatePrompt()` and `generateMarkdownExport()` must produce structured, hallucination-free Markdown specifications.
2. **Empty Field Handling**: Missing optional fields (e.g. no projects, no experience) must gracefully trigger fallback sections (e.g. "Learning Journey") without fabricating credentials.
3. **Sample Profiles**: 5 preloaded personas (`Alex Morgan`, `Jamie Reyes`, `Taylor Santos`, `Jordan Lee`, `Morgan Chen`) must pass Zod schema validation.

---

## 5. Change Risk Classification & Verification Protocol

| Risk Level | Trigger Scenarios | Required Verification Protocol |
| :--- | :--- | :--- |
| **LOW** | Copy edits, isolated component CSS tweaks, documentation | Run targeted unit tests (`vitest run <testfile>`) + verify build. |
| **MEDIUM** | Shared components (`AppHeader`, `AppFooter`, `FormField`), step forms, responsive breakpoints | Full test suite (`npm test`) + TypeScript check (`vue-tsc --noEmit`) + production build (`npm run build`). |
| **HIGH** | Theme state (`useTheme`), Router, Pinia store, Prompt generator, Motion lifecycle, Global CSS | Run `npm run verify` + review contracts in `.agents/contracts/` + update `.agents/handoffs/LATEST.md`. |

---

## 6. Safe Modification Protocol (Step-by-Step)

1. **Phase 1: Orient & Inspect**
   - Read `.agents/handoffs/LATEST.md` for current status.
   - Review relevant skill in `.agents/skills/` and contract in `.agents/contracts/`.
   - Inspect target component and dependent files.
2. **Phase 2: Implement Smallest Justified Diff**
   - Apply targeted changes using Vue 3 Composition API and established Tailwind/CSS tokens.
   - Preserve existing public interfaces, props, and event contracts.
   - Add/update regression tests in `tests/` if fixing a defect or adding functionality.
3. **Phase 3: Validate Sequentially**
   - Run unit tests: `npm test`
   - Run typecheck & production build: `npm run build`
   - Or run all checks together: `npm run verify`
4. **Phase 4: Handoff & Commit**
   - Update `.agents/handoffs/LATEST.md` with what changed, verification evidence, and pending tasks.
   - Update `.agents/KNOWN_ISSUES.md` if resolving or identifying defects.
   - Create local git commit with conventional commit format (`fix(...)`, `feat(...)`, `chore(...)`).
