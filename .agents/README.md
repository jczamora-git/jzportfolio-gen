# Portfolio Launchpad — AI Agent Harness

Welcome to the **Portfolio Launchpad AI Development Harness**. This directory structure is designed to guide AI coding assistants, human engineers, and automation bots in executing safe, consistent, and regression-free development on the Portfolio Launchpad codebase.

---

## Directory Overview

```
.agents/
├── README.md                 # Harness guide and workflow instructions (this file)
├── KNOWN_ISSUES.md           # Defect tracker, regression history, and fix status
├── skills/                   # Specialized skill guides for specific workflows
│   ├── portfolio-architect/  # System architecture, routing, store boundaries, static deploy
│   ├── vue-regression/       # Regression detection, shared component safety, testing
│   ├── ui-design-system/     # Visual identity, typography, tokens, upper-sheet layout
│   ├── theme-navigation/     # Theme synchronization, floating capsule navbar, mobile menu
│   ├── motion-engineer/      # GSAP timelines, ScrollTrigger, Lenis lifecycle, accessibility
│   ├── prompt-engine/        # Zod schemas, prompt generation, Markdown export, personas
│   └── release-qa/           # Pre-commit checklist, verification command, CI validation
├── contracts/                # Immutable architectural, behavioral, and UI contracts
│   ├── ARCHITECTURE.md       # Technical system boundaries and component relationships
│   ├── UI_CONTRACT.md        # Approved page compositions and layout rules
│   ├── THEME_CONTRACT.md     # Theme tokens, synchronization, and surface ownership
│   ├── RESPONSIVE_CONTRACT.md# Viewport breakpoints, mobile constraints, hidden elements
│   ├── MOTION_CONTRACT.md    # Animation timings, ScrollTrigger scopes, reduced-motion
│   ├── FEATURE_CONTRACT.md   # Functional feature inventory and wizard state contracts
│   └── REGRESSION_MATRIX.md  # Change impact matrix mapping components to required tests
├── decisions/
│   └── DECISIONS.md          # Architecture Decision Records (ADRs) with rationale
└── handoffs/
    └── LATEST.md             # The current session handoff and status entry point
```

---

## Standard Development Workflow

Every AI agent working on this repository must execute the following cycle:

```
[Inspect Handoff & Code] 
        ↓
[Identify Scope & Contract]
        ↓
[Implement Minimal Diff]
        ↓
[Run npm run verify]
        ↓
[Inspect Git Diff]
        ↓
[Update LATEST.md]
        ↓
[Create Local Commit]
```

### 1. Orient Before Changing Code
- Read `[AGENTS.md](file:///c:/Users/JC%20Zamora/Documents/Jeizi_Programming_Apps/portfolio-gen/AGENTS.md)` for global rules.
- Read `[.agents/handoffs/LATEST.md](file:///c:/Users/JC%20Zamora/Documents/Jeizi_Programming_Apps/portfolio-gen/.agents/handoffs/LATEST.md)` to understand the latest project status.
- Identify the relevant skill in `.agents/skills/` and contract in `.agents/contracts/`.

### 2. Follow Domain Contracts
- Never violate contracts established in `.agents/contracts/`.
- If a change touches shared components, check `[.agents/contracts/REGRESSION_MATRIX.md](file:///c:/Users/JC%20Zamora/Documents/Jeizi_Programming_Apps/portfolio-gen/.agents/contracts/REGRESSION_MATRIX.md)`.

### 3. Verify Before Committing
Run the single verification command:
```bash
npm run verify
```
This runs Vitest tests, TypeScript typechecking, and the Vite production build.

### 4. Maintain the Handoff
Before ending a session, update `[.agents/handoffs/LATEST.md](file:///c:/Users/JC%20Zamora/Documents/Jeizi_Programming_Apps/portfolio-gen/.agents/handoffs/LATEST.md)` with the modifications made, verification evidence, and pending tasks.
